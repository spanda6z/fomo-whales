/**
 * Provider-independent payment service.
 * Never trust client-side success messages. Only backend + webhook confirmation.
 */

import { nanoid } from "nanoid";
import { config } from "./config";
import { prisma } from "./prisma";
import type { PaymentStatus } from "@prisma/client";

export interface CreateOrderInput {
  userId: string;
  packageId: string;
  promotionId: string;
  amountCents: number;
  currency?: string;
}

export async function createPaymentOrder(input: CreateOrderInput) {
  const orderRef = `FW-${nanoid(12).toUpperCase()}`;
  const expiresAt = new Date(Date.now() + 60 * 60 * 1000); // 1 hour

  const order = await prisma.paymentOrder.create({
    data: {
      userId: input.userId,
      packageId: input.packageId,
      promotionId: input.promotionId,
      orderRef,
      amountCents: input.amountCents,
      currency: input.currency || config.payment.currency,
      status: "PENDING",
      provider: config.payment.provider,
      expiresAt,
      // Placeholder checkout — replace with real provider URL when integrated
      checkoutUrl:
        config.payment.provider === "placeholder"
          ? `${config.appUrl}/api/payments/placeholder-checkout?ref=${orderRef}`
          : null,
    },
  });

  return order;
}

/**
 * Mark payment completed only after trusted provider verification.
 * Idempotent: safe to call multiple times for the same provider event.
 */
export async function confirmPayment(params: {
  orderRef: string;
  providerRef?: string;
  providerEventId?: string;
  payload?: unknown;
}) {
  const order = await prisma.paymentOrder.findUnique({
    where: { orderRef: params.orderRef },
  });

  if (!order) throw new Error("Order not found");
  if (order.status === "COMPLETED") return order; // idempotent

  // Record event for audit
  if (params.providerEventId) {
    const existing = await prisma.paymentEvent.findUnique({
      where: { providerEventId: params.providerEventId },
    });
    if (existing) return order; // already processed
  }

  await prisma.$transaction(async (tx) => {
    await tx.paymentOrder.update({
      where: { id: order.id },
      data: {
        status: "COMPLETED",
        providerRef: params.providerRef,
        completedAt: new Date(),
      },
    });

    if (params.providerEventId) {
      await tx.paymentEvent.create({
        data: {
          paymentOrderId: order.id,
          eventType: "payment.completed",
          providerEventId: params.providerEventId,
          payload: params.payload as object | undefined,
        },
      });
    }

    if (order.promotionId) {
      await tx.promotion.update({
        where: { id: order.promotionId },
        data: { status: "PAID" },
      });
    }
  });

  return prisma.paymentOrder.findUniqueOrThrow({ where: { id: order.id } });
}

export async function updatePaymentStatus(
  orderRef: string,
  status: PaymentStatus
) {
  return prisma.paymentOrder.update({
    where: { orderRef },
    data: { status },
  });
}

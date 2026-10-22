import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const type = searchParams.get("type");

    const promotions = await prisma.promotion.findMany({
      where: {
        status: "PUBLISHED",
        ...(type === "free"
          ? { type: "FREE_MILESTONE" }
          : type === "pro"
            ? { type: "PAID_PRO" }
            : {}),
      },
      include: {
        user: { include: { profile: true } },
        channel: true,
      },
      orderBy: { publishedAt: "desc" },
      take: 50,
    });

    return NextResponse.json({ promotions });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ promotions: [], error: "unavailable" }, { status: 503 });
  }
}

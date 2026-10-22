import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const featured = searchParams.get("featured");
    const q = searchParams.get("q");

    const channels = await prisma.channel.findMany({
      where: {
        enabled: true,
        ...(featured === "1" ? { featured: true } : {}),
        ...(q
          ? {
              OR: [
                { name: { contains: q, mode: "insensitive" } },
                { description: { contains: q, mode: "insensitive" } },
              ],
            }
          : {}),
      },
      include: {
        packages: { where: { enabled: true }, orderBy: { priceCents: "asc" } },
      },
      orderBy: [{ featured: "desc" }, { sortOrder: "asc" }, { name: "asc" }],
    });

    return NextResponse.json({ channels });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ channels: [], error: "unavailable" }, { status: 503 });
  }
}

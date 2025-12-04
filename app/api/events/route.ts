import { NextResponse } from "next/server";
import { getEventById } from "@/lib/api/event";

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  const event = await getEventById(params.id);

  if (!event) {
    return NextResponse.json({ error: "Event not found" }, { status: 404 });
  }

  return NextResponse.json(event);
}

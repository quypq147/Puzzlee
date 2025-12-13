import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { z } from "zod";

export const revalidate = 0;

// Schema update: Cho phép event_id là string bất kỳ (Code hoặc UUID)
const questionSchema = z.object({
  event_id: z.string().min(1),
  content: z.string().min(1),
  is_anonymous: z.boolean().optional(),
});

// Hàm Helper: Tìm UUID từ Code (W5AHWE -> UUID)
async function resolveEventId(supabase: any, idOrCode: string) {
  // Regex kiểm tra UUID
  const isUUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(idOrCode);
  
  if (isUUID) return idOrCode;

  // Nếu không phải UUID (tức là Code), tìm trong bảng events
  const { data } = await supabase
    .from("events")
    .select("id")
    .eq("code", idOrCode.toUpperCase()) // Code thường viết hoa
    .single();

  return data?.id || null;
}

export async function GET(req: NextRequest) {
  const supabase = await createClient(); // FIX: Await client
  const { searchParams } = new URL(req.url);
  const eventIdParam = searchParams.get("event_id");

  if (!eventIdParam) {
    return NextResponse.json({ error: "Missing event_id" }, { status: 400 });
  }

  // 1. Phân giải: Code -> UUID
  const finalEventId = await resolveEventId(supabase, eventIdParam);

  if (!finalEventId) {
    return NextResponse.json({ error: "Event not found" }, { status: 404 });
  }

  // 2. Query bằng UUID chuẩn
  const { data, error } = await supabase
    .from("questions")
    .select("*, profiles:user_id(full_name, avatar_url)")
    .eq("event_id", finalEventId)
    .order("created_at", { ascending: false });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  return NextResponse.json(data ?? []);
}

export async function POST(req: NextRequest) {
  const supabase = await createClient(); // FIX: Await client
  
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  let body;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const parsed = questionSchema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });

  // 1. Phân giải: Code -> UUID trước khi insert
  const finalEventId = await resolveEventId(supabase, parsed.data.event_id);
  
  if (!finalEventId) {
    return NextResponse.json({ error: "Invalid Event ID or Code" }, { status: 404 });
  }

  // 2. Insert với UUID chuẩn
  const { data, error } = await supabase
    .from("questions")
    .insert({ 
      content: parsed.data.content,
      event_id: finalEventId, 
      user_id: user.id,
      is_anonymous: parsed.data.is_anonymous || false
    })
    .select("*, profiles:user_id(full_name, avatar_url)")
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data, { status: 201 });
}
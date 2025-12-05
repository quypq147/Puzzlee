// app/api/events/route.ts
import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

function generateCode() {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let code = "";
  for (let i = 0; i < 6; i++) {
    code += chars[Math.floor(Math.random() * chars.length)];
  }
  return code;
}

export async function POST(req: Request) {
  const supabase = createClient();

  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();
  const { title, description } = body;

  const code = generateCode();

  const { data, error } = await supabase
    .from("events")
    .insert({
      title,
      description,
      code,
      created_by: user.id,
    })
    .select("id, code, title")
    .single();

  if (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Không thể tạo sự kiện" },
      { status: 500 }
    );
  }

  return NextResponse.json(data);
}


import { NextRequest, NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"
import { z } from "zod"

export const revalidate = 0

const eventSchema = z.object({
  title: z.string().min(1),
  description: z.string().optional(),
})

// GET /api/events → list events for current user
export async function GET() {
  const supabase = createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  // Fetch events created by current user. If you need membership-based events,
  // consider querying `event_members` to join user events.
  const { data, error } = await supabase
    .from("events")
    .select("*")
    .eq("created_by", user.id)

  if (error) {
    console.error("/api/events GET error:", error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
  return NextResponse.json(data ?? [])
}

// POST /api/events → create event
export async function POST(req: NextRequest) {
  const supabase = createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: "Không được phép" }, { status: 401 })

  let body
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: "Dữ liệu JSON không hợp lệ" }, { status: 400 })
  }

  const parsed = eventSchema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 })
  }

  // generate a unique code (retry up to 5 times)
  let code: string | null = null
  for (let i = 0; i < 5; i++) {
    const candidate = Math.random().toString(36).slice(2, 8).toUpperCase()
    const { data: exists } = await supabase
      .from("events")
      .select("id")
      .eq("code", candidate)
      .maybeSingle()
    if (!exists) {
      code = candidate
      break
    }
  }
  if (!code) {
    return NextResponse.json({ error: "Thất bại khi tạo mã sự kiện duy nhất" }, { status: 500 })
  }

  const { data, error } = await supabase
    .from("events")
    .insert({ ...parsed.data, created_by: user.id, code })
    .select("*")
    .single()

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
  return NextResponse.json(data, { status: 201 })
}




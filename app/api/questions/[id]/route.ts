import { NextRequest, NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"

export async function POST(req: NextRequest) {
  const supabase = createClient()

  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser()

  if (authError || !user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const { event_id, title, content } = await req.json()

  if (!event_id || !title) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
  }

  const { data, error } = await supabase
    .from("questions")
    .insert({
      event_id,
      user_id: user.id,
      title,
      content,
    })
    .select("*")
    .single()

  if (error) {
    console.error(error)
    return NextResponse.json({ error: "Failed to create question" }, { status: 500 })
  }

  return NextResponse.json(data)
}

export async function GET(req: NextRequest) {
  const supabase = createClient()
  const { searchParams } = new URL(req.url)
  const event_id = searchParams.get("event_id")

  if (!event_id) {
    return NextResponse.json({ error: "Missing event_id" }, { status: 400 })
  }

  const { data, error } = await supabase
    .from("questions")
    .select(`
      *,
      user:profiles(id, display_name, avatar_url),
      answers(count)
    `)
    .eq("event_id", event_id)
    .order("created_at", { ascending: false })

  if (error) {
    console.error(error)
    return NextResponse.json({ error: "Failed to fetch questions" }, { status: 500 })
  }

  return NextResponse.json(data)
}


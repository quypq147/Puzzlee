import { NextRequest, NextResponse } from "next/server"
import { createClient} from "@/lib/supabase/server"

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const supabase = createClient()
  const { id } = await params

  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser()

  if (authError || !user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const { action } = await req.json()

  // Check if user is organizer/admin
  const { data: question } = await supabase.from("questions").select("event_id").eq("id", id).single()

  if (!question) {
    return NextResponse.json({ error: "Question not found" }, { status: 404 })
  }

  const { data: event } = await supabase.from("events").select("organizer_id").eq("id", question.event_id).single()

  if (event?.organizer_id !== user.id) {
    return NextResponse.json({ error: "You can only moderate questions in your events" }, { status: 403 })
  }

  const updateData: any = {}

  switch (action) {
    case "pin":
      updateData.is_pinned = true
      break
    case "unpin":
      updateData.is_pinned = false
      break
    case "close":
      updateData.status = "closed"
      break
    case "mark_answered":
      updateData.status = "answered"
      break
    case "delete":
      const { error: deleteError } = await supabase.from("questions").delete().eq("id", id)
      if (deleteError) {
        return NextResponse.json({ error: "Failed to delete question" }, { status: 500 })
      }
      return NextResponse.json({ success: true })
    default:
      return NextResponse.json({ error: "Invalid action" }, { status: 400 })
  }

  const { data, error } = await supabase.from("questions").update(updateData).eq("id", id).select().single()

  if (error) {
    return NextResponse.json({ error: "Failed to update question" }, { status: 500 })
  }

  return NextResponse.json(data)
}

import { NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"

export async function POST(req: Request) {
  const supabase = await createClient()

  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser()

  if (authError || !user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const { question_id, answer_id, vote_type } = await req.json()

  if (!vote_type || (vote_type !== 1 && vote_type !== -1)) {
    return NextResponse.json({ error: "Invalid vote_type" }, { status: 400 })
  }

  // Check if vote exists
  const query = question_id
    ? supabase.from("votes").select().eq("user_id", user.id).eq("question_id", question_id)
    : supabase.from("votes").select().eq("user_id", user.id).eq("answer_id", answer_id)

  const { data: existingVote } = await query

  if (existingVote && existingVote.length > 0) {
    // Update existing vote
    const { data, error } = await supabase
      .from("votes")
      .update({ vote_type })
      .eq("id", existingVote[0].id)
      .select()
      .single()

    if (error) {
      return NextResponse.json({ error: "Failed to update vote" }, { status: 500 })
    }

    return NextResponse.json(data)
  } else {
    // Create new vote
    const { data, error } = await supabase
      .from("votes")
      .insert({
        user_id: user.id,
        question_id,
        answer_id,
        vote_type,
      })
      .select()
      .single()

    if (error) {
      console.error(error)
      return NextResponse.json({ error: "Failed to create vote" }, { status: 500 })
    }

    return NextResponse.json(data)
  }
}

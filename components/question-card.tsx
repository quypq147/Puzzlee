"use client"

import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { VoteButton } from "./vote-button"
import { MessageSquare, Pin } from "lucide-react"
import Link from "next/link"

interface QuestionCardProps {
  question: {
    id: string
    title: string
    content?: string
    status: string
    vote_count: number
    answer_count: number
    is_pinned: boolean
    created_at: string
    user: {
      display_name: string
      avatar_url?: string
    }
  }
  eventId: string
  onVoteChange: (questionId: string, newVotes: number) => void
}

export function QuestionCard({ question, eventId, onVoteChange }: QuestionCardProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString("vi-VN")
  }

  return (
    <Link href={`/dashboard/events/${eventId}/questions/${question.id}`}>
      <Card className="hover:shadow-md transition-shadow cursor-pointer">
        <CardHeader>
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1 min-w-0">
              {question.is_pinned && (
                <div className="flex items-center gap-1 text-primary text-sm mb-2">
                  <Pin className="h-3 w-3" />
                  <span>Ghim</span>
                </div>
              )}
              <h3 className="font-semibold text-lg line-clamp-2">{question.title}</h3>
              {question.content && (
                <p className="text-sm text-muted-foreground mt-2 line-clamp-2">{question.content}</p>
              )}
            </div>
            <div className="flex gap-2">
              <Badge
                variant={
                  question.status === "answered" ? "default" : question.status === "open" ? "secondary" : "outline"
                }
              >
                {question.status === "answered" ? "Đã trả lời" : question.status === "open" ? "Mở" : "Đóng"}
              </Badge>
            </div>
          </div>
        </CardHeader>

        <CardContent>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4 text-xs text-muted-foreground">
              <span>{question.user.display_name}</span>
              <span>{formatDate(question.created_at)}</span>
              <div className="flex items-center gap-1">
                <MessageSquare className="h-3 w-3" />
                {question.answer_count} câu trả lời
              </div>
            </div>

            <div onClick={(e) => e.preventDefault()}>
              <VoteButton
                questionId={question.id}
                initialVotes={question.vote_count}
                onVoteChange={(votes) => onVoteChange(question.id, votes)}
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}

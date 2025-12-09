"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { VoteButton } from "@/components/vote-button"
import { Loader2, ArrowLeft } from "lucide-react"
import Link from "next/link"
import { AnswerCard } from "@/components/answer-card"

export default function QuestionDetailPage() {
  const params = useParams()
  const questionId = params.questionId as string
  const eventId = params.eventId as string

  const [question, setQuestion] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [answerContent, setAnswerContent] = useState("")
  const [submittingAnswer, setSubmittingAnswer] = useState(false)

  useEffect(() => {
    loadQuestion()
  }, [questionId])

  const loadQuestion = async () => {
    try {
      const res = await fetch(`/api/questions/${questionId}`)
      if (res.ok) {
        const data = await res.json()
        setQuestion(data)
      }
    } catch (error) {
      console.error("Failed to load question:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleSubmitAnswer = async () => {
    if (!answerContent.trim()) return

    setSubmittingAnswer(true)
    try {
      const res = await fetch("/api/answers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          question_id: questionId,
          content: answerContent,
        }),
      })

      if (res.ok) {
        const newAnswer = await res.json()
        setQuestion({
          ...question,
          answers: [...(question.answers || []), newAnswer],
          answer_count: (question.answer_count || 0) + 1,
        })
        setAnswerContent("")
      }
    } catch (error) {
      console.error("Failed to submit answer:", error)
    } finally {
      setSubmittingAnswer(false)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    )
  }

  if (!question) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">Không tìm thấy câu hỏi</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <Link href={`/dashboard/events/${eventId}`} className="inline-block">
        <Button variant="ghost" size="sm" className="gap-2">
          <ArrowLeft className="h-4 w-4" />
          Quay lại
        </Button>
      </Link>

      <Card>
        <CardHeader>
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1">
              <h1 className="text-2xl font-bold">{question.title}</h1>
              {question.content && <p className="text-muted-foreground mt-2">{question.content}</p>}
            </div>
            <Badge variant={question.status === "answered" ? "default" : "secondary"}>
              {question.status === "answered" ? "Đã trả lời" : "Mở"}
            </Badge>
          </div>
        </CardHeader>

        <CardContent className="space-y-4">
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <span>{question.user?.display_name}</span>
            <span>{new Date(question.created_at).toLocaleString("vi-VN")}</span>
          </div>

          <div className="flex justify-end">
            <VoteButton
              questionId={question.id}
              initialVotes={question.vote_count}
              onVoteChange={(votes) => setQuestion({ ...question, vote_count: votes })}
            />
          </div>
        </CardContent>
      </Card>

      {/* Answers Section */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Câu trả lời ({question.answers?.length || 0})</h2>

        {/* Answer Form */}
        <Card className="border-primary/20 bg-primary/5">
          <CardHeader>
            <CardTitle className="text-base">Viết câu trả lời</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Textarea
              placeholder="Nhập câu trả lời của bạn..."
              value={answerContent}
              onChange={(e) => setAnswerContent(e.target.value)}
              disabled={submittingAnswer}
              rows={4}
            />
            <Button
              onClick={handleSubmitAnswer}
              disabled={submittingAnswer || !answerContent.trim()}
              className="w-full"
            >
              {submittingAnswer ? "Đang gửi..." : "Gửi câu trả lời"}
            </Button>
          </CardContent>
        </Card>

        {/* Answers List */}
        {question.answers && question.answers.length > 0 ? (
          <div className="space-y-3">
            {question.answers.map((answer: any) => (
              <AnswerCard
                key={answer.id}
                answer={answer}
                onVoteChange={(answerId, votes) => {
                  setQuestion({
                    ...question,
                    answers: question.answers.map((a: any) => (a.id === answerId ? { ...a, vote_count: votes } : a)),
                  })
                }}
              />
            ))}
          </div>
        ) : (
          <div className="rounded-lg border border-dashed py-8 text-center">
            <p className="text-muted-foreground">Chưa có câu trả lời nào. Hãy là người đầu tiên trả lời!</p>
          </div>
        )}
      </div>
    </div>
  )
}

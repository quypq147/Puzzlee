"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Loader2, Copy, Settings } from "lucide-react"
import Link from "next/link"
import { QuestionForm } from "@/components/question-form"
import { RealtimeQuestionsList } from "@/components/realtime-questions-list"

export default function EventDetailPage() {
  const params = useParams()
  const eventId = params.eventId as string
  const [event, setEvent] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [refreshTrigger, setRefreshTrigger] = useState(0)

  useEffect(() => {
    loadEvent()
  }, [eventId])

  const loadEvent = async () => {
    try {
      const res = await fetch(`/api/events/by-code/${eventId}`)
      if (res.ok) {
        const data = await res.json()
        setEvent(data)
      }
    } catch (error) {
      console.error("Không thể tải sự kiện:", error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    )
  }

  if (!event) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">Không tìm thấy sự kiện</p>
      </div>
    )
  }

  const handleCopyCode = () => {
    navigator.clipboard.writeText(event.event_code)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">{event.title}</h1>
          <p className="text-muted-foreground mt-2">{event.description}</p>
        </div>
        <Link href={`/dashboard/events/${eventId}/setting`}>
          <Button variant="outline" size="sm" className="gap-2 bg-transparent">
            <Settings className="h-4 w-4" />
            Cài đặt
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">Mã sự kiện</p>
              <div className="flex items-center gap-2">
                <code className="font-mono font-bold text-lg bg-muted px-3 py-1 rounded">{event.event_code}</code>
                <Button size="sm" variant="ghost" onClick={handleCopyCode} className="h-8 w-8 p-0">
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">Trạng thái</p>
              <Badge variant={event.status === "active" ? "default" : "secondary"}>
                {event.status === "active" ? "Đang hoạt động" : "Đã kết thúc"}
              </Badge>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">Tạo lúc</p>
              <p className="font-medium">{new Date(event.created_at).toLocaleString("vi-VN")}</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          <QuestionForm eventId={eventId} onQuestionCreated={() => setRefreshTrigger((r) => r + 1)} />
          <RealtimeQuestionsList eventId={eventId} />
        </div>

        <aside className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Hướng dẫn chia sẻ</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              <p className="text-muted-foreground">Chia sẻ mã sự kiện với người tham gia để họ có thể tham gia:</p>
              <div className="bg-muted p-3 rounded font-mono text-center font-bold text-lg">{event.event_code}</div>
              <Button onClick={handleCopyCode} className="w-full">
                Sao chép mã
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">Thông tin sự kiện</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Câu hỏi:</span>
                <span className="font-medium">-</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Câu trả lời:</span>
                <span className="font-medium">-</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Người tham gia:</span>
                <span className="font-medium">-</span>
              </div>
            </CardContent>
          </Card>
        </aside>
      </div>
    </div>
  )
}

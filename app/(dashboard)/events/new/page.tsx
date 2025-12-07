"use client"

import { useState, type FormEvent } from "react"
import { useRouter } from "next/navigation"
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Loader2 } from "lucide-react"
import Link from "next/link"

export default function NewEventPage() {
  const router = useRouter()
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()

    if (!title.trim()) {
      setError("Vui lòng nhập tên sự kiện")
      return
    }

    setLoading(true)
    setError(null)

    try {
      const res = await fetch("/api/events", {
        method: "POST",
        body: JSON.stringify({ title, description }),
        headers: { "Content-Type": "application/json" },
      })

      if (!res.ok) {
        setError("Không thể tạo sự kiện. Vui lòng thử lại.")
        return
      }

      const data = await res.json()
      router.push(`/dashboard/events/${data.id}`)
    } catch (error) {
      setError("Có lỗi xảy ra. Vui lòng thử lại.")
      console.error("Có lỗi xảy ra:", error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      <Link href="/dashboard">
        <Button variant="ghost" size="sm" className="gap-2">
          <ArrowLeft className="h-4 w-4" />
          Quay lại
        </Button>
      </Link>

      <div>
        <h1 className="text-3xl font-bold tracking-tight">Tạo sự kiện mới</h1>
        <p className="text-muted-foreground mt-2">
          Thiết lập một sự kiện Q&A để bắt đầu nhận câu hỏi từ người tham gia
        </p>
      </div>

      <div className="max-w-2xl">
        <Card>
          <CardHeader>
            <CardTitle>Thông tin sự kiện</CardTitle>
            <CardDescription>Điền các thông tin cơ bản về sự kiện của bạn</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="text-sm font-medium">Tên sự kiện *</label>
                <Input
                  placeholder="vd: Hội thảo về AI - Tháng 12/2025"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  disabled={loading}
                  className="mt-2"
                />
              </div>

              <div>
                <label className="text-sm font-medium">Mô tả (tùy chọn)</label>
                <Textarea
                  placeholder="Mô tả chi tiết về sự kiện, chủ đề thảo luận, v.v..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  disabled={loading}
                  rows={5}
                  className="mt-2 resize-none"
                />
              </div>

              {error && <div className="rounded-lg bg-destructive/10 p-3 text-sm text-destructive">{error}</div>}

              <div className="flex gap-3 justify-end">
                <Link href="/dashboard">
                  <Button type="button" variant="outline" disabled={loading}>
                    Huỷ
                  </Button>
                </Link>
                <Button type="submit" disabled={loading || !title.trim()} className="gap-2">
                  {loading && <Loader2 className="h-4 w-4 animate-spin" />}
                  {loading ? "Đang tạo..." : "Tạo sự kiện"}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}


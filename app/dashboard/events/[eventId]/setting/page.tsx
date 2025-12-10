"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Loader2, ArrowLeft, Copy, Trash2 } from "lucide-react"
import Link from "next/link"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function EventSettingsPage() {
  const params = useParams()
  const eventId = params.eventId as string

  const [event, setEvent] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    status: "active",
  })

  useEffect(() => {
    loadEvent()
  }, [eventId])

  const loadEvent = async () => {
    try {
      const res = await fetch(`/api/events/by-code/${eventId}`)
      if (res.ok) {
        const data = await res.json()
        setEvent(data)
        setFormData({
          title: data.title,
          description: data.description,
          status: data.status,
        })
      }
    } catch (error) {
      console.error("Không thể tải sự kiện:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleSave = async () => {
    setSaving(true)
    try {
      const res = await fetch(`/api/events/${event.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })

      if (res.ok) {
        const updated = await res.json()
        setEvent(updated)
      }
    } catch (error) {
      console.error("Failed to save event:", error)
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = async () => {
    if (!confirm("Bạn có chắc chắn muốn xoá sự kiện này? Hành động này không thể hoàn tác.")) {
      return
    }

    try {
      const res = await fetch(`/api/events?id=${event.id}`, { method: "DELETE" })

      if (res.ok) {
        window.location.href = "/dashboard"
      }
    } catch (error) {
      console.error("Failed to delete event:", error)
    }
  }

  const handleCopyCode = () => {
    if (event?.event_code) {
      navigator.clipboard.writeText(event.event_code)
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

  return (
    <div className="space-y-6">
      <Link href={`/dashboard/events/${eventId}`} className="inline-block">
        <Button variant="ghost" size="sm" className="gap-2">
          <ArrowLeft className="h-4 w-4" />
          Quay lại
        </Button>
      </Link>

      <div>
        <h1 className="text-3xl font-bold tracking-tight">Cài đặt sự kiện</h1>
        <p className="text-muted-foreground mt-2">Quản lý thông tin và cài đặt sự kiện của bạn</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Thông tin cơ bản</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium">Tên sự kiện</label>
                <Input
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="mt-1"
                />
              </div>

              <div>
                <label className="text-sm font-medium">Mô tả</label>
                <Textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows={4}
                  className="mt-1 resize-none"
                />
              </div>

              <div>
                <label className="text-sm font-medium">Trạng thái</label>
                <Select value={formData.status} onValueChange={(value: any) => setFormData({ ...formData, status: value })}>
                  <SelectTrigger className="mt-1">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="active">Đang hoạt động</SelectItem>
                    <SelectItem value="draft">Bản nháp</SelectItem>
                    <SelectItem value="closed">Đã kết thúc</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex gap-2 justify-end">
                <Button variant="outline" onClick={loadEvent} disabled={saving}>
                  Huỷ
                </Button>
                <Button onClick={handleSave} disabled={saving}>
                  {saving ? "Đang lưu..." : "Lưu thay đổi"}
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Nguy hiểm</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="text-sm text-muted-foreground mb-4">
                  Xoá sự kiện sẽ xoá tất cả câu hỏi, câu trả lời và dữ liệu liên quan. Hành động này không thể hoàn tác.
                </p>
                <Button variant="destructive" onClick={handleDelete} className="gap-2">
                  <Trash2 className="h-4 w-4" />
                  Xoá sự kiện
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        <aside className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Mã sự kiện</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="bg-muted p-3 rounded font-mono text-center font-bold text-lg">{event.event_code}</div>
              <Button onClick={handleCopyCode} variant="outline" className="w-full bg-transparent">
                <Copy className="h-4 w-4 mr-2" />
                Sao chép
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">Thông tin</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Tạo lúc:</span>
                <span>{new Date(event.created_at).toLocaleString("vi-VN")}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Cập nhật:</span>
                <span>{new Date(event.updated_at).toLocaleString("vi-VN")}</span>
              </div>
              <Separator className="my-2" />
              <div className="flex justify-between">
                <span className="text-muted-foreground">Trạng thái:</span>
                <Badge variant={formData.status === "active" ? "default" : "secondary"}>
                  {formData.status === "active" ? "Đang hoạt động" : "Đã kết thúc"}
                </Badge>
              </div>
            </CardContent>
          </Card>
        </aside>
      </div>
    </div>
  )
}

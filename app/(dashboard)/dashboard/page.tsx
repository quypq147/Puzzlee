"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Loader2 } from "lucide-react"
import { EventCard } from "@/components/event-card"
import { CreateEventDialog } from "@/components/create-event-dialog"
import { LogoutButton } from "@/components/logout-button"

function Stat({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="flex flex-col">
      <span className="text-sm text-muted-foreground">{label}</span>
      <span className="text-xl font-semibold">{value}</span>
    </div>
  )
}

function DashboardPage() {
  const [events, setEvents] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState<any>(null)

  useEffect(() => {
    loadEvents()
    loadUser()
  }, [])

  const loadEvents = async () => {
    try {
      const res = await fetch("/api/events")
      if (res.ok) {
        const data = await res.json()
        setEvents(data)
      }
    } catch (error) {
      console.error("Không thể tải các sự kiện:", error)
    } finally {
      setLoading(false)
    }
  }

  const loadUser = async () => {
    try {
      const res = await fetch("/api/auth/user")
      if (res.ok) {
        const data = await res.json()
        setUser(data)
      }
    } catch (error) {
      console.error("Không thể tải người dùng:", error)
    }
  }

  return (
    <div className="px-6 py-6 space-y-6">
      <header className="flex items-center">
        <h1 className="text-2xl font-bold">Bảng điều khiển Puzzlee</h1>
        <nav className="ml-auto flex items-center gap-2">
          <Link href="/" className="text-sm text-muted-foreground hover:underline">
            Trang chủ
          </Link>
          <Separator orientation="vertical" className="h-4" />
          <Link href="/events/new" className="text-sm text-muted-foreground hover:underline">
            Tạo sự kiện
          </Link>
          <Separator orientation="vertical" className="h-4" />
          <LogoutButton />
        </nav>
      </header>

      <main className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold">{events.filter((e) => e.status === "active").length}</div>
            <p className="text-sm text-muted-foreground">Sự kiện đang hoạt động</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold">{events.length}</div>
            <p className="text-sm text-muted-foreground">Tổng sự kiện</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold">{events.reduce((sum, e) => sum + (e.answer_count || 0), 0)}</div>
            <p className="text-sm text-muted-foreground">Câu hỏi được trả lời</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold">{events.reduce((sum, e) => sum + (e.participant_count || 0), 0)}</div>
            <p className="text-sm text-muted-foreground">Người tham gia</p>
          </CardContent>
        </Card>

        <div className="lg:col-span-3 space-y-6">
          <Card className="p-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold">Sự kiện của bạn</h2>
              <CreateEventDialog
                onEventCreated={(event) => {
                  setEvents([event, ...events])
                }}
              />
            </div>
            <Separator className="my-4" />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {loading ? (
                <div className="flex items-center justify-center py-8">
                  <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
                </div>
              ) : events.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-muted-foreground mb-4">Chưa có sự kiện nào</p>
                  <CreateEventDialog
                    onEventCreated={(event) => {
                      setEvents([event, ...events])
                    }}
                  />
                </div>
              ) : (
                events.map((event) => <EventCard key={event.id} event={event} />)
              )}
            </div>
          </Card>

          <Card className="p-4">
            <h2 className="text-lg font-semibold">Hoạt động gần đây</h2>
            <Separator className="my-4" />
            <div className="space-y-3">
              <p className="text-sm text-muted-foreground">Chức năng này sẽ sớm ra mắt!</p>
            </div>
          </Card>
        </div>

        <aside className="space-y-6">
          <Card className="p-4 space-y-4">
            <h2 className="text-lg font-semibold">Tài khoản</h2>
            <div className="space-y-2 text-sm">
              {user ? (
                <>
                  <div className="font-medium">{user.name}</div>
                  <div className="text-muted-foreground">{user.email}</div>
                </>
              ) : (
                <div className="text-center py-8">
                  <p className="text-muted-foreground mb-4">Chưa đăng nhập</p>
                </div>
              )}
            </div>
            <div className="flex gap-2">
              <Link href="/events/new" className="w-full">
                <Button variant="outline" className="w-full bg-transparent">
                  Tạo nhanh
                </Button>
              </Link>
              <LogoutButton />
            </div>
          </Card>

          <Card className="p-4 space-y-3">
            <h2 className="text-lg font-semibold">Lối tắt</h2>
            <div className="flex flex-col gap-2">
              <Link href="/events/new">
                <Button variant="ghost" className="justify-start w-full">
                  Tạo sự kiện
                </Button>
              </Link>
              <Link href="/dashboard">
                <Button variant="ghost" className="justify-start w-full">
                  Bảng điều khiển
                </Button>
              </Link>
              <Link href="/">
                <Button variant="ghost" className="justify-start w-full">
                  Trang giới thiệu
                </Button>
              </Link>
            </div>
          </Card>
        </aside>
      </main>

      <footer className="text-xs text-muted-foreground">
        <Separator className="my-6" />
        <div className="flex items-center justify-between">
          <span>© {new Date().getFullYear()} Puzzlee</span>
          <span>Xây dựng trải nghiệm sự kiện của bạn</span>
        </div>
      </footer>
    </div>
  )
}

export default DashboardPage


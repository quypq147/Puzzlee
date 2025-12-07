import type React from "react"
import { LogoutButton } from "@/components/logout-button"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border sticky top-0 bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
        <div className="container flex items-center justify-between h-16">
          <div className="flex items-center gap-6">
            <Link href="/" className="flex items-center gap-2">
              <span className="font-bold text-xl">Puzzlee</span>
            </Link>
            <nav className="hidden md:flex items-center gap-4 text-sm">
              <Link href="/dashboard" className="text-muted-foreground hover:text-foreground">
                Tổng quan
              </Link>
              <Link href="/events" className="text-muted-foreground hover:text-foreground">
                Sự kiện
              </Link>
              <Link href="/dashboard/profile" className="text-muted-foreground hover:text-foreground">
                Hồ sơ
              </Link>
            </nav>
          </div>
          <div className="flex items-center gap-2">
            <Link href="/events/new">
              <Button size="sm">Tạo sự kiện</Button>
            </Link>
            <LogoutButton />
          </div>
        </div>
      </header>
      <main className="container py-6">{children}</main>
    </div>
  )
}

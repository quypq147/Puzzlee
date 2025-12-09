import type React from "react"
import Link from "next/link"
import { SlidoSidebar } from "@/components/slido-sidebar"
import { ProfileDropdown } from "@/components/profile-dropdown"
import { Button } from "@/components/ui/button"
import { Menu } from "lucide-react"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border sticky top-0 z-30 bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
        <div className="flex items-center justify-between h-16 px-4 md:px-6">
          <div className="flex items-center gap-4">
            <button className="md:hidden">
              <Menu className="h-5 w-5" />
            </button>
            <Link href="/dashboard" className="flex items-center gap-2 shrink-0">
              <span className="font-bold text-lg text-primary">slido</span>
            </Link>
            <div className="hidden md:flex items-center gap-2 text-sm text-foreground/60">
              <span>669 - Phan Ngoc's organization</span>
              <span className="text-xs bg-background px-2 py-1 rounded">Owner</span>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <button className="text-sm text-foreground/60 hover:text-foreground">
              What's new
            </button>
            <ProfileDropdown />
          </div>
        </div>
      </header>
      <div className="flex">
        <SlidoSidebar />
        <main className="flex-1 md:ml-56 py-6 px-4 md:px-8 max-w-7xl mx-auto w-full">{children}</main>
      </div>
    </div>
  )
}

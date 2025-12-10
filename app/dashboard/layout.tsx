"use client";

import * as React from "react";
import ".././globals.css";
import Link from "next/link";
import { LayoutDashboard, Users, BarChart3, Settings, Menu, HelpCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { UserNav } from "@/components/layout/user-nav";
import {
  Drawer,
  DrawerTrigger,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerClose,
} from "@/components/ui/drawer";

type DashboardLayoutProps = { children: React.ReactNode };

const navItems = [
  { href: "/dashboard/events", label: "Sự kiện của tôi", icon: LayoutDashboard },
  { href: "/dashboard/team", label: "Team", icon: Users },
  { href: "/dashboard/analytics", label: "Thống kê", icon: BarChart3 },
  { href: "/dashboard/settings", label: "Cài đặt", icon: Settings },
];

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <div className="min-h-screen w-full bg-slate-50 text-slate-900" suppressHydrationWarning>
      {/* Mobile Top Bar */}
      <div className="flex md:hidden items-center justify-between px-4 py-3 border-b bg-white">
        <div className="font-semibold">Puzzlee</div>
        <MobileNav />
      </div>

      <div className="flex">
        {/* Sidebar - hidden on mobile */}
        <aside className="hidden md:flex md:fixed md:inset-y-0 md:left-0 md:w-64 flex-col text-green-400  border-r border-slate-800">
          <div className="h-14 flex items-center px-4">
            <Link href="/dashboard" className="font-semibold tracking-tight">Puzzlee</Link>
          </div>
          <nav className="flex-1 p-2 space-y-1 overflow-y-auto">
            {navItems.map((item) => (
              <Link key={item.href} href={item.href} className="block">
                <Button variant="ghost" className="w-full justify-start text-black hover:text-green-400">
                  <item.icon className="mr-2 h-4 w-4" />
                  {item.label}
                </Button>
              </Link>
            ))}
          </nav>
          <div className="p-4 border-t ">
            <Button variant="ghost" className="w-full justify-start text-black hover:text-green-400">
              <HelpCircle className="mr-2 h-4 w-4" />
              Trợ giúp
            </Button>
          </div>
        </aside>

        {/* Main content */}
        <main className="flex-1 md:ml-64 min-h-screen overflow-y-auto">
          {/* Top header inside main */}
          <header className="sticky top-0 z-30 h-16 flex items-center px-4 md:px-6">
            <h1 className="text-lg font-semibold">Tổng quan</h1>
            <div className="ml-auto">
              <UserNav />
            </div>
          </header>
          <div className="p-4 md:p-6 bg-muted/20">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}

function MobileNav() {
  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button variant="ghost" size="icon" aria-label="Open menu">
          <Menu className="h-5 w-5" />
        </Button>
      </DrawerTrigger>
      <DrawerContent className="bg-slate-900 text-slate-100">
        <DrawerHeader>
          <DrawerTitle>Tổ chức của tôi</DrawerTitle>
        </DrawerHeader>
        <div className="p-2">
          <nav className="space-y-1">
            {navItems.map((item) => (
              <DrawerClose asChild key={item.href}>
                <Link href={item.href} className="block">
                  <Button variant="ghost" className="w-full justify-start text-slate-100 hover:text-white hover:bg-slate-800">
                    <item.icon className="mr-2 h-4 w-4" />
                    {item.label}
                  </Button>
                </Link>
              </DrawerClose>
            ))}
          </nav>
          <div className="mt-4 border-t border-slate-800 pt-4">
            <Button variant="ghost" className="w-full justify-start text-slate-100 hover:text-white hover:bg-slate-800">
              <HelpCircle className="mr-2 h-4 w-4" />
              Trợ Giúp
            </Button>
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
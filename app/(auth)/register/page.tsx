"use client"

import Link from "next/link"
import { UserPlus } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { SignUpForm } from "@/components/sign-up-form"

export default function RegisterPage() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-slate-950 px-4">
      <Card className="w-full max-w-md border-slate-800 bg-slate-900/90">
        <CardHeader className="space-y-2">
          <div className="flex items-center gap-2">
            <div className="h-9 w-9 rounded-xl bg-emerald-500/10 flex items-center justify-center">
              <UserPlus className="w-4 h-4 text-emerald-400" />
            </div>
            <div>
              <CardTitle className="text-lg">Tạo tài khoản</CardTitle>
              <CardDescription className="text-xs">
                Đăng ký để tạo phòng Q&A cho lớp học, seminar và sự kiện trực tuyến.
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <SignUpForm />

          <div className="flex items-center justify-end text-xs text-slate-400">
            <span>Đã có tài khoản?</span>
            <Button asChild variant="link" size="sm" className="h-auto px-1 text-xs">
              <Link href="/(auth)/login">Đăng nhập</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </main>
  )
}

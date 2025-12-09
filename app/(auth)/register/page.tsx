"use client";

import Link from "next/link";
import { UserPlus } from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { SignUpForm } from "@/components/sign-up-form";

export default function RegisterPage() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-slate-950 px-4">
      <Card className="w-full max-w-md border-slate-800 bg-slate-900/90">
        <CardHeader className="">
          <Link href="/">Quay lại trang chủ</Link>
        </CardHeader>
        <CardContent className="space-y-4">
          <SignUpForm />
        </CardContent>
      </Card>
    </main>
  );
}

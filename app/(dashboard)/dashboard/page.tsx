"use client";

import React from "react";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { LogoutButton } from "@/components/logout-button";

function Stat({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="flex flex-col">
      <span className="text-sm text-muted-foreground">{label}</span>
      <span className="text-xl font-semibold">{value}</span>
    </div>
  );
}

function Dashboardpage() {
  return (
    <div className="px-6 py-6 space-y-6">
      <header className="flex items-center">
        <h1 className="text-2xl font-bold">Bảng điều khiển Puzzlee</h1>
        <nav className="ml-auto flex items-center gap-2">
          <Link
            href="/"
            className="text-sm text-muted-foreground hover:underline"
          >
            Trang chủ
          </Link>
          <Separator orientation="vertical" className="h-4" />
          <Link
            href="/(dashboard)/events/new"
            className="text-sm text-muted-foreground hover:underline"
          >
            Tạo sự kiện
          </Link>
          <Separator orientation="vertical" className="h-4" />
          <LogoutButton />
        </nav>
      </header>

      <main className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <section className="lg:col-span-2 space-y-6">
          <Card className="p-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold">Sự kiện của bạn</h2>
              <Link href="/(dashboard)/events/new">
                <Button size="sm">Tạo sự kiện</Button>
              </Link>
            </div>
            <Separator className="my-4" />
            <div className="grid sm:grid-cols-2 gap-4">
              {/* Mục tạm thời; sẽ thay bằng dữ liệu thật */}
              <Link href="/(dashboard)/events/new">
                <div className="rounded-md border p-4 hover:bg-muted/50 transition">
                  <div className="font-medium">Bắt đầu sự kiện mới</div>
                  <div className="text-sm text-muted-foreground">
                    Cấu hình cài đặt và mời người tham gia
                  </div>
                </div>
              </Link>
              <Link href="/(dashboard)/events/123">
                <div className="rounded-md border p-4 hover:bg-muted/50 transition">
                  <div className="font-medium">Sự kiện mẫu</div>
                  <div className="text-sm text-muted-foreground">
                    Bản nháp • Chưa xuất bản
                  </div>
                </div>
              </Link>
            </div>
          </Card>

          <Card className="p-4">
            <h2 className="text-lg font-semibold">Hoạt động gần đây</h2>
            <Separator className="my-4" />
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium">Đã mời 8 người tham gia</div>
                  <div className="text-sm text-muted-foreground">
                    Sự kiện “Sự kiện mẫu”
                  </div>
                </div>
                <span className="text-xs text-muted-foreground">
                  2 giờ trước
                </span>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium">Đã cập nhật cài đặt sự kiện</div>
                  <div className="text-sm text-muted-foreground">
                    Hẹn giờ: 30 phút
                  </div>
                </div>
                <span className="text-xs text-muted-foreground">Hôm qua</span>
              </div>
            </div>
          </Card>
        </section>

        <aside className="space-y-6">
          <Card className="p-4 space-y-4">
            <h2 className="text-lg font-semibold">Tổng quan</h2>
            <div className="grid grid-cols-2 gap-4">
              <Stat label="Sự kiện đang hoạt động" value={2} />
              <Stat label="Người tham gia" value={34} />
              <Stat label="Hoàn thành" value={5} />
              <Stat label="Bản nháp" value={1} />
            </div>
          </Card>

          <Card className="p-4 space-y-4">
            <h2 className="text-lg font-semibold">Tài khoản</h2>
            <div className="space-y-2 text-sm">
              {/* Replace with real user data */}
              <div className="font-medium">Đã đăng nhập</div>
              <div className="text-muted-foreground">user@example.com</div>
            </div>
            <div className="flex gap-2">
              <Link href="/(dashboard)/events/new" className="w-full">
                <Button variant="outline" className="w-full">
                  Tạo nhanh
                </Button>
              </Link>
              <LogoutButton />
            </div>
          </Card>

          <Card className="p-4 space-y-3">
            <h2 className="text-lg font-semibold">Lối tắt</h2>
            <div className="flex flex-col gap-2">
              <Link href="/(dashboard)/events/new">
                <Button variant="ghost" className="justify-start w-full">
                  Tạo sự kiện
                </Button>
              </Link>
              <Link href="/(dashboard)/dashboard">
                <Button variant="ghost" className="justify-start w-full">
                  Bảng điều khiển
                </Button>
              </Link>
              <Link href="/(landing)">
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
  );
}

export default Dashboardpage;

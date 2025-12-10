// app/dashboard/events/page.tsx
"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Plus } from "lucide-react";
import { DialogFooter } from "@/components/ui/dialog";
import { createClient } from "@/lib/supabase/client";
import { useAuth } from "@/hooks/use-auth";
import { CreateEventDialog } from "@/components/dialog/create-event-dialog";
import Link from "next/link";

export default function AdminDialogPage() {
  const [openInfo, setOpenInfo] = React.useState(false);
  const [events, setEvents] = React.useState<
    Array<{
      id: string;
      title: string;
      description: string | null;
      code: string | null;
      created_at: string | null;
    }>
  >([]);
  const { user } = useAuth();

  React.useEffect(() => {
    const supabase = createClient();
    const load = async () => {
      if (!user?.id) return;
      const { data } = await supabase
        .from("events")
        .select("id, title, description, code, created_at")
        .eq("created_by", user.id)
        .order("created_at", { ascending: false });
      setEvents(data ?? []);
    };
    load();
  }, [user?.id]);

  return (
    <div className="min-h-[70vh] px-4 py-10">
      {/* Page header on canvas */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Button variant="outline" onClick={() => setOpenInfo(true)}>
            Về chức năng
          </Button>
        </div>
      </div>

      {/* Grid: 1 create card + 2-column events list */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Column 1: Create Action */}
        <Card className="p-8 border-dashed">
          <div className="flex items-start justify-between">
            <div>
              <h2 className="text-xl font-semibold text-zinc-900">
                Tạo sự kiện mới
              </h2>
              <p className="mt-2 text-sm text-zinc-500">
                Bắt đầu một phiên tương tác mới cho Q&A và khảo sát.
              </p>
            </div>
            <Plus className="h-6 w-6 text-zinc-400" />
          </div>
          <div className="mt-6">
            <CreateEventDialog
              onEventCreated={(ev: any) => {
                setEvents((prev) => [ev, ...prev]);
              }}
            />
          </div>
        </Card>

        {/* Columns 2 & 3: Events List */}
        <Card className="p-8 md:col-span-2">
          <h2 className="text-xl font-semibold text-zinc-900">
            Sự kiện của tôi
          </h2>
          {events.length === 0 ? (
            <>
              <p className="mt-2 text-sm text-zinc-500">
                Bạn chưa tạo cái nào cả.Hãy tạo ngay!
              </p>
            </>
          ) : (
            <ul className="mt-4 space-y-3">
              {events.map((ev) => (
                <li key={ev.id} className="rounded-md border p-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-sm font-semibold text-zinc-900">
                        {ev.title}
                      </p>
                      {ev.code ? (
                        <p className="text-xs text-zinc-500 mt-1">
                          Mã: <code className="font-mono font-medium">{ev.code}</code>
                        </p>
                      ) : null}
                      {ev.description ? (
                        <p className="text-sm text-zinc-500 mt-1">
                          {ev.description}
                        </p>
                      ) : null}
                    </div>
                    {ev.code ? (
                      <Link href={`/dashboard/events/${ev.code}`}>
                        <Button
                          variant="ghost"
                          className="text-primary hover:bg-primary/10"
                        >
                          Open
                        </Button>
                      </Link>
                    ) : null}
                  </div>
                </li>
              ))}
            </ul>
          )}
        </Card>
      </div>

      {/* Info dialog */}
      <Dialog open={openInfo} onOpenChange={setOpenInfo}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Bảng điều khiển quản trị</DialogTitle>
            <DialogDescription>
              Thiết kế dạng hộp thoại để quản lý tổ chức của bạn.
            </DialogDescription>
          </DialogHeader>
          <div className="text-sm text-zinc-600">
            Sử dụng thanh bên để điều hướng các khu vực chính. Trang này hiển
            thị các hành động chính trong một bảng điều khiển ở giữa để truy cập
            nhanh.
          </div>
        </DialogContent>
      </Dialog>

      {/* Create event dialog handled by CreateEventDialog component */}
    </div>
  );
}

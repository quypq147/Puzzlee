// app/dashboard/events/page.tsx
"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Plus } from "lucide-react";
import { DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { createClient } from "@/lib/supabase/client";
import { useAuth } from "@/hooks/use-auth";

export default function AdminDialogPage() {
  const [openInfo, setOpenInfo] = React.useState(false);
  const [openCreate, setOpenCreate] = React.useState(false);
  const [name, setName] = React.useState("");
  const [start, setStart] = React.useState("");
  const [end, setEnd] = React.useState("");
  const [events, setEvents] = React.useState<Array<{ id: string; title: string; description: string | null; created_at: string | null }>>([]);
  const { user } = useAuth();

  React.useEffect(() => {
    const supabase = createClient();
    const load = async () => {
      if (!user?.id) return;
      const { data } = await supabase
        .from("events")
        .select("id, title, description, created_at")
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
        <h1 className="text-2xl font-semibold text-zinc-900">Admin</h1>
        <div className="flex items-center gap-2">
          <Button variant="outline" onClick={() => setOpenInfo(true)}>About</Button>
        </div>
      </div>

      {/* Two big cards grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Card A: Create & Action */}
        <Card className="p-8">
          <div className="flex items-start justify-between">
            <div>
              <h2 className="text-xl font-semibold text-zinc-900">Create New Event</h2>
              <p className="mt-2 text-sm text-zinc-500">Start a new interactive session for Q&A and polls. Share a code or link to let people join instantly.</p>
            </div>
            <Plus className="h-6 w-6 text-zinc-400" />
          </div>
          <div className="mt-6">
            <Button className="bg-primary text-primary-foreground hover:bg-primary/90" onClick={() => setOpenCreate(true)}>
              <Plus className="mr-2 h-4 w-4" /> Create Event
            </Button>
          </div>
        </Card>

        {/* Card B: Event List */}
        <Card className="p-8">
          <h2 className="text-xl font-semibold text-zinc-900">Your Events</h2>
          {events.length === 0 ? (
            <>
              <p className="mt-2 text-sm text-zinc-500">You don’t have any events yet. Create one to get started.</p>
              <div className="mt-6">
                <Button variant="outline" onClick={() => setOpenCreate(true)}>
                  <Plus className="mr-2 h-4 w-4" /> Create your first event
                </Button>
              </div>
            </>
          ) : (
            <ul className="mt-4 space-y-3">
              {events.map((ev) => (
                <li key={ev.id} className="rounded-md border p-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-sm font-semibold text-zinc-900">{ev.title}</p>
                      {ev.description ? (
                        <p className="text-sm text-zinc-500 mt-1">{ev.description}</p>
                      ) : null}
                    </div>
                    <Button variant="ghost" className="text-primary hover:bg-primary/10">Open</Button>
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
            <DialogDescription>Thiết kế dạng hộp thoại để quản lý tổ chức của bạn.</DialogDescription>
          </DialogHeader>
          <div className="text-sm text-zinc-600">
            Sử dụng thanh bên để điều hướng các khu vực chính. Trang này hiển thị các hành động chính trong một bảng điều khiển ở giữa để truy cập nhanh.
          </div>
        </DialogContent>
      </Dialog>

      {/* Create event dialog */}
      <Dialog open={openCreate} onOpenChange={setOpenCreate}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Tạo event</DialogTitle>
            <DialogDescription>Đặt các thông tin cơ bản cho sự kiện slido của bạn.</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-medium text-zinc-600">Ngày bắt đầu</label>
                <Input type="date" value={start} onChange={(e) => setStart(e.target.value)} />
              </div>
              <div>
                <label className="text-xs font-medium text-zinc-600">Ngày kết thúc</label>
                <Input type="date" value={end} onChange={(e) => setEnd(e.target.value)} />
              </div>
            </div>
            <div>
              <label className="text-xs font-medium text-zinc-600">Tên Slido</label>
              <Input placeholder="Nhập tên" value={name} onChange={(e) => setName(e.target.value)} />
            </div>
            <div className="text-xs text-zinc-600 flex items-center gap-2 border rounded-md px-3 py-2">
              <span className="inline-flex h-5 w-5 items-center justify-center rounded-full border">i</span>
              Bất kỳ ai có mã hoặc liên kết đều có thể tham gia sự kiện này.
            </div>
          </div>
          <DialogFooter>
            <Button variant="ghost" onClick={() => setOpenCreate(false)}>Cancel</Button>
            <Button className="bg-primary text-primary-foreground hover:bg-primary/90" onClick={() => setOpenCreate(false)}>Create event</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

// app/(dashboard)/events/new/page.tsx
"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
// import { useToast } from "@/hooks/use-toast";

export default function NewEventPage() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  // const { toast } = useToast();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const res = await fetch("/api/events", {
      method: "POST",
      body: JSON.stringify({ title, description }),
      headers: { "Content-Type": "application/json" },
    });

    setLoading(false);

    if (!res.ok) {
      // toast({ title: "Tạo sự kiện thất bại" });
      return;
    }

    const data = await res.json();
    // toast({ title: "Tạo sự kiện thành công" });
    router.push(`/event/${data.code}`); // nhảy luôn vào room
  };

  return (
    <div className="container max-w-xl py-8">
      <Card>
        <CardHeader>
          <CardTitle>Tạo sự kiện Q&A mới</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              placeholder="Tiêu đề sự kiện"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
            <Input
              placeholder="Mô tả (tuỳ chọn)"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <Button type="submit" disabled={loading}>
              {loading ? "Đang tạo..." : "Tạo sự kiện"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

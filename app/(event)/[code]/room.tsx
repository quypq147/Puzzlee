// app/(event)/[code]/room.tsx
"use client";

import { useState, FormEvent } from "react";
import { useEventQuestions } from "@/hooks/use-event-realtime";
import { createClient } from "@/lib/supabase/client";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
// nếu anh có Toast: import { useToast } from "@/hooks/use-toast";

export function EventRoom({ event }: { event: any }) {
  const { questions } = useEventQuestions(event.id);
  const loading = false;
  const [content, setContent] = useState("");
  const [sending, setSending] = useState(false);
  const supabase = createClient();
  // const { toast } = useToast();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!content.trim()) return;

    setSending(true);
    const { error } = await supabase.from("questions").insert({
      event_id: event.id,
      content,
    });
    setSending(false);

    if (!error) {
      setContent("");
      // toast({ title: "Đã gửi câu hỏi" });
    } else {
      console.error(error);
      // toast({ title: "Gửi thất bại", description: error.message, ... });
    }
  };

  return (
    <div className="container max-w-3xl py-8 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>{event.title}</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="flex gap-2">
            <Input
              placeholder="Nhập câu hỏi của bạn..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
            <Button type="submit" disabled={sending || !content.trim()}>
              Gửi
            </Button>
          </form>
        </CardContent>
      </Card>

      <section className="space-y-3">
        {loading ? (
          <p>Đang tải câu hỏi...</p>
        ) : questions.length === 0 ? (
          <p>Chưa có câu hỏi nào. Hãy là người đầu tiên!</p>
        ) : (
          questions.map((q) => (
            <Card key={q.id}>
              <CardContent className="py-4">
                <p>{q.content}</p>
                <p className="mt-2 text-xs text-muted-foreground">
                  {new Date(q.created_at).toLocaleTimeString()}
                </p>
              </CardContent>
            </Card>
          ))
        )}
      </section>
    </div>
  );
}

"use client";

import * as React from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Heart, Send } from "lucide-react";

type Question = {
  id: string;
  author: string;
  content: string;
  createdAt: string; // ISO string
  likes: number;
};

export default function ParticipantJoinPage() {
  const [tab, setTab] = React.useState<string>("qa");
  const [questions, setQuestions] = React.useState<Question[]>([
    {
      id: "1",
      author: "Alex",
      content: "How do we join the breakout rooms?",
      createdAt: new Date().toISOString(),
      likes: 12,
    },
    {
      id: "2",
      author: "Jamie",
      content: "Will slides be shared afterwards?",
      createdAt: new Date(Date.now() - 1000 * 60 * 5).toISOString(),
      likes: 7,
    },
  ]);
  const [draft, setDraft] = React.useState<string>("");

  function timeFromNow(iso: string) {
    const diff = Date.now() - new Date(iso).getTime();
    const mins = Math.floor(diff / 60000);
    if (mins < 1) return "just now";
    if (mins < 60) return `${mins}m ago`;
    const hrs = Math.floor(mins / 60);
    if (hrs < 24) return `${hrs}h ago`;
    const days = Math.floor(hrs / 24);
    return `${days}d ago`;
  }

  const like = (id: string) => {
    setQuestions((prev) => prev.map((q) => (q.id === id ? { ...q, likes: q.likes + 1 } : q)));
  };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!draft.trim()) return;
    const newQ: Question = {
      id: Math.random().toString(36).slice(2),
      author: "You",
      content: draft.trim(),
      createdAt: new Date().toISOString(),
      likes: 0,
    };
    setQuestions((prev) => [newQ, ...prev]);
    setDraft("");
  };

  return (
    <div className="min-h-screen bg-white text-slate-900 md:bg-slate-50">
      {/* Sticky header */}
      <header className="sticky top-0 z-20 bg-white/95 backdrop-blur border-b px-4 py-3 md:px-6">
        <div className="flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-sm text-slate-500">Join code</span>
            <span className="font-semibold tracking-tight"># 1234</span>
          </div>
          <div className="text-sm text-slate-500">Participant View</div>
        </div>
      </header>

      {/* Tabs */}
      <div className="px-4 pt-3 md:px-6">
        <Tabs value={tab} onValueChange={setTab} className="w-full">
          <TabsList className="w-full grid grid-cols-2">
            <TabsTrigger value="qa">Q&A</TabsTrigger>
            <TabsTrigger value="polls">Polls</TabsTrigger>
          </TabsList>

          <TabsContent value="qa" className="mt-4">
            <QuestionsList questions={questions} onLike={like} />
          </TabsContent>

          <TabsContent value="polls" className="mt-4">
            <div className="text-center text-sm text-slate-500 py-8">No active polls</div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Spacer for bottom bar */}
      <div className="h-20" />

      {/* Sticky bottom input bar */}
      <footer className="fixed bottom-0 left-0 right-0 z-30 border-t bg-white px-4 py-2 md:px-6">
        <form onSubmit={submit} className="flex items-center gap-2">
          <Input
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            placeholder="Type your question"
            className="flex-1"
          />
          <Button type="submit">
            <Send className="mr-2 h-4 w-4" />
            Send
          </Button>
        </form>
      </footer>
    </div>
  );
}

function QuestionsList({
  questions,
  onLike,
}: {
  questions: Question[];
  onLike: (id: string) => void;
}) {
  return (
    <div className="space-y-3">
      {questions.map((q) => (
        <Card key={q.id} className="shadow-sm">
          <CardHeader className="py-3">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-base font-semibold">{q.author}</CardTitle>
                <CardDescription className="text-xs">{timeFrom(q.createdAt)}</CardDescription>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onLike(q.id)}
                className="text-slate-700 hover:text-slate-900"
                aria-label="Like"
              >
                <Heart className="mr-1 h-4 w-4" /> {q.likes}
              </Button>
            </div>
          </CardHeader>
          <CardContent className="pt-0 text-sm text-slate-800">
            {q.content}
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

function timeFrom(iso: string) {
  const diff = Date.now() - new Date(iso).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return "just now";
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  const days = Math.floor(hrs / 24);
  return `${days}d ago`;
}
 


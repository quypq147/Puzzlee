"use client";

import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Loader2 } from "lucide-react";
import { EventCard } from "@/components/event-card";
import { CreateEventDialog } from "@/components/create-event-dialog";
import Header from "@/components/layout/header";

export default function EventsPage() {
  const [events, setEvents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadEvents();
  }, []);

  const loadEvents = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/events");
      if (res.ok) {
        const data = await res.json();
        setEvents(data);
      }
    } catch (error) {
      console.error("Không thể tải các sự kiện:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6 min-h-screen">
      <Header />
      <div className="flex items-center justify-between m-5">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Sự kiện</h1>
          <p className="text-muted-foreground mt-2">
            Quản lý tất cả các sự kiện Q&A của bạn
          </p>
        </div>
        <CreateEventDialog
          onEventCreated={(event) => {
            setEvents([event, ...events]);
          }}
        />
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
        </div>
      ) : events.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <p className="text-muted-foreground mb-4">Chưa có sự kiện nào</p>
            <CreateEventDialog
              onEventCreated={(event) => {
                setEvents([event, ...events]);
              }}
            />
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      )}
    </div>
  );
}

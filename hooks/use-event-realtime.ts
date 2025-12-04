import { useEffect, useState } from "react";
import { subscribeToEventQuestions } from "@/lib/realtime";

export function useEventQuestions(eventId: string) {
  const [questions, setQuestions] = useState<any[]>([]);

  useEffect(() => {
    if (!eventId) return;

    // TODO: fetch initial questions bằng supabase.from('questions')...

    const unsubscribe = subscribeToEventQuestions(eventId, (q) => {
      setQuestions((prev) => [q, ...prev]);
    });

    return () => unsubscribe();
  }, [eventId]);

  return { questions };
}
// app/(event)/[code]/page.tsx
import { notFound } from "next/navigation";
import { getEventByCode } from "@/lib/db";
import { EventRoom } from "./room";

interface EventPageProps {
  params: { code: string };
}

export default async function EventPage({ params }: EventPageProps) {
  const code = params.code;
  const { data: event, error } = await getEventByCode(code);

  if (error || !event) {
    return notFound();
  }

  return <EventRoom event={event} />;
}

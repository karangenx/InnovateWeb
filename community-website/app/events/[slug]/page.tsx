import { notFound } from "next/navigation";
import SingleEventPage, { type EventItem } from "@/components/SingleEventPage";
import eventsData from "@/data/events.json";
import Navbar from "@/components/Navbar";

const events = eventsData as EventItem[];

export function generateStaticParams() {
  return events.map((event) => ({ slug: event.slug }));
}

export default async function EventPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const event = events.find((item) => item.slug === slug);
  if (!event) notFound();

  return (
    <>
      <Navbar />
      <SingleEventPage event={event} />
    </>
  );
}

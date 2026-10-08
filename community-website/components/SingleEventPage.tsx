"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Calendar,
  Clock,
  MapPin,
  Share2,
  Users,
  Ticket,
  ArrowRight,
  CheckCircle2,
  X,
  Loader2,
  Check,
  MessageSquare
} from "lucide-react";
import eventsData from "@/data/events.json";
import { supabase } from "@/lib/supabase";

export type EventItem = {
  slug: string;
  title: string;
  date: string;
  time: string;
  location: string;
  status: string;
  category: string;
  format: string;
  capacity: number;
  remaining: number;
  description: string;
  about: string;
  agenda: { time: string; title: string; category: string }[];
  speakers: { name: string; role: string; bio: string; image?: string }[];
  tags: string[];
  rsvpLink?: string;
  coverImage?: string;
};

function formatDate(value: string) {
  if (value === "TBD") return "TBD";
  return new Intl.DateTimeFormat("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(new Date(value));
}

function parseExpectations(aboutText: string) {
  const marker = "What to Expect:";
  const whoMarker = "Who Should Attend:";
  if (!aboutText.includes(marker)) return null;

  const section = aboutText.split(marker)[1]?.split(whoMarker)[0] || "";
  const lines = section.split("\n").map(l => l.trim()).filter(Boolean);

  const items: { emoji: string; title: string; desc: string }[] = [];
  for (const line of lines) {
    const match = line.match(/^([\uD800-\uDBFF][\uDC00-\uDFFF]|[\u2600-\u27BF]|\u26A1|\u2705|\uD83D[\uDE00-\uDE4F]|\uD83C[\uDF00-\uDFFF]|\uD83D[\uDC00-\uDDFF]|\uD83E[\uDD00-\uDDFF]|\uD83D[\uDE80-\uDEFF]|\uD83C[\uDDE0-\uDDFF])\s*([^—–-]+)[—–-]\s*(.+)$/u);
    if (match) {
      items.push({
        emoji: match[1].trim(),
        title: match[2].trim(),
        desc: match[3].trim()
      });
    }
  }
  return items.length > 0 ? items : null;
}

function parseWhoShouldAttend(aboutText: string) {
  const marker = "Who Should Attend:";
  const builderMarker = "The Builder's Room:";
  if (!aboutText.includes(marker)) return null;

  const section = aboutText.split(marker)[1]?.split(builderMarker)[0] || "";
  const lines = section.split("\n").map(l => l.trim()).filter(Boolean);

  const items = lines
    .map(line => line.replace(/^[•\-\*]\s*/, "").trim())
    .filter(Boolean);

  return items.length > 0 ? items : null;
}

export default function SingleEventPage({ event }: { event: EventItem }) {
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", number: "", organization: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [remainingSeats, setRemainingSeats] = useState(event.status === 'completed' ? 0 : event.remaining);
  const [isLoadingSeats, setIsLoadingSeats] = useState(event.status !== 'completed');
  const [isMainRSVPVisible, setIsMainRSVPVisible] = useState(false);
  const rsvpCardRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsMainRSVPVisible(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    if (rsvpCardRef.current) {
      observer.observe(rsvpCardRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (event.status === 'completed') return;
    
    async function fetchSeatCount() {
      try {
        const { data: count, error } = await supabase.rpc('get_rsvp_count', { slug_param: event.slug });

        if (error) {
          console.error("Error fetching RSVP count:", error);
        } else if (count !== null) {
          setRemainingSeats(Math.max(0, event.capacity - count));
        }
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoadingSeats(false);
      }
    }
    fetchSeatCount();
  }, [event.slug, event.capacity, event.status]);

  const handleRSVPSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (remainingSeats <= 0) {
      setErrorMsg("Registration is closed. No seats available.");
      return;
    }
    
    setIsSubmitting(true);
    setErrorMsg("");

    try {
      const { data: isRegistered, error: checkError } = await supabase.rpc('check_rsvp_exists', {
        email_param: formData.email,
        slug_param: event.slug
      });

      if (checkError) throw checkError;

      if (isRegistered) {
        throw new Error("You are already registered for this event with this email address.");
      }

      const uniqueCode = "INV-" + Math.random().toString(36).substring(2, 8).toUpperCase();

      const { error } = await supabase
        .from("rsvps")
        .insert([
          {
            event_slug: event.slug,
            name: formData.name,
            email: formData.email,
            number: formData.number,
            organization: formData.organization,
            unique_code: uniqueCode,
          }
        ]);

      if (error) throw error;

      try {
        await supabase.functions.invoke("send-rsvp-email", {
          body: {
            email: formData.email,
            firstName: formData.name.split(" ")[0] || formData.name,
            eventName: event.title,
            eventDate: formatDate(event.date),
            eventTime: event.time,
            eventLocation: event.location,
            eventUrl: window.location.href,
            uniqueCode: uniqueCode,
          },
        });
      } catch (emailErr) {
        console.error("Failed to send RSVP email:", emailErr);
      }

      setIsSuccess(true);
      setRemainingSeats((prev) => (prev > 0 ? prev - 1 : 0));
    } catch (err: any) {
      console.error(err);
      setErrorMsg(err.message || "Something went wrong. Please make sure the database is configured.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const moreEvents = (eventsData as EventItem[])
    .filter((item) => item.slug !== event.slug)
    .slice(0, 4);

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: event.title,
          text: `Check out this event: ${event.title}`,
          url: window.location.href,
        });
      } catch (error) {
        console.error("Error sharing:", error);
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert("Link copied to clipboard!");
    }
  };

  const expectationCards = parseExpectations(event.about);
  const attendeesList = parseWhoShouldAttend(event.about);
  const hasBuildersRoom = event.about.includes("The Builder's Room");

  // Calculate clean intro paragraphs from about text
  const introParagraphs = event.about
    .split("What to Expect:")[0]
    .split("\n")
    .map(p => p.trim())
    .filter(Boolean);

  const capacityPercentage = event.capacity > 0 
    ? Math.min(100, Math.max(0, Math.round(((event.capacity - remainingSeats) / event.capacity) * 100))) 
    : 0;

  return (
    <div className="bg-[#faf9ff] text-[#181b25] min-h-screen selection:bg-sky-500 selection:text-white font-sans">
      {/* ==================== HERO SECTION ==================== */}
      <section className="w-full bg-[#faf9ff] border-b border-slate-200/70 pt-28 md:pt-36 pb-12">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          {/* Back Link */}
          <div className="mb-6">
            <Link
              href="/events"
              className="inline-flex items-center gap-1.5 text-xs font-semibold tracking-wide text-slate-500 hover:text-sky-600 transition-colors duration-150 group"
            >
              <ArrowLeft size={15} className="group-hover:-translate-x-1 transition-transform" />
              <span>Back to Events</span>
            </Link>
          </div>

          <div className="max-w-4xl">
            {/* Pill Badges */}
            <div className="flex flex-wrap items-center gap-2.5 mb-5">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#ebedfb] border border-slate-200 text-[#006591] font-semibold text-xs tracking-wider uppercase">
                <span className="w-1.5 h-1.5 rounded-full bg-[#006591] animate-pulse"></span>
                {event.category}
              </span>
              {event.format && event.format.toUpperCase() !== "TBA" && (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#ebedfb] border border-slate-200 text-slate-600 font-semibold text-xs tracking-wider uppercase">
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-400"></span>
                  {event.format}
                </span>
              )}
              <span
                className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full border text-xs font-semibold tracking-wider uppercase ${
                  event.status === "upcoming"
                    ? "bg-sky-50 border-sky-200 text-sky-700"
                    : "bg-slate-100 border-slate-200 text-slate-600"
                }`}
              >
                <span
                  className={`w-1.5 h-1.5 rounded-full ${
                    event.status === "upcoming" ? "bg-sky-500" : "bg-slate-400"
                  }`}
                ></span>
                {event.status}
              </span>
            </div>

            {/* Event Title */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#181b25] tracking-tight leading-[1.15] mb-4">
              {event.title}
            </h1>

            {/* Subtitle / Description */}
            <p className="text-base sm:text-lg text-slate-600 leading-relaxed mb-8 max-w-3xl">
              {event.description}
            </p>

            {/* Quick Event Metadata Strip */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 border-t border-slate-200/80">
              {/* Date & Time */}
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#f1f3ff] flex items-center justify-center text-[#006591] shrink-0 border border-slate-200/60">
                  <Calendar size={18} />
                </div>
                <div>
                  <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">DATE & TIME</p>
                  <p className="text-base font-bold text-[#181b25] mt-0.5">{formatDate(event.date)}</p>
                  <p className="text-xs text-slate-500">{event.time}</p>
                </div>
              </div>

              {/* Location */}
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#f1f3ff] flex items-center justify-center text-[#006591] shrink-0 border border-slate-200/60">
                  <MapPin size={18} />
                </div>
                <div>
                  <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">LOCATION</p>
                  <p className="text-base font-bold text-[#181b25] mt-0.5">{event.location.split("(")[0]?.trim() || event.location}</p>
                  <p className="text-xs text-slate-500">{event.location.includes("(") ? event.location.slice(event.location.indexOf("(")) : event.format}</p>
                </div>
              </div>

              {/* Cost / Capacity */}
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#f1f3ff] flex items-center justify-center text-[#006591] shrink-0 border border-slate-200/60">
                  <Ticket size={18} />
                </div>
                <div>
                  <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">ADMISSION</p>
                  <p className="text-base font-bold text-[#181b25] mt-0.5">Free Admission</p>
                  <p className="text-xs text-slate-500">
                    {event.capacity === 0 ? "Open to all" : `${remainingSeats} Seats Available`}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ==================== MAIN TWO-COLUMN CONTENT GRID ==================== */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 mt-10 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* ==================== LEFT COLUMN ==================== */}
          <div className="lg:col-span-8 space-y-12">
            {/* Target Audience Banner */}
            <div className="p-4 rounded-xl bg-white border border-slate-200/80 flex items-center gap-3 shadow-xs">
              <Users size={18} className="text-sky-500 shrink-0" />
              <p className="text-xs md:text-sm font-semibold text-[#181b25] tracking-wide">
                For Founders • Developers • Startup Builders • Product Makers
              </p>
            </div>

            {/* Section: About the Event */}
            <section className="space-y-5" id="about">
              <h2 className="text-2xl font-bold text-[#181b25] tracking-tight">About the Event</h2>
              <div className="space-y-4 text-[15px] text-slate-600 leading-relaxed">
                {expectationCards ? (
                  <>
                    <p className="text-lg font-bold text-[#181b25]">Build. Scale. Ship.</p>
                    <p>
                      The technology landscape is changing faster than ever. AI is transforming how products are built, developers are becoming entrepreneurs, and small teams are creating products that once required large engineering teams.
                    </p>
                    <p>
                      Build, Scale &amp; Ship by Innovate Web is an exclusive meetup bringing together founders, developers, startup teams and technology builders under one roof to share ideas, showcase products, exchange experiences and build meaningful connections.
                    </p>
                    <div className="p-4 rounded-xl bg-[#f1f3ff] border-l-4 border-[#006591]">
                      <p className="text-sm font-medium text-[#181b25] italic">
                        &quot;This isn&apos;t another conventional tech meetup. It&apos;s a room full of people who are actually building something.&quot;
                      </p>
                    </div>
                    <p>
                      Whether you&apos;re launching your first startup, developing an AI product, scaling an existing SaaS business, working on an ambitious side project, or simply exploring your next big idea — this meetup is designed for you.
                    </p>
                  </>
                ) : (
                  introParagraphs.map((para, idx) => (
                    <p key={idx}>{para}</p>
                  ))
                )}
              </div>
            </section>

            {/* Section: What to Expect (Bento Grid) */}
            {expectationCards && (
              <section className="space-y-6">
                <div className="border-b border-slate-200/70 pb-3">
                  <h3 className="text-xl font-bold text-[#181b25]">What to Expect:</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {expectationCards.map((item, idx) => (
                    <div
                      key={idx}
                      className="p-5 rounded-xl bg-white border border-slate-200/80 hover:border-slate-300 transition-all hover:shadow-xs"
                    >
                      <div className="flex items-center gap-2.5 mb-2.5">
                        <span className="text-xl">{item.emoji}</span>
                        <h4 className="text-base font-bold text-[#181b25]">{item.title}</h4>
                      </div>
                      <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                        {item.desc}
                      </p>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Section: Who Should Attend */}
            {attendeesList && (
              <section className="space-y-4">
                <h3 className="text-xl font-bold text-[#181b25]">Who Should Attend:</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {attendeesList.map((target, idx) => (
                    <div
                      key={idx}
                      className="flex items-center gap-3 p-3.5 rounded-lg bg-white border border-slate-200/70"
                    >
                      <CheckCircle2 size={16} className="text-[#006591] shrink-0" />
                      <span className="text-sm font-medium text-[#181b25]">{target}</span>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Section: The Builder's Room Callout */}
            {hasBuildersRoom && (
              <section className="p-6 rounded-2xl bg-gradient-to-br from-[#f1f3ff] to-[#ebedfb] border border-slate-200/80 space-y-4">
                <div className="flex items-center gap-2">
                  <MessageSquare size={18} className="text-[#006591]" />
                  <h3 className="text-lg font-bold text-[#181b25]">The Builder&apos;s Room:</h3>
                </div>
                <p className="text-sm text-slate-600">
                  Everyone attending is encouraged to introduce themselves through three simple questions:
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  <div className="p-3.5 rounded-xl bg-white border border-slate-200/60 text-center shadow-xs">
                    <span className="text-[11px] font-bold text-[#006591] uppercase tracking-wider">Prompt 1</span>
                    <p className="text-sm font-semibold text-[#181b25] mt-1">What are you building?</p>
                  </div>
                  <div className="p-3.5 rounded-xl bg-white border border-slate-200/60 text-center shadow-xs">
                    <span className="text-[11px] font-bold text-[#006591] uppercase tracking-wider">Prompt 2</span>
                    <p className="text-sm font-semibold text-[#181b25] mt-1">What do you need?</p>
                  </div>
                  <div className="p-3.5 rounded-xl bg-white border border-slate-200/60 text-center shadow-xs">
                    <span className="text-[11px] font-bold text-[#006591] uppercase tracking-wider">Prompt 3</span>
                    <p className="text-sm font-semibold text-[#181b25] mt-1">What can you help with?</p>
                  </div>
                </div>
                <p className="text-xs text-slate-500 font-medium text-center pt-2">
                  Come with an idea. Come with a product. Come with code. Or simply come with curiosity.
                </p>
              </section>
            )}

            {/* Topic Badges Strip */}
            <div className="flex flex-wrap items-center gap-2 pt-2">
              {event.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 rounded-full bg-[#ebedfb] text-slate-700 text-xs font-semibold border border-slate-200"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Section: Agenda / Timeline */}
            {event.agenda && event.agenda.length > 0 && (
              <section className="space-y-6 pt-4" id="agenda">
                <div className="flex items-center justify-between border-b border-slate-200/70 pb-3">
                  <h3 className="text-xl font-bold text-[#181b25]">Agenda</h3>
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                    ESTIMATED TIMELINE
                  </span>
                </div>
                <div className="relative pl-6 space-y-4 before:absolute before:left-2 before:top-3 before:bottom-3 before:w-0.5 before:bg-slate-200">
                  {event.agenda.map((item, idx) => (
                    <div key={idx} className="relative group">
                      <span className="absolute -left-6 top-2 w-3.5 h-3.5 rounded-full bg-[#faf9ff] border-2 border-[#006591] group-hover:scale-125 transition-transform"></span>
                      <div className="p-4 rounded-xl bg-white border border-slate-200/70 hover:border-slate-300 flex items-center justify-between gap-4 transition-all hover:shadow-xs">
                        <div>
                          <span className="text-xs font-bold text-[#006591]">{item.time}</span>
                          <h5 className="text-sm sm:text-base font-semibold text-[#181b25] mt-0.5">
                            {item.title}
                          </h5>
                        </div>
                        <span
                          className={`px-2.5 py-1 rounded text-xs font-semibold shrink-0 ${
                            item.category.toLowerCase().includes("showcase")
                              ? "bg-sky-100 text-sky-800"
                              : item.category.toLowerCase().includes("session")
                              ? "bg-[#f1f3ff] text-[#006591]"
                              : "bg-slate-100 text-slate-600"
                          }`}
                        >
                          {item.category}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Speakers Section (if any exist) */}
            {event.speakers && event.speakers.length > 0 && (
              <section className="space-y-6 pt-4">
                <div className="border-b border-slate-200/70 pb-3">
                  <h3 className="text-xl font-bold text-[#181b25]">Featured Speakers</h3>
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  {event.speakers.map((speaker, idx) => (
                    <div
                      key={idx}
                      className="p-5 rounded-xl bg-white border border-slate-200/70 flex items-center gap-4"
                    >
                      <div className="w-14 h-14 rounded-full bg-slate-100 flex items-center justify-center overflow-hidden shrink-0 border border-slate-200">
                        {speaker.image ? (
                          <img
                            src={speaker.image}
                            alt={speaker.name}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <Users size={22} className="text-slate-400" />
                        )}
                      </div>
                      <div>
                        <h4 className="font-bold text-[#181b25] text-base">{speaker.name}</h4>
                        <p className="text-xs font-semibold text-sky-600">{speaker.role}</p>
                        {speaker.bio && (
                          <p className="text-xs text-slate-500 mt-1 line-clamp-2">{speaker.bio}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>

          {/* ==================== RIGHT COLUMN (STICKY RSVP SIDEBAR) ==================== */}
          <div className="lg:col-span-4">
            <aside ref={rsvpCardRef} className="sticky top-24 space-y-6">
              {/* Main RSVP Widget Card */}
              <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-5">
                <div className="space-y-1">
                  <h3 className="text-xl font-bold text-[#181b25]">
                    {event.capacity === 0 ? "Event Details" : "Reserve Your Spot"}
                  </h3>
                  <p className="text-xs text-slate-500 flex items-center gap-1.5">
                    <Users size={14} className="text-[#006591]" />
                    <span>
                      {event.capacity === 0
                        ? "Join us for this meetup."
                        : `Join ${Math.max(0, event.capacity - remainingSeats)} others attending this event.`}
                    </span>
                  </p>
                </div>

                {/* Location Box */}
                <div className="p-3.5 rounded-xl bg-[#f1f3ff] border border-slate-200/60 space-y-1">
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                    Location
                  </span>
                  <div className="flex items-center gap-2">
                    <MapPin size={16} className="text-[#006591] shrink-0" />
                    <p className="text-sm font-semibold text-[#181b25] truncate">{event.location}</p>
                  </div>
                </div>

                {/* Availability Status Box */}
                <div className="p-3.5 rounded-xl bg-[#f1f3ff] border border-slate-200/60 space-y-2">
                  <div className="flex items-center justify-between text-xs font-semibold">
                    <span className="text-slate-500">Availability</span>
                    <span className="text-[#006591]">
                      {event.capacity === 0 ? "Open to all" : `${remainingSeats} Seats Left`}
                    </span>
                  </div>

                  {/* Progress capacity bar */}
                  {event.capacity > 0 && (
                    <div className="w-full h-1.5 rounded-full bg-slate-200 overflow-hidden">
                      <div
                        className="h-full bg-sky-500 rounded-full transition-all duration-500"
                        style={{ width: `${Math.max(5, capacityPercentage)}%` }}
                      ></div>
                    </div>
                  )}

                  <p className="text-[11px] text-slate-400">
                    {isLoadingSeats
                      ? "Checking live seat count..."
                      : event.capacity === 0
                      ? "Free community admission"
                      : `${event.capacity - remainingSeats} reserved out of ${event.capacity} total seats`}
                  </p>
                </div>

                {/* CTAs */}
                <div className="space-y-3 pt-2">
                  {event.status === "upcoming" && (
                    event.capacity === 0 ? (
                      <div className="w-full py-3.5 px-4 rounded-xl bg-emerald-50 text-emerald-700 font-semibold text-sm border border-emerald-200 text-center">
                        Registration Not Required
                      </div>
                    ) : remainingSeats > 0 ? (
                      <button
                        onClick={() => setShowModal(true)}
                        className="w-full py-3.5 px-4 rounded-xl bg-[#0f172a] hover:bg-[#1e293b] text-white font-semibold text-sm transition-all duration-200 active:scale-98 shadow-sm flex items-center justify-center gap-2 group cursor-pointer"
                        type="button"
                      >
                        <span>RSVP Now - Free</span>
                        <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                      </button>
                    ) : (
                      <button
                        disabled
                        className="w-full py-3.5 px-4 rounded-xl bg-slate-200 text-slate-500 font-semibold text-sm cursor-not-allowed text-center"
                        type="button"
                      >
                        Registration Full
                      </button>
                    )
                  )}

                  <button
                    onClick={handleShare}
                    className="w-full py-2.5 px-4 rounded-xl bg-white border border-slate-200 text-slate-700 font-semibold text-xs hover:bg-slate-50 transition-colors duration-150 flex items-center justify-center gap-2 cursor-pointer"
                    type="button"
                  >
                    <Share2 size={14} />
                    <span>Share Event</span>
                  </button>
                </div>

                {/* Quick expectations reminder */}
                <div className="border-t border-slate-200/70 pt-4 space-y-2">
                  <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                    What to expect
                  </p>
                  <ul className="text-xs text-slate-600 space-y-1.5">
                    <li className="flex items-center gap-2">
                      <Check size={14} className="text-[#006591] shrink-0" />
                      <span>Direct founder &amp; builder interactions</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check size={14} className="text-[#006591] shrink-0" />
                      <span>3-minute live showcases</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check size={14} className="text-[#006591] shrink-0" />
                      <span>Curated high-signal networking</span>
                    </li>
                  </ul>
                </div>

                {/* Organizer contact */}
                <div className="pt-2 text-center">
                  <a
                    className="text-xs font-medium text-slate-500 hover:text-[#006591] transition-colors"
                    href="mailto:organizer@innovateweb.org"
                  >
                    Have questions? Contact Organizer
                  </a>
                </div>
              </div>

              {/* Sticky RSVP Secondary Floating Anchor (WhatsApp Community) */}
              <div className="p-4 rounded-xl bg-[#ebedfb] border border-slate-200/80 flex items-center justify-between">
                <div>
                  <p className="text-xs font-bold text-[#181b25]">Innovate Web Community</p>
                  <p className="text-[11px] text-slate-500">Next generation of builders</p>
                </div>
                <a
                  className="px-3.5 py-1.5 rounded-lg bg-white text-[#006591] text-xs font-bold border border-slate-200 hover:border-[#006591] shadow-2xs transition-colors"
                  href="https://chat.whatsapp.com/IerKyZQLwNoFcWgaGOjO5N"
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  Join
                </a>
              </div>
            </aside>
          </div>
        </div>
      </div>

      {/* ==================== MORE EVENTS YOU'LL LOVE ==================== */}
      <section className="max-w-7xl mx-auto px-6 lg:px-8 pt-12 pb-24 border-t border-slate-200/70" id="events">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-bold text-[#181b25] tracking-tight">More events you&apos;ll love</h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Explore upcoming meetups, workshops, and gatherings from Innovate Web.
            </p>
          </div>
          <Link
            className="inline-flex items-center gap-1 text-xs font-bold text-[#006591] hover:underline"
            href="/events"
          >
            <span>See all events</span>
            <ArrowRight size={14} />
          </Link>
        </div>

        {/* Event Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {moreEvents.map((item) => (
            <article
              key={item.slug}
              className="p-5 rounded-2xl bg-white border border-slate-200/80 hover:border-slate-300 hover:shadow-xs transition-all duration-200 flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-0.5 rounded-full bg-[#ebedfb] text-[#006591] font-bold text-[10px] uppercase tracking-wider">
                    {item.category}
                  </span>
                  <span className="text-xs font-semibold text-slate-400">
                    {item.date === "TBD" ? "TBD" : new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric" }).format(new Date(item.date))}
                  </span>
                </div>
                <h4 className="text-base font-bold text-[#181b25] line-clamp-2 leading-snug">
                  {item.title}
                </h4>
                <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                  {item.description}
                </p>
              </div>
              <div className="pt-5 mt-4 border-t border-slate-100 flex items-center justify-between">
                <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                  {item.format}
                </span>
                <Link
                  className="inline-flex items-center gap-1 text-xs font-bold text-[#006591] hover:underline"
                  href={`/events/${item.slug}`}
                >
                  <span>View details</span>
                  <ArrowRight size={12} />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Mobile Sticky RSVP Bar */}
      {event.status === "upcoming" && (
        <div
          className={`fixed bottom-0 left-0 right-0 p-4 pb-6 z-40 lg:hidden flex justify-center bg-white/95 backdrop-blur-md border-t border-slate-200 transition-all duration-300 ${
            isMainRSVPVisible ? "opacity-0 pointer-events-none translate-y-8" : "opacity-100 translate-y-0"
          }`}
        >
          {event.capacity === 0 ? (
            <div className="px-8 py-3 rounded-xl bg-emerald-50 text-emerald-700 font-bold text-sm border border-emerald-200 text-center w-full max-w-sm">
              Registration Not Required
            </div>
          ) : remainingSeats > 0 ? (
            <button
              onClick={() => setShowModal(true)}
              className="px-8 py-3.5 rounded-xl bg-[#0f172a] text-white font-bold text-sm shadow-md hover:bg-slate-800 transition-all active:scale-98 w-full max-w-sm flex items-center justify-center gap-2"
            >
              <span>RSVP Now - Free</span>
              <ArrowRight size={16} />
            </button>
          ) : (
            <button
              disabled
              className="px-8 py-3.5 rounded-xl bg-slate-200 text-slate-500 font-bold text-sm cursor-not-allowed w-full max-w-sm text-center"
            >
              Registration Full
            </button>
          )}
        </div>
      )}

      {/* RSVP Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs">
          <div className="relative w-full max-w-md bg-white rounded-2xl shadow-xl p-8 overflow-hidden animate-in fade-in zoom-in duration-200 border border-slate-200">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-5 right-5 p-2 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-colors"
            >
              <X size={18} />
            </button>

            {isSuccess ? (
              <div className="text-center py-6">
                <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle2 size={28} />
                </div>
                <h3 className="text-xl font-bold text-[#181b25] mb-2">You&apos;re on the list!</h3>
                <p className="text-slate-500 text-sm mb-6 leading-relaxed">
                  We&apos;ve saved your spot for <strong>{event.title}</strong>. See you there!
                </p>
                <button
                  onClick={() => setShowModal(false)}
                  className="w-full py-3 rounded-xl bg-[#0f172a] text-white font-semibold text-sm hover:bg-slate-800 transition-colors"
                >
                  Close
                </button>
              </div>
            ) : (
              <>
                <h3 className="text-xl font-bold text-[#181b25] mb-1">Reserve Your Spot</h3>
                <p className="text-slate-500 mb-6 text-xs">Fill out your details below to confirm your free RSVP.</p>

                {errorMsg && (
                  <div className="mb-5 p-3 bg-red-50 text-red-600 text-xs rounded-lg border border-red-100">
                    {errorMsg}
                  </div>
                )}

                <form onSubmit={handleRSVPSubmit} className="space-y-4 text-left">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Full Name *</label>
                    <input
                      required
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-sky-500 focus:border-transparent outline-hidden text-sm transition-all"
                      placeholder="Jane Doe"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Email Address *</label>
                    <input
                      required
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-sky-500 focus:border-transparent outline-hidden text-sm transition-all"
                      placeholder="jane@example.com"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Phone Number *</label>
                    <input
                      required
                      type="tel"
                      value={formData.number}
                      onChange={(e) => setFormData({ ...formData, number: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-sky-500 focus:border-transparent outline-hidden text-sm transition-all"
                      placeholder="+91 98765 43210"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Organization / Project</label>
                    <input
                      type="text"
                      value={formData.organization}
                      onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-sky-500 focus:border-transparent outline-hidden text-sm transition-all"
                      placeholder="Startup / Company / Side Project"
                    />
                  </div>

                  <button
                    disabled={isSubmitting}
                    type="submit"
                    className="w-full mt-2 py-3.5 rounded-xl bg-[#0f172a] hover:bg-slate-800 text-white font-bold text-sm shadow-sm transition-all duration-200 disabled:opacity-60 flex justify-center items-center gap-2 cursor-pointer"
                  >
                    {isSubmitting && <Loader2 size={16} className="animate-spin" />}
                    {isSubmitting ? "Submitting..." : "Confirm Free RSVP"}
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

"use client";

import Link from "next/link";
import {
  MapPin,
  Clock,
  ChevronRight,
  ArrowRight,
  CalendarDays
} from "lucide-react";
import eventsData from "@/data/events.json";

interface EventItem {
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
  speakers: { name: string; role: string; bio: string }[];
  tags: string[];
}

export default function UpcomingEvents() {
  const events = eventsData as EventItem[];
  const upcoming = events.filter((event) => event.status === "upcoming");
  const completed = events.filter((event) => event.status === "completed");

  return (
    <section id="events" className="bg-[#f8fafc] py-24 relative overflow-hidden">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyan-100/50 text-cyan-800 text-sm font-semibold mb-4 border border-cyan-200">
              <span className="w-2 h-2 rounded-full bg-cyan-500 animate-pulse"></span>
              The Meetup Experience
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight">
              Upcoming <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 to-blue-600">Events</span>
            </h2>
          </div>
          
          <Link
            href="/events"
            className="group inline-flex items-center gap-2 bg-white text-slate-700 font-semibold px-6 py-3 rounded-full border border-slate-200 shadow-sm hover:shadow-md hover:border-cyan-300 hover:text-cyan-700 transition-all"
          >
            Explore All Events
            <div className="w-6 h-6 rounded-full bg-cyan-50 flex items-center justify-center group-hover:bg-cyan-100 transition-colors">
              <ChevronRight size={14} className="text-cyan-700" />
            </div>
          </Link>
        </div>

        {/* Upcoming Events */}
        <div className="grid lg:grid-cols-2 gap-8">
          {upcoming.map((item) => (
            <Link
              key={item.slug}
              href={`/events/${item.slug}`}
              className="group block h-full"
            >
              <article className="flex flex-col sm:flex-row w-full h-full bg-white rounded-[24px] p-6 border border-slate-200 shadow-sm transition-all duration-300 hover:shadow-xl hover:-translate-y-1 hover:border-cyan-300 gap-6">
                
                {/* Date Badge */}
                <div className="shrink-0 w-full sm:w-[110px] flex sm:flex-col items-center justify-center p-4 bg-slate-50 border border-slate-100 rounded-[20px] group-hover:bg-cyan-500 group-hover:border-cyan-500 transition-all duration-300">
                  <span className="text-3xl font-extrabold text-slate-800 group-hover:text-white transition-colors">
                    {new Date(item.date).getDate()}
                  </span>
                  <span className="text-xs font-bold uppercase tracking-widest text-slate-500 mt-1 group-hover:text-cyan-100 transition-colors">
                    {new Intl.DateTimeFormat("en-US", { month: "short" }).format(new Date(item.date))}
                  </span>
                </div>

                {/* Content */}
                <div className="flex flex-col flex-grow min-w-0">
                  <div className="flex flex-wrap items-center gap-2 mb-3">
                    <span className="rounded bg-slate-100 px-2 py-1 text-[11px] font-bold uppercase tracking-wider text-slate-600">
                      {item.category}
                    </span>
                    <span className="rounded bg-orange-50 px-2 py-1 text-[11px] font-bold uppercase tracking-wider text-orange-600 border border-orange-100">
                      {item.format}
                    </span>
                  </div>

                  <h3 className="text-xl md:text-2xl font-bold text-slate-900 leading-tight mb-4 group-hover:text-cyan-700 transition-colors line-clamp-2">
                    {item.title}
                  </h3>

                  <div className="flex flex-col gap-2 text-sm text-slate-600 font-medium mb-6">
                    <div className="flex items-center gap-2">
                      <Clock size={16} className="text-cyan-600 shrink-0" />
                      <span className="truncate">{item.time}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin size={16} className="text-cyan-600 shrink-0" />
                      <span className="truncate">{item.location.split(",")[0]}</span>
                    </div>
                  </div>

                  <div className="mt-auto flex items-center justify-between pt-4 border-t border-slate-100">
                    <span className="text-sm font-bold text-cyan-600 group-hover:text-cyan-700 transition-colors">
                      View event details
                    </span>
                    <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 group-hover:bg-cyan-600 group-hover:text-white transition-all duration-300">
                      <ArrowRight size={16} />
                    </div>
                  </div>
                </div>
              </article>
            </Link>
          ))}
        </div>

        {/* Past Events Header */}
        <div className="mt-24 mb-10 flex items-center gap-4">
          <h3 className="text-2xl font-bold text-slate-900">Past Events Library</h3>
          <div className="h-px flex-grow bg-slate-200"></div>
        </div>

        {/* Completed Events */}
        <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6">
          {completed.map((item) => (
            <Link
              key={item.slug}
              href={`/events/${item.slug}`}
              className="group block h-full"
            >
              <article className="flex flex-col w-full h-full bg-white rounded-[20px] p-6 border border-slate-200 shadow-sm transition-all duration-300 hover:shadow-lg hover:-translate-y-1 hover:border-slate-300">
                <div className="flex items-center justify-between mb-5">
                  <div className="flex items-center gap-2 text-slate-500">
                    <CalendarDays size={16} />
                    <span className="text-sm font-semibold">{new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric" }).format(new Date(item.date))}</span>
                  </div>
                  <span className="rounded bg-slate-100 px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-slate-500">
                    Completed
                  </span>
                </div>

                <h3 className="text-lg font-bold text-slate-900 leading-snug mb-3 group-hover:text-cyan-700 transition-colors line-clamp-2">
                  {item.title}
                </h3>

                <p className="text-slate-600 text-sm leading-relaxed flex-grow line-clamp-3 mb-5">
                  {item.description}
                </p>

                <div className="flex items-center justify-between mt-auto pt-4 border-t border-slate-100">
                  <span className="text-xs font-semibold text-slate-500">
                    {item.capacity - item.remaining} Attendees
                  </span>
                  <span className="text-xs font-bold text-cyan-600 group-hover:underline">
                    Read Recap
                  </span>
                </div>
              </article>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

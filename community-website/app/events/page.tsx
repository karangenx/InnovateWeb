import Image from "next/image";
import Link from "next/link";
import { Clock, MapPin, ArrowRight } from "lucide-react";
import eventsData from "@/data/events.json";
import Navbar from "@/components/Navbar";
import Gallery from "@/components/Gallery";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";

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

export default function EventsPage() {
  const events = eventsData as EventItem[];
  const upcoming = events.filter((event) => event.status === "upcoming");
  const completed = events.filter((event) => event.status === "completed");

  return (
    <main className="bg-[#f8fafc] text-slate-900 selection:bg-cyan-200 selection:text-cyan-900">
      <Navbar />

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-slate-950 pt-[180px] md:pt-[240px] pb-[100px] md:pb-[140px]">
        {/* Background Gradients */}
        <div className="absolute top-[-20%] right-[-10%] w-[600px] h-[600px] rounded-full bg-gradient-to-br from-cyan-600/40 to-blue-600/20 blur-[120px] mix-blend-screen pointer-events-none" />
        <div className="absolute bottom-[-20%] left-[-10%] w-[600px] h-[600px] rounded-full bg-gradient-to-tr from-indigo-600/30 to-purple-600/20 blur-[120px] mix-blend-screen pointer-events-none" />

        <div className="absolute inset-0">
          <Image
            src="/images/gallery/g1.jpg"
            alt="Community event gallery"
            fill
            className="object-cover opacity-20 mix-blend-luminosity"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-slate-950/80 via-slate-950/60 to-slate-950" />
        </div>

        <div className="relative mx-auto max-w-[1280px] px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md mb-8 shadow-[0_0_20px_rgba(255,255,255,0.05)]">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></span>
              <span className="text-sm font-semibold tracking-wide text-cyan-50">Event Directory</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-white mb-8 leading-[1.1]">
              Discover Our <br className="hidden md:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">
                Community Events
              </span>
            </h1>
            <p className="text-lg md:text-xl leading-relaxed text-slate-300 max-w-2xl mb-12">
              Explore our curated selection of conferences, startup meetups, networking sessions, and innovation summits. Join thousands of creators and builders.
            </p>
            <div className="flex flex-wrap items-center gap-4">
              <a href="#upcoming" className="px-8 py-4 rounded-full bg-white text-slate-900 font-bold hover:bg-cyan-50 hover:shadow-[0_0_30px_rgba(34,211,238,0.3)] transition-all duration-300 hover:-translate-y-0.5">
                View Upcoming
              </a>
              <a href="#past" className="px-8 py-4 rounded-full bg-white/10 text-white font-bold backdrop-blur-md border border-white/20 hover:bg-white/20 transition-all duration-300">
                Browse Past Events
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Upcoming Events Section */}
      <section id="upcoming" className="relative py-24 overflow-hidden">
        <div className="absolute top-40 right-0 w-[500px] h-[500px] bg-gradient-to-br from-cyan-200/40 to-blue-300/20 rounded-full blur-[120px] pointer-events-none"></div>

        <div className="mx-auto max-w-[1280px] px-6 lg:px-8 relative z-10">
          <div className="mb-16">
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-100/50 text-cyan-800 text-sm font-semibold border border-cyan-200 backdrop-blur-md shadow-sm">
              <span className="w-2 h-2 rounded-full bg-cyan-500 animate-pulse"></span>
              Coming Soon
            </span>
            <h2 className="text-[40px] md:text-[56px] font-extrabold text-slate-900 mt-6 leading-[1.1] tracking-tight">
              Upcoming <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 to-blue-600">Sessions</span>
            </h2>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {upcoming.map((event) => (
              <Link key={event.slug} href={`/events/${event.slug}`} className="group block h-full">
                <article className="flex flex-col sm:flex-row w-full h-full bg-white/80 backdrop-blur-xl rounded-[24px] p-6 border border-white shadow-sm transition-all duration-300 hover:shadow-xl hover:-translate-y-1 hover:border-cyan-300 gap-6">
                  
                  {/* Date Badge */}
                  <div className="shrink-0 w-full sm:w-[110px] flex sm:flex-col items-center justify-center p-4 bg-slate-50/50 border border-slate-100 rounded-[20px] group-hover:bg-cyan-500 group-hover:border-cyan-500 transition-all duration-300">
                    <span className="text-3xl font-extrabold text-slate-800 group-hover:text-white transition-colors">
                      {new Date(event.date).getDate()}
                    </span>
                    <span className="text-xs font-bold uppercase tracking-widest text-slate-500 mt-1 group-hover:text-cyan-100 transition-colors">
                      {new Intl.DateTimeFormat("en-US", { month: "short" }).format(new Date(event.date))}
                    </span>
                  </div>

                  {/* Content */}
                  <div className="flex flex-col flex-grow min-w-0">
                    <div className="flex flex-wrap items-center gap-2 mb-3">
                      <span className="rounded bg-slate-100/80 px-2 py-1 text-[11px] font-bold uppercase tracking-wider text-slate-600">
                        {event.category}
                      </span>
                      <span className="rounded bg-orange-50 px-2 py-1 text-[11px] font-bold uppercase tracking-wider text-orange-600 border border-orange-100">
                        {event.format}
                      </span>
                    </div>

                    <h3 className="text-xl md:text-2xl font-bold text-slate-900 leading-tight mb-4 group-hover:text-cyan-700 transition-colors line-clamp-2">
                      {event.title}
                    </h3>

                    <div className="flex flex-col gap-2 text-sm text-slate-600 font-medium mb-6">
                      <div className="flex items-center gap-2">
                        <Clock size={16} className="text-cyan-600 shrink-0" />
                        <span className="truncate">{event.time}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin size={16} className="text-cyan-600 shrink-0" />
                        <span className="truncate">{event.location.split(",")[0]}</span>
                      </div>
                    </div>

                    <div className="mt-auto flex items-center justify-between pt-4 border-t border-slate-100">
                      <span className="text-sm font-bold text-cyan-600 group-hover:text-cyan-700 transition-colors">
                        Join the fun
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
        </div>
      </section>

      {/* Past Events Section */}
      <section id="past" className="relative py-24 bg-white overflow-hidden">
        <div className="mx-auto max-w-[1280px] px-6 lg:px-8 relative z-10">
          <div className="mb-16 flex items-center gap-6">
            <h2 className="text-[40px] md:text-[48px] font-extrabold text-slate-900 leading-[1.1] tracking-tight">
              Past <span className="text-slate-400">Events</span>
            </h2>
            <div className="h-px flex-grow bg-gradient-to-r from-slate-200 to-transparent mt-2"></div>
          </div>

          <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6">
            {completed.map((event) => (
              <Link key={event.slug} href={`/events/${event.slug}`} className="group block h-full">
                <article className="flex flex-col w-full h-full bg-slate-50/50 rounded-[20px] p-6 border border-slate-200 shadow-sm transition-all duration-300 hover:shadow-lg hover:-translate-y-1 hover:border-slate-300 hover:bg-white">
                  <div className="flex items-center justify-between mb-5">
                    <div className="rounded-xl border border-slate-100 bg-white px-3 py-2 text-center shadow-sm">
                      <h3 className="text-xl font-bold text-slate-400 group-hover:text-slate-700 transition-colors">
                        {new Date(event.date).getDate()}
                      </h3>
                      <p className="mt-0.5 text-[9px] font-bold uppercase tracking-widest text-slate-400">
                        {new Intl.DateTimeFormat("en-US", { month: "short" }).format(new Date(event.date))}
                      </p>
                    </div>
                    <span className="rounded bg-slate-200/50 px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-slate-500">
                      Completed
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-slate-900 leading-snug mb-3 group-hover:text-cyan-700 transition-colors line-clamp-2">
                    {event.title}
                  </h3>

                  <p className="text-slate-600 text-sm leading-relaxed flex-grow line-clamp-3 mb-5">
                    {event.description}
                  </p>

                  <div className="flex items-center justify-between mt-auto pt-4 border-t border-slate-200/60 text-xs font-semibold text-slate-500">
                    <span className="flex items-center gap-1.5"><MapPin size={14} className="text-slate-400"/> {event.location.split(",")[0]}</span>
                    <span className="bg-white border border-slate-100 px-2.5 py-1 rounded-md">{event.capacity - event.remaining} attended</span>
                  </div>

                  <div className="flex items-center justify-between mt-4">
                    <div className="flex -space-x-3">
                      <div className="w-8 h-8 rounded-full bg-cyan-100 border-2 border-white shadow-sm"></div>
                      <div className="w-8 h-8 rounded-full bg-slate-200 border-2 border-white shadow-sm"></div>
                      <div className="w-8 h-8 rounded-full bg-slate-300 border-2 border-white shadow-sm text-[10px] flex items-center justify-center font-bold text-slate-700">+9</div>
                    </div>
                    <div className="rounded-full bg-white border border-slate-200 px-4 py-2 text-xs font-bold text-slate-600 transition-colors duration-300 group-hover:border-slate-900 group-hover:bg-slate-900 group-hover:text-white shadow-sm">
                      Watch Replay
                    </div>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <Gallery />
      <CTA />
      <Footer />
    </main>
  );
}

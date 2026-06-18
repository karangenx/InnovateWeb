import Link from "next/link";
import {
  ArrowLeft,
  CalendarDays,
  Clock,
  MapPin,
  Share2,
  User,
  ArrowRight,
  CheckCircle2
} from "lucide-react";
import eventsData from "@/data/events.json";

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
  speakers: { name: string; role: string; bio: string }[];
  tags: string[];
};

function formatDate(value: string) {
  return new Intl.DateTimeFormat("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(new Date(value));
}

export default function SingleEventPage({ event }: { event: EventItem }) {
  const moreEvents = (eventsData as EventItem[])
    .filter((item) => item.slug !== event.slug)
    .slice(0, 4);

  return (
    <main className="bg-[#f8fafc] text-slate-900 selection:bg-cyan-200 selection:text-cyan-900">
      {/* Premium Hero Section */}
      <section className="relative pt-[160px] pb-32 bg-slate-950 overflow-hidden">
        <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] rounded-full bg-gradient-to-br from-cyan-600/40 to-blue-600/20 blur-[120px] mix-blend-screen pointer-events-none" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[600px] h-[600px] rounded-full bg-gradient-to-tr from-indigo-600/30 to-purple-600/20 blur-[120px] mix-blend-screen pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(255,255,255,0.03)_1px,_transparent_1px)] bg-[size:24px_24px] pointer-events-none" />
        
        <div className="relative mx-auto max-w-[1280px] px-6 lg:px-8 z-10">
          <Link href="/events" className="inline-flex items-center gap-2 text-cyan-400 hover:text-cyan-300 transition-colors font-medium mb-10 group">
            <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
            Back to Events
          </Link>

          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-12">
            <div className="max-w-3xl">
              <div className="flex flex-wrap items-center gap-3 mb-6">
                <span className="px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-bold uppercase tracking-widest backdrop-blur-md">
                  {event.category}
                </span>
                <span className="px-4 py-2 rounded-full bg-white/5 border border-white/10 text-slate-300 text-xs font-bold uppercase tracking-widest backdrop-blur-md">
                  {event.format}
                </span>
                <span className={`px-4 py-2 rounded-full border text-xs font-bold uppercase tracking-widest backdrop-blur-md ${event.status === 'upcoming' ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400' : 'bg-rose-500/10 border-rose-500/20 text-rose-400'}`}>
                  {event.status}
                </span>
              </div>
              
              <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-white mb-8 leading-[1.1]">
                {event.title}
              </h1>
              <p className="text-xl leading-relaxed text-slate-300 max-w-2xl mb-8">
                {event.description}
              </p>
              
              <div className="flex flex-wrap gap-6 text-sm font-medium text-slate-300">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center border border-white/5">
                    <CalendarDays size={18} className="text-cyan-400" />
                  </div>
                  {formatDate(event.date)}
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center border border-white/5">
                    <Clock size={18} className="text-cyan-400" />
                  </div>
                  {event.time}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <section className="relative -mt-16 pb-24 z-20">
        <div className="mx-auto max-w-[1280px] px-6 lg:px-8">
          <div className="grid lg:grid-cols-[1fr_400px] gap-10 items-start">
            
            {/* Left Content Column */}
            <div className="space-y-10">
              <div className="rounded-[2.5rem] border border-white/60 bg-white/80 backdrop-blur-xl p-8 md:p-12 shadow-[0_20px_40px_rgb(0,0,0,0.04)]">
                <h2 className="text-3xl font-extrabold text-slate-900 mb-6">About the Event</h2>
                <div className="prose prose-slate prose-lg max-w-none text-slate-600 leading-relaxed">
                  {event.about.split('\n').map((paragraph, idx) => (
                    <p key={idx} className="mb-4">{paragraph}</p>
                  ))}
                </div>
                
                <div className="mt-10 flex flex-wrap gap-2">
                  {event.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-xs font-bold uppercase tracking-widest text-slate-500"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {event.agenda && event.agenda.length > 0 && (
                <div className="rounded-[2.5rem] border border-white/60 bg-white/80 backdrop-blur-xl p-8 md:p-12 shadow-[0_20px_40px_rgb(0,0,0,0.04)]">
                  <h2 className="text-3xl font-extrabold text-slate-900 mb-8">Agenda</h2>
                  <div className="space-y-6 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-slate-200 before:to-transparent">
                    {event.agenda.map((item, index) => (
                      <div key={index} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                        <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-white bg-cyan-100 text-cyan-600 shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10">
                          <CheckCircle2 size={16} className="text-cyan-600" />
                        </div>
                        <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-4 rounded-2xl border border-slate-100 bg-white shadow-sm transition-all duration-300 hover:shadow-md">
                          <div className="flex items-center justify-between mb-1">
                            <span className="font-bold text-cyan-600 text-sm">{item.time}</span>
                            <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400 bg-slate-50 px-2 py-1 rounded-md">{item.category}</span>
                          </div>
                          <div className="text-slate-900 font-bold text-lg">{item.title}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

            </div>

            {/* Right Sticky Column */}
            <aside className="lg:sticky lg:top-32 space-y-8">
              {/* RSVP Card */}
              <div className="rounded-[2rem] border border-white bg-white p-8 shadow-[0_20px_60px_rgb(0,0,0,0.08)] relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-cyan-100 to-transparent rounded-bl-full pointer-events-none opacity-50" />
                
                <h3 className="text-2xl font-extrabold text-slate-900 mb-2">Reserve Your Spot</h3>
                <p className="text-sm text-slate-500 mb-6">Join {event.capacity - event.remaining} others attending this event.</p>
                
                <div className="space-y-4 mb-8">
                  <div className="flex items-center gap-4 bg-slate-50 p-4 rounded-2xl border border-slate-100">
                    <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center shadow-sm text-cyan-600">
                      <MapPin size={20} />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Location</p>
                      <p className="text-sm font-bold text-slate-800">{event.location}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 bg-slate-50 p-4 rounded-2xl border border-slate-100">
                    <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center shadow-sm text-cyan-600">
                      <User size={20} />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Availability</p>
                      <p className="text-sm font-bold text-slate-800">{event.remaining} Seats Left <span className="text-slate-400 font-normal">/ {event.capacity} total</span></p>
                    </div>
                  </div>
                </div>

                <div className="grid gap-3">
                  {event.status === 'upcoming' ? (
                    <button className="w-full py-4 rounded-full bg-gradient-to-r from-slate-900 to-slate-800 text-white font-bold text-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5 relative group overflow-hidden">
                      <span className="relative z-10">RSVP Now - Free</span>
                      <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </button>
                  ) : (
                    <button className="w-full py-4 rounded-full bg-gradient-to-r from-slate-900 to-slate-800 text-white font-bold text-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5 relative group overflow-hidden">
                      <span className="relative z-10">Watch Replay</span>
                      <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </button>
                  )}
                  <button className="w-full py-4 rounded-full bg-white text-slate-700 font-bold border-2 border-slate-100 hover:border-cyan-200 hover:text-cyan-700 transition-all duration-300 flex items-center justify-center gap-2">
                    <Share2 size={18} />
                    Share Event
                  </button>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* More Events Section */}
      <section className="bg-white py-24 border-t border-slate-100">
        <div className="mx-auto max-w-[1280px] px-6 lg:px-8">
          <div className="mb-12 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="text-sm font-bold uppercase tracking-widest text-cyan-600 mb-2">What to expect</p>
              <h2 className="text-4xl font-extrabold text-slate-900">More events you'll love</h2>
            </div>
            <Link
              href="/events"
              className="inline-flex items-center justify-center rounded-full border-2 border-slate-100 bg-white px-6 py-3 text-sm font-bold text-slate-900 transition hover:border-cyan-200 hover:bg-cyan-50 hover:text-cyan-700"
            >
              See all events
            </Link>
          </div>

          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {moreEvents.map((item) => (
              <Link key={item.slug} href={`/events/${item.slug}`} className="group flex h-full">
                <article className="flex flex-col w-full h-full rounded-[2rem] border border-slate-100 bg-slate-50 p-6 shadow-sm transition-all duration-500 hover:-translate-y-1 hover:shadow-lg hover:bg-white">
                  <div className="flex items-center justify-between gap-3 mb-6">
                    <p className="text-[10px] font-bold uppercase tracking-widest text-cyan-600">{item.category}</p>
                    <div className="rounded-xl bg-white border border-slate-100 px-3 py-1.5 text-[10px] font-bold uppercase tracking-widest text-slate-600 shadow-sm">
                      {item.format}
                    </div>
                  </div>

                  <p className="text-xl font-bold text-slate-900 group-hover:text-cyan-600 transition-colors mb-4 line-clamp-2">
                    {item.title}
                  </p>

                  <div className="mt-auto flex flex-col gap-3">
                    <div className="flex items-center gap-2 text-sm font-medium text-slate-500">
                      <CalendarDays size={14} className="text-slate-400" />
                      <span>{new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric" }).format(new Date(item.date))}</span>
                    </div>
                    <div className="flex items-center justify-between mt-4">
                      <span className="rounded-full bg-slate-200/50 px-4 py-2 text-xs font-bold text-slate-700 group-hover:bg-cyan-50 group-hover:text-cyan-700 transition-colors">
                        View details
                      </span>
                      <div className="w-8 h-8 rounded-full bg-white shadow-sm flex items-center justify-center text-slate-400 group-hover:text-cyan-600 transition-colors">
                        <ArrowRight size={14} />
                      </div>
                    </div>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

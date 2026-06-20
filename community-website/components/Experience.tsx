"use client";

import Image from "next/image";
import { Check } from "lucide-react";


export default function Experience() {
  return (
    <section id="experience" className="bg-gradient-to-br from-[#020817] via-[#0b1736] to-[#020817] py-24 overflow-hidden relative">
      {/* Background Ornaments */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute -top-[20%] -right-[10%] w-[50%] h-[50%] rounded-full bg-cyan-900/20 blur-[120px]"></div>
        <div className="absolute -bottom-[20%] -left-[10%] w-[50%] h-[50%] rounded-full bg-blue-900/20 blur-[120px]"></div>
      </div>

      <div className="max-w-[1400px] mx-auto px-8 relative z-10">
        <div className="grid lg:grid-cols-[700px_420px] gap-16 items-center justify-center">
          {/* IMAGE SIDE */}
          <div
            className="relative"
          >
            {/* Blur Stat Card */}
            <div
              className="absolute top-12 -left-5 md:-left-10 z-20 w-[120px] h-[120px] rounded-3xl bg-white/10 backdrop-blur-xl border border-white/20 shadow-[0_8px_32px_rgba(0,0,0,0.3)] flex flex-col items-center justify-center transform hover:scale-105 transition-transform"
            >
              <h3 className="text-4xl font-bold text-white tracking-tight">
                350+
              </h3>
              <p className="text-sm font-medium text-cyan-200 mt-1">
                Events
              </p>
            </div>

            {/* Image Border */}
            <div className="rounded-[2.5rem] p-2 bg-gradient-to-b from-white/20 to-white/5 shadow-2xl">
              <div className="rounded-[2rem] overflow-hidden relative group">
                <div className="absolute inset-0 bg-cyan-500/10 group-hover:bg-transparent transition-colors duration-500 z-10 pointer-events-none"></div>
                <Image
                  src="/images/gallery/exp.jpg"
                  alt="Experience"
                  width={900}
                  height={700}
                  quality={100}
                  unoptimized
                  className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
            </div>
          </div>

          {/* CONTENT SIDE */}
          <div
            className="text-white max-w-[420px]"
          >
            <span className="inline-flex items-center px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-300 text-xs font-semibold tracking-wider uppercase shadow-[0_0_15px_rgba(6,182,212,0.1)]">
              The Meetup Experience
            </span>

            <h2 className="text-[44px] md:text-[52px] font-bold leading-tight mt-6 tracking-tight text-white">
              Real Connections.
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">Real Impact.</span>
            </h2>

            <p className="mt-6 text-slate-300 leading-relaxed text-lg">
              Every Innovate Web Social event is crafted
              for meaningful interaction — not just attendance.
              We design spaces where conversations happen
              organically, ideas get born and collaborations
              take root.
            </p>

            <div className="space-y-6 mt-10">
              {[
                "Curated attendee matching before the event",
                "Founder dinners & private networking",
                "Meaningful conversations over vanity metrics"
              ].map((text, i) => (
                <div
                  key={i}
                  className="flex items-center gap-4 group"
                >
                  <div className="w-8 h-8 rounded-lg bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center group-hover:bg-cyan-500/20 transition-colors shadow-[0_0_10px_rgba(6,182,212,0.1)]">
                    <Check size={16} className="text-cyan-400" />
                  </div>
                  <span className="text-[16px] text-slate-200 font-medium group-hover:text-white transition-colors">
                    {text}
                  </span>
                </div>
              ))}
            </div>

            <button
              className="mt-12 px-8 py-4 rounded-full bg-white hover:bg-[#f8fafc] text-[#0b1736] font-semibold text-sm transition-all shadow-lg shadow-black/10 hover:shadow-black/20 hover:-translate-y-[1px]"
            >
              Join The Fun
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

"use client";

import Image from "next/image";
import Link from "next/link";


export default function CTA() {
  return (
    <section className="py-24 bg-[#f8fafc]">
      <div className="max-w-[1588px] mx-auto px-6">
        <div
          className="relative h-[600px] overflow-hidden rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.15)] group"
        >
          {/* Background Image */}
          <div className="absolute inset-0 transition-transform duration-1000 group-hover:scale-105">
            <Image
              src="/images/community.jpg"
              alt="Join Community"
              fill
              priority
              className="object-cover"
            />
          </div>

          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#020817]/90 via-[#0b1736]/60 to-transparent pointer-events-none" />

          {/* Content */}
          <div className="absolute inset-0 flex items-center z-10">
            <div
              className="ml-8 md:ml-16 lg:ml-20 max-w-[560px] bg-white/5 backdrop-blur-2xl border border-white/10 rounded-[2rem] p-10 md:p-12 shadow-2xl relative overflow-hidden"
            >
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-cyan-400 to-blue-500"></div>
              
              {/* Heading */}
              <h2
                className="mt-6 text-white text-[48px] md:text-[60px] font-bold leading-[1.1] tracking-tight"
              >
                Join Our
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-slate-400">Community</span>
              </h2>

              {/* Description */}
              <p
                className="mt-6 text-slate-300 text-lg leading-relaxed"
              >
                Connect with developers, founders, students and innovators.
                Learn, collaborate and grow together through networking,
                workshops, meetups and meaningful opportunities.
              </p>

              {/* Buttons */}
              <div className="mt-10 flex flex-wrap items-center gap-4">
                <a
                  href="https://chat.whatsapp.com/IerKyZQLwNoFcWgaGOjO5N"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-10 py-4 rounded-full bg-white hover:bg-[#f8fafc] text-[#0b1736] font-bold text-lg transition-all shadow-lg shadow-black/10 hover:shadow-black/20 hover:-translate-y-[1px] inline-block text-center"
                >
                  Join The Community
                </a>
                <Link
                  href="/contact"
                  className="px-10 py-4 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold text-lg transition-all shadow-lg shadow-black/10 hover:shadow-black/20 hover:-translate-y-[1px] backdrop-blur-md"
                >
                  Contact Us
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

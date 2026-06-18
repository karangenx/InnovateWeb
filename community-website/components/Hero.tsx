"use client";

import Image from "next/image";
import Link from "next/link";

export default function Hero() {
  return (
    <section
      id="home"
      className="relative min-h-screen pt-[80px] overflow-hidden"
    >
      {/* Background Image - optimized to prevent blur and stretching */}
      <Image
        src="/images/hero.jpg"
        alt="Hero Background"
        fill
        priority
        quality={100}
        unoptimized
        className="object-cover object-center pointer-events-none -z-20"
      />

      {/* Overlay - lightened slightly to keep image visible and clear */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#020817]/80 via-[#0b1736]/40 to-transparent pointer-events-none -z-10"></div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-10 md:px-8 min-h-[calc(100vh-80px)] flex items-center pt-16">
        <div className="max-w-[800px]">
          <h1
            className="
              text-white
              font-bold
              max-w-[800px]
              text-[32px]
              md:text-[48px]
              lg:text-[64px]
              leading-tight
              tracking-tight
              hero-h1
            "
          >
            Empowering Builders. Connecting Innovators.
          </h1>
          <p
            className="mt-8 text-slate-200 text-lg md:text-xl max-w-2xl leading-relaxed font-medium drop-shadow-md"
          >
            Empowering businesses and communities through
            innovation, collaboration, and meaningful
            digital experiences.
          </p>

          <div
            className="mt-10 flex flex-wrap gap-4"
          >
            <a href="https://chat.whatsapp.com/IerKyZQLwNoFcWgaGOjO5N" target="_blank" rel="noopener noreferrer" className="bg-white hover:bg-[#f8fafc] text-[#0b1736] border-2 border-white px-8 py-4 rounded-full text-base font-semibold shadow-lg shadow-black/10 transition-all hover:shadow-black/20 hover:-translate-y-[1px] inline-block text-center">
              Join Community
            </a>
            <Link href="/events" className="border-2 border-white/40 hover:border-white hover:bg-white/10 transition-all px-8 py-4 rounded-full text-white font-semibold backdrop-blur-sm hover:-translate-y-[1px] inline-block text-center">
              Explore Events
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

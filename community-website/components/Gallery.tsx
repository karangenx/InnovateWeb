"use client";

import Image from "next/image";


export default function Gallery() {

  return (
    <section id="gallery" className="py-24 bg-white relative overflow-hidden">
      <div className="absolute top-0 right-0 w-1/3 h-[500px] bg-gradient-to-bl from-cyan-50 to-transparent pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-1/3 h-[500px] bg-gradient-to-tr from-blue-50 to-transparent pointer-events-none"></div>

      <div className="max-w-[1450px] mx-auto px-6 relative z-10">
        {/* Heading */}
        <div
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-2 rounded-full bg-slate-100 text-slate-700 text-sm font-semibold tracking-wide border border-slate-200 mb-4">
            GALLERY
          </span>
          <h2 className="text-[42px] md:text-[52px] font-bold text-[#0b1736] tracking-tight">
            Moments that Matter
          </h2>
          <p className="text-slate-500 mt-6 max-w-2xl mx-auto text-lg leading-relaxed">
            Real people. Real events. Real connections.
            Every photo tells a story of a community that
            shows up for each other.
          </p>
        </div>

        {/* Bento Grid */}
        <div
          className="grid grid-cols-12 gap-4 auto-rows-[150px] md:auto-rows-[180px]"
        >
          {/* Left Large */}
          <div className="col-span-12 md:col-span-5 row-span-2 md:row-span-3 overflow-hidden rounded-2xl group shadow-sm hover:shadow-xl transition-all duration-500 relative">
            <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-500 z-10 pointer-events-none"></div>
            <Image
              src="/images/gallery/g1.jpg"
              alt="Gallery"
              width={1000}
              height={1200}
              className="w-full h-full object-cover group-hover:scale-105 transition duration-700"
            />
          </div>

          {/* Center Top */}
          <div className="col-span-12 md:col-span-5 row-span-2 overflow-hidden rounded-2xl group shadow-sm hover:shadow-xl transition-all duration-500 relative">
            <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-500 z-10 pointer-events-none"></div>
            <Image
              src="/images/gallery/g2.jpg"
              alt="Gallery"
              width={1000}
              height={700}
              className="w-full h-full object-cover group-hover:scale-105 transition duration-700"
            />
          </div>

          {/* Right Top */}
          <div className="col-span-6 md:col-span-2 row-span-1 overflow-hidden rounded-2xl group shadow-sm hover:shadow-xl transition-all duration-500 relative">
            <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-500 z-10 pointer-events-none"></div>
            <Image
              src="/images/gallery/g3.jpg"
              alt="Gallery"
              width={500}
              height={500}
              className="w-full h-full object-cover group-hover:scale-105 transition duration-700"
            />
          </div>

          {/* Right Middle */}
          <div className="col-span-6 md:col-span-2 row-span-1 overflow-hidden rounded-2xl group shadow-sm hover:shadow-xl transition-all duration-500 relative">
            <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-500 z-10 pointer-events-none"></div>
            <Image
              src="/images/gallery/g4.jpg"
              alt="Gallery"
              width={500}
              height={500}
              className="w-full h-full object-cover group-hover:scale-105 transition duration-700"
            />
          </div>

          {/* Center Bottom Left */}
          <div className="col-span-12 md:col-span-5 row-span-1 overflow-hidden rounded-2xl group shadow-sm hover:shadow-xl transition-all duration-500 relative">
            <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-500 z-10 pointer-events-none"></div>
            <Image
              src="/images/gallery/g5.jpg"
              alt="Gallery"
              width={700}
              height={500}
              className="w-full h-full object-cover group-hover:scale-105 transition duration-700"
            />
          </div>

          {/* Center Bottom Right */}
          <div className="col-span-12 md:col-span-2 row-span-1 overflow-hidden rounded-2xl group shadow-sm hover:shadow-xl transition-all duration-500 relative">
            <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-500 z-10 pointer-events-none"></div>
            <Image
              src="/images/gallery/g6.jpg"
              alt="Gallery"
              width={500}
              height={500}
              className="w-full h-full object-cover group-hover:scale-105 transition duration-700"
            />
          </div>

          {/* Bottom Left */}
          <div className="col-span-12 md:col-span-6 row-span-2 overflow-hidden rounded-2xl group shadow-sm hover:shadow-xl transition-all duration-500 relative">
            <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-500 z-10 pointer-events-none"></div>
            <Image
              src="/images/gallery/g7.jpg"
              alt="Gallery"
              width={1200}
              height={800}
              className="w-full h-full object-cover group-hover:scale-105 transition duration-700"
            />
          </div>

          {/* Bottom Right */}
          <div className="col-span-12 md:col-span-6 row-span-2 overflow-hidden rounded-2xl group shadow-sm hover:shadow-xl transition-all duration-500 relative">
            <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-500 z-10"></div>
            <Image
              src="/images/gallery/g8.jpg"
              alt="Gallery"
              width={1200}
              height={800}
              className="w-full h-full object-cover group-hover:scale-105 transition duration-700"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

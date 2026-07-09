"use client";

import { useState } from "react";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";

import { galleryByYear } from "@/data/galleryData";

const galleryImages = Object.entries(galleryByYear)
  .sort((a, b) => Number(b[0]) - Number(a[0]))
  .flatMap(([year, images]) => {
    return images.map((img, idx) => ({
      id: `${year}-${idx}`,
      src: `/images/gallery/${year}/${img}`,
      year
    }));
  });

const filters = ["All", ...Object.keys(galleryByYear).sort((a, b) => Number(b) - Number(a))];

export default function GalleryPage() {
  const [activeYear, setActiveYear] = useState("All");

  const filteredImages = activeYear === "All" 
    ? galleryImages 
    : galleryImages.filter(img => img.year === activeYear);

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Navbar />
      
      <main className="flex-grow pt-[104px]">
        {/* Gallery Hero Section */}
        <section className="relative w-full h-[500px] flex items-center justify-center px-6">
          <Image 
            src="/images/gallery/gmain.jpg" 
            alt="Event Directory Hero" 
            fill 
            quality={100}
            unoptimized
            className="object-cover z-0"
            priority
          />
          {/* Subtle overlay for better text contrast if needed */}
          <div className="absolute inset-0 bg-black/20 z-0"></div>

          {/* Floating White Card */}
          <div className="relative z-10 bg-white/95 backdrop-blur-md rounded-2xl p-8 md:p-12 text-center shadow-2xl max-w-4xl border border-white/40">
            <span className="inline-flex items-center px-4 py-1.5 rounded-full bg-cyan-50 text-cyan-700 text-xs font-bold uppercase tracking-wider mb-4 border border-cyan-100">
              Event Directory
            </span>
            <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-4 tracking-tight">
              Discover All Memories
            </h1>
            <p className="text-slate-500 text-sm md:text-base font-medium max-w-2xl mx-auto">
              Explore conferences, startup meetups, networking sessions, external recruiting, workshops and innovation events.
            </p>
          </div>
        </section>

        {/* Filter & Grid Section */}
        <section className="py-16 md:py-24 px-6 md:px-12 max-w-[1400px] mx-auto">
          
          {/* Filters */}
          <div className="flex flex-wrap justify-center gap-3 mb-16">
            {filters.map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveYear(filter)}
                className={`px-6 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 ${
                  activeYear === filter
                    ? "bg-[#0b1736] text-white shadow-md hover:-translate-y-0.5"
                    : "bg-slate-50 text-slate-600 hover:bg-slate-100 border border-slate-200"
                }`}
              >
                {filter}
              </button>
            ))}
          </div>

          {/* Image Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {filteredImages.map((image, i) => (
              <div 
                key={`${image.id}-${i}`} 
                className="relative aspect-square w-full rounded-xl overflow-hidden bg-slate-100 group cursor-pointer shadow-sm hover:shadow-xl transition-all duration-500"
              >
                <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-500 z-10 pointer-events-none"></div>
                <Image
                  src={image.src}
                  alt={`Gallery Image ${image.year}`}
                  fill
                  quality={100}
                  unoptimized
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                />
              </div>
            ))}
            
            {/* Show empty state if filtering returns no results (though our dummy data shouldn't hit this) */}
            {filteredImages.length === 0 && (
              <div className="col-span-full py-20 text-center">
                <p className="text-slate-500 text-lg font-medium">No events found for {activeYear}.</p>
              </div>
            )}
          </div>
        </section>

        {/* Re-use CTA */}
        <CTA />
      </main>

      <Footer />
    </div>
  );
}

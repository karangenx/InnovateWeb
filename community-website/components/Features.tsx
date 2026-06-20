"use client";


import {
  Users,
  Briefcase,
  GraduationCap,
  Rocket,
} from "lucide-react";

const cards = [
  {
    title: "Networking",
    icon: <Users size={28} />,
    desc: "Connect with developers, founders and professionals from the ecosystem.",
  },
  {
    title: "Learning",
    icon: <GraduationCap size={28} />,
    desc: "Access workshops, mentoring sessions and practical learning opportunities.",
  },
  {
    title: "Career Growth",
    icon: <Briefcase size={28} />,
    desc: "Discover internships, jobs and collaboration opportunities.",
  },
  {
    title: "Innovation",
    icon: <Rocket size={28} />,
    desc: "Build projects, launch ideas and grow with the community.",
  },
];

export default function Features() {
  return (
    <section id="about" className="relative py-28 bg-[#f8fafc] overflow-hidden">
      {/* Background Blur */}
      <div className="absolute -left-20 top-20 h-96 w-96 bg-cyan-400/20 blur-[100px] rounded-full pointer-events-none"></div>
      <div className="absolute -right-20 bottom-10 h-96 w-96 bg-blue-500/10 blur-[100px] rounded-full pointer-events-none"></div>

      <div className="relative max-w-7xl mx-auto px-6 z-10">
        {/* Badge */}
        <div
          className="flex justify-center"
        >
          <span className="bg-cyan-100 text-cyan-800 font-semibold text-sm px-5 py-2 rounded-full shadow-sm border border-cyan-200">
            Join The Fun
          </span>
        </div>

        {/* Heading */}
        <h2
          className="text-center text-3xl md:text-5xl font-bold text-[#0b1736] mt-6 max-w-3xl mx-auto leading-tight"
        >
          Everything you need to thrive in the ecosystem
        </h2>

        {/* Cards */}
        <div
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mt-16"
        >
          {cards.map((card, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl p-8 shadow-[0_4px_20px_rgb(0,0,0,0.03)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-all duration-300 border border-slate-100 hover:-translate-y-1 group"
            >
              <div className="w-14 h-14 bg-slate-50 group-hover:bg-cyan-50 rounded-xl flex items-center justify-center text-[#0b1736] group-hover:text-cyan-600 transition-colors shadow-sm border border-slate-100">
                {card.icon}
              </div>
              <h3 className="mt-6 text-xl font-semibold text-[#0b1736]">
                {card.title}
              </h3>
              <p className="mt-3 text-slate-500 leading-relaxed text-sm">
                {card.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Button */}
        <div
          className="flex justify-center mt-14"
        >
          <a href="https://chat.whatsapp.com/IerKyZQLwNoFcWgaGOjO5N" target="_blank" rel="noopener noreferrer" className="bg-white hover:bg-[#f8fafc] text-[#0b1736] border-2 border-[#0b1736] px-8 py-3 rounded-full text-sm font-semibold shadow-lg shadow-blue-900/10 transition-all hover:shadow-blue-900/20 hover:-translate-y-[1px] inline-block text-center">
            Join The Community
          </a>
        </div>
      </div>
    </section>
  );
}

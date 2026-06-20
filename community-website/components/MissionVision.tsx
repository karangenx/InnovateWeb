"use client";


import {
  Target,
  Lightbulb,
  Handshake,
  Flame,
  Globe,
  Rocket,
  CheckCircle,
} from "lucide-react";

export default function MissionVision() {
  return (
    <section className="bg-[#f8fafc] py-24 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-cyan-50/50 to-transparent pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Top Badge */}
        <div
          className="flex justify-center"
        >
          <span className="bg-cyan-100 text-cyan-800 text-sm px-5 py-2 rounded-full font-semibold border border-cyan-200">
            WHO WE ARE
          </span>
        </div>

        {/* Heading */}
        <h2
          className="text-center text-4xl md:text-5xl font-bold text-[#0b1736] mt-6"
        >
          Our Mission & Vision
        </h2>

        <div
          className="w-24 h-1.5 bg-gradient-to-r from-cyan-500 to-blue-500 mx-auto mt-6 rounded-full"
        ></div>

        <p
          className="text-center text-slate-500 mt-6 max-w-2xl mx-auto text-lg"
        >
          We exist to connect passionate innovators and
          create opportunities for learning, networking
          and community growth.
        </p>

        {/* Cards */}
        <div className="grid lg:grid-cols-2 gap-8 mt-16">
          {/* Mission */}
          <div
            className="bg-[#0b1736] text-white rounded-[2rem] p-10 relative overflow-hidden shadow-2xl shadow-blue-900/10 group hover:-translate-y-1 transition-transform duration-300"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl group-hover:bg-cyan-500/20 transition-colors"></div>

            <div className="w-16 h-16 rounded-2xl bg-white/10 flex items-center justify-center backdrop-blur-md border border-white/5">
              <Target className="text-cyan-400" size={32} />
            </div>

            <span className="inline-block mt-8 bg-cyan-900/50 text-cyan-200 border border-cyan-800/50 px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wider">
              Our Mission
            </span>

            <h3 className="text-3xl md:text-4xl font-bold mt-5">
              Empowering Every Builder
            </h3>

            <p className="mt-5 text-slate-300 leading-relaxed text-lg">
              To democratize access to knowledge,
              opportunities and mentorship for
              students, developers and founders.
            </p>

            <div className="space-y-4 mt-10">
              <div className="flex items-center gap-4 text-slate-200">
                <CheckCircle size={20} className="text-cyan-400" />
                <span className="font-medium">Host 200+ events annually</span>
              </div>
              <div className="flex items-center gap-4 text-slate-200">
                <CheckCircle size={20} className="text-cyan-400" />
                <span className="font-medium">Connect 10,000+ members</span>
              </div>
              <div className="flex items-center gap-4 text-slate-200">
                <CheckCircle size={20} className="text-cyan-400" />
                <span className="font-medium">Create startup opportunities</span>
              </div>
            </div>
          </div>

          {/* Vision */}
          <div
            className="bg-white border border-slate-100 rounded-[2rem] p-10 shadow-[0_8px_30px_rgb(0,0,0,0.04)] group hover:-translate-y-1 hover:shadow-[0_8px_40px_rgb(0,0,0,0.08)] transition-all duration-300"
          >
            <div className="w-16 h-16 rounded-2xl bg-cyan-50 flex items-center justify-center border border-cyan-100 group-hover:bg-cyan-100 transition-colors">
              <Lightbulb className="text-cyan-600" size={32} />
            </div>

            <span className="inline-block mt-8 bg-cyan-50 text-cyan-700 border border-cyan-100 px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wider">
              Our Vision
            </span>

            <h3 className="text-3xl md:text-4xl font-bold text-[#0b1736] mt-5">
              India's #1 Builder Community
            </h3>

            <p className="mt-5 text-slate-500 leading-relaxed text-lg">
              Creating a thriving ecosystem where
              innovators, entrepreneurs and builders
              support each other and launch impactful
              products.
            </p>

            <div className="space-y-4 mt-10">
              <div className="flex items-center gap-4 text-slate-700">
                <CheckCircle size={20} className="text-cyan-500" />
                <span className="font-medium">Community chapter in every city</span>
              </div>
              <div className="flex items-center gap-4 text-slate-700">
                <CheckCircle size={20} className="text-cyan-500" />
                <span className="font-medium">Mentorship from industry leaders</span>
              </div>
              <div className="flex items-center gap-4 text-slate-700">
                <CheckCircle size={20} className="text-cyan-500" />
                <span className="font-medium">Launchpad for future startups</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Values */}
        <div
          className="grid sm:grid-cols-2 md:grid-cols-4 gap-6 mt-16"
        >
          <div className="bg-white rounded-2xl p-8 text-center shadow-sm border border-slate-100 hover:shadow-md hover:-translate-y-1 transition-all duration-300 group">
            <div className="w-12 h-12 mx-auto bg-amber-50 rounded-full flex items-center justify-center group-hover:bg-amber-100 transition-colors">
              <Handshake className="text-amber-500" />
            </div>
            <h4 className="font-bold text-[#0b1736] mt-5 text-lg">Collaboration</h4>
            <p className="text-slate-500 text-sm mt-2 leading-relaxed">
              Building together is always stronger.
            </p>
          </div>

          <div className="bg-white rounded-2xl p-8 text-center shadow-sm border border-slate-100 hover:shadow-md hover:-translate-y-1 transition-all duration-300 group">
            <div className="w-12 h-12 mx-auto bg-orange-50 rounded-full flex items-center justify-center group-hover:bg-orange-100 transition-colors">
              <Flame className="text-orange-500" />
            </div>
            <h4 className="font-bold text-[#0b1736] mt-5 text-lg">Passion</h4>
            <p className="text-slate-500 text-sm mt-2 leading-relaxed">
              Curiosity and relentless drive.
            </p>
          </div>

          <div className="bg-white rounded-2xl p-8 text-center shadow-sm border border-slate-100 hover:shadow-md hover:-translate-y-1 transition-all duration-300 group">
            <div className="w-12 h-12 mx-auto bg-cyan-50 rounded-full flex items-center justify-center group-hover:bg-cyan-100 transition-colors">
              <Globe className="text-cyan-500" />
            </div>
            <h4 className="font-bold text-[#0b1736] mt-5 text-lg">Inclusivity</h4>
            <p className="text-slate-500 text-sm mt-2 leading-relaxed">
              Everyone deserves a seat at the table.
            </p>
          </div>

          <div className="bg-white rounded-2xl p-8 text-center shadow-sm border border-slate-100 hover:shadow-md hover:-translate-y-1 transition-all duration-300 group">
            <div className="w-12 h-12 mx-auto bg-pink-50 rounded-full flex items-center justify-center group-hover:bg-pink-100 transition-colors">
              <Rocket className="text-pink-500" />
            </div>
            <h4 className="font-bold text-[#0b1736] mt-5 text-lg">Impact</h4>
            <p className="text-slate-500 text-sm mt-2 leading-relaxed">
              Creating measurable positive change.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

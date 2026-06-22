"use client";

const statsData = [
  { 
    value: "12k+", 
    label: "Members", 
    left: 115, top: 85,
    iconBg: "bg-cyan-500/20",
    iconClass: "fa-solid fa-users",
    textClass: "text-cyan-200"
  },
  { 
    value: "350+", 
    label: "Events", 
    left: 365, top: 175,
    iconBg: "bg-blue-500/20",
    iconClass: "fa-solid fa-calendar-check",
    textClass: "text-blue-200"
  },
  { 
    value: "120+", 
    label: "Startups", 
    left: 615, top: 85,
    iconBg: "bg-purple-500/20",
    iconClass: "fa-solid fa-rocket",
    textClass: "text-purple-200"
  },
  { 
    value: "50+", 
    label: "Mentors", 
    left: 865, top: 175,
    iconBg: "bg-pink-500/20",
    iconClass: "fa-solid fa-chalkboard-user",
    textClass: "text-pink-200"
  },
  { 
    value: "25+", 
    label: "Cities", 
    left: 1115, top: 85,
    iconBg: "bg-amber-500/20",
    iconClass: "fa-solid fa-city",
    textClass: "text-amber-200"
  },
  { 
    value: "98%", 
    label: "Satisfaction", 
    left: 1365, top: 175,
    iconBg: "bg-emerald-500/20",
    iconClass: "fa-solid fa-face-smile",
    textClass: "text-emerald-200"
  },
];

export default function Stats() {
  return (
    <section className="relative lg:h-[340px] bg-gradient-to-r from-[#0b1736] via-[#12284d] to-[#0b1736] overflow-hidden py-16 lg:py-0">
      <div className="absolute inset-0 bg-[url('/images/grid.svg')] bg-center opacity-10 pointer-events-none"></div>

      {/* MOBILE / TABLET VIEW (Grid Layout) */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:hidden">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
          {statsData.map((stat, idx) => (
            <div 
              key={idx}
              className="bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 shadow-[0_8px_32px_rgba(0,0,0,0.3)] flex flex-col items-center justify-center p-6 hover:bg-white/20 transition-colors"
            >
              <div className={`w-8 h-8 ${stat.iconBg} rounded-lg mb-2 flex items-center justify-center shadow-inner relative z-20`}>
                 <i className={`${stat.iconClass} ${stat.textClass} text-sm drop-shadow-sm`}></i>
              </div>
              <h3 className="font-bold text-white text-2xl sm:text-3xl">{stat.value}</h3>
              <p className={`text-[10px] sm:text-xs ${stat.textClass} font-semibold tracking-wider uppercase mt-1`}>{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
      
      {/* DESKTOP VIEW (SVG Timeline) */}
      <div className="hidden lg:block relative w-full h-full overflow-hidden">
        <div className="flex justify-center min-w-full w-max h-full">
          <div className="relative w-[1728px] shrink-0 h-full">
            {/* Thread */}
            <svg
              className="absolute inset-0 w-full h-full pointer-events-none"
              viewBox="0 0 1728 340"
              fill="none"
            >
              <path
                d="
                  M 75 146
                  C 150 86, 250 86, 325 146
                  S 500 206, 575 146
                  S 750 86, 825 146
                  S 1000 206, 1075 146
                  S 1250 86, 1325 146
                  S 1500 206, 1575 146
                  S 1750 86, 1825 146
                "
                stroke="url(#gradient)"
                strokeWidth="3"
                strokeDasharray="6 8"
                strokeLinecap="round"
              />
              <defs>
                <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#22d3ee" />
                  <stop offset="50%" stopColor="#3b82f6" />
                  <stop offset="100%" stopColor="#8b5cf6" />
                </linearGradient>
              </defs>
            </svg>

            {/* Cards */}
            {statsData.map((stat, idx) => (
              <div 
                key={idx}
                className="absolute w-[170px] py-3 h-auto min-h-[90px] bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 shadow-[0_8px_32px_rgba(0,0,0,0.3)] flex flex-col items-center justify-center z-10 hover:bg-white/20 transition-colors"
                style={{ left: `${stat.left}px`, top: `${stat.top}px` }}
              >
                <div className={`w-8 h-8 ${stat.iconBg} rounded-lg mb-1 flex items-center justify-center shadow-inner relative z-20`}>
                 <i className={`${stat.iconClass} ${stat.textClass} text-sm drop-shadow-sm`}></i>
              </div>
                <h3 className="font-bold text-white text-xl">{stat.value}</h3>
                <p className={`text-[10px] ${stat.textClass} font-semibold tracking-wider uppercase`}>{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

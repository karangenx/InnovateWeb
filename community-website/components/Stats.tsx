"use client";



export default function Stats() {

  return (
    <section className="relative h-[340px] bg-gradient-to-r from-[#0b1736] via-[#12284d] to-[#0b1736] overflow-hidden">
      <div className="absolute inset-0 bg-[url('/images/grid.svg')] bg-center opacity-10 pointer-events-none"></div>
      
      <div className="relative w-full h-full overflow-x-auto overflow-y-hidden [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
        <div className="flex lg:justify-center min-w-full w-max h-full">
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

            {/* Card 1 */}
            <div 
              className="absolute left-[115px] top-[85px] w-[170px] h-[80px] bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 shadow-[0_8px_32px_rgba(0,0,0,0.3)] flex flex-col items-center justify-center z-10 hover:bg-white/20 transition-colors"
            >
              <div className="w-8 h-8 bg-cyan-500/20 rounded-lg mb-1 flex items-center justify-center shadow-inner relative z-20">
                 <div className="w-2 h-2 bg-cyan-400 rounded-full"></div>
              </div>
              <h3 className="font-bold text-white text-xl">12k+</h3>
              <p className="text-[10px] text-cyan-200 font-semibold tracking-wider uppercase">Members</p>
            </div>

            {/* Card 2 */}
            <div 
              className="absolute left-[365px] top-[175px] w-[170px] h-[80px] bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 shadow-[0_8px_32px_rgba(0,0,0,0.3)] flex flex-col items-center justify-center z-10 hover:bg-white/20 transition-colors"
            >
              <div className="w-8 h-8 bg-blue-500/20 rounded-lg mb-1 flex items-center justify-center shadow-inner relative z-20">
                 <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
              </div>
              <h3 className="font-bold text-white text-xl">350+</h3>
              <p className="text-[10px] text-blue-200 font-semibold tracking-wider uppercase">Events</p>
            </div>

            {/* Card 3 */}
            <div 
              className="absolute left-[615px] top-[85px] w-[170px] h-[80px] bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 shadow-[0_8px_32px_rgba(0,0,0,0.3)] flex flex-col items-center justify-center z-10 hover:bg-white/20 transition-colors"
            >
              <div className="w-8 h-8 bg-purple-500/20 rounded-lg mb-1 flex items-center justify-center shadow-inner relative z-20">
                 <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
              </div>
              <h3 className="font-bold text-white text-xl">120+</h3>
              <p className="text-[10px] text-purple-200 font-semibold tracking-wider uppercase">Startups</p>
            </div>

            {/* Card 4 */}
            <div 
              className="absolute left-[865px] top-[175px] w-[170px] h-[80px] bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 shadow-[0_8px_32px_rgba(0,0,0,0.3)] flex flex-col items-center justify-center z-10 hover:bg-white/20 transition-colors"
            >
              <div className="w-8 h-8 bg-pink-500/20 rounded-lg mb-1 flex items-center justify-center shadow-inner relative z-20">
                 <div className="w-2 h-2 bg-pink-400 rounded-full"></div>
              </div>
              <h3 className="font-bold text-white text-xl">50+</h3>
              <p className="text-[10px] text-pink-200 font-semibold tracking-wider uppercase">Mentors</p>
            </div>

            {/* Card 5 */}
            <div 
              className="absolute left-[1115px] top-[85px] w-[170px] h-[80px] bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 shadow-[0_8px_32px_rgba(0,0,0,0.3)] flex flex-col items-center justify-center z-10 hover:bg-white/20 transition-colors"
            >
              <div className="w-8 h-8 bg-amber-500/20 rounded-lg mb-1 flex items-center justify-center shadow-inner relative z-20">
                 <div className="w-2 h-2 bg-amber-400 rounded-full"></div>
              </div>
              <h3 className="font-bold text-white text-xl">25+</h3>
              <p className="text-[10px] text-amber-200 font-semibold tracking-wider uppercase">Cities</p>
            </div>

            {/* Card 6 */}
            <div 
              className="absolute left-[1365px] top-[175px] w-[170px] h-[80px] bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 shadow-[0_8px_32px_rgba(0,0,0,0.3)] flex flex-col items-center justify-center z-10 hover:bg-white/20 transition-colors"
            >
              <div className="w-8 h-8 bg-emerald-500/20 rounded-lg mb-1 flex items-center justify-center shadow-inner relative z-20">
                 <div className="w-2 h-2 bg-emerald-400 rounded-full"></div>
              </div>
              <h3 className="font-bold text-white text-xl">98%</h3>
              <p className="text-[10px] text-emerald-200 font-semibold tracking-wider uppercase">Satisfaction</p>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}

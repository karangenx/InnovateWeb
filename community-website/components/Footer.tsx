import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-[#020817] text-white border-t border-white/10 relative overflow-hidden py-16">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-2xl h-1 bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent"></div>
      <div className="absolute -top-[220px] left-1/2 -translate-x-1/2 w-[850px] h-[420px] bg-cyan-500/5 blur-[120px] rounded-full pointer-events-none"></div>

      <div className="max-w-[1400px] mx-auto px-10 relative z-10 flex flex-col items-center text-center gap-10">
        <div className="bg-white/5 backdrop-blur-md border border-white/8 inline-flex items-center p-4 rounded-2xl">
          <Image
            src="/images/logo.png"
            alt="Innovate Web"
            width={140}
            height={40}
            className="object-contain brightness-0 invert"
          />
        </div>

        <p className="max-w-md text-slate-300 text-sm leading-7">
          A minimal hub for builders, creators, and founders. Explore events, connect with peers, and bring your ideas to life in one calm, focused community.
        </p>

        <div className="flex items-center gap-4">
          <a href="https://www.instagram.com/innovatewebsocial/" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="w-10 h-10 rounded-full bg-white/5 border border-white/8 flex items-center justify-center text-slate-400 hover:text-cyan-400 hover:bg-cyan-400/10 transition">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
          </a>
          <a href="#" aria-label="LinkedIn" className="w-10 h-10 rounded-full bg-white/5 border border-white/8 flex items-center justify-center text-slate-400 hover:text-cyan-400 hover:bg-cyan-400/10 transition">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>
          </a>
          <a href="https://www.facebook.com/share/1DRKuBmJD6/" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="w-10 h-10 rounded-full bg-white/5 border border-white/8 flex items-center justify-center text-slate-400 hover:text-cyan-400 hover:bg-cyan-400/10 transition">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
          </a>
        </div>

        <div className="flex flex-wrap justify-center gap-6 text-sm text-slate-400">
          <Link href="/" className="hover:text-cyan-400 transition">Home</Link>
          <Link href="/#about" className="hover:text-cyan-400 transition">About</Link>
          <Link href="/gallery" className="hover:text-cyan-400 transition">Gallery</Link>
          <Link href="/events" className="hover:text-cyan-400 transition">Events</Link>
        </div>

        <div className="w-full border-t border-white/10" />

        <p className="text-slate-500 text-xs tracking-[0.08em] uppercase">
          © {new Date().getFullYear()} Innovate Web — a minimal community for builders, creators, and founders.
        </p>
      </div>
    </footer>
  );
}

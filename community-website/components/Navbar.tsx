"use client";

import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const pathname = usePathname() || "/";
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isDesktop, setIsDesktop] = useState(true);
  const [activeHash, setActiveHash] = useState("");

  const isHome = pathname === "/";
  const isEvents = pathname === "/events" || pathname.startsWith("/events/");
  const isGallery = pathname === "/gallery" || pathname.startsWith("/gallery/");
  const isLightThemeRoute = pathname.startsWith("/contact") || pathname.startsWith("/gallery");

  const isLight = isScrolled || isLightThemeRoute;

  // Handle scroll effects and screen size
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsDesktop(true);
        setIsMenuOpen(false);
      } else {
        setIsDesktop(false);
      }
    };

    // Initial checks
    handleScroll();
    handleResize();

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleResize);

    // Hash change handling
    setActiveHash(window.location.hash);
    const handleHashChange = () => {
      setActiveHash(window.location.hash);
    };
    window.addEventListener("hashchange", handleHashChange);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("hashchange", handleHashChange);
    };
  }, []);

  // Close menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  const navLinks = [
    { name: "Home", href: "/", active: false },
    { name: "About", href: "/#about", active: false },
    { name: "Gallery", href: "/gallery", active: isGallery },
    { name: "Events", href: "/events", active: isEvents },
  ];

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ease-out ${isLight ? "py-3" : "py-6"
        }`}
    >
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 md:px-8 relative z-20">
        <div
          className={`relative flex items-center justify-between rounded-full border transition-all duration-500 ease-out ${isLight
            ? "bg-white/85 border-slate-200 shadow-[0_8px_32px_rgba(0,0,0,0.06)] backdrop-blur-xl px-5 py-3 md:px-8 md:py-3"
            : "bg-[#0b1736]/40 border-white/10 shadow-lg backdrop-blur-md px-6 py-4 md:px-10 md:py-5"
            }`}
        >
          {/* Logo */}
          <div className="flex items-center flex-shrink-0 relative z-30">
            <Link href="/" className="hover:opacity-80 transition-opacity">
              <Image
                src="/images/logo.png"
                alt="Innovate Web"
                width={isLight ? 140 : 160}
                height={40}
                priority
                className={`object-contain transition-all duration-300 ${isLight ? 'brightness-100' : 'brightness-0 invert'}`}
              />
            </Link>
          </div>

          {/* Desktop Menu */}
          <nav className="hidden md:flex items-center gap-6 lg:gap-10 flex-1 justify-center px-4 relative z-20">
            {navLinks.map((link) => {
              // Determine if this link is currently active based on hash or pathname
              const isActive = (pathname === "/" && link.name === "Home" && (activeHash === "" || activeHash === "#home")) || 
                               (pathname === "/" && link.name !== "Home" && activeHash === link.href.replace("/", "")) ||
                               (isEvents && link.name === "Events") ||
                               (isGallery && link.name === "Gallery") ||
                               link.active;

              return (
              <Link
                key={link.name}
                href={link.href}
                onClick={(e) => {
                  if (link.href.startsWith("/#") && isHome) {
                    e.preventDefault();
                    const targetId = link.href.substring(2);
                    const targetElement = document.getElementById(targetId);
                    if (targetElement) {
                      window.history.pushState(null, "", `#${targetId}`);
                      setActiveHash(`#${targetId}`);
                      targetElement.scrollIntoView({ behavior: "smooth" });
                    }
                  } else if (link.href === "/" && isHome) {
                    e.preventDefault();
                    window.history.pushState(null, "", "/");
                    setActiveHash("");
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }
                }}
                className={`text-[14px] lg:text-[15px] font-semibold tracking-wide transition-all duration-300 relative group py-2 ${isActive
                  ? "text-cyan-500"
                  : isLight
                    ? "text-slate-600 hover:text-slate-900"
                    : "text-slate-300 hover:text-white"
                  }`}
              >
                {link.name}
                <span
                  className={`absolute left-0 bottom-0 h-[2px] w-full rounded-full transition-all duration-300 origin-center ${isActive
                    ? "bg-cyan-500 scale-x-100 opacity-100"
                    : "bg-cyan-500 scale-x-0 opacity-0 group-hover:scale-x-100 group-hover:opacity-100"
                    }`}
                />
              </Link>
            )})}
          </nav>

          {/* CTA Button */}
          <div className="hidden md:flex flex-shrink-0 relative z-30 ml-2">
            <a
              href="https://chat.whatsapp.com/IerKyZQLwNoFcWgaGOjO5N"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative overflow-hidden rounded-full bg-cyan-500 px-8 py-3 font-bold text-white transition-all duration-300 hover:bg-cyan-400 hover:shadow-[0_0_30px_rgba(6,182,212,0.7)] hover:scale-105 inline-block text-center"
            >
              {/* Shine Animation */}
              <span className="absolute inset-0 flex h-full w-full justify-center [transform:skew(-20deg)_translateX(-150%)] group-hover:[transform:skew(-20deg)_translateX(150%)] transition-transform duration-700 ease-in-out">
                <div className="h-full w-12 bg-white/40 blur-[2px]" />
              </span>

              <span className="relative flex items-center gap-2 text-sm tracking-wide">
                Join Community
              </span>
            </a>
          </div>
          {/* Mobile Menu Button */}
          {!isDesktop && (
            <div className="flex items-center relative z-30 md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className={`p-2 rounded-full transition-colors ${isLight
                  ? "bg-slate-100 text-slate-800 hover:bg-slate-200"
                  : "bg-white/10 text-white hover:bg-white/20"
                  }`}
                aria-label="Toggle menu"
              >
                {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          )}
        </div>

        {/* Mobile Menu Overlay */}
        {!isDesktop && (
          <div
            className={`absolute top-[120%] left-4 right-4 backdrop-blur-xl rounded-3xl overflow-hidden transition-all duration-500 shadow-[0_20px_40px_rgba(0,0,0,0.3)] origin-top md:hidden ${isLight
              ? "bg-white/95 border border-slate-200"
              : "bg-[#0b1736]/95 border border-white/10"
              } ${isMenuOpen
                ? "opacity-100 scale-y-100 translate-y-0 pointer-events-auto"
                : "opacity-0 scale-y-95 -translate-y-4 pointer-events-none"
              }`}
          >
            <nav className="flex flex-col p-6 gap-3">
              {navLinks.map((link) => {
                const isActive = (pathname === "/" && link.name === "Home" && (activeHash === "" || activeHash === "#home")) || 
                                 (pathname === "/" && link.name !== "Home" && activeHash === link.href.replace("/", "")) ||
                                 (isEvents && link.name === "Events") ||
                                 (isGallery && link.name === "Gallery") ||
                                 link.active;

                return (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={(e) => {
                    if (link.href.startsWith("/#") && isHome) {
                      e.preventDefault();
                      const targetId = link.href.substring(2);
                      const targetElement = document.getElementById(targetId);
                      if (targetElement) {
                        window.history.pushState(null, "", `#${targetId}`);
                        setActiveHash(`#${targetId}`);
                        targetElement.scrollIntoView({ behavior: "smooth" });
                      }
                      setIsMenuOpen(false);
                    } else if (link.href === "/" && isHome) {
                      e.preventDefault();
                      window.history.pushState(null, "", "/");
                      setActiveHash("");
                      window.scrollTo({ top: 0, behavior: "smooth" });
                      setIsMenuOpen(false);
                    } else {
                      setIsMenuOpen(false);
                    }
                  }}
                  className={`px-5 py-4 rounded-2xl transition-all duration-300 text-base font-semibold ${isActive
                    ? isLight ? "bg-cyan-50 text-cyan-700" : "bg-cyan-500/20 text-cyan-400"
                    : isLight ? "text-slate-600 hover:bg-slate-50 hover:text-slate-900" : "text-slate-300 hover:bg-white/5 hover:text-white"
                    }`}
                >
                  {link.name}
                </Link>
              )})}
              <a href="https://chat.whatsapp.com/IerKyZQLwNoFcWgaGOjO5N" target="_blank" rel="noopener noreferrer" className="mt-4 group relative overflow-hidden bg-gradient-to-r from-cyan-600 to-blue-700 px-6 py-4 rounded-2xl text-base font-bold text-white shadow-lg transition-all duration-300 w-full hover:shadow-[0_0_40px_-10px_rgba(6,182,212,0.8)] block text-center">
                <span className="absolute inset-0 bg-gradient-to-r from-cyan-500 via-blue-500 to-cyan-500 opacity-0 transition-opacity duration-300 group-hover:opacity-100"></span>
                <span className="relative flex items-center justify-center gap-2">
                  Join Community
                </span>
              </a>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}

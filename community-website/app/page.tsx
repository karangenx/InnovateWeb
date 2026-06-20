import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import MissionVision from "@/components/MissionVision";
import LogoStrip from "@/components/LogoStrip";
import Experience from "@/components/Experience";
import UpcomingEvents from "@/components/UpcomingEvents";
import Gallery from "@/components/Gallery";
import Stats from "@/components/Stats";
import CTA from "@/components/CTA";
import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <Features />
      <MissionVision />
      <LogoStrip />
      <Experience />
      <UpcomingEvents />
      <Gallery />
      <Stats />
      <CTA />
      <FAQ />
      <Footer />
    </>
  );
}
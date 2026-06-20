"use client";

import { useState, useRef, useLayoutEffect } from "react";
import { ChevronDown } from "lucide-react";
import Link from "next/link";

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [contentHeights, setContentHeights] = useState<Record<number, number>>({});
  const contentRefs = useRef<(HTMLDivElement | null)[]>([]);

  const faqs = [
    {
      question: "How much does Innovate Web membership cost?",
      answer:
        "Innovate Web community membership is completely free. Members can participate in networking events, workshops and discussions without any charges. We believe in making tech community access barrier-free for everyone.",
    },
    {
      question: "What kind of events do you organize?",
      answer:
        "We organize a diverse range of events including networking meetups, hands-on workshops, competitive hackathons, inspiring founder talks, and casual startup meetups. Our events cater to all skill levels, from beginners to experienced professionals.",
    },
    {
      question: "How does Innovate Web use my data?",
      answer:
        "Your data is only used for event registrations and community communication. We never sell your information to third parties. You can request data deletion at any time by contacting our support team.",
    },
    {
      question: "Can students join the community?",
      answer:
        "Absolutely! Students, developers, founders, designers, and tech enthusiasts of all backgrounds are welcome. We especially encourage students to join as they can benefit greatly from mentorship and networking opportunities.",
    },
    {
      question: "Do you provide networking opportunities?",
      answer:
        "Yes, networking is at the core of what we do. We facilitate connections between members and industry professionals, startups seeking talent, and experienced mentors willing to guide the next generation of builders.",
    },
  ];

  // Measure content heights for smooth animation and update on resize/open
  useLayoutEffect(() => {
    const measure = () => {
      const heights: Record<number, number> = {};
      faqs.forEach((_, index) => {
        const ref = contentRefs.current[index];
        heights[index] = ref ? ref.scrollHeight : 0;
      });
      setContentHeights(heights);
    };

    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [faqs.length, openIndex]);

  const toggle = (index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  return (
    <section className="relative z-20 py-20 md:py-28 bg-white overflow-hidden">
      {/* Background blurs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -right-40 w-[500px] h-[500px] bg-cyan-50/50 rounded-full blur-[100px]" />
        <div className="absolute bottom-0 -left-40 w-[500px] h-[500px] bg-blue-50/50 rounded-full blur-[100px]" />
      </div>

      <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center mb-12 md:mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full bg-slate-100 text-slate-600 text-xs font-semibold tracking-wider uppercase border border-slate-200 mb-5">
            Got Questions?
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900 tracking-tight leading-tight">
            Frequently Asked{" "}
            <span className="text-[#0b1736]">Questions</span>
          </h2>
          <p className="text-slate-500 mt-4 max-w-lg mx-auto text-base md:text-lg leading-relaxed">
            Everything you need to know about Innovate Web. Can&apos;t find the answer you&apos;re looking for? Reach out to our team.
          </p>
        </div>

        {/* Accordion */}
        <div className="space-y-4 mb-12 md:mb-16">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            const contentHeight = contentHeights[index] || 0;

            return (
              <div
                key={index}
                className={`relative rounded-2xl border border-slate-200/80 bg-white shadow-sm overflow-hidden transition-all duration-300 ${isOpen ? 'scale-[1.001]' : ''}`}
                style={{
                  boxShadow: isOpen
                    ? "0 10px 40px rgba(11,23,54,0.08)"
                    : "0 1px 3px rgba(0,0,0,0.04)",
                  zIndex: isOpen ? 20 : undefined,
                }}
              >
                {/* Question button */}
                <button
                  type="button"
                  id={`faq-button-${index}`}
                  aria-controls={`faq-content-${index}`}
                  onClick={() => toggle(index)}
                  style={{ touchAction: 'manipulation' }}
                  className="relative z-10 w-full flex items-center justify-between p-4 md:p-5 text-left cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0b1736]/20 focus-visible:ring-offset-2 group hover:bg-slate-50"
                  aria-expanded={isOpen}
                >
                  <span
                    className="text-base md:text-lg font-semibold pr-6 leading-snug"
                    style={{
                      color: isOpen ? "#0b1736" : "#334155",
                    }}
                  >
                    {faq.question}
                  </span>

                  <div
                    className="shrink-0 w-9 h-9 md:w-10 md:h-10 rounded-xl flex items-center justify-center transition-all duration-300"
                    style={{
                      backgroundColor: isOpen ? "#0b1736" : "#f1f5f9",
                      color: isOpen ? "#ffffff" : "#64748b",
                    }}
                  >
                    <ChevronDown
                      size={18}
                      strokeWidth={2.5}
                      className="transition-transform duration-300"
                      style={{
                        transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
                      }}
                    />
                  </div>
                </button>

                {/* Answer with smooth height animation */}
                <div
                  className="overflow-hidden transition-all duration-300 ease-out"
                  style={{
                    maxHeight: isOpen ? contentHeight + 64 : 0,
                    opacity: isOpen ? 1 : 0,
                  }}
                >
                  <div
                    id={`faq-content-${index}`}
                    ref={(el) => { contentRefs.current[index] = el; }}
                    role="region"
                    aria-labelledby={`faq-button-${index}`}
                    className="px-5 md:px-6 pb-6"
                  >
                    <div className="h-px w-full bg-gradient-to-r from-slate-200 via-slate-100 to-transparent mb-4" />
                    <p className="text-slate-600 leading-relaxed text-sm md:text-base">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="text-center !mt-12 !md:mt-16 p-8 rounded-2xl bg-slate-50/80 border border-slate-200/60">
          <p className="text-slate-600 text-base font-medium mb-2">
            Still have questions?
          </p>
          <p className="text-slate-400 text-sm mb-6">
            Our team is happy to help you with anything you need.
          </p>
          <Link href="/contact" className="inline-flex items-center justify-center bg-[#0b1736] hover:bg-[#0b1736]/90 text-white px-8 py-3 rounded-full text-sm font-semibold shadow-lg shadow-blue-900/20 transition-all duration-200 hover:shadow-blue-900/30 hover:-translate-y-0.5 active:translate-y-0">
            Contact Us
          </Link>
        </div>
      </div>
    </section>
  );
}



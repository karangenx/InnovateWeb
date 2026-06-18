export default function LogoStrip() {
  const companies = [
    "Innovate Web Community",
    "Innovate Web Community",
    "Innovate Web Community",
    "Innovate Web Community",
    "Innovate Web Community",
    "Innovate Web Community",
    "Innovate Web Community",
  ];

  return (
    <section className="bg-[#0b1736] border-y border-[#1e293b] overflow-hidden">
      <div className="py-6">
        <div className="flex whitespace-nowrap animate-marquee">
          {[...companies, ...companies].map((item, index) => (
            <div
              key={index}
              className="flex items-center gap-4 mx-10 text-sm font-semibold uppercase tracking-widest text-slate-400 opacity-70 hover:opacity-100 hover:text-white transition-all duration-300"
            >
              <span>{item}</span>
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                className="shrink-0 text-cyan-500"
              >
                <path
                  d="M12 2L13.8 8.2L20 10L13.8 11.8L12 18L10.2 11.8L4 10L10.2 8.2L12 2Z"
                  stroke="currentColor"
                  strokeWidth="1.8"
                />
              </svg>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

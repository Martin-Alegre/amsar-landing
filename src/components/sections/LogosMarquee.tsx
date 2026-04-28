import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useReducedMotion } from "@/hooks/useReducedMotion";

gsap.registerPlugin(ScrollTrigger);

const brands = [
  "Burger King",
  "McDonald's",
  "Carrefour",
  "Cinemark",
  "OYO",
  "Freddo",
  "Mostaza",
  "Farmacity",
  "Galeno",
  "Galicia",
  "Despegar",
  "SportClub",
  "Megatlon",
  "Starbucks",
  "Subway",
  "YPF",
  "Garbarino",
  "Fravega",
  "Coto",
  "Hoyts",
  "Booking.com",
  "Personal",
  "Día",
  "Easy",
  "Rappi",
  "Pizza Hot",
  "TGI Fridays",
];

export default function LogosMarquee() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced || !sectionRef.current) return;

    const ctx = gsap.context(() => {
      if (titleRef.current) {
        gsap.from(titleRef.current, {
          y: 20,
          opacity: 0,
          duration: 0.6,
          ease: "power3.out",
          scrollTrigger: {
            trigger: titleRef.current,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, [reduced]);

  // Duplicate brands for seamless loop
  const marqueeItems = [...brands, ...brands];

  return (
    <section ref={sectionRef} className="py-12 lg:py-16 bg-white overflow-hidden">
      <div className="section-padding max-w-7xl mx-auto">
        <h2
          ref={titleRef}
          className="text-center text-amsar-cyan text-base sm:text-lg font-semibold mb-8 tracking-wide"
          style={{ fontSize: "clamp(0.875rem, 2vw, 1.125rem)" }}
        >
          Más de 1.000 comercios adheridos a tus beneficios
        </h2>
      </div>

      {/* Marquee track */}
      <div className="relative">
        {/* Left fade */}
        <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
        {/* Right fade */}
        <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

        <div className="marquee-track flex w-max gap-12 items-center whitespace-nowrap">
          {marqueeItems.map((brand, i) => (
            <span
              key={`${brand}-${i}`}
              className="text-slate-400 text-lg sm:text-xl font-semibold tracking-wide select-none shrink-0 hover:text-amsar-deep transition-colors duration-300"
            >
              {brand}
            </span>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .marquee-track {
          animation: ${reduced ? "none" : "marquee 45s linear infinite"};
        }
      `}</style>
    </section>
  );
}

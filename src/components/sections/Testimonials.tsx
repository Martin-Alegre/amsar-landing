import { useState, useEffect, useRef, useCallback } from "react";
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react";

const testimonials = [
  {
    name: "Lucía R.",
    age: 28,
    job: "Diseñadora gráfica",
    text: "No sabía qué obra social elegir. Me asesoraron por WhatsApp, resolvieron todas mis dudas y el trámite fue mucho más simple de lo que esperaba.",
    color: "from-blue-500 to-cyan-400",
  },
  {
    name: "Federico M.",
    age: 34,
    job: "Desarrollador",
    text: "La telemedicina me salvó dos veces este año. Resolví consultas sin moverme de casa.",
    color: "from-green-500 to-emerald-400",
  },
  {
    name: "Carla S.",
    age: 31,
    job: "Consultora",
    text: "Tengo ahorros importantes solo en farmacia este año. Eso ya pagó la cuota.",
    color: "from-purple-500 to-violet-400",
  },
  {
    name: "Diego T.",
    age: 39,
    job: "Fotógrafo",
    text: "Cambié de obra social después de 3 años con otra que no me daba bola. Diferencia abismal.",
    color: "from-amber-500 to-orange-400",
  },
  {
    name: "Sofía L.",
    age: 26,
    job: "Copywriter",
    text: "La app es lo que más uso. Descuentos, turnos, todo desde el celular.",
    color: "from-pink-500 to-rose-400",
  },
  {
    name: "Martín P.",
    age: 42,
    job: "Contador",
    text: "Soy monotributista hace 8 años y nunca me sentí tan bien atendido. La gente del WhatsApp es amorosa.",
    color: "from-emerald-500 to-teal-400",
  },
];

export default function Testimonials() {
  const [current, setCurrent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const trackRef = useRef<HTMLDivElement>(null);
  const total = testimonials.length;

  const goTo = useCallback((index: number) => {
    setCurrent((index + total) % total);
  }, [total]);

  const next = useCallback(() => goTo(current + 1), [current, goTo]);
  const prev = useCallback(() => goTo(current - 1), [current, goTo]);

  // Autoplay - faster at 3 seconds
  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(next, 3000);
    return () => clearInterval(timer);
  }, [isPaused, next]);

  // Scroll active card into center view (horizontal only, no page scroll)
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const cards = track.querySelectorAll<HTMLElement>(".testimonial-card");
    if (cards[current]) {
      const card = cards[current];
      const scrollLeft = card.offsetLeft - track.offsetWidth / 2 + card.offsetWidth / 2;
      track.scrollTo({ left: scrollLeft, behavior: "smooth" });
    }
  }, [current]);

  return (
    <section className="py-20 lg:py-28 bg-slate-50 overflow-hidden">
      <div className="section-padding max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12 lg:mb-16">
          <div className="inline-flex items-center gap-2 bg-amsar-cyan/10 text-amsar-cyan text-sm font-semibold px-4 py-1.5 rounded-full mb-4">
            <Star className="w-4 h-4 fill-amsar-cyan" />
            Testimonios reales
          </div>
          <h2 className="mb-4">
            Lo que dicen monotributistas como vos
          </h2>
        </div>

        <div
          className="relative"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* Track */}
          <div
            ref={trackRef}
            className="flex gap-5 overflow-x-auto pb-4 snap-x snap-mandatory"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {testimonials.map((t, i) => {
              const isActive = i === current;
              return (
                <div
                  key={t.name}
                  className={`testimonial-card snap-center shrink-0 w-[85vw] sm:w-[380px] rounded-2xl p-6 sm:p-7 transition-all duration-500 cursor-pointer ${
                    isActive
                      ? "bg-white shadow-elevated scale-100 border border-amsar-cyan/20"
                      : "bg-white/60 shadow-sm border border-slate-100 opacity-60 scale-[0.97]"
                  }`}
                  onClick={() => goTo(i)}
                  onTouchStart={() => setIsPaused(true)}
                  onTouchEnd={() => setIsPaused(false)}
                >
                  {/* Quote icon */}
                  <Quote
                    className={`w-8 h-8 mb-4 transition-colors duration-500 ${
                      isActive ? "text-amsar-cyan/30" : "text-slate-200"
                    }`}
                    strokeWidth={1}
                  />

                  {/* Text */}
                  <p className="text-slate-700 leading-relaxed mb-6 text-[15px] sm:text-base min-h-[60px]">
                    "{t.text}"
                  </p>

                  {/* Divider */}
                  <div className={`h-px mb-5 transition-all duration-500 ${
                    isActive ? "bg-gradient-to-r from-transparent via-amsar-cyan/30 to-transparent" : "bg-slate-100"
                  }`} />

                  {/* Author */}
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${t.color} flex items-center justify-center text-white font-bold text-sm shrink-0 shadow-sm`}>
                      {t.name.charAt(0)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-amsar-deep text-sm">{t.name}</p>
                      <p className="text-xs text-slate-500 truncate">
                        {t.age} años · {t.job}
                      </p>
                    </div>
                    <div className="flex gap-0.5 shrink-0">
                      {[...Array(5)].map((_, j) => (
                        <Star key={j} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Controls */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <button
              onClick={prev}
              className="w-10 h-10 rounded-full bg-white border border-slate-200 flex items-center justify-center hover:border-amsar-cyan hover:text-amsar-cyan transition-all duration-300 shadow-sm hover:shadow-md"
              aria-label="Anterior"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            {/* Progress bar instead of dots */}
            <div className="flex gap-1.5">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => goTo(i)}
                  className="relative h-1.5 rounded-full transition-all duration-500 overflow-hidden"
                  style={{
                    width: i === current ? "32px" : "8px",
                    background: i === current ? "transparent" : "#cbd5e1",
                  }}
                  aria-label={`Ir al testimonio ${i + 1}`}
                >
                  {i === current && (
                    <>
                      <div className="absolute inset-0 bg-slate-200 rounded-full" />
                      <div
                        className="absolute inset-0 bg-amsar-cyan rounded-full origin-left"
                        style={{
                          animation: isPaused ? "none" : "progressFill 3s linear forwards",
                        }}
                      />
                    </>
                  )}
                </button>
              ))}
            </div>

            <button
              onClick={next}
              className="w-10 h-10 rounded-full bg-white border border-slate-200 flex items-center justify-center hover:border-amsar-cyan hover:text-amsar-cyan transition-all duration-300 shadow-sm hover:shadow-md"
              aria-label="Siguiente"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes progressFill {
          0% { transform: scaleX(0); }
          100% { transform: scaleX(1); }
        }
        .testimonial-card::-webkit-scrollbar { display: none; }
        div[style*="scrollbarWidth"]::-webkit-scrollbar { display: none; }
      `}</style>
    </section>
  );
}

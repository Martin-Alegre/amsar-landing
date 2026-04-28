import { useEffect, useRef } from "react";
import { Video, MessageCircle, Stethoscope, BadgeCheck, Store, Zap } from "lucide-react";

const benefits = [
  {
    icon: Stethoscope,
    title: "Cobertura PMO completa",
    desc: "Médicos, especialistas, urgencias y estudios garantizados por ley. Red nacional. Sin sorpresas.",
    accent: "from-blue-500 to-cyan-400",
  },
  {
    icon: Video,
    title: "Telemedicina 24/7",
    desc: "Hablás con un médico desde la app Mi Mutual en menos de 15 minutos. A la hora que sea.",
    accent: "from-green-500 to-emerald-400",
  },
  {
    icon: Store,
    title: "+1.000 comercios adheridos",
    desc: "Descuentos en farmacia, odontología, gimnasios, gastronomía, viajes y más.",
    accent: "from-purple-500 to-violet-400",
  },
  {
    icon: MessageCircle,
    title: "Respuesta WhatsApp <1h",
    desc: "Atención de personas reales en menos de una hora. Sin bots, sin menús eternos.",
    accent: "from-emerald-500 to-teal-400",
  },
  {
    icon: BadgeCheck,
    title: "Sin costo adicional",
    desc: "Mi Mutual y todos sus beneficios vienen incluidos. Cero extras. Cero trampas.",
    accent: "from-amber-500 to-orange-400",
  },
  {
    icon: Zap,
    title: "Flexibilidad sin burocracia",
    desc: "Afiliación simple, respuesta rápida, sin trámites interminables. Hecho para independientes.",
    accent: "from-pink-500 to-rose-400",
  },
];

export default function Benefits() {
  const sectionRef = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  // CSS-only reveal animation via IntersectionObserver
  useEffect(() => {
    if (!gridRef.current) return;
    const cards = gridRef.current.querySelectorAll<HTMLElement>(".benefit-card");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Stagger the reveal
            cards.forEach((card, i) => {
              setTimeout(() => {
                card.classList.add("revealed");
              }, i * 100);
            });
            observer.disconnect();
          }
        });
      },
      { threshold: 0.1 }
    );

    observer.observe(gridRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="beneficios"
      className="py-20 lg:py-28 bg-white"
    >
      <div className="section-padding max-w-7xl mx-auto">
        <div className="text-center mb-12 lg:mb-16">
          <h2 className="mb-4">Todo lo que recibís cuando te afiliás</h2>
          <p className="text-lg text-slate-600">
            Beneficios reales, no promesas de folleto.
          </p>
        </div>

        <div
          ref={gridRef}
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {benefits.map((b) => (
            <div
              key={b.title}
              className="benefit-card group relative bg-white rounded-2xl p-7 border border-slate-100 hover:border-amsar-cyan/30 transition-all duration-300 hover:shadow-elevated"
            >
              {/* Accent top line on hover */}
              <div className={`absolute top-0 left-6 right-6 h-[3px] rounded-b-full bg-gradient-to-r ${b.accent} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />

              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${b.accent} flex items-center justify-center mb-5 shadow-sm`}>
                <b.icon className="w-6 h-6 text-white" strokeWidth={1.5} />
              </div>
              <h3 className="text-lg font-semibold text-amsar-deep mb-2">
                {b.title}
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                {b.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .benefit-card {
          opacity: 0;
          transform: translateY(20px);
          transition: opacity 0.5s ease, transform 0.5s ease, box-shadow 0.3s, border-color 0.3s;
        }
        .benefit-card.revealed {
          opacity: 1;
          transform: translateY(0);
        }
        @media (prefers-reduced-motion: reduce) {
          .benefit-card {
            opacity: 1;
            transform: none;
          }
        }
      `}</style>
    </section>
  );
}

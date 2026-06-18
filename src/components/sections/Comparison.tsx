import { useEffect, useRef, Fragment } from "react";
import { Check, X } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useReducedMotion } from "@/hooks/useReducedMotion";

gsap.registerPlugin(ScrollTrigger);

const rows = [
  { feature: "Cobertura PMO", others: true, amsar: true },
  { feature: "App con beneficios reales", others: false, amsar: true },
  { feature: "Telemedicina 24/7", others: false, amsar: true },
  { feature: "Respuesta WhatsApp <1h", others: false, amsar: true },
  { feature: "Comunidad y contenido", others: false, amsar: true },
  { feature: "Transparencia de costos", others: false, amsar: true },
];

export default function Comparison() {
  const sectionRef = useRef<HTMLElement>(null);
  const tableRef = useRef<HTMLDivElement>(null);
  const mobileRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced || !sectionRef.current) return;

    const animRows = (container: HTMLDivElement | null) => {
      if (!container) return;
      const items = container.querySelectorAll(".comp-row");
      if (!items.length) return;
      gsap.from(items, {
        y: 20,
        opacity: 0,
        duration: 0.5,
        stagger: 0.08,
        ease: "power3.out",
        scrollTrigger: {
          trigger: container,
          start: "top 80%",
          toggleActions: "play none none none",
        },
      });
    };

    const ctx = gsap.context(() => {
      animRows(tableRef.current);
      animRows(mobileRef.current);
    }, sectionRef);

    return () => ctx.revert();
  }, [reduced]);

  return (
    <section
      ref={sectionRef}
      className="py-20 lg:py-28 bg-white"
    >
      <div className="section-padding max-w-4xl mx-auto">
        <h2 className="text-center mb-12 lg:mb-16">
          ¿Por qué elegir Amsar y no otra?
        </h2>

        {/* Desktop table */}
        <div ref={tableRef} className="hidden md:block">
          <div className="grid grid-cols-3 gap-px bg-slate-200 rounded-2xl overflow-hidden border border-slate-200">
            {/* Header */}
            <div className="bg-slate-50 p-4 font-semibold text-sm text-slate-500">
              Característica
            </div>
            <div className="bg-slate-50 p-4 font-semibold text-sm text-slate-500 text-center">
              Otras coberturas
            </div>
            <div className="bg-amsar-cyan/5 p-4 font-semibold text-sm text-amsar-deep text-center border-l border-amsar-cyan/20">
              Amsar
            </div>

            {/* Rows */}
            {rows.map((row) => (
              <Fragment key={row.feature}>
                <div className="comp-row bg-white p-4 text-sm font-medium text-amsar-deep flex items-center">
                  {row.feature}
                </div>
                <div className="comp-row bg-white p-4 flex items-center justify-center">
                  {row.others ? (
                    <Check className="w-5 h-5 text-slate-400" />
                  ) : (
                    <X className="w-5 h-5 text-slate-300" />
                  )}
                </div>
                <div className="comp-row bg-amsar-cyan/[0.03] p-4 flex items-center justify-center border-l border-amsar-cyan/20">
                  {row.amsar ? (
                    <div className="flex items-center gap-1.5 text-green-600">
                      <Check className="w-5 h-5" />
                      <span className="text-sm font-medium">Sí</span>
                    </div>
                  ) : (
                    <X className="w-5 h-5 text-slate-300" />
                  )}
                </div>
              </Fragment>
            ))}
          </div>
        </div>

        {/* Mobile cards */}
        <div ref={mobileRef} className="md:hidden space-y-4">
          {rows.map((row) => (
            <div
              key={row.feature}
              className="comp-row bg-white rounded-xl p-5 shadow-soft border border-slate-100"
            >
              <p className="font-semibold text-amsar-deep mb-3">{row.feature}</p>
              <div className="flex gap-3">
                <div className={`flex-1 rounded-lg p-3 text-center text-sm ${row.others ? "bg-slate-50 text-slate-600" : "bg-slate-50 text-slate-400"}`}>
                  <span className="block text-xs text-slate-400 mb-1">Otras</span>
                  {row.others ? "✓" : "✗"}
                </div>
                <div className={`flex-1 rounded-lg p-3 text-center text-sm font-medium ${row.amsar ? "bg-amsar-cyan/10 text-green-700" : "bg-slate-50 text-slate-400"}`}>
                  <span className="block text-xs text-amsar-cyan mb-1">Amsar</span>
                  {row.amsar ? "✓ Sí" : "✗"}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

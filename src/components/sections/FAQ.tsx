import { useEffect, useRef } from "react";
import { ChevronDown } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useReducedMotion } from "@/hooks/useReducedMotion";

gsap.registerPlugin(ScrollTrigger);

const faqs = [
  {
    q: "¿Cuánto cuesta?",
    a: "Lo mismo que estás pagando a AFIP por tu monotributo, según tu categoría. No hay costo extra. Mi Mutual y todos los beneficios vienen incluidos.",
  },
  {
    q: "¿Cómo me afilio?",
    a: "Nos hablás por WhatsApp, te pasamos el link de afiliación, lo completás en 5 minutos. Listo. Te llega el alta en 48 hs hábiles.",
  },
  {
    q: "¿Tengo que cambiar de obra social?",
    a: "Sí, hacés el traspaso. Es un trámite simple, te guiamos paso a paso por WhatsApp.",
  },
  {
    q: "¿Qué pasa si tengo una preexistencia?",
    a: "Hoy estamos enfocados en monotributistas sin preexistencias. Igual escribinos por WhatsApp y te orientamos sobre opciones.",
  },
  {
    q: "¿La telemedicina sirve para todo?",
    a: "Sirve para consultas, recetas, derivaciones y diagnósticos básicos. Para temas que requieren examen físico te derivamos a un médico de la red.",
  },
  {
    q: "¿Cómo uso los descuentos?",
    a: "Desde la app Mi Mutual presentás el QR o el código en el comercio adherido. Listo.",
  },
  {
    q: "¿Atienden en mi zona?",
    a: "Cubrimos CABA, GBA Sur y gran parte del interior. Escribinos tu ciudad y te confirmamos en el momento.",
  },
  {
    q: "¿Qué pasa si no me responden?",
    a: "Nuestro compromiso es responder en menos de 1 hora hábil. Si no pasa, te pedimos que nos avises directo y revisamos qué falló.",
  },
];

export default function FAQ() {
  const sectionRef = useRef<HTMLElement>(null);
  const itemsRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced || !sectionRef.current) return;

    const ctx = gsap.context(() => {
      const items = itemsRef.current?.querySelectorAll(".faq-item");
      if (items) {
        gsap.from(items, {
          y: 20,
          opacity: 0,
          duration: 0.5,
          stagger: 0.08,
          ease: "power3.out",
          scrollTrigger: {
            trigger: itemsRef.current,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, [reduced]);

  return (
    <section
      ref={sectionRef}
      id="faq"
      className="py-20 lg:py-28 bg-slate-50"
    >
      <div className="section-padding max-w-3xl mx-auto">
        <h2 className="text-center mb-12 lg:mb-16">
          Preguntas que probablemente te estés haciendo
        </h2>

        <div ref={itemsRef} className="space-y-4">
          {faqs.map((faq, i) => (
            <details
              key={i}
              className="faq-item bg-white rounded-xl border border-slate-100 shadow-soft overflow-hidden group"
            >
              <summary className="flex items-center justify-between p-5 cursor-pointer list-none select-none hover:bg-slate-50/50 transition-colors">
                <span className="font-medium text-amsar-deep pr-4">{faq.q}</span>
                <ChevronDown className="w-5 h-5 text-slate-400 shrink-0 transition-transform group-open:rotate-180" />
              </summary>
              <div className="px-5 pb-5 text-slate-600 leading-relaxed">
                {faq.a}
              </div>
            </details>
          ))}
        </div>
      </div>

      {/* Schema.org FAQPage JSON-LD */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: faqs.map((f) => ({
            "@type": "Question",
            name: f.q,
            acceptedAnswer: {
              "@type": "Answer",
              text: f.a,
            },
          })),
        })}
      </script>
    </section>
  );
}

import { useEffect, useRef } from "react";
import { Check, Shield, MessageCircle } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useReducedMotion } from "@/hooks/useReducedMotion";

gsap.registerPlugin(ScrollTrigger);

const items = [
  "Cobertura PMO completa con red nacional.",
  "Mi Mutual app con telemedicina 24/7 (sin costo).",
  "Acceso a +1.000 comercios adheridos con descuentos reales.",
  "WhatsApp con personas reales del equipo comercial.",
  "Comunidad de monotributistas activa.",
  "Cero copagos sorpresa, cero letra chica.",
];

export default function Offer() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced || !sectionRef.current) return;

    const ctx = gsap.context(() => {
      if (cardRef.current) {
        gsap.from(cardRef.current, {
          y: 40,
          opacity: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: cardRef.current,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        });
      }

      const checks = cardRef.current?.querySelectorAll(".check-item");
      if (checks) {
        gsap.from(checks, {
          x: -20,
          opacity: 0,
          duration: 0.4,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: cardRef.current,
            start: "top 70%",
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
      id="oferta"
      className="py-20 lg:py-28 bg-white"
    >
      <div className="section-padding max-w-3xl mx-auto">
        <div
          ref={cardRef}
          className="relative bg-white rounded-3xl p-8 sm:p-12 shadow-elevated border border-slate-100"
        >
          <h3 className="text-xl sm:text-2xl font-semibold text-amsar-deep mb-8 text-center">
            Esto es lo que recibís al afiliarte hoy:
          </h3>

          <ul className="space-y-4 mb-8">
            {items.map((item) => (
              <li key={item} className="check-item flex items-start gap-3">
                <div className="shrink-0 w-6 h-6 rounded-full bg-green-100 flex items-center justify-center mt-0.5">
                  <Check className="w-4 h-4 text-green-600" />
                </div>
                <span className="text-slate-700">{item}</span>
              </li>
            ))}
          </ul>

          {/* Risk reversal */}
          <div className="bg-slate-50 rounded-xl p-5 mb-8 flex items-start gap-3 border border-slate-100">
            <Shield className="w-5 h-5 text-amsar-cyan shrink-0 mt-0.5" />
            <p className="text-sm text-slate-600">
              <strong>Compromiso de respuesta:</strong> Te respondemos en menos de 1 hora hábil, siempre con una persona real del equipo. Sin bots, sin esperas eternas.
            </p>
          </div>

          <div className="text-center">
            <a
              href="https://wa.me/5491178213869?text=Hola%2C%20quiero%20empezar%20mi%20afiliaci%C3%B3n%20a%20Amsar"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-wa text-lg px-10 py-5 inline-flex"
            >
              <MessageCircle className="w-6 h-6" />
              Empezar ahora por WhatsApp
            </a>
            <p className="text-sm text-slate-500 mt-3">
              Te respondemos en minutos.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

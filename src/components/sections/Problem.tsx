import { useEffect, useRef, useState } from "react";
import { MessageSquareOff, Clock, Wallet } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useReducedMotion } from "@/hooks/useReducedMotion";

gsap.registerPlugin(ScrollTrigger);

const cards = [
  {
    icon: MessageSquareOff,
    title: "Te dijeron que sí... y desaparecieron.",
    body: "Llamaste, llenaste el formulario, te dijeron que te iban a contactar. Pasaron 3 días, una semana. Nunca apareció nadie.",
  },
  {
    icon: Clock,
    title: "Trabajás a las 2 AM, ellos abren a las 9.",
    body: "Tu agenda no entiende de horarios bancarios. Cuando necesitás un médico, no podés esperar al lunes.",
  },
  {
    icon: Wallet,
    title: "Una consulta + remedios = el alquiler.",
    body: "Sin una buena cobertura, una emergencia básica te puede romper el mes. Y vos no podés frenar de trabajar.",
  },
];

export default function Problem() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const closingRef = useRef<HTMLParagraphElement>(null);
  const reduced = useReducedMotion();
  const [hovered, setHovered] = useState<number | null>(null);

  useEffect(() => {
    if (reduced || !sectionRef.current) return;

    const ctx = gsap.context(() => {
      const cardEls = cardsRef.current?.querySelectorAll(".problem-card");
      if (cardEls) {
        gsap.from(cardEls, {
          y: 30,
          opacity: 0,
          duration: 0.6,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: cardsRef.current,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        });
      }

      if (closingRef.current) {
        gsap.from(closingRef.current, {
          y: 20,
          opacity: 0,
          duration: 0.6,
          ease: "power3.out",
          scrollTrigger: {
            trigger: closingRef.current,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, [reduced]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>, index: number) => {
    if (hovered !== index) return;
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) / rect.width;
    const y = (e.clientY - rect.top - rect.height / 2) / rect.height;
    card.style.transform = `perspective(1000px) rotateX(${-y * 4}deg) rotateY(${x * 4}deg) translateY(-4px)`;
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    e.currentTarget.style.transform = "perspective(1000px) rotateX(0) rotateY(0) translateY(0)";
    setHovered(null);
  };

  return (
    <section
      ref={sectionRef}
      id="problema"
      className="py-20 lg:py-28 bg-white"
    >
      <div className="section-padding max-w-7xl mx-auto">
        <h2 className="text-center mb-12 lg:mb-16">
          ¿Te pasó esto?
        </h2>

        <div
          ref={cardsRef}
          className="grid md:grid-cols-3 gap-6 lg:gap-8"
        >
          {cards.map((card, i) => (
            <div
              key={card.title}
              className="problem-card bg-white rounded-2xl p-8 border border-slate-100 shadow-sm hover:shadow-elevated hover:border-amsar-cyan/30 transition-all duration-300 relative overflow-hidden"
              style={{ transition: "transform 0.15s ease-out" }}
              onMouseMove={(e) => handleMouseMove(e, i)}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={handleMouseLeave}
            >
              <card.icon className="w-10 h-10 text-amsar-cyan mb-5" strokeWidth={1.5} />
              <h3 className="text-xl font-semibold text-amsar-deep mb-3">
                {card.title}
              </h3>
              <p className="text-slate-600 leading-relaxed">
                {card.body}
              </p>
            </div>
          ))}
        </div>

        <p
          ref={closingRef}
          className="text-center text-xl lg:text-2xl font-medium text-amsar-deep mt-12 lg:mt-16 max-w-3xl mx-auto leading-relaxed"
        >
          Ser monotributista no debería significar que tu salud quede en{" "}
          <span className="text-amsar-cyan">segundo plano</span>.
        </p>
      </div>
    </section>
  );
}

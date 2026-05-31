import { useEffect, useRef } from "react";
import { MessageCircle, Briefcase } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { BorderBeam } from "@/components/ui/border-beam";

gsap.registerPlugin(ScrollTrigger);

const GLOW_BASE = "0 0 0 2px rgba(0,200,220,0.18), 0 20px 60px rgba(0,200,220,0.10)";
const GLOW_PULSE = "0 0 0 3px rgba(0,200,220,0.55), 0 20px 80px rgba(0,200,220,0.38)";

export default function RelacionDependencia() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const iconWrapRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const paraRef = useRef<HTMLParagraphElement>(null);
  const ctaBtnRef = useRef<HTMLAnchorElement>(null);
  const animatedRef = useRef(false);
  const reduced = useReducedMotion();

  // Scroll-triggered entrance
  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    if (reduced) {
      gsap.set(card, { boxShadow: GLOW_BASE });
      return;
    }

    const children = [
      iconWrapRef.current,
      titleRef.current,
      paraRef.current,
      ctaBtnRef.current,
    ];

    gsap.set(card, { opacity: 0, y: 40, scale: 0.96, boxShadow: "none" });
    gsap.set(children, { opacity: 0, y: 18 });

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: card,
          start: "top 80%",
          toggleActions: "play none none none",
          onEnter: () => { animatedRef.current = true; },
        },
      });

      // Card slides in with scale
      tl.to(card, {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.8,
        ease: "power3.out",
      })
      // Glow activates while card finishes
      .to(card, {
        boxShadow: GLOW_BASE,
        duration: 0.5,
        ease: "power2.out",
      }, "-=0.25")
      // Children stagger in
      .to(children, {
        opacity: 1,
        y: 0,
        duration: 0.48,
        stagger: 0.12,
        ease: "power3.out",
      }, "-=0.65");

      // Icon float — continuous, very subtle
      gsap.to(iconWrapRef.current, {
        y: -5,
        duration: 2.6,
        repeat: -1,
        yoyo: true,
        ease: "power1.inOut",
        delay: 1.1,
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [reduced]);

  // Hash-change pulse glow
  useEffect(() => {
    const card = cardRef.current;
    if (!card || reduced) return;

    const pulse = () => {
      if (window.location.hash !== "#relacion-dependencia") return;
      gsap.fromTo(
        card,
        { boxShadow: animatedRef.current ? GLOW_BASE : "none" },
        {
          boxShadow: GLOW_PULSE,
          duration: 0.32,
          yoyo: true,
          repeat: 1,
          ease: "power2.out",
          onComplete: () => {
            if (animatedRef.current) gsap.set(card, { boxShadow: GLOW_BASE });
          },
        }
      );
    };

    window.addEventListener("hashchange", pulse);
    if (window.location.hash === "#relacion-dependencia") {
      setTimeout(pulse, 700);
    }
    return () => window.removeEventListener("hashchange", pulse);
  }, [reduced]);

  return (
    <section
      ref={sectionRef}
      id="relacion-dependencia"
      className="py-20 lg:py-28 bg-white"
    >
      <div className="section-padding max-w-3xl mx-auto">
        <div
          ref={cardRef}
          className="relative bg-white rounded-3xl p-8 sm:p-12 shadow-elevated border border-slate-100 overflow-hidden text-center"
          style={{ willChange: "transform, opacity, box-shadow" }}
        >
          <div
            ref={iconWrapRef}
            className="w-14 h-14 rounded-2xl bg-gradient-to-br from-amsar-cyan to-blue-400 flex items-center justify-center mb-6 shadow-sm mx-auto"
            style={{ willChange: "transform" }}
          >
            <Briefcase className="w-7 h-7 text-white" strokeWidth={1.5} />
          </div>

          <h2
            ref={titleRef}
            className="text-2xl sm:text-3xl font-bold text-amsar-deep mb-4"
          >
            ¿Estás en relación de dependencia?
          </h2>

          <p
            ref={paraRef}
            className="text-slate-600 leading-relaxed mb-8 text-base sm:text-lg"
          >
            Si tenés obra social por tu trabajo, podés acceder a la cobertura de
            Amsar derivando tus aportes, sin costo extra. Te lo gestionamos nosotros.
          </p>

          <div className="flex justify-center">
            <a
              ref={ctaBtnRef}
              href="https://wa.me/5491178213869?text=Hola%20Amsar%20%F0%9F%91%8B%20Estoy%20en%20relaci%C3%B3n%20de%20dependencia%20y%20quiero%20derivar%20mis%20aportes%20a%20Amsar.%20%C2%BFMe%20ayudan%3F"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-wa text-base sm:text-lg px-8 py-4 inline-flex"
            >
              <MessageCircle className="w-5 h-5" />
              Consultar por WhatsApp
            </a>
          </div>

          {!reduced && (
            <BorderBeam
              size={90}
              duration={6}
              colorFrom="#22D3EE"
              colorTo="#6366F1"
              borderWidth={2}
            />
          )}
        </div>
      </div>
    </section>
  );
}

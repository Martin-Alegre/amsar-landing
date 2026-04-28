import { useEffect, useRef } from "react";
import { ShieldCheck, Smartphone, MessageCircle } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useReducedMotion } from "@/hooks/useReducedMotion";

gsap.registerPlugin(ScrollTrigger);

const features = [
  {
    icon: ShieldCheck,
    title: "Cobertura PMO completa",
    desc: "Médicos, especialistas, urgencias, laboratorios. En todo el país.",
  },
  {
    icon: Smartphone,
    title: "Mi Mutual app",
    desc: "Telemedicina 24/7 + descuentos reales. Sin costo. Sin letra chica.",
  },
  {
    icon: MessageCircle,
    title: "WhatsApp con personas reales",
    desc: "Respuesta en menos de 1 hora. Siempre.",
  },
];

export default function Solution() {
  const sectionRef = useRef<HTMLElement>(null);
  const mockupRef = useRef<HTMLDivElement>(null);
  const featuresRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced || !sectionRef.current) return;

    const ctx = gsap.context(() => {
      if (mockupRef.current) {
        gsap.from(mockupRef.current, {
          x: -60,
          opacity: 0,
          rotateY: 15,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
            toggleActions: "play none none none",
          },
        });
      }

      if (featuresRef.current) {
        const items = featuresRef.current.querySelectorAll(".feature-item");
        gsap.from(items, {
          x: 40,
          opacity: 0,
          duration: 0.6,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: featuresRef.current,
            start: "top 75%",
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
      id="solucion"
      className="py-20 lg:py-28 bg-white overflow-hidden"
    >
      <div className="section-padding max-w-7xl mx-auto">
        <div className="text-center mb-12 lg:mb-16">
          <h2 className="mb-4">Por eso existe Amsar.</h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            La primera obra social pensada para cómo trabajás vos. No para cómo trabajan ellos.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Mockup 3D-style phone */}
          <div ref={mockupRef} className="relative flex justify-center" style={{ perspective: "1000px" }}>
            <div className="relative w-[280px] h-[560px] sm:w-[300px] sm:h-[600px]">
              {/* Glow behind */}
              <div className="absolute -inset-8 bg-amsar-cyan/20 blur-3xl rounded-full" />
              
              {/* Phone frame */}
              <div className="relative w-full h-full bg-amsar-deep rounded-[3rem] p-3 shadow-deep border border-white/10">
                <div className="w-full h-full bg-white rounded-[2.5rem] overflow-hidden relative">
                  {/* Notch */}
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-6 bg-amsar-deep rounded-b-2xl z-10" />
                  
                  {/* Screen content */}
                  <div className="h-full bg-gradient-to-b from-slate-50 to-white p-4 pt-10 flex flex-col">
                    <div className="text-center mb-4">
                      <div className="inline-flex items-center gap-2 bg-amsar-cyan/10 rounded-full px-4 py-1.5 mb-3">
                        <Smartphone className="w-4 h-4 text-amsar-cyan" />
                        <span className="text-sm font-semibold text-amsar-deep">Mi Mutual</span>
                      </div>
                    </div>
                    
                    <div className="flex-1 space-y-3">
                      <div className="bg-white rounded-xl p-4 shadow-soft border border-slate-100">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                            <ShieldCheck className="w-5 h-5 text-green-600" />
                          </div>
                          <div>
                            <p className="text-sm font-semibold text-amsar-deep">Telemedicina</p>
                            <p className="text-xs text-slate-500">Médico en 15 min</p>
                          </div>
                        </div>
                      </div>
                      
                      <div className="bg-white rounded-xl p-4 shadow-soft border border-slate-100">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-amsar-cyan/10 flex items-center justify-center">
                            <MessageCircle className="w-5 h-5 text-amsar-cyan" />
                          </div>
                          <div>
                            <p className="text-sm font-semibold text-amsar-deep">Descuentos</p>
                            <p className="text-xs text-slate-500">+1.000 comercios</p>
                          </div>
                        </div>
                      </div>
                      
                      <div className="bg-amsar-deep rounded-xl p-4 text-white">
                        <p className="text-sm font-semibold">Mi plan Amsar</p>
                        <p className="text-xs text-white/70 mt-1">Cobertura activa</p>
                        <div className="mt-3 flex items-center gap-2">
                          <div className="w-2 h-2 rounded-full bg-green-400" />
                          <span className="text-xs">Todo en orden</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-auto pt-4 pb-2 flex justify-center items-center">
                      <img 
                        src="/mi_mutual_letras_celestes_sin_fondo.png" 
                        alt="Mi Mutual" 
                        className="h-5 w-auto opacity-70 grayscale hover:grayscale-0 transition-all duration-300"
                        onError={(e) => {
                          e.currentTarget.style.display = 'none';
                          e.currentTarget.nextElementSibling?.classList.remove('hidden');
                        }}
                      />
                      <span className="hidden text-xs font-bold text-slate-400">Mi Mutual</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Features */}
          <div ref={featuresRef} className="space-y-8">
            {features.map((f) => (
              <div
                key={f.title}
                className="feature-item flex gap-5 items-start"
              >
                <div className="shrink-0 w-12 h-12 rounded-xl bg-amsar-cyan/10 flex items-center justify-center">
                  <f.icon className="w-6 h-6 text-amsar-cyan" strokeWidth={1.5} />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-amsar-deep mb-1">
                    {f.title}
                  </h3>
                  <p className="text-slate-600 leading-relaxed">
                    {f.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

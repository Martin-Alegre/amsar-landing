import { useState, useEffect, useRef } from "react";
import { Smartphone, Pill, Tag } from "lucide-react";

const screens = [
  {
    icon: Smartphone,
    title: "Inicio",
    subtitle: "Todo en un solo lugar.",
    desc: "La app Mi Mutual te da acceso instantáneo a todos tus beneficios desde el celular.",
    color: "from-amsar-cyan to-blue-500",
    bar: "w-3/4",
  },
  {
    icon: Pill,
    title: "Telemedicina",
    subtitle: "Consulta médica en 15 minutos.",
    desc: "Hablás con un médico en minutos, sin esperas ni turnos. Disponible las 24 horas.",
    color: "from-green-500 to-emerald-400",
    bar: "w-4/5",
  },
  {
    icon: Tag,
    title: "Descuentos",
    subtitle: "Ahorrás miles cada mes.",
    desc: "Más de 1.000 comercios adheridos. Farmacia, gym, turismo, gastronomía y más.",
    color: "from-purple-500 to-violet-400",
    bar: "w-2/3",
  },
];

export default function MockupInteractive() {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [logoErr, setLogoErr] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const onScroll = () => {
      const rect = section.getBoundingClientRect();
      const vh = window.innerHeight;
      // progress: 0 when section top hits 70% viewport, 1 when section bottom hits 30%
      const progress = Math.max(0, Math.min(1,
        (vh * 0.7 - rect.top) / (rect.height + vh * 0.4)
      ));
      if (progress < 0.33) setActiveIndex(0);
      else if (progress < 0.66) setActiveIndex(1);
      else setActiveIndex(2);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section
      ref={sectionRef}
      className="min-h-screen bg-white flex items-center justify-center"
    >
      <div className="section-padding max-w-7xl mx-auto w-full">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 bg-amsar-cyan/10 text-amsar-cyan text-sm font-semibold px-4 py-1.5 rounded-full mb-4">
            <span className="w-2 h-2 rounded-full bg-amsar-cyan animate-pulse" />
            {logoErr ? (
              "Mi Mutual App"
            ) : (
              <img
                src="/mi_mutual_letras_celestes_sin_fondo.png"
                alt="Mi Mutual"
                className="h-4 w-auto"
                onError={() => setLogoErr(true)}
              />
            )}
          </div>
          <h2>La app que cambia tu forma de cuidarte</h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Phone mockup */}
          <div className="flex justify-center">
            <div className="relative w-[260px] h-[520px] sm:w-[280px] sm:h-[560px]">
              <div className="absolute -inset-6 bg-amsar-cyan/15 blur-3xl rounded-full" />

              <div className="relative w-full h-full bg-amsar-deep rounded-[2.5rem] p-2.5 shadow-deep">
                <div className="w-full h-full bg-white rounded-[2rem] overflow-hidden relative">
                  {/* Notch */}
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-20 h-5 bg-amsar-deep rounded-b-xl z-10" />

                  {/* Screen content — cards accumulate */}
                  <div className="h-full p-4 pt-10 flex flex-col gap-2 overflow-hidden">
                    {/* Mi Mutual header inside phone */}
                    <div className="flex items-center justify-between mb-1 px-1">
                      {logoErr ? (
                        <span className="text-[10px] font-bold text-amsar-deep">Mi Mutual</span>
                      ) : (
                        <img
                          src="/mi_mutual_letras_celestes_sin_fondo.png"
                          alt="Mi Mutual"
                          className="h-3 w-auto"
                          onError={() => setLogoErr(true)}
                        />
                      )}
                      <div className="flex gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-amsar-cyan" />
                        <span className="w-1.5 h-1.5 rounded-full bg-slate-200" />
                        <span className="w-1.5 h-1.5 rounded-full bg-slate-200" />
                      </div>
                    </div>

                    {screens.map((screen, i) => (
                      <div
                        key={screen.title}
                        className="overflow-hidden transition-all duration-700 ease-out"
                        style={{
                          maxHeight: i <= activeIndex ? "140px" : "0px",
                          opacity: i <= activeIndex ? 1 : 0,
                          transform: i <= activeIndex ? "translateY(0)" : "translateY(12px)",
                        }}
                      >
                        <div className={`bg-gradient-to-r ${screen.color} rounded-xl p-3.5 text-white`}>
                          <div className="flex items-center gap-2 mb-1.5">
                            <screen.icon className="w-4 h-4" />
                            <p className="font-bold text-sm">{screen.title}</p>
                          </div>
                          <p className="text-[11px] opacity-85 mb-2">{screen.subtitle}</p>
                          <div className="h-1 bg-white/30 rounded-full">
                            <div className={`h-full bg-white/80 rounded-full ${screen.bar}`} />
                          </div>
                        </div>
                      </div>
                    ))}

                    {/* Bottom Logo */}
                    <div className="mt-auto pt-3 pb-1 border-t border-slate-50 flex items-center justify-center">
                      <img 
                        src="/mi_mutual_letras_celestes_sin_fondo.png" 
                        alt="Mi Mutual" 
                        className="h-4 w-auto opacity-70 grayscale hover:grayscale-0 transition-all duration-300"
                        onError={(e) => {
                          e.currentTarget.style.display = 'none';
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Text side */}
          <div className="relative h-56 lg:h-64">
            {screens.map((screen, i) => (
              <div
                key={screen.title}
                className="absolute inset-0 flex flex-col justify-center transition-all duration-500"
                style={{
                  opacity: i === activeIndex ? 1 : 0,
                  transform: i === activeIndex ? "translateY(0)" : "translateY(24px)",
                  pointerEvents: i === activeIndex ? "auto" : "none",
                }}
              >
                <div
                  className={`w-12 h-12 bg-gradient-to-r ${screen.color} rounded-xl flex items-center justify-center mb-4 shadow-md`}
                >
                  <screen.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-2xl font-semibold text-amsar-deep mb-3">
                  {screen.subtitle}
                </h3>
                <p className="text-slate-600 leading-relaxed">{screen.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Progress dots */}
        <div className="flex justify-center gap-2 mt-8">
          {screens.map((_, i) => (
            <div
              key={i}
              className="rounded-full transition-all duration-300"
              style={{
                width: i <= activeIndex ? "24px" : "8px",
                height: "8px",
                backgroundColor: i <= activeIndex ? "#1FA5E8" : "#cbd5e1",
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

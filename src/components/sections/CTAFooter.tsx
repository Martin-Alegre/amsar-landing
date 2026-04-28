import { useEffect, useRef, useState } from "react";
import { MessageCircle, Instagram, Scale, Shield, UserCheck, ChevronDown } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useReducedMotion } from "@/hooks/useReducedMotion";

gsap.registerPlugin(ScrollTrigger);

const legalItems = [
  {
    id: "terminos",
    icon: Scale,
    title: "Términos y Condiciones",
    content: `Al acceder y utilizar este sitio web, aceptás los siguientes términos de uso.

El contenido de este sitio es de carácter informativo y no constituye una oferta contractual vinculante. Los planes, coberturas y precios están sujetos a confirmación al momento de la afiliación.

Amsar Salud se reserva el derecho de modificar el contenido de este sitio sin previo aviso. El uso indebido, reproducción no autorizada o distribución del contenido está prohibido.

Los enlaces a sitios de terceros son provistos a modo informativo. Amsar Salud no se responsabiliza por el contenido de dichos sitios.

La información de contacto proporcionada en formularios será utilizada exclusivamente para gestionar tu consulta o afiliación.

Para consultas sobre términos y condiciones de la cobertura médica, comunicarse con nuestro equipo: info@amsarsalud.com.ar`,
  },
  {
    id: "privacidad",
    icon: Shield,
    title: "Privacidad y Protección de Datos",
    content: `Amsar Salud cumple con la Ley 25.326 de Protección de Datos Personales (Argentina).

Los datos personales que nos proporcionás (nombre, correo electrónico, teléfono) son utilizados exclusivamente para:
• Responder a tu consulta o solicitud de afiliación.
• Enviarte información relacionada con los servicios de Amsar Salud.
• Cumplir con obligaciones legales y regulatorias.

Tus datos no serán vendidos, cedidos ni compartidos con terceros sin tu consentimiento explícito, excepto cuando sea requerido por ley.

Utilizamos cookies técnicas para el funcionamiento del sitio. No utilizamos cookies de rastreo publicitario sin tu consentimiento.

Tenés derecho a acceder, rectificar, actualizar y suprimir tus datos en cualquier momento. Para ejercer estos derechos, escribinos a: info@amsarsalud.com.ar

El titular del sitio es Amsar Salud. La información es tratada con medidas de seguridad técnicas y organizativas adecuadas para proteger tus datos.`,
  },
  {
    id: "consumidor",
    icon: UserCheck,
    title: "Defensa del Consumidor",
    content: `En cumplimiento de la Ley 24.240 de Defensa del Consumidor de la República Argentina, informamos:

Tenés derecho a recibir información clara, veraz y detallada sobre los servicios ofrecidos antes de cualquier contratación.

Ante cualquier inconveniente o disconformidad con nuestro servicio, podés:
• Contactarnos directamente: WhatsApp +54 9 11 7371-9197 o info@amsarsalud.com.ar.
• Presentar un reclamo ante la Dirección Nacional de Defensa del Consumidor.
• Acceder al sistema nacional de arbitraje de consumo.

Nuestro compromiso de respuesta es de 1 hora hábil para consultas recibidas por WhatsApp. En caso de no cumplirse, podés notificarnos y revisaremos el caso.

La afiliación no genera costos ocultos. Cualquier modificación en los planes será notificada con la anticipación requerida por ley.

Para ejercer tus derechos como consumidor o presentar una queja formal, escribinos a: info@amsarsalud.com.ar`,
  },
];

function LegalAccordion({ item }: { item: typeof legalItems[0] }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-t border-white/10">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between py-3 text-left group"
      >
        <div className="flex items-center gap-2">
          <item.icon className="w-4 h-4 text-amsar-cyan" strokeWidth={1.5} />
          <span className="text-white/70 text-sm group-hover:text-white transition-colors">
            {item.title}
          </span>
        </div>
        <ChevronDown
          className={`w-4 h-4 text-white/40 transition-transform duration-300 ${open ? "rotate-180" : ""}`}
        />
      </button>
      <div
        className="overflow-hidden transition-all duration-300"
        style={{ maxHeight: open ? "600px" : "0px", opacity: open ? 1 : 0 }}
      >
        <div className="text-white/50 text-xs leading-relaxed pb-4 whitespace-pre-line pl-6">
          {item.content}
        </div>
      </div>
    </div>
  );
}

export default function CTAFooter() {
  const sectionRef = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced || !sectionRef.current) return;

    const ctx = gsap.context(() => {
      const content = sectionRef.current?.querySelector(".cta-content");
      if (content) {
        gsap.from(content, {
          y: 30,
          opacity: 0,
          duration: 0.6,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, [reduced]);

  return (
    <>
      {/* CTA Final */}
      <section
        ref={sectionRef}
        className="py-20 lg:py-28 bg-amsar-deep relative overflow-hidden"
      >
        {/* Subtle pattern */}
        <div className="absolute inset-0 opacity-5" aria-hidden="true">
          <div className="absolute inset-0" style={{
            backgroundImage: "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }} />
        </div>

        <div className="cta-content relative z-10 section-padding max-w-4xl mx-auto text-center">
          <h2 className="text-white mb-6">
            ¿Listo para una obra social que sí te responde?
          </h2>
          <p className="text-white/70 text-lg mb-8">
            Atención humana real. En minutos.
          </p>
          <a
            href="https://wa.me/5491173719197?text=Hola%2C%20tengo%20una%20consulta%20sobre%20Amsar"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-wa text-lg px-10 py-5 inline-flex"
          >
            <MessageCircle className="w-6 h-6" />
            Hablar por WhatsApp
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-amsar-deep border-t border-white/10 pt-16 pb-8">
        <div className="section-padding max-w-7xl mx-auto">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
            {/* Col 1: Brand */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <img
                  src="/logo_sin_fondo_v2.png"
                  alt="Amsar Salud"
                  className="h-8 w-auto brightness-0 invert"
                  onError={(e) => {
                    const img = e.currentTarget;
                    img.src = "/logo-amsar.jpg";
                    img.className = "h-7 w-auto rounded bg-white/15 p-1";
                  }}
                />
                <span className="font-bold text-lg text-white">Amsar</span>
              </div>
              <p className="text-white/60 text-sm leading-relaxed mb-4">
                La obra social para monotributistas que sí responde.
              </p>
              <div className="flex items-center gap-3">
                <a
                  href="https://instagram.com/amsarsalud"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
                  aria-label="Instagram de Amsar"
                >
                  <Instagram className="w-4 h-4 text-white" />
                </a>
                <a
                  href="https://wa.me/5491173719197"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full bg-wa-green/20 flex items-center justify-center hover:bg-wa-green/30 transition-colors"
                  aria-label="WhatsApp de Amsar"
                >
                  <MessageCircle className="w-4 h-4 text-wa-green" />
                </a>
              </div>
            </div>

            {/* Col 2: Links */}
            <div>
              <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">
                Navegación
              </h4>
              <ul className="space-y-3">
                {[
                  { label: "Beneficios", href: "#beneficios" },
                  { label: "Cómo funciona", href: "#solucion" },
                  { label: "FAQ", href: "#faq" },
                  { label: "Contacto", href: "#formulario" },
                ].map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      className="text-white/60 hover:text-white transition-colors text-sm"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Col 3: Legal (accordion) */}
            <div>
              <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">
                Legal
              </h4>
              <div>
                {legalItems.map((item) => (
                  <LegalAccordion key={item.id} item={item} />
                ))}
              </div>
            </div>

            {/* Col 4: Contact */}
            <div>
              <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">
                Contacto
              </h4>
              <ul className="space-y-3 text-sm text-white/60">
                <li>
                  <a
                    href="https://wa.me/5491173719197"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-white transition-colors"
                  >
                    WhatsApp: +54 9 11 7371-9197
                  </a>
                </li>
                <li>Email: info@amsarsalud.com.ar</li>
              </ul>
            </div>
          </div>

          <div className="border-t border-white/10 pt-6 flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-white/40 text-sm">
              © 2026 Amsar Salud. Todos los derechos reservados.
            </p>
            <p className="text-white/40 text-sm">
              Obra social de monotributistas — Mat. INSSSEP
            </p>
          </div>
        </div>
      </footer>

      {/* Floating WhatsApp */}
      <a
        href="https://wa.me/5491173719197?text=Hola%2C%20vi%20la%20web%20y%20quiero%20info%20de%20Amsar"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-wa-green rounded-full flex items-center justify-center shadow-deep hover:scale-110 transition-transform"
        aria-label="Contactar por WhatsApp"
      >
        <div className="absolute inset-0 rounded-full bg-wa-green animate-pulse-ring" />
        <MessageCircle className="w-7 h-7 text-white relative z-10" />
      </a>
    </>
  );
}

import { useEffect, useRef } from "react";
import { MessageCircle } from "lucide-react";
import gsap from "gsap";

export default function StickyBar() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    gsap.from(ref.current, {
      y: -36,
      duration: 0.5,
      ease: "power3.out",
    });
  }, []);

  const scrollToCTA = () => {
    const el = document.getElementById("oferta");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div
      ref={ref}
      onClick={scrollToCTA}
      className="fixed top-0 left-0 right-0 z-50 py-3 bg-amsar-deep flex items-center justify-center cursor-pointer hover:bg-amsar-mid transition-colors"
    >
      <div className="flex items-center justify-center gap-2 text-white font-medium w-full px-4 mx-auto text-center">
        <MessageCircle className="w-[18px] h-[18px] text-white shrink-0" />
        <span className="hidden sm:inline text-sm leading-tight">
          Te respondemos en WhatsApp en menos de 1 hora — atención humana real, no bots.
        </span>
        <span className="sm:hidden text-[13px] leading-tight text-center">
          Respuesta WhatsApp &lt; 1 h. Atención humana.
        </span>
      </div>
    </div>
  );
}

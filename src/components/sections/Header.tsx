import { useState, useEffect } from "react";
import { Menu, X, MessageCircle } from "lucide-react";

const navLinks = [
  { label: "Beneficios", href: "#beneficios" },
  { label: "Cómo funciona", href: "#solucion" },
  { label: "Preguntas", href: "#faq" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (href: string) => {
    setMobileOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header
      className={`fixed top-9 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled
          ? "glass shadow-soft border-b border-white/20"
          : "bg-transparent"
      }`}
    >
      <div className="section-padding max-w-7xl mx-auto flex items-center justify-between h-16 lg:h-20">
        <a href="#" className="flex items-center gap-2 group">
          <img
            src="/logo_sin_fondo_v2.png"
            alt="Amsar Salud logo"
            className={`h-8 w-auto transition-all duration-300 group-hover:scale-105`}
            onError={(e) => {
              const img = e.currentTarget;
              img.src = "/logo-amsar.jpg";
              img.className = `h-7 w-auto rounded transition-all duration-300 group-hover:scale-105`;
            }}
          />
          <span
            className={`font-bold text-lg tracking-tight transition-colors ${
              scrolled ? "text-amsar-deep" : "text-white"
            }`}
          >
            Amsar
          </span>
        </a>

        <nav className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <button
              key={link.href}
              onClick={() => scrollTo(link.href)}
              className={`text-sm font-medium transition-colors relative group ${
                scrolled ? "text-amsar-deep" : "text-white/90"
              }`}
            >
              {link.label}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-amsar-cyan transition-all duration-300 group-hover:w-full" />
            </button>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <a
            href="https://wa.me/5491173719197?text=Hola%2C%20vi%20la%20web%20y%20quiero%20info%20de%20Amsar"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex btn-wa text-sm py-2.5 px-4"
          >
            <MessageCircle className="w-4 h-4" />
            WhatsApp
          </a>
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden p-2 rounded-lg"
            aria-label="Abrir menú"
          >
            {mobileOpen ? (
              <X className={`w-6 h-6 ${scrolled ? "text-amsar-deep" : "text-white"}`} />
            ) : (
              <Menu className={`w-6 h-6 ${scrolled ? "text-amsar-deep" : "text-white"}`} />
            )}
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div className="lg:hidden glass border-t border-white/20">
          <div className="section-padding py-6 flex flex-col gap-4">
            {navLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => scrollTo(link.href)}
                className="text-left text-amsar-deep font-medium py-2"
              >
                {link.label}
              </button>
            ))}
            <a
              href="https://wa.me/5491173719197?text=Hola%2C%20vi%20la%20web%20y%20quiero%20info%20de%20Amsar"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-wa text-sm justify-center mt-2"
            >
              <MessageCircle className="w-4 h-4" />
              Hablar por WhatsApp
            </a>
          </div>
        </div>
      )}
    </header>
  );
}

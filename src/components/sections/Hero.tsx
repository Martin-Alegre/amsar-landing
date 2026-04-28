import { useEffect, useRef, useState } from "react";
import { MessageCircle, ChevronDown, Clock, Shield, Store, Sparkles } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useReducedMotion } from "@/hooks/useReducedMotion";

gsap.registerPlugin(ScrollTrigger);

const trustItems = [
  { icon: Clock, text: "Respuesta < 1h" },
  { icon: Shield, text: "Telemedicina 24/7" },
  { icon: Store, text: "+1.000 comercios" },
  { icon: Sparkles, text: "Sin costo extra" },
];

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const trustRef = useRef<HTMLDivElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);
  const [videoReady, setVideoReady] = useState(false);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced || !sectionRef.current || !videoRef.current) return;
    const video = videoRef.current;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (video.readyState === 0) video.load();
          video.play().catch(() => {});
        } else {
          video.pause();
        }
      },
      { threshold: 0.1 }
    );
    observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, [reduced]);

  useEffect(() => {
    if (reduced || !sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Headline word reveal
      const words = headlineRef.current?.querySelectorAll(".word");
      if (words) {
        gsap.from(words, {
          opacity: 0,
          filter: "blur(8px)",
          y: 20,
          duration: 0.6,
          stagger: 0.08,
          ease: "power3.out",
          delay: 0.3,
        });
      }

      // Underline animation
      const underline = headlineRef.current?.querySelector(".underline-anim");
      if (underline) {
        gsap.from(underline, {
          scaleX: 0,
          duration: 0.8,
          ease: "power3.out",
          delay: 0.9,
          transformOrigin: "left center",
        });
      }

      // Subheadline
      if (subRef.current) {
        gsap.from(subRef.current, {
          opacity: 0,
          y: 20,
          duration: 0.6,
          ease: "power3.out",
          delay: 0.7,
        });
      }

      // CTA buttons
      if (ctaRef.current) {
        gsap.from(ctaRef.current.children, {
          opacity: 0,
          y: 20,
          duration: 0.5,
          stagger: 0.1,
          ease: "power3.out",
          delay: 0.9,
        });
      }

      // Trust strip
      if (trustRef.current) {
        gsap.from(trustRef.current.children, {
          opacity: 0,
          y: 15,
          duration: 0.5,
          stagger: 0.1,
          ease: "power3.out",
          delay: 1.2,
        });
      }

      // Scroll indicator
      if (scrollIndicatorRef.current) {
        gsap.from(scrollIndicatorRef.current, {
          opacity: 0,
          duration: 0.5,
          delay: 1.6,
        });
        gsap.to(scrollIndicatorRef.current.querySelector(".bounce"), {
          y: 8,
          duration: 1,
          repeat: -1,
          yoyo: true,
          ease: "power1.inOut",
        });
      }

      // Parallax on subheadline
      if (subRef.current) {
        gsap.to(subRef.current, {
          y: -50,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, [reduced]);

  const scrollToHow = () => {
    const el = document.getElementById("solucion");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-24 pb-16"
    >
      {/* Static gradient — always visible, acts as fallback while video loads */}
      <div className="absolute inset-0 bg-gradient-to-br from-amsar-deep via-[#0d3a5e] to-amsar-deep" aria-hidden="true" />

      {/* Video background — lazy loads via IntersectionObserver */}
      {!reduced && (
        <video
          ref={videoRef}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${videoReady ? "opacity-100" : "opacity-0"}`}
          style={{ objectPosition: "70% center" }}
          src="/videos/hero.mp4"
          muted
          loop
          playsInline
          preload="none"
          onCanPlay={() => setVideoReady(true)}
          aria-hidden="true"
        />
      )}

      <div className="absolute inset-0 bg-amsar-deep/50" aria-hidden="true" />

      <div className="relative z-10 section-padding max-w-7xl mx-auto w-full">
        <div className="max-w-3xl">
          <h1
            ref={headlineRef}
            className="text-white mb-6"
          >
            <span className="word inline-block">La</span>{" "}
            <span className="word inline-block">obra</span>{" "}
            <span className="word inline-block">social</span>{" "}
            <span className="word inline-block">que</span>{" "}
            <span className="word inline-block">sí</span>{" "}
            <span className="word inline-block relative">
              te responde
              <span className="underline-anim absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-amsar-cyan to-amsar-cyan-light rounded-full" />
            </span>
            <span className="word inline-block text-amsar-cyan">.</span>
          </h1>

          <p
            ref={subRef}
            className="text-lg sm:text-xl text-white/80 leading-relaxed max-w-2xl mb-8"
          >
            Cobertura completa, telemedicina 24/7 y descuentos en +1.000 comercios. 
            Sin costo extra. Sin desaparecer cuando nos necesitás. 
            Hecho para monotributistas como vos.
          </p>

          <div ref={ctaRef} className="flex flex-wrap items-center gap-4 mb-12">
            <a
              href="https://wa.me/5491173719197?text=Hola%2C%20vi%20la%20web%20y%20quiero%20info%20de%20Amsar"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-wa text-base sm:text-lg px-8 py-4"
            >
              <MessageCircle className="w-5 h-5" />
              Quiero hablar ahora por WhatsApp
            </a>
            <button
              onClick={scrollToHow}
              className="text-white/90 hover:text-amsar-cyan transition-colors flex items-center gap-2 text-sm font-medium group"
            >
              Ver cómo funciona
              <ChevronDown className="w-4 h-4 group-hover:translate-y-1 transition-transform" />
            </button>
          </div>

          <div
            ref={trustRef}
            className="grid grid-cols-2 sm:grid-cols-4 gap-3"
          >
            {trustItems.map((item) => (
              <div
                key={item.text}
                className="rounded-xl px-4 py-3 flex items-center gap-2 border border-white/20 bg-white/5"
              >
                <item.icon className="w-4 h-4 text-amsar-cyan shrink-0" />
                <span className="text-white text-sm font-medium">{item.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div
        ref={scrollIndicatorRef}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <div className="bounce flex flex-col items-center text-white/50">
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center pt-2">
            <div className="w-1 h-2 bg-white/60 rounded-full" />
          </div>
        </div>
      </div>
    </section>
  );
}

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { MessageCircle, Loader2, CheckCircle2 } from "lucide-react";
import { leadSchema, type LeadInput } from "@contracts/leads";
import confetti from "canvas-confetti";

const WEBHOOK_URL = import.meta.env.VITE_WEBHOOK_URL as string;

const provincias = [
  "Buenos Aires", "CABA", "Catamarca", "Chaco", "Chubut", "Córdoba", "Corrientes",
  "Entre Ríos", "Formosa", "Jujuy", "La Pampa", "La Rioja", "Mendoza", "Misiones",
  "Neuquén", "Río Negro", "Salta", "San Juan", "San Luis", "Santa Cruz", "Santa Fe",
  "Santiago del Estero", "Tierra del Fuego", "Tucumán",
];

const categorias = [
  "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "No estoy seguro",
];

export default function Formulario() {
  const [submitted, setSubmitted] = useState(false);
  const [isPending, setIsPending] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [submittedName, setSubmittedName] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LeadInput>({
    resolver: zodResolver(leadSchema),
    defaultValues: {
      acceptComms: false,
      honeypot: "",
    },
  });

  const onSubmit = async (data: LeadInput) => {
    if (data.honeypot && data.honeypot.length > 0) return;

    setIsPending(true);
    setSubmitError("");

    try {
      const res = await fetch(WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nombre: data.nombre,
          telefono: data.telefono,
          email: data.email,
          edad: data.edad,
          categoriaMonotributo: data.categoriaMonotributo || null,
          provincia: data.provincia || null,
          acceptComms: data.acceptComms,
          source: "landing",
        }),
      });

      if (!res.ok) throw new Error(`HTTP ${res.status}`);

      setSubmittedName(data.nombre);
      setSubmitted(true);
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.7 },
        colors: ["#1FA5E8", "#5BC0EB", "#0A2540"],
        gravity: 0.8,
        ticks: 150,
      });

      const waUrl = `https://wa.me/5491173719197?text=Hola%2C%20vi%20la%20web%20y%20quiero%20info%20de%20Amsar%20-%20Me%20llamo%20${encodeURIComponent(data.nombre)}`;
      setTimeout(() => { window.location.href = waUrl; }, 2000);
    } catch (err) {
      setSubmitError("Hubo un error al enviar. Intentá de nuevo o escribinos por WhatsApp.");
    } finally {
      setIsPending(false);
    }
  };

  if (submitted) {
    return (
      <section id="formulario" className="py-20 lg:py-28 bg-white">
        <div className="section-padding max-w-xl mx-auto text-center">
          <CheckCircle2 className="w-16 h-16 text-green-500 mx-auto mb-4" />
          <h3 className="text-2xl font-semibold text-amsar-deep mb-3">
            ¡Gracias, {submittedName}!
          </h3>
          <p className="text-slate-600 mb-6">
            Te estamos redirigiendo a WhatsApp para que hables con nosotros...
          </p>
          <a
            href={`https://wa.me/5491173719197?text=Hola%2C%20vi%20la%20web%20y%20quiero%20info%20de%20Amsar%20-%20Me%20llamo%20${encodeURIComponent(submittedName)}`}
            className="btn-wa inline-flex"
          >
            <MessageCircle className="w-5 h-5" />
            Ir a WhatsApp ahora
          </a>
        </div>
      </section>
    );
  }

  return (
    <section id="formulario" className="py-20 lg:py-28 bg-white">
      <div className="section-padding max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left copy */}
          <div>
            <h2 className="mb-4">
              ¿Preferís que te contactemos nosotros?
            </h2>
            <p className="text-lg text-slate-600 mb-8">
              Dejanos tus datos y te escribimos por WhatsApp en menos de 1 hora.
            </p>
            <ul className="space-y-4">
              {[
                "Te respondemos por WhatsApp en menos de 1 hora",
                "Te explicamos todo sin presión",
                "Te guiamos paso a paso en la afiliación",
              ].map((item) => (
                <li key={item} className="flex items-center gap-3 text-slate-700">
                  <div className="w-6 h-6 rounded-full bg-amsar-cyan/10 flex items-center justify-center shrink-0">
                    <CheckCircle2 className="w-4 h-4 text-amsar-cyan" />
                  </div>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Form */}
          <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-elevated border border-slate-100">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              {/* Honeypot */}
              <div className="hidden">
                <input {...register("honeypot")} tabIndex={-1} autoComplete="off" />
              </div>

              <div>
                <label className="block text-sm font-medium text-amsar-deep mb-1.5">
                  Nombre y apellido *
                </label>
                <input
                  {...register("nombre")}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-amsar-cyan focus:ring-2 focus:ring-amsar-cyan/20 outline-none transition-all"
                  placeholder="Ej: Martín Alegre"
                />
                {errors.nombre && (
                  <p className="text-red-500 text-sm mt-1">{errors.nombre.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-amsar-deep mb-1.5">
                  WhatsApp *
                </label>
                <input
                  {...register("telefono")}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-amsar-cyan focus:ring-2 focus:ring-amsar-cyan/20 outline-none transition-all"
                  placeholder="Ej: 11 7371-9197"
                />
                {errors.telefono && (
                  <p className="text-red-500 text-sm mt-1">{errors.telefono.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-amsar-deep mb-1.5">
                  Email *
                </label>
                <input
                  {...register("email")}
                  type="email"
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-amsar-cyan focus:ring-2 focus:ring-amsar-cyan/20 outline-none transition-all"
                  placeholder="tu@email.com"
                />
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-amsar-deep mb-1.5">
                    Edad *
                  </label>
                  <input
                    {...register("edad", { valueAsNumber: true })}
                    type="number"
                    min={18}
                    max={65}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-amsar-cyan focus:ring-2 focus:ring-amsar-cyan/20 outline-none transition-all"
                    placeholder="25"
                  />
                  {errors.edad && (
                    <p className="text-red-500 text-sm mt-1">{errors.edad.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-amsar-deep mb-1.5">
                    Categoría monotributo
                  </label>
                  <select
                    {...register("categoriaMonotributo")}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-amsar-cyan focus:ring-2 focus:ring-amsar-cyan/20 outline-none transition-all bg-white"
                  >
                    <option value="">Seleccionar</option>
                    {categorias.map((c) => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-amsar-deep mb-1.5">
                  Provincia
                </label>
                <select
                  {...register("provincia")}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-amsar-cyan focus:ring-2 focus:ring-amsar-cyan/20 outline-none transition-all bg-white"
                >
                  <option value="">Seleccionar</option>
                  {provincias.map((p) => (
                    <option key={p} value={p}>{p}</option>
                  ))}
                </select>
              </div>

              <div className="flex items-start gap-3">
                <input
                  {...register("acceptComms")}
                  type="checkbox"
                  id="accept"
                  className="mt-1 w-4 h-4 rounded border-slate-300 text-amsar-cyan focus:ring-amsar-cyan"
                />
                <label htmlFor="accept" className="text-sm text-slate-600">
                  Acepto recibir comunicaciones de Amsar. *
                </label>
              </div>
              {errors.acceptComms && (
                <p className="text-red-500 text-sm">{errors.acceptComms.message}</p>
              )}

              {submitError && (
                <p className="text-red-500 text-sm text-center">{submitError}</p>
              )}

              <button
                type="submit"
                disabled={isPending}
                className="w-full btn-wa justify-center disabled:opacity-70"
              >
                {isPending ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Enviando...
                  </>
                ) : (
                  <>
                    <MessageCircle className="w-5 h-5" />
                    Quiero que me contacten
                  </>
                )}
              </button>

              <p className="text-xs text-slate-500 text-center">
                Tus datos son privados. No los compartimos con nadie. Solo los usamos para contactarte.
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

import { Scale, Shield, UserCheck } from "lucide-react";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";

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

Para consultas sobre términos y condiciones de la cobertura médica, comunicarse con nuestro equipo: amsar.crm@gmail.com`,
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

Tenés derecho a acceder, rectificar, actualizar y suprimir tus datos en cualquier momento. Para ejercer estos derechos, escribinos a: amsar.crm@gmail.com

El titular del sitio es Amsar Salud. La información es tratada con medidas de seguridad técnicas y organizativas adecuadas para proteger tus datos.`,
  },
  {
    id: "consumidor",
    icon: UserCheck,
    title: "Defensa del Consumidor",
    content: `En cumplimiento de la Ley 24.240 de Defensa del Consumidor de la República Argentina, informamos:

Tenés derecho a recibir información clara, veraz y detallada sobre los servicios ofrecidos antes de cualquier contratación.

Ante cualquier inconveniente o disconformidad con nuestro servicio, podés:
• Contactarnos directamente: WhatsApp +54 9 11 7821-3869 o amsar.crm@gmail.com.
• Presentar un reclamo ante la Dirección Nacional de Defensa del Consumidor.
• Acceder al sistema nacional de arbitraje de consumo.

Nuestro compromiso de respuesta es de 1 hora hábil para consultas recibidas por WhatsApp. En caso de no cumplirse, podés notificarnos y revisaremos el caso.

La afiliación no genera costos ocultos. Cualquier modificación en los planes será notificada con la anticipación requerida por ley.

Para ejercer tus derechos como consumidor o presentar una queja formal, escribinos a: amsar.crm@gmail.com`,
  },
];

export default function Legal() {
  return (
    <section id="legal" className="py-16 lg:py-20 bg-slate-50 border-t border-slate-100">
      <div className="section-padding max-w-3xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-2xl lg:text-3xl font-semibold text-amsar-deep mb-3">
            Información legal
          </h2>
          <p className="text-slate-500 text-sm">
            Transparencia total. Hacé clic en cada sección para ver el detalle.
          </p>
        </div>

        <Accordion type="single" collapsible className="bg-white rounded-2xl shadow-soft border border-slate-100 overflow-hidden divide-y divide-slate-100">
          {legalItems.map((item) => (
            <AccordionItem key={item.id} value={item.id} className="border-none">
              <AccordionTrigger className="px-6 py-5 text-base font-semibold text-amsar-deep hover:no-underline hover:text-amsar-cyan group">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-amsar-cyan/10 flex items-center justify-center shrink-0 group-hover:bg-amsar-cyan/20 transition-colors">
                    <item.icon className="w-4 h-4 text-amsar-cyan" strokeWidth={1.5} />
                  </div>
                  {item.title}
                </div>
              </AccordionTrigger>
              <AccordionContent className="px-6 pb-6">
                <div className="text-slate-600 text-sm leading-relaxed whitespace-pre-line pl-11">
                  {item.content}
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}

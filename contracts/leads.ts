import { z } from "zod";

export const leadSchema = z.object({
  nombre: z.string().min(2, "El nombre es requerido").max(255),
  telefono: z.string().regex(/^(?:(?:00)?549?)?0?(?:11|[2368]\d)(?:(?=\d{0,2}15)\d{2})??\d{8}$/, "Ingresá un número válido de Argentina"),
  email: z.string().email("Email inválido"),
  edad: z.number().int().min(18, "Debes ser mayor de 18").max(65, "Edad máxima 65 años"),
  categoriaMonotributo: z.string().optional(),
  provincia: z.string().optional(),
  honeypot: z.string().optional(),
  acceptComms: z.boolean().refine((val) => val === true, "Debés aceptar recibir comunicaciones"),
  source: z.string().optional(),
  utmSource: z.string().optional(),
  utmMedium: z.string().optional(),
  utmCampaign: z.string().optional(),
});

export type LeadInput = z.infer<typeof leadSchema>;

import { createRouter, publicQuery } from "../middleware";
import { leadSchema } from "@contracts/leads";
import { getDb } from "../queries/connection";
import { leads } from "@db/schema";

export const leadsRouter = createRouter({
  create: publicQuery
    .input(leadSchema)
    .mutation(async ({ input }) => {
      // Honeypot anti-spam
      if (input.honeypot && input.honeypot.length > 0) {
        throw new Error("Spam detected");
      }

      const db = getDb();
      
      const result = await db.insert(leads).values({
        nombre: input.nombre,
        telefono: input.telefono,
        email: input.email,
        edad: input.edad,
        categoriaMonotributo: input.categoriaMonotributo || null,
        provincia: input.provincia || null,
        source: input.source || "landing",
        utmSource: input.utmSource || null,
        utmMedium: input.utmMedium || null,
        utmCampaign: input.utmCampaign || null,
      });

      // Webhook trigger to n8n (optional, fires async)
      const webhookUrl = process.env.N8N_WEBHOOK_URL;
      if (webhookUrl) {
        fetch(webhookUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(input),
        }).catch(() => {});
      }

      return {
        success: true,
        id: Number(result[0].insertId),
        redirectUrl: `https://wa.me/5491173719197?text=Hola%2C%20vi%20la%20web%20y%20quiero%20info%20de%20Amsar%20-%20Me%20llamo%20${encodeURIComponent(input.nombre)}`,
      };
    }),
});

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

      // Fire webhook to n8n (primary path — works without DB)
      const webhookUrl = process.env.N8N_WEBHOOK_URL;
      if (webhookUrl) {
        await fetch(webhookUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(input),
        });
      }

      // DB insert is secondary — skip gracefully if DATABASE_URL is not configured
      let insertId = 0;
      if (process.env.DATABASE_URL) {
        try {
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
          insertId = Number(result[0].insertId);
        } catch (_) {}
      }

      return {
        success: true,
        id: insertId,
        redirectUrl: `https://wa.me/5491178213869?text=Hola%2C%20vi%20la%20web%20y%20quiero%20info%20de%20Amsar%20-%20Me%20llamo%20${encodeURIComponent(input.nombre)}`,
      };
    }),
});

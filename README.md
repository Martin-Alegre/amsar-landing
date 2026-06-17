# Amsar Salud — Landing Page Premium

Landing page de alta conversión para Amsar Salud. Obra social para monotributistas en Argentina.

## Stack

- **Frontend**: React 19 + TypeScript + Vite + Tailwind CSS + shadcn/ui
- **Backend**: tRPC + Hono + Drizzle ORM + MySQL
- **Animaciones**: GSAP (ScrollTrigger) + Framer Motion
- **3D/WebGL**: Custom WebGL shader (hero background)
- **Form**: React Hook Form + Zod + tRPC

## Instalación local

```bash
npm install
npm run dev
```

La app corre en `http://localhost:3000`.

## Build producción

```bash
npm run build
npm start
```

## Database

```bash
npm run db:push    # sync schema
npm run db:generate  # generar migraciones
```

## Variables de entorno

Copiar `.env.example` a `.env` y completar:

- `VITE_SUPABASE_URL` / `VITE_SUPABASE_ANON_KEY`: Supabase project
- `VITE_GA4_ID`: Google Analytics 4
- `VITE_META_PIXEL_ID`: Meta Pixel
- `N8N_WEBHOOK_URL`: Webhook para leads
- `DATABASE_URL`: MySQL connection string

## Estructura

```
/src
  /components/sections   — 13 bloques de la landing
  /components/ui         — shadcn/ui components
  /hooks                 — Custom hooks
  /pages                 — Home.tsx
  /providers             — tRPC provider
/api
  /routers/leads.ts      — tRPC router para leads
/db
  schema.ts              — Drizzle schema (tabla leads)
/public
  llms.txt, llms-full.txt, robots.txt, sitemap.xml
```

## Iteración con Claude Code / Antigravity

1. Clonar repo
2. `npm install && npm run dev`
3. Hacer cambios
4. Push a GitHub
5. Vercel deploya automático

## Contacto

- WhatsApp: +54 9 11 7821-3869
- Email: contacto@amsarsalud.com
- Web: https://amsarsalud.com.ar

## Cambios recientes

- **WhatsApp actualizado**: nuevo número +54 9 11 7821-3869 en todos los links y textos legales.
- **Email actualizado**: amsar.crm@gmail.com reemplaza al anterior en todo el sitio y textos legales.
- **Facebook**: ícono/link de Facebook agregado al footer junto a Instagram y WhatsApp.
- **Sección "Relación de dependencia"** (`#relacion-dependencia`): nueva sección ubicada después de Testimonios, con CTA de WhatsApp y mensaje pre-cargado. Enlace sutil también en el hero.
- **FAQ**: 2 preguntas nuevas sobre relación de dependencia y costos de traspaso.

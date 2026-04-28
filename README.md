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

- WhatsApp: +54 9 11 7371-9197
- Web: https://amsarsalud.com.ar

# Amsar Salud — Landing Page Premium

Landing page de alta conversión para Amsar Salud. Red médica de confianza para monotributistas en Argentina.

- **Producción:** https://amsarsalud.com
- **Deploy:** automático — GitHub Actions → build → FTPS → Hostinger (ver [DEPLOYMENT.md](DEPLOYMENT.md))
- **Infra:** dominio `amsarsalud.com` (registrar **IONOS**) · DNS/proxy en **Cloudflare** · hosting **Hostinger**

## Stack

- **Frontend (lo que se publica):** React 19 + TypeScript + Vite + Tailwind CSS + shadcn/ui
- **Animaciones / 3D:** GSAP (ScrollTrigger) + Framer Motion + WebGL (hero) + three.js
- **Form:** React Hook Form + Zod ([contracts/leads.ts](contracts/leads.ts)) + reCAPTCHA v3
- **Backend (presente en el repo pero NO usado en producción):** tRPC + Hono + Drizzle ORM + MySQL

> ⚠️ **En producción la web es estática.** El formulario postea **directo desde el navegador al
> webhook de n8n** (`VITE_WEBHOOK_URL`); el reenvío del lead a la casilla ocurre **dentro de n8n**.
> El backend `api/` (Hono/tRPC) y `db/` (Drizzle/MySQL) **no se ejecutan** en el deploy estático
> (`DATABASE_URL` está vacío). Quedan como base para un eventual backend.

## Instalación local

```bash
npm install
npm run dev   # http://localhost:3000
```

## Build de producción

```bash
npm run build   # genera dist/public/ (estático) — ESO es lo que se despliega
```

> `npm start` levanta el server Node (Hono); es solo para desarrollo del backend, **no** se usa en prod.

## Deploy (automático)

`git push origin main` → GitHub Actions buildea y sube `dist/public/` por **FTPS** a Hostinger.
Detalle completo (cuenta FTP, secretos, document root, troubleshooting): **[DEPLOYMENT.md](DEPLOYMENT.md)**.

- Document root real: `domains/amsarsalud.com/public_html` (dominio **addon**).
- **No reactivar** el Git Auto Deploy de Hostinger (subiría código fuente → web en blanco).

## Variables de entorno

Las que realmente usa el build (públicas, se hornean en el bundle) viven en [.env.production](.env.production):

- `VITE_WEBHOOK_URL` — webhook de n8n que recibe los leads.
- `VITE_RECAPTCHA_SITE_KEY` — site key de reCAPTCHA v3 (registrada para `amsarsalud.com`).

> GA4 y Meta Pixel están **hardcodeados** en [index.html](index.html) (no por env).
> `.env.example` lista variables heredadas (Supabase, `DATABASE_URL`, etc.) que **no** se usan en producción.

## Estructura

```
/src
  /components/sections   — bloques de la landing
  /components/ui         — shadcn/ui
  /hooks /pages /providers
/contracts               — schema Zod compartido (USADO por el form)   ← vivo
/api                     — Hono + tRPC                                  ← inerte en prod
/db                      — Drizzle schema (tabla leads)                 ← inerte en prod
/public                  — og.png, .htaccess, robots.txt, sitemap.xml, llms*.txt, videos/
.github/workflows/deploy.yml — pipeline de deploy automático
```

## Iteración

1. `npm install && npm run dev`
2. Hacer cambios
3. `git push origin main` → GitHub Actions deploya a https://amsarsalud.com automáticamente

## Contacto

- WhatsApp: +54 9 11 7821-3869
- Email (display): contacto@amsarsalud.com
- Web: https://amsarsalud.com

## Cambios recientes

- **Reposicionamiento (legal/marca)**: AMSAR pasa de "obra social" a **"red médica de confianza"** en todo el sitio — headline **"La red médica que sí te responde"**, subtítulo, CTA, footer, secciones, SEO (`title`/OG/Twitter/JSON-LD) y `llms.txt`. Se **conserva** "obra social" solo donde refiere a la del **usuario** (traspaso en FAQ, relación de dependencia, testimonio). AMSAR ya no se autodenomina obra social (es una mutual).
- **Email de display** → `contacto@amsarsalud.com` (footer, textos legales, llms). El form sigue enviando al webhook de n8n.
- **Footer**: línea de comercializadora (Cooperativa de Trabajo Central Comercializadora Ltda · CUIT 30-71820875-7).
- **Legal**: bloque de comercialización al final de "Términos y Condiciones" y de "Privacidad".
- **Testimonio**: primer testimonio reescrito (mismo diseño/autor/estrellas).
- **Infra**: migración de Vercel → Hostinger; deploy automático por GitHub Actions + FTPS (ver [DEPLOYMENT.md](DEPLOYMENT.md)).
- **SEO**: dominio unificado a `amsarsalud.com` (canonical/OG/sitemap/robots) + `og.png` 1200×630.

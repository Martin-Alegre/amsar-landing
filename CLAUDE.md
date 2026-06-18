# CLAUDE.md — Amsar Salud (landing amsarsalud.com)

Landing **estática** (Vite + React + Tailwind/shadcn). Orientación completa: [README.md](README.md).

## Deploy — IMPORTANTE
- **Es automático:** `git push origin main` → GitHub Actions buildea y sube `dist/public/` por **FTPS** a Hostinger. **No hay uploads manuales.**
- Guía completa (cuenta FTP, secretos, document root, troubleshooting): **[DEPLOYMENT.md](DEPLOYMENT.md)**.
- Document root real: `domains/amsarsalud.com/public_html` (dominio **addon**). FTP user `u467229119.deployamsar`, host = IP **`185.173.111.68`** (NO `ftp.amsarsalud.com` → lo enruta Cloudflare y falla). `server-dir: ./`.
- ❌ **No reactivar** el Git Auto Deploy de Hostinger (sube código fuente → web en blanco).
- Verificar un deploy bypass Cloudflare:
  ```bash
  curl -s -k --resolve amsarsalud.com:443:185.173.111.68 https://amsarsalud.com/ | grep -oE "/assets/index-[A-Za-z0-9_-]+\.js"
  ```

## Producción = estática
El formulario postea **directo al webhook de n8n** (`VITE_WEBHOOK_URL`); `api/` (Hono/tRPC) y `db/` (Drizzle/MySQL) **NO se ejecutan** en prod. Variables públicas en `.env.production`. **No** commitear secretos.

## Build
`npm install` · `npm run dev` (local) · `npm run build` → `dist/public/` (lo desplegable).

## Infra
Registrar IONOS · DNS/proxy Cloudflare · hosting Hostinger. **No tocar DNS/Cloudflare** salvo pedido explícito.

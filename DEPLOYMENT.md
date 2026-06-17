# Despliegue — AMSAR Salud

Deploy **automático** de la landing a Hostinger. **No hay uploads manuales** ni Git Auto Deploy de Hostinger.

## Flujo

```
push a main  →  GitHub Actions (Ubuntu + Node 20)  →  npm ci  →  npm run build
            →  verificación del build  →  deploy FTPS al document root  →  verificación del sitio
```

Workflow: [.github/workflows/deploy.yml](.github/workflows/deploy.yml)

## Configuración confirmada (producción)

| Parámetro | Valor | Nota |
|-----------|-------|------|
| **FTP host** | `185.173.111.68` (IP) | ⚠️ **Usar la IP, no `ftp.amsarsalud.com`** — ese subdominio lo enruta Cloudflare y **no conecta por FTP**. |
| **FTP user** | `u467229119.deployamsar` | Cuenta dedicada al deploy. |
| **Document root** | `/home/u467229119/domains/amsarsalud.com/public_html` | `amsarsalud.com` es un dominio **addon**: su docroot está bajo `domains/`, NO en el `public_html` principal. |
| **`server-dir`** | `./` | La cuenta FTP ya entra **directo** en el docroot. |

> **Trampa conocida (no repetir):** la cuenta FTP principal `u467229119` está chrooteada a
> un `public_html` que **NO es** el del dominio. Deployar ahí "funciona" (verde) pero el sitio
> **no cambia**, porque esa carpeta no se sirve. Por eso se creó la cuenta `u467229119.deployamsar`
> anclada al docroot real. Tampoco usar `server-dir: public_html/` (crea un `public_html/public_html` anidado).

## Por qué GitHub Actions + FTPS (y no la integración Git de Hostinger)

- El hosting compartido de Hostinger **no ejecuta `npm run build`**; su Git Auto Deploy solo clona
  el repo → subiría **código fuente** (`index.html` → `/src/main.tsx`) y la web queda **en blanco**.
  **No reactivar Git Auto Deploy.**
- **GitHub Actions** buildea en entorno limpio y reproducible y sube **solo el estático** (`dist/public/`) por **FTPS** (cifrado).
- Deploy **incremental** (solo lo cambiado) → rápido y **sin downtime**. Mantiene `.htaccess` y
  elimina obsoletos vía el state-file del action (`.ftp-deploy-sync-state.json`).

## Secretos (GitHub → Settings → Secrets and variables → Actions)

| Secret | Valor |
|--------|-------|
| `HOSTINGER_FTP_HOST` | `185.173.111.68` |
| `HOSTINGER_FTP_USER` | `u467229119.deployamsar` |
| `HOSTINGER_FTP_PASSWORD` | (contraseña de la cuenta FTP de deploy) |

> El build **no** usa secretos: las `VITE_*` (públicas) viven en [.env.production](.env.production)
> y se hornean en el bundle. **Nunca** poner secretos ahí.

## Operación

- **Deploy normal:** `git push` a `main`.
- **Deploy manual:** GitHub → **Actions** → "Deploy a Hostinger" → **Run workflow**.
- **Estado:** pestaña Actions (verde = desplegado y verificado; rojo = falló y NO tocó producción).
- **Rollback:** `git revert <commit>` + push.

## Verificar un deploy contra el origin (bypass Cloudflare)

Como `cf-cache-status` puede confundir, verificar directo al IP:

```bash
# ¿qué bundle sirve el origin?
curl -s -k --resolve amsarsalud.com:443:185.173.111.68 https://amsarsalud.com/ \
  | grep -oE "/assets/index-[A-Za-z0-9_-]+\.js"
```

El workflow ya incluye un guard que **aborta** si el build no es válido o si `index.html`
apunta a `/src/main.tsx` (imposible desplegar código fuente).

## Compatibilidad

- **Cloudflare / DNS:** el deploy va directo al origin por FTPS; no toca DNS ni el proxy.
  El HTML se sirve `no-cache` (ver `.htaccess`); los assets con hash son inmutables.
  Tras un cambio grande, si hiciera falta, purgar caché de Cloudflare.
- **Entorno local:** intacto. El pipeline corre en CI.

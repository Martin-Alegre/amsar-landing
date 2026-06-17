# Despliegue — AMSAR Salud

Deploy **automático** de la landing a Hostinger. **No hay uploads manuales.**

## Flujo

```
push a main  →  GitHub Actions  →  npm ci  →  npm run build  →  verificación
            →  deploy FTPS a /public_html  →  verificación del sitio  →  reporte
```

Workflow: [.github/workflows/deploy.yml](.github/workflows/deploy.yml)

## Por qué FTPS + GitHub Actions (y no la integración Git de Hostinger)

- El hosting compartido de Hostinger **no ejecuta `npm run build`**; su deploy por Git solo
  clona archivos. Para una app Vite habría que commitear el `dist` (frágil y sucio).
- **GitHub Actions** buildea en un entorno limpio y reproducible (Ubuntu + Node 20) y sube
  **solo el resultado estático** por **FTPS** (cifrado).
- El deploy es **incremental** (sube solo lo que cambió) → rápido y **sin downtime**.
  Mantiene `.htaccess` y **elimina archivos obsoletos** vía el state-file del action
  (`.ftp-deploy-sync-state.json` en el servidor).

## Secretos requeridos (GitHub → Settings → Secrets and variables → Actions)

| Secret | Qué es | Dónde se obtiene |
|--------|--------|------------------|
| `HOSTINGER_FTP_HOST` | Host/IP del FTP (ej. `ftp.amsarsalud.com` o la IP) | hPanel → Archivos → **Cuentas FTP** |
| `HOSTINGER_FTP_USER` | Usuario FTP | hPanel → Cuentas FTP |
| `HOSTINGER_FTP_PASSWORD` | Contraseña FTP | hPanel → Cuentas FTP (crear/restablecer) |

> El build no necesita secretos: las variables `VITE_*` (públicas) viven en
> [.env.production](.env.production) y se hornean en el bundle. **Nunca** poner secretos ahí.

## Verificar `server-dir`

Por defecto el deploy apunta a `/public_html/`. Si la cuenta FTP de Hostinger ya está
anclada al dominio (su carpeta raíz **es** `public_html`), cambiá `server-dir` a `./` en
el workflow. Se ve en hPanel → Cuentas FTP → "Directorio".

## Operación

- **Deploy normal:** `git push` a `main`.
- **Deploy manual:** GitHub → pestaña **Actions** → "Deploy a Hostinger" → **Run workflow**.
- **Ver estado:** pestaña Actions (verde = desplegado y verificado; rojo = falló, no tocó producción).
- **Rollback:** `git revert <commit>` + push (re-despliega el estado anterior).

## Limpieza total opcional (one-time)

Si quedaran archivos huérfanos de la subida manual previa, se puede hacer **una** corrida
con `dangerous-clean-slate: true` en el step de deploy (vacía `public_html` y re-sube todo).
Implica un instante sin archivos → usar solo fuera de horario pico. No es el modo por defecto.

## Compatibilidad

- **Cloudflare:** el deploy va directo al origin (Hostinger) por FTPS; no toca DNS ni el proxy.
  El HTML se sirve `no-cache` (ver `.htaccess`), los assets con hash son inmutables. Si hiciera
  falta, purgar caché de Cloudflare tras un cambio grande.
- **Entorno local:** intacto. El pipeline corre en CI, no toca tu máquina.

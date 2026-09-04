# Checklist de lanzamiento — Generador de QR

Todo lo que ya quedó implementado en el código está marcado como tal. Lo demás son pasos manuales que solo tú puedes hacer (requieren tus cuentas: Vercel, GitHub, Google, redes sociales).

## 1. Dominio (manual, 1 minuto)

1. Entra a tu proyecto en el [dashboard de Vercel](https://vercel.com/dashboard).
2. **Settings → General → Project Name** → cámbialo a `qr-gratis`.
3. Guarda. Tu sitio quedará en `https://qr-gratis.vercel.app`.
4. Revisa que el dominio anterior (el que tenía el sufijo aleatorio) redirija o simplemente dale de baja si Vercel no lo usa más — Vercel normalmente mantiene el dominio anterior funcionando como alias, pero el nuevo pasa a ser el principal.

Ya dejé todo el código (robots.txt, sitemap.xml, meta tags, Open Graph) apuntando a `https://qr-gratis.vercel.app`. Si terminas usando otro nombre, dímelo y actualizo esas referencias.

## 2. GitHub como puerta de entrada (manual, ~5 minutos)

No tengo `gh` instalado en tu máquina para hacerlo por ti, así que hazlo desde la página del repo:

1. Entra a `https://github.com/JuanCarlosJimenezRoman/qr-generator`.
2. Click en el ⚙️ junto a "About" (arriba a la derecha, junto a la descripción).
3. **Description**: `Generador de códigos QR gratuito, sin registro y 100% privado. React + TypeScript, open source.`
4. **Website**: `https://qr-gratis.vercel.app`
5. **Topics**: agrega `qr-code`, `qr-generator`, `privacy`, `open-source`, `react`, `typescript`, `mexico`, `espanol`.
6. Guarda.

Para las capturas/GIF del README: como el proyecto tuvo problemas para levantar `localhost` en tu máquina (bindings nativos de rolldown — ya debería estar resuelto tras el `npm install` limpio), en cuanto lo tengas corriendo localmente puedes grabar un GIF corto (Windows: Xbox Game Bar con `Win+G`, o herramientas como ScreenToGif) del flujo "elegir tipo → personalizar → descargar" y colocarlo en `docs/screenshot.png` o `docs/demo.gif`, referenciado ya en el README (dejé el comentario listo para descomentar).

## 3. Google Search Console (manual, requiere tu cuenta de Google)

1. Entra a [Google Search Console](https://search.google.com/search-console) con tu cuenta de Google.
2. Agrega la propiedad `https://qr-gratis.vercel.app` (tipo "Prefijo de URL").
3. Verifica con el método de **etiqueta HTML** (el más simple aquí, ya que no hay backend para subir un archivo de verificación por DNS fácilmente sin acceso al proveedor del dominio).
4. Google te va a dar una línea como:
   ```html
   <meta name="google-site-verification" content="ABC123..." />
   ```
5. Pásamela (o pégala tú directo) en `index.html`, donde dejé el comentario `<!-- Google Search Console: reemplaza CONTENT... -->`. Descoméntala con tu código real.
6. Una vez verificado, en el menú lateral entra a **Sitemaps** y envía: `https://qr-gratis.vercel.app/sitemap.xml`.

Recuerda: el sitemap ayuda a que Google rastree más rápido, pero no garantiza que todo se indexe — puede tardar días o semanas en aparecer en resultados. [Más detalles en la documentación oficial de Google.](https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap)

## 4. Contenido útil (ya implementado ✅)

En vez de escribir 3 posts sueltos, los integré como páginas del propio sitio — así hacen doble función (contenido útil + páginas indexables para SEO), y quedan mantenidas junto con el código en vez de vivir aparte:

- **[/guias/qr-wifi/](https://qr-gratis.vercel.app/guias/qr-wifi/)** — Cómo compartir WiFi con QR sin exponer tu contraseña.
- **[/guias/qr-whatsapp-business/](https://qr-gratis.vercel.app/guias/qr-whatsapp-business/)** — Tutorial de QR para WhatsApp Business (y WhatsApp normal).
- **[/guias/qr-vcard-tarjeta-digital/](https://qr-gratis.vercel.app/guias/qr-vcard-tarjeta-digital/)** — Cómo hacer una tarjeta de presentación digital con QR (vCard).

Cada una tiene su propio `<title>`/meta description apuntando a la búsqueda exacta ("crear QR para WiFi", "QR para WhatsApp", "QR vCard"), y un botón que manda directo al generador con el tipo de contenido correcto ya seleccionado.

## 5. Textos para compartir (borradores — publícalos tú desde tus cuentas)

No tengo conectada ninguna red social desde aquí, así que aquí van los textos ya adaptados por plataforma. Cámbialos como quieras antes de publicar.

### LinkedIn (tono profesional, cuenta la historia)

> Hace un tiempo un generador de QR de paga me dejó colgado sin avisar — el QR que había pagado dejó de funcionar de la nada.
>
> Así que construí mi propia alternativa: un generador de códigos QR 100% gratuito, sin registro y open source. Todo se genera en el navegador — nada del contenido (enlaces, WiFi, contactos) pasa por un servidor.
>
> Incluye plantillas de diseño, logo personalizado, exportación a PNG/SVG/PDF, y soporte para WiFi, WhatsApp, vCard y más.
>
> 🔗 https://qr-gratis.vercel.app
> 💻 Código abierto: https://github.com/JuanCarlosJimenezRoman/qr-generator
>
> Si te sirve o tienes feedback, con gusto lo leo.

### X / Twitter (corto, directo)

> Hice un generador de QR gratis, sin registro y open source. Todo corre en tu navegador — nada se sube a un servidor.
>
> URL, WiFi, WhatsApp, vCard, logo personalizado, export a PNG/SVG/PDF.
>
> 🔗 https://qr-gratis.vercel.app
> 💻 https://github.com/JuanCarlosJimenezRoman/qr-generator

### Reddit (más honesto/directo, formato que funciona en r/webdev, r/SideProject, r/opensource)

**Título:** Hice un generador de QR gratis y open source después de que uno de paga me fallara sin aviso

> Contexto: pagué por un generador de QR "premium" y en algún momento el QR dejó de funcionar sin ningún aviso — imagino que la suscripción venció o cerraron el servicio. Terminé haciendo mi propia versión.
>
> Es 100% client-side (React + TypeScript + Vite), sin backend, sin cuentas, sin límites. Soporta URL, texto, teléfono, email, WiFi, WhatsApp y vCard, con personalización de colores/logo y export a PNG/SVG/PDF.
>
> Repo: https://github.com/JuanCarlosJimenezRoman/qr-generator
> Demo: https://qr-gratis.vercel.app
>
> Es MIT, así que si quieren clonarlo, hostearlo ustedes mismos o mandar un PR, bienvenido sea. Feedback (bueno o malo) también se agradece.

### Comunidades dev/diseño en Discord/Slack/foros (versión breve para canales de "mostrar tu proyecto")

> 👋 Generador de QR gratis y open source: https://qr-gratis.vercel.app
> Sin registro, sin backend (todo se genera en el navegador), con soporte para WiFi/WhatsApp/vCard, plantillas de diseño y export a PNG/SVG/PDF.
> Código: https://github.com/JuanCarlosJimenezRoman/qr-generator — MIT, PRs bienvenidos.

## 6. Analytics (ya implementado ✅)

Se instaló `@vercel/analytics` y se montó en la app. **Para que empiece a recolectar datos, actívalo también del lado de Vercel:**

1. En el dashboard del proyecto → pestaña **Analytics** → **Enable**.

Ya está la página [`/privacidad`](https://qr-gratis.vercel.app/privacidad/) explicando qué datos recibe Vercel (sin cookies, hash que se descarta a las 24h, datos agregados: página visitada, referrer, ubicación aproximada, dispositivo/navegador) y enlazada desde el pie de página de la app.

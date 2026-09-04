# QR Generator

Generador de códigos QR **gratuito, sin límites y open source**. Corre 100% en el navegador: nada del contenido que capturas (enlaces, WiFi, contactos, etc.) se envía a ningún servidor.

Nace de una mala experiencia con generadores de QR de paga que fallaron sin aviso. El objetivo es tener una alternativa simple, confiable y auditable para toda la comunidad.

Los requerimientos completos del proyecto (funcionales, técnicos y de alcance) están en [`requisitos.md`](./requisitos.md).

## Características (MVP en progreso)

- Generación de QR para URL, texto, teléfono, email, WiFi, WhatsApp y más.
- Personalización de colores, nivel de corrección de errores y marco.
- Descarga en PNG y SVG, sin marcas de agua.
- Sin cuentas, sin backend obligatorio, sin rastreo.

## Stack

- [React](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/) + [Vite](https://vite.dev/)
- [qr-code-styling](https://github.com/kozakdenys/qr-code-styling) para la generación del QR en el cliente

## Desarrollo local

```bash
npm install
npm run dev
```

Abre la URL que muestra Vite en la terminal (por defecto `http://localhost:5173`).

### Otros scripts

```bash
npm run build    # build de producción
npm run preview  # sirve el build de producción localmente
npm run lint      # linting con oxlint
```

## Flujo de ramas

- `main`: siempre estable, refleja lo desplegado.
- `develop`: rama de trabajo activa; las nuevas funciones se integran aquí antes de pasar a `main`.

## Contribuir

Este proyecto es open source y las contribuciones son bienvenidas. Antes de abrir un PR grande, abre un issue para platicar el enfoque.

## Licencia

[MIT](./LICENSE)

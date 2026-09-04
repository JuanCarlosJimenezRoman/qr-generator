# ✨ QR Generator

> **Generador de códigos QR gratuito, sin límites y open source**

[![Vercel](https://img.shields.io/badge/demo-live-000?style=for-the-badge&logo=vercel&logoColor=white)](https://qr-gratis-facil.vercel.app)
[![MIT License](https://img.shields.io/badge/license-MIT-blue.svg?style=for-the-badge)](./LICENSE)
[![React](https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react&logoColor=white)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-5-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vite.dev/)

**[Pruébalo en vivo → qr-gratis-facil.vercel.app](https://qr-gratis-facil.vercel.app)**

---

## 📖 ¿Qué es esto?

Un generador de códigos QR **100% en el navegador**. Nada de lo que capturas (enlaces, WiFi, contactos, etc.) se envía a ningún servidor. Todo se procesa localmente en tu dispositivo.

**Nace de una mala experiencia** con generadores de QR de paga que fallaron sin aviso. El objetivo es tener una alternativa simple, confiable y auditable para toda la comunidad.

---

## 🚀 Características

### 📱 Tipos de contenido soportados
- **URL** - Enlaces a cualquier página web
- **Texto** - Texto libre
- **Teléfono** - Números con prefijo internacional
- **Email** - Con asunto y cuerpo opcionales
- **WiFi** - Redes con autenticación WPA/WPA2/WEP
- **WhatsApp** - Mensajes directos sin guardar el número
- **vCard** - Tarjetas de contacto digitales

### 🎨 Personalización avanzada
- **Plantillas por red social**: Instagram, TikTok, X, LinkedIn, Facebook, GitHub, Spotify, Twitch, Discord, YouTube
- **Colores**: Personalización de puntos y fondo
- **Degradados**: Efectos visuales modernos
- **Forma de módulos**: Cuadrados, redondeados, circulares
- **Nivel de corrección de errores**: L, M, Q, H
- **Logo central**: Sube tu propia imagen

### 📥 Descarga
- **PNG** - Imagen de alta calidad
- **SVG** - Vector escalable (ideal para impresión)
- **PDF** - Listo para compartir o imprimir

### 🔒 Privacidad
- **Sin cuentas**: No necesitas registrarte
- **Sin backend**: Todo corre en tu navegador
- **Sin rastreo**: No almacenamos ni rastreamos tu contenido
- **Open source**: El código es público y auditable

---

## 🎯 Demostración

> ⚡ **Captura de pantalla del flujo completo**:
> *Elegir tipo de contenido → Personalizar diseño → Descargar*

![Vista previa del generador](./docs/screenshot.png)

> 📸 *Puedes agregar una captura de pantalla o un GIF corto aquí para mostrar el producto en acción.*

---

## 🛠️ Stack Tecnológico

| Tecnología | Propósito |
|:---|:---|
| [React](https://react.dev/) | Framework de UI |
| [TypeScript](https://www.typescriptlang.org/) | Tipado estático |
| [Vite](https://vite.dev/) | Build tool |
| [qr-code-styling](https://github.com/kozakdenys/qr-code-styling) | Generación de QR en el cliente |
| [jsPDF](https://github.com/parallax/jsPDF) | Exportación a PDF (carga lazy) |
| [Vercel Web Analytics](https://vercel.com/docs/analytics) | Medición de tráfico agregado (sin cookies) |

---

## 🏃 Desarrollo local

### Requisitos
- Node.js 20+
- npm

### Instalación

```bash
# Clonar el repositorio
git clone https://github.com/JuanCarlosJimenezRoman/qr-generator.git
cd qr-generator

# Instalar dependencias
npm install

# Iniciar en modo desarrollo
npm run dev
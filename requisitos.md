# Requerimientos — Generador de QR (open source, gratuito)

Documento base del proyecto. Sirve como referencia y se puede ir ajustando conforme avance el desarrollo.

## 1. Propósito

Aplicación web para generar códigos QR de forma fácil, rápida y **completamente gratuita**, sin cuentas, sin límites artificiales y sin QR que dejen de funcionar por falta de pago. Código abierto para que cualquiera pueda usarla, auditarla o self-hostearla.

## 2. Problema que resuelve

Las plataformas de pago fallan sin aviso, cobran por funciones básicas (como generar un QR de redes sociales) y en algunos casos los QR generados dejan de escanear si se vence la suscripción. Esta app evita todo eso generando QR **estáticos**, del lado del cliente, que funcionan para siempre una vez creados.

## 3. Requerimientos funcionales

### 3.1 Tipos de contenido soportados (MVP)
- URL / enlace
- Texto plano
- Redes sociales (plantillas dedicadas: Instagram, TikTok, X, Facebook, LinkedIn, YouTube, WhatsApp) — arman el deep link correcto, no solo la URL del perfil
- vCard (contacto descargable: nombre, teléfono, correo, empresa)
- WiFi (SSID + contraseña + tipo de seguridad; se conecta al escanear)
- Email prellenado (destinatario, asunto, cuerpo)
- SMS / WhatsApp con mensaje predefinido
- Teléfono (llamada directa)

### 3.2 Generación y vista previa
- Formulario según el tipo de contenido elegido, con validación básica de campos (ej. URL bien formada)
- Preview del QR en tiempo real mientras se edita
- Advertencia si la configuración elegida (bajo contraste, logo muy grande) puede afectar la legibilidad del QR
- Mostrar una vista previa legible del contenido codificado antes de descargarlo, para que el usuario confirme exactamente qué se incluirá en el QR
- Validar y escapar caracteres especiales según el formato (WiFi, vCard, SMS y URLs), evitando QR inválidos o con contenido inesperado

### 3.3 Personalización
- Colores personalizados (frente/fondo)
- Nivel de corrección de errores seleccionable (L / M / Q / H)
- Logo o imagen central
- Estilo de los módulos (cuadrados, redondeados, puntos)
- Marco opcional con texto tipo "Escanéame"
- Mantener una opción de "diseño seguro" que preserve márgenes (quiet zone), contraste y tamaño de logo recomendados

### 3.4 Exportación
- Formatos: PNG (alta resolución configurable), SVG (vectorial), PDF
- Descarga directa, sin marcas de agua
- El archivo descargado debe tener un nombre descriptivo y seguro (por ejemplo, `qr-wifi.png`)

### 3.5 Extras (post-MVP)
- Generación en lote (subir CSV/lista → varios QR)
- Historial local de QR generados (guardado en el navegador del usuario, no en servidor)
- QR dinámicos editables después de creados (esto sí requiere backend — dejar claro que es una función "avanzada" y opcional, no el caso de uso principal)

## 4. Requerimientos no funcionales

- **Gratuito sin restricciones**: sin límite de generación, sin cuenta obligatoria, sin funciones básicas detrás de un paywall
- **Privacidad**: generación 100% del lado del cliente cuando sea posible; nada del contenido del QR se envía ni almacena en un servidor
- **Disponibilidad**: los QR generados deben seguir funcionando indefinidamente (son solo una codificación del contenido, no dependen de que el servicio siga activo)
- **Responsive**: debe funcionar igual de bien en celular que en escritorio, ya que mucha gente genera QR desde el teléfono
- **Rendimiento**: generación instantánea, sin esperas ni loaders innecesarios
- **Accesibilidad**: contraste adecuado, tamaños de texto legibles, navegable por teclado
- **Sin dependencia de conexión constante**: idealmente utilizable como PWA (funciona offline una vez cargada)
- **Compatibilidad**: soportar las versiones actuales de Chrome, Edge, Firefox y Safari, tanto en escritorio como en móvil
- **Calidad de lectura**: conservar siempre el margen blanco alrededor del código y advertir cuando el contenido sea demasiado largo para el diseño seleccionado
- **Seguridad**: no ejecutar ni interpretar el contenido ingresado por el usuario; tratarlo únicamente como datos para codificar

## 5. Open source

- Licencia permisiva clara (MIT o similar)
- Repositorio público con README completo (instalación, uso, contribución)
- Self-hosteable fácilmente (ideal: Docker / un solo comando)
- Código simple de auditar — dado que no hay backend obligatorio para el caso de uso principal, cualquiera puede verificar que no se envían datos a ningún lado
- Declarar explícitamente si se usan métricas: para el MVP, no incluir analítica ni rastreadores de terceros

## 6. Consideraciones técnicas (sugerencia inicial)

- **Frontend**: aplicación web sin backend obligatorio (por ejemplo React/Vue/Svelte + una librería de generación de QR en el cliente, como `qrcode` o `qr-code-styling` para JS)
- **Hosting**: sitio estático (se puede desplegar gratis en GitHub Pages, Vercel, Netlify, etc.)
- **Backend opcional**: solo si se implementan QR dinámicos o generación en lote muy pesada — mantenerlo como módulo separado, no como requisito para usar la app

## 7. Fuera de alcance (por ahora)

- Cuentas de usuario / login
- Analíticas de escaneo (requeriría QR dinámicos + backend + tracking, contradice el enfoque de privacidad del MVP)
- Cualquier función de pago

## 8. Próximos pasos sugeridos

### 8.1 Decisiones para arrancar

- **Stack**: React + TypeScript + Vite. Es rápido para una aplicación estática, tiene un ecosistema amplio y se despliega sin backend.
- **Generación**: `qr-code-styling`, porque cubre SVG, PNG, logo, colores y estilos de módulos; el QR se genera en el navegador.
- **Estilos**: CSS propio con variables de diseño. Evita añadir un framework de UI antes de necesitarlo y mantiene el sitio liviano.
- **PDF**: generar el PDF en el navegador a partir del SVG, manteniendo la exportación privada y sin servicios externos.
- **Persistencia**: ninguna en el MVP. El formulario se conserva solo durante la sesión; el historial local queda para post-MVP.

### 8.2 Alcance exacto de la primera versión

La primera entrega debe permitir crear un QR de URL, texto, teléfono, email, WiFi y WhatsApp; verlo al instante; personalizar colores, nivel de corrección y marco; y descargarlo como PNG y SVG. El logo, PDF, vCard, otras redes sociales y estilos avanzados se incorporarán después de que este flujo sea fiable.

### 8.3 Orden de implementación

1. Inicializar el proyecto con React, TypeScript y Vite; añadir licencia MIT, `.gitignore` y README inicial.
2. Crear el modelo de datos y los codificadores puros para cada tipo de contenido. Cada codificador debe tener pruebas unitarias, en especial para WiFi y caracteres especiales.
3. Construir el flujo base: selector de tipo, formulario dinámico, validación, resumen del contenido y preview en vivo.
4. Implementar el generador y las descargas PNG/SVG. Probar los archivos exportados con lectores de QR en móvil.
5. Añadir opciones de diseño seguro: contraste, margen, corrección de errores y advertencias de legibilidad.
6. Adaptar la interfaz a móvil, teclado y lector de pantalla; validar contraste y foco visible.
7. Añadir las funciones diferidas (logo, PDF, vCard, plantillas de redes y estilos de módulos) de una en una, verificando escaneabilidad después de cada una.
8. Preparar el despliegue estático, configurar PWA/offline si aporta valor y publicar una versión de prueba pública.

### 8.4 Criterios de aceptación del MVP

- No se realiza ninguna petición de red al generar, personalizar o descargar un QR.
- Un QR de cada tipo admitido se escanea correctamente desde la preview y desde los PNG/SVG descargados.
- La aplicación es usable desde un teléfono sin zoom horizontal y mediante teclado en escritorio.
- Las advertencias aparecen antes de permitir un diseño con contraste insuficiente, margen eliminado o logo excesivo.
- La página puede desplegarse como sitio estático sin variables secretas ni backend.

# Portafolio · Santiago Carrillo

Portafolio personal de **Santiago Carrillo**, Desarrollador Backend Java (Tandil, Buenos Aires, Argentina). Está pensado para dos públicos:

- **Clientes** que quieren encargar un sistema, una página web, una aplicación web o una automatización.
- **Empresas y reclutadores** que buscan un perfil Junior Backend Java.

Publicado con GitHub Pages: https://santicarrillo.github.io/Portafolio-/

## Tecnologías

HTML, CSS y JavaScript puros, sin frameworks ni proceso de build. Funciona abriendo `index.html` directamente en el navegador y en GitHub Pages.

```
index.html          estructura y contenido
css/styles.css      estilos, modo claro/oscuro y animaciones
js/main.js          comportamiento (menú, filtros, animaciones de respaldo)
assets/avatar.jpg   foto de perfil
assets/icons/       logos SVG del stack
assets/cv/          CV en español e inglés (PDF)
```

## Estructura de la página

1. **Navegación fija**: links a cada sección, resaltado de la sección activa al hacer scroll, botón "Hablemos" que abre WhatsApp y menú hamburguesa en celular.
2. **Hero para clientes**: título "Desarrollo [landing pages / web apps / management systems / automations] a medida" con la palabra rotando en degradado, botón para pedir presupuesto por WhatsApp, foto con anillo animado y chips de código flotando, y fondo tipo aurora en movimiento. Al bajar, el hero se achica y se desvanece.
3. **Servicios**: Management systems, Landing pages, Web apps y Automations (con su nombre en español debajo), en una sección oscura que sube por encima del hero. Las tarjetas se inclinan siguiendo el cursor, tienen un borde animado y un botón "Consultar" que abre WhatsApp con un mensaje ya escrito sobre ese servicio.
4. **Cómo trabajo**: los cuatro pasos (Charlamos tu idea → Nos reunimos → Desarrollo con avances → Entrega y soporte) en tarjetas que entran girando y se inclinan con el cursor. En compu la sección queda fija en pantalla mientras los 4 pasos se cargan uno por uno: cada número tiene un anillo que se llena con el scroll (y se descarga al subir); al completarse se enciende y recién ahí avanza la línea hacia el siguiente. Cierra con un banner para coordinar una reunión por WhatsApp.
5. **Proyectos**: tarjetas con ruta estilo API (`GET /proyectos/...`), estado (En desarrollo / Prototipo / Terminado), tecnologías y links a código y demo.
6. **Stack técnico**: cinta de logos en loop y tarjetas filtrables por categoría.
7. **Para empresas y reclutadores**: perfil en formato JSON, estudios, idiomas y descarga del CV en español e inglés, más LinkedIn y GitHub.
8. **Contacto**: WhatsApp, mail con botón "Copiar mail" y LinkedIn.
9. **Botón flotante de WhatsApp** con un pulso sutil.

## Características

- **Niveles tipo videojuego**: cada sección es un nivel (Nivel 01 Servicios … Nivel 06 Contacto) con un candado que se abre al llegar, un aviso de "Nivel desbloqueado" y, en pantallas grandes, un mapa de niveles al costado que muestra el progreso y el nivel actual.

- **Modo claro y oscuro automático** según la preferencia del sistema (`prefers-color-scheme`).
- **Responsive**: diseñado desde 320px de ancho, sin scroll horizontal.
- **Animaciones**: aparición de secciones al hacer scroll, títulos que aparecen con barrido y se desvanecen al salir, proyectos que entran desde los costados, parallax en fondos, foto y chips, scroll suave con inercia en compu, rutas `GET /...` que se "decodifican", barra de progreso de lectura, entrada escalonada del hero, luz que sigue al cursor, botones con efecto imán, tarjetas que se inclinan con el cursor y borde de luz en contacto. Se usan animaciones de CSS por scroll (`animation-timeline`) cuando el navegador las soporta, con `IntersectionObserver` como respaldo.
- **Accesibilidad**:
  - Con `prefers-reduced-motion` activado se desactivan todas las animaciones.
  - Si el JavaScript falla, todo el contenido sigue visible: las animaciones nunca dejan texto oculto.
  - Navegación por teclado con foco visible, link para saltar al contenido y textos alternativos.
- **Links de WhatsApp** con mensajes ya escritos y codificados (`https://wa.me/5492494660680?text=...`).

## Cómo verlo en local

Abrí `index.html` en el navegador. No hace falta instalar nada.

## Contacto

- WhatsApp: https://wa.me/5492494660680
- Mail: santiago03carrillo@gmail.com
- LinkedIn: https://www.linkedin.com/in/santiago-carrillo-2344292a5
- GitHub: https://github.com/santicarrillo

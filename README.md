# Portafolio · Santiago Carrillo

Portafolio personal de Desarrollador Backend Java.

## Estructura

```
portfolio/
├── index.html          # Contenido y estructura (HTML puro)
├── css/
│   └── styles.css      # Estilos, colores y modo claro/oscuro
├── js/
│   └── main.js         # Filtro del stack técnico y botón "Copiar mail"
└── assets/
    ├── avatar.jpg      # Foto de perfil
    └── icons/          # Logos de las tecnologías (SVG)
```

## Verlo en local

Abrí `index.html` en el navegador. No necesita instalar nada.

## Publicarlo con GitHub Pages

1. Creá un repositorio (por ejemplo `portfolio`) y subí estos archivos a la raíz.
2. En el repo: **Settings → Pages → Source: Deploy from a branch**, elegí `main` y la carpeta `/ (root)`.
3. En un minuto queda online en `https://<tu-usuario>.github.io/portfolio/`.

## Cómo editar

- **Agregar un proyecto:** copiá un bloque `<article class="project">` en `index.html` y cambiá textos, etiquetas y links.
- **Estado de un proyecto:** usá `<span class="state dev">En desarrollo</span>`, `state done` para Terminado o `state proto` para Prototipo.
- **Agregar una tecnología:** sumá un `<li class="tile" data-cat="backend">` con su logo en `assets/icons/`. Agregá `core` a la clase para resaltarla.
- **Colores:** cambiá las variables al principio de `css/styles.css`.

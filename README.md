# MathMethods

Herramienta interactiva de análisis numérico para encontrar raíces de ecuaciones paso a paso.

## Métodos implementados

- **Newton-Raphson** — usa la derivada de la función (calculada automáticamente con mathjs si no se indica) para una convergencia cuadrática.
- **Bisección** — divide iterativamente un intervalo con cambio de signo (Teorema de Bolzano).
- **Secante** — variante de Newton-Raphson que evita la derivada usando diferencias finitas.

Cada método muestra la raíz aproximada, el criterio de convergencia y una tabla con todas las iteraciones (x, f(x), error relativo %).

## Stack

- [Astro](https://astro.build) 6 (sitio estático) + TypeScript estricto
- [Tailwind CSS](https://tailwindcss.com) 4 vía plugin de Vite
- [mathjs](https://mathjs.org) para compilar y evaluar funciones del usuario (carga diferida)
- [Vitest](https://vitest.dev) para los tests de los algoritmos numéricos

## Comandos

| Commando        | Acción                                          |
| :-------------- | :---------------------------------------------- |
| `npm install`   | Instala dependencias                            |
| `npm run dev`   | Servidor de desarrollo en `localhost:4321`      |
| `npm run build` | Build de producción en `./dist/`                |
| `npm run preview` | Previsualiza el build localmente              |
| `npm run check` | Chequeo de tipos y diagnósticos de Astro        |
| `npm test`      | Corre los tests unitarios                       |

## Estructura relevante

```text
src/
├── data/methods.ts         # Fuente única de verdad sobre los métodos (slugs, títulos, campos)
├── lib/numerical/          # Algoritmos numéricos puros + tests
├── components/
│   ├── layout/             # Navbar
│   └── ui/                 # Button, Input, Card, CircleButton
├── layouts/Layout.astro    # Plantilla base con meta/SEO
└── pages/
    ├── index.astro         # Home con las cards de métodos
    └── methods/[slug].astro # Página calculadora por método
```

### Agregar un método nuevo

1. Añade su entrada en `src/data/methods.ts` (id, slug, título, descripción y campos del formulario).
2. Implementa el algoritmo en `src/lib/numerical/` como función pura que devuelva `ResultadoMetodo`.
3. Conéctalo en el `switch` del script de `src/pages/methods/[slug].astro` y añade icono/variante en `src/pages/index.astro`.

La ruta, la card del home, el formulario y la navegación se generan solos a partir de los datos.

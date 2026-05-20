# GAIA — Celosías Arquitectónicas & Cotizador 3D interactivo

> Una experiencia web premium e interactiva para la visualización, cálculo de presupuestos y personalización de celosías arquitectónicas para interiores y exteriores en tiempo real.

![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)
![React Three Fiber](https://img.shields.io/badge/Three.js-000000?style=for-the-badge&logo=threedotjs&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)

---

## ✨ Características Principales

* **Catálogo de Productos Dinámico:** Tarjetas de productos perfectamente alineadas mediante Flexbox, preparadas para descripciones de longitud variable y adaptadas a una grilla responsiva.
* **Cotizador Interactivo en 3D:** Renderizado tridimensional en tiempo real utilizando **React Three Fiber (Three.js)**.
    * **Geometría con Volúmen Real:** Modelado físico con profundidad configurable (8 cm de espesor estándar) en lugar de planos bidimensionales.
    * **Iluminación de Estudio y Sombras Suaves:** Configuración avanzada de luces direccionales y mapas de sombras (`castShadow`/`receiveShadow`) para un acabado realista y fotorrealista.
    * **Texturizado Dinámico:** Generación y mapeo automático de texturas según el material seleccionado (madera, pvc, hormigón, ondas, cerámica) con repetición proporcional (`RepeatWrapping`) según la escala física elegida.
* **Cálculo de Presupuesto en Tiempo Real:** Modificación dinámica de alto y ancho (0.5m a 10m) mediante *sliders* o entradas numéricas independientes, calculando de inmediato los metros cuadrados ($m^2$) totales y el costo final en Guaraníes (Gs.).
* **Conversión Directa (WhatsApp Integration):** Exportación limpia de la configuración seleccionada por el usuario (producto, dimensiones exactas, superficie y presupuesto estimado con IVA) formateada directamente para el equipo de ventas.

---

## 🛠️ Stack Tecnológico

* **Framework:** [Next.js 14+](https://nextjs.org/) (App Router & Client-side rendering optimizado para 3D).
* **Gráficos 3D:** [@react-three/fiber](https://r3f.docs.pmnd.rs/) & [@react-three/drei](https://github.com/pmndrs/drei) (Abstracción reactiva de Three.js).
* **Estilos:** [Tailwind CSS](https://tailwindcss.com/) (Maquetación utilitaria de alta fidelidad).
* **Iconos:** [Lucide React](https://lucide.dev/) (Interfaz limpia y minimalista).
* **Lenguaje:** TypeScript para un tipado estricto y un entorno de desarrollo seguro.

---

## 📂 Estructura Clave del Proyecto

├── app/
│   ├── layout.tsx         # Layout global y fuentes
│   └── page.tsx           # Landing page principal y listado de productos
├── components/
│   ├── Cotizador3D.tsx    # Interfaz de usuario, sliders y lógica de cotización
│   └── Scene3D.tsx        # Canvas, luces, sombras y renderizado de la celosía en 3D
├── lib/
│   ├── catalog.ts         # Datos de productos, categorías y algoritmo de presupuesto
│   ├── formatters.ts      # Utilidades de formato de moneda (Guaraníes)
│   └── textureGenerators.ts # Generadores algorítmicos de canvas para texturas 3D

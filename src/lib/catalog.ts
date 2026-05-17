export type Categoria = "Interior" | "Exterior";

export interface Producto {
  id: number;
  nombre: string;
  categoria: Categoria;
  precioVenta: number;
  costoMaterial: number;
  descripcion: string;
  usoRecomendado: string;
}

export const productos: Producto[] = [
  {
    id: 1,
    nombre: "Celosías de Acero en Silueta de Ondas",
    categoria: "Interior",
    precioVenta: 500000,
    costoMaterial: 250000,
    descripcion: "Elegantes ondas metálicas que capturan la luz creando sombras dinámicas.",
    usoRecomendado: "Divisores de ambientes y paneles decorativos interiores.",
  },
  {
    id: 2,
    nombre: "Celosías de Cerámica con Patrones de Textura",
    categoria: "Interior",
    precioVenta: 820000,
    costoMaterial: 410000,
    descripcion: "Textura cerámica de alto relieve con patrones geométricos sofisticados.",
    usoRecomendado: "Revestimientos murales y fachadas interiores de alto impacto.",
  },
  {
    id: 3,
    nombre: "Celosías en PVC de Patrón Tupido Aleatorio",
    categoria: "Interior",
    precioVenta: 430000,
    costoMaterial: 215000,
    descripcion: "Diseño aleatorio y tupido que brinda privacidad sin sacrificar ventilación.",
    usoRecomendado: "Baños, vestidores y espacios que requieren privacidad parcial.",
  },
  {
    id: 4,
    nombre: "Celosías de Madera en Listones Cruzados",
    categoria: "Exterior",
    precioVenta: 400000,
    costoMaterial: 200000,
    descripcion: "Listones de madera entrecruzados que evocan calidez natural y artesanía.",
    usoRecomendado: "Pérgolas, cerramientos de patios y terrazas al aire libre.",
  },
  {
    id: 5,
    nombre: "Celosías de Hormigón Triangulares",
    categoria: "Exterior",
    precioVenta: 420000,
    costoMaterial: 210000,
    descripcion: "Módulos triangulares de hormigón de alta durabilidad y estética brutalista.",
    usoRecomendado: "Muros de contención decorativos y fachadas exteriores resistentes.",
  },
];

export function getProductosPorCategoria(categoria: Categoria): Producto[] {
  return productos.filter((p) => p.categoria === categoria);
}

export function getProductoPorId(id: number): Producto | undefined {
  return productos.find((p) => p.id === id);
}

export function calcularPresupuesto(
  producto: Producto,
  ancho: number,
  alto: number
): number {
  const m2 = ancho * alto;
  return m2 * producto.precioVenta;
}

export const IVA = 0.10;

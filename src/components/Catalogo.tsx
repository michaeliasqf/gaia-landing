"use client";

import { productos } from "@/lib/catalog";
import { formatGuarani } from "@/lib/formatters";
import Image from "next/image";

const imagePaths = [
  "/celosias/1-ondas.png",
  "/celosias/2-ceramica.png",
  "/celosias/3-pvc.png",
  "/celosias/4-madera.png",
  "/celosias/5-hormigon.png",
];

export default function Catalogo() {
  return (
    <section
      id="catalogo"
      className="relative z-10 py-20 md:py-28 bg-[#F8F9FA]"
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <span className="text-xs tracking-[0.3em] text-[#A38A75] font-medium">
            GALERÍA DE DISEÑOS
          </span>
          <h2 className="text-3xl md:text-5xl font-bold text-black tracking-tight mt-3">
            Nuestra Colección
          </h2>
          <p className="text-gray-500 mt-3 max-w-lg mx-auto">
            Cinco líneas de celosías diseñadas para transformar cualquier espacio.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
          {productos.map((producto, i) => (
            <div
              key={producto.id}
              className="group border-2 border-black bg-white hover:-translate-y-1 transition-transform duration-300 flex flex-col"
            >
              <div className="aspect-square bg-[#F8F9FA] overflow-hidden border-b-2 border-black relative">
                <Image
                  src={imagePaths[i]}
                  alt={producto.nombre}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 20vw"
                />
              </div>
              <div className="p-5 flex flex-col flex-1">
                <span className="text-[10px] tracking-[0.2em] text-[#A38A75] font-medium">
                  {producto.categoria.toUpperCase()}
                </span>
                <h3 className="text-sm font-bold text-black mt-2 leading-snug min-h-[2.5rem]">
                  {producto.nombre}
                </h3>
                <p className="text-xs text-gray-500 mt-2 leading-relaxed">
                  {producto.descripcion}
                </p>
                <div className="mt-3 pt-3 border-t border-gray-200">
                  <span className="text-xs text-gray-400">Uso recomendado:</span>
                  <p className="text-[11px] text-gray-600 mt-1">
                    {producto.usoRecomendado}
                  </p>
                </div>

                <div className="mt-auto pt-4 w-full">
                  <div className="text-sm font-bold text-black mb-3">
                    {formatGuarani(producto.precioVenta)}
                    <span className="text-[10px] font-normal text-gray-400"> / m²</span>
                  </div>
                </div>
                <a
                  href="#calculadora"
                  className="mt-auto pt-3 block w-full text-center border-2 border-black py-2 text-[11px] tracking-[0.15em] font-medium hover:bg-black hover:text-white transition-colors"
                >
                  COTIZAR
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

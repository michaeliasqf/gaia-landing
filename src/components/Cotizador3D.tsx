"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import {
  Categoria,
  Producto,
  productos,
  getProductosPorCategoria,
  calcularPresupuesto,
} from "@/lib/catalog";
import { formatGuarani } from "@/lib/formatters";
import type { TextureType } from "@/lib/textureGenerators";
import { ChevronDown, Ruler, Divide } from "lucide-react";

const Scene3D = dynamic(() => import("@/components/Scene3D"), { ssr: false });

const textureMap: Record<number, TextureType> = {
  1: "ondas",
  2: "ceramica",
  3: "pvc",
  4: "madera",
  5: "hormigon",
};

export default function Cotizador3D() {
  const [categoria, setCategoria] = useState<Categoria>("Interior");
  const [selectedId, setSelectedId] = useState<number>(productos[0].id);
  const [ancho, setAncho] = useState(2);
  const [alto, setAlto] = useState(2);

  const filtered = getProductosPorCategoria(categoria);
  const productoSeleccionado: Producto =
    filtered.find((p) => p.id === selectedId) ?? filtered[0];

  const presupuesto = calcularPresupuesto(productoSeleccionado, ancho, alto);
  const m2 = ancho * alto;

  function handleWhatsApp() {
    const texto = encodeURIComponent(
      `Hola GAIA! Quiero confirmar el diseño y cotizar:\n\n` +
        `Producto: ${productoSeleccionado.nombre}\n` +
        `Categoría: ${productoSeleccionado.categoria}\n` +
        `Medidas: ${ancho.toFixed(2)}m ancho × ${alto.toFixed(2)}m alto\n` +
        `Superficie: ${m2.toFixed(2)} m²\n` +
        `Presupuesto estimado: ${formatGuarani(presupuesto)} (IVA incluido)\n\n` +
        `Quedo atento a su respuesta.`
    );
    window.open(`https://wa.me/595981000000?text=${texto}`, "_blank");
  }

  return (
    <section
      id="calculadora"
      className="relative z-10 py-20 md:py-28 bg-white"
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <span className="text-xs tracking-[0.3em] text-[#A38A75] font-medium">
            COTIZADOR INTERACTIVO
          </span>
          <h2 className="text-3xl md:text-5xl font-bold text-black tracking-tight mt-3">
            Calculá tu Presupuesto en 3D
          </h2>
          <p className="text-gray-500 mt-3 max-w-lg mx-auto">
            Seleccioná el diseño, ajustá las medidas y visualizalo en tiempo real.
          </p>
        </div>

        <div className="grid md:grid-cols-5 gap-8">
          <div className="md:col-span-2 space-y-8">
            <div className="border-2 border-black p-6">
              <label className="block text-xs tracking-[0.15em] font-medium text-gray-600 mb-3">
                CATEGORÍA
              </label>
              <div className="relative">
                <select
                  value={categoria}
                  onChange={(e) => setCategoria(e.target.value as Categoria)}
                  className="w-full bg-white border-2 border-black px-4 py-3 text-black appearance-none outline-none focus:border-[#A38A75] transition-colors text-sm"
                >
                  <option value="Interior">Interiores</option>
                  <option value="Exterior">Exteriores</option>
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-black pointer-events-none" />
              </div>
            </div>

            <div className="border-2 border-black p-6">
              <label className="block text-xs tracking-[0.15em] font-medium text-gray-600 mb-3">
                TIPO DE CELOSÍA
              </label>
              <div className="relative">
                <select
                  value={productoSeleccionado.id}
                  onChange={(e) => {
                    const id = Number(e.target.value);
                    setSelectedId(id);
                  }}
                  className="w-full bg-white border-2 border-black px-4 py-3 text-black appearance-none outline-none focus:border-[#A38A75] transition-colors text-sm"
                >
                  {filtered.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.nombre}
                    </option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-black pointer-events-none" />
              </div>
            </div>

            <div className="border-2 border-black p-6 space-y-6">
              <div>
                <label className="flex items-center gap-2 text-xs tracking-[0.15em] font-medium text-gray-600 mb-3">
                  <Ruler className="w-4 h-4" /> ANCHO: {ancho.toFixed(2)} m
                </label>
                <input
                  type="range"
                  min="0.5"
                  max="10"
                  step="0.1"
                  value={ancho}
                  onChange={(e) => setAncho(Number(e.target.value))}
                  className="w-full accent-[#1A1A1A]"
                />
                <div className="flex justify-between text-[10px] text-gray-400 mt-1">
                  <span>0.5 m</span>
                  <span>10 m</span>
                </div>
              </div>
              <div>
                <label className="flex items-center gap-2 text-xs tracking-[0.15em] font-medium text-gray-600 mb-3">
                  <Ruler className="w-4 h-4" /> ALTO: {alto.toFixed(2)} m
                </label>
                <input
                  type="range"
                  min="0.5"
                  max="10"
                  step="0.1"
                  value={alto}
                  onChange={(e) => setAlto(Number(e.target.value))}
                  className="w-full accent-[#1A1A1A]"
                />
                <div className="flex justify-between text-[10px] text-gray-400 mt-1">
                  <span>0.5 m</span>
                  <span>10 m</span>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-1">
                  <input
                    type="number"
                    value={ancho}
                    min="0.5"
                    max="10"
                    step="0.1"
                    onChange={(e) => {
                      const v = Number(e.target.value);
                      if (v >= 0.5 && v <= 10) setAncho(v);
                    }}
                    className="w-full border-2 border-black px-3 py-2 text-sm text-center outline-none focus:border-[#A38A75]"
                  />
                  <span className="block text-[10px] text-gray-400 text-center mt-1">
                    Ancho (m)
                  </span>
                </div>
                <div className="flex items-center text-gray-400">
                  <Divide className="w-4 h-4" />
                </div>
                <div className="flex-1">
                  <input
                    type="number"
                    value={alto}
                    min="0.5"
                    max="10"
                    step="0.1"
                    onChange={(e) => {
                      const v = Number(e.target.value);
                      if (v >= 0.5 && v <= 10) setAlto(v);
                    }}
                    className="w-full border-2 border-black px-3 py-2 text-sm text-center outline-none focus:border-[#A38A75]"
                  />
                  <span className="block text-[10px] text-gray-400 text-center mt-1">
                    Alto (m)
                  </span>
                </div>
              </div>
            </div>

            <div className="border-2 border-black bg-[#F8F9FA] p-6">
              <div className="text-xs tracking-[0.15em] text-gray-500 mb-2">
                SUPERFICIE TOTAL
              </div>
              <div className="text-3xl font-bold text-black mb-4">
                {m2.toFixed(2)} m²
              </div>
              <div className="text-xs tracking-[0.15em] text-gray-500 mb-2">
                PRESUPUESTO ESTIMADO
              </div>
              <div className="text-2xl md:text-3xl font-bold text-black">
                {formatGuarani(presupuesto)}
              </div>
              <div className="text-xs text-gray-400 mt-1">(IVA incluido)</div>
            </div>

            <button
              onClick={handleWhatsApp}
              className="w-full bg-[#A38A75] hover:bg-[#8c7562] text-white py-4 text-sm tracking-[0.2em] font-medium transition-colors flex items-center justify-center gap-3"
            >
              CONFIRMAR DISEÑO Y COTIZAR POR WHATSAPP
            </button>
          </div>

          <div className="md:col-span-3">
            <div className="border-2 border-black w-full aspect-[4/3] bg-[#F8F9FA] overflow-hidden">
              <Scene3D
                ancho={ancho}
                alto={alto}
                textureType={textureMap[productoSeleccionado.id] || "ondas"}
                categoria={categoria}
              />
            </div>
            <p className="text-[10px] text-gray-400 mt-2 text-center">
              Arrastrá para rotar • Scroll para hacer zoom
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

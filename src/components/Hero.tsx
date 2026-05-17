import Image from "next/image";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-white">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-50"
        style={{ backgroundImage: "url('/R (1) (1).jpg')" }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black" />
      <div className="relative z-10 text-center px-6 flex flex-col items-center">
        <Image
          src="/GAIA_LOGO-removebg-preview-recorte.png"
          alt="GAIA"
          width={280}
          height={80}
          className="mb-6 object-contain brightness-0 invert"
          priority
        />
        <div className="mb-4 tracking-[0.3em] text-sm text-[#D4C5B0] font-medium">
          CELOSÍAS ARQUITECTÓNICAS
        </div>
        <p className="text-xl md:text-3xl text-white tracking-[0.2em] font-light mb-8">
          TRANSFORMANDO TUS ESPACIOS
        </p>
        <p className="max-w-xl mx-auto text-base md:text-lg text-gray-300 leading-relaxed">
          Diseño arquitectónico a medida en Paraguay. Cada celosía es una
          pieza única que redefine la relación entre luz, sombra y espacio.
        </p>
        <div className="mt-10 flex gap-4 justify-center">
          <a
            href="#calculadora"
            className="inline-block bg-white text-black px-8 py-3 text-sm tracking-[0.15em] font-medium hover:bg-gray-200 transition-colors"
          >
            CALCULAR PRESUPUESTO
          </a>
          <a
            href="#catalogo"
            className="inline-block border-2 border-white text-white px-8 py-3 text-sm tracking-[0.15em] font-medium hover:bg-white hover:text-black transition-colors"
          >
            VER DISEÑOS
          </a>
        </div>
      </div>

    </section>
  );
}

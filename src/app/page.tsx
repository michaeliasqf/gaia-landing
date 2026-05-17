import Hero from "@/components/Hero";
import Cotizador3D from "@/components/Cotizador3D";
import Catalogo from "@/components/Catalogo";
import Valor from "@/components/Valor";
import Footer from "@/components/Footer";
import GridBackground from "@/components/GridBackground";

export default function Home() {
  return (
    <>
      <GridBackground />
      <main className="relative z-10">
        <Hero />
        <Cotizador3D />
        <Catalogo />
        <Valor />
      </main>
      <Footer />
    </>
  );
}

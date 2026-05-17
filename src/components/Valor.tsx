export default function Valor() {
  const items = [
    {
      numero: "01",
      titulo: "Precisión de Fabricación",
      descripcion:
        "Cada celosía GAIA es fabricada con tolerancias milimétricas utilizando tecnología CNC de última generación. Garantizamos un ensamblaje perfecto en cada instalación.",
    },
    {
      numero: "02",
      titulo: "Durabilidad de Materiales",
      descripcion:
        "Seleccionamos personalmente cada material para asegurar resistencia a las condiciones climáticas de Paraguay. Nuestros tratamientos protectores prolongan la vida útil de cada pieza.",
    },
    {
      numero: "03",
      titulo: "Asesoramiento Personalizado",
      descripcion:
        "Nuestro equipo de arquitectos y diseñadores te acompaña desde la conceptualización hasta la instalación. Creamos soluciones a medida para cada proyecto.",
    },
  ];

  return (
    <section className="relative z-10 py-20 md:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <span className="text-xs tracking-[0.3em] text-[#A38A75] font-medium">
            ¿POR QUÉ GAIA?
          </span>
          <h2 className="text-3xl md:text-5xl font-bold text-black tracking-tight mt-3">
            Arquitectura con Propósito
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {items.map((item) => (
            <div
              key={item.numero}
              className="border-2 border-black p-8 hover:bg-[#F8F9FA] transition-colors group"
            >
              <div className="text-5xl font-bold text-gray-200 group-hover:text-[#A38A75] transition-colors mb-6">
                {item.numero}
              </div>
              <h3 className="text-lg font-bold text-black mb-4">
                {item.titulo}
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                {item.descripcion}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-16 border-2 border-black bg-[#F8F9FA] p-8 md:p-12 text-center">
          <p className="text-lg md:text-xl font-bold text-black mb-4">
            Transformamos tus espacios desde 2024
          </p>
          <p className="text-sm text-gray-600 max-w-2xl mx-auto">
            Con más de 500 proyectos ejecutados en todo Paraguay, GAIA es la
            elección de arquitectos y constructores que buscan calidad superior
            en celosías arquitectónicas.
          </p>
        </div>
      </div>
    </section>
  );
}

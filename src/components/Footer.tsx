"use client";

import { useState } from "react";
import Image from "next/image";
import { Globe, Mail, MapPin, Phone, Send } from "lucide-react";

export default function Footer() {
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [enviado, setEnviado] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setEnviado(true);
    setNombre("");
    setEmail("");
    setMensaje("");
    setTimeout(() => setEnviado(false), 3000);
  };

  return (
    <footer className="relative z-10 bg-[#1A1A1A] text-white">
      <div className="max-w-7xl mx-auto px-6 py-16 md:py-20">
        <div className="grid md:grid-cols-2 gap-12">
          <div>
            <Image
              src="/image (1).png"
              alt="GAIA"
              width={120}
              height={40}
              className="mb-4 object-contain brightness-0 invert"
            />
            <p className="text-sm text-gray-400 mb-8 max-w-sm">
              Celosías arquitectónicas premium. Diseño, fabricación e instalación
              en todo Paraguay.
            </p>

            <div className="space-y-4">
              <a
                href="https://wa.me/595981000000"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-sm text-gray-400 hover:text-[#A38A75] transition-colors"
              >
                <Phone className="w-4 h-4" />
                +595 981 000 000
              </a>
              <a
                href="mailto:info@gaia.com.py"
                className="flex items-center gap-3 text-sm text-gray-400 hover:text-[#A38A75] transition-colors"
              >
                <Mail className="w-4 h-4" />
                info@gaia.com.py
              </a>
              <div className="flex items-start gap-3 text-sm text-gray-400">
                <MapPin className="w-4 h-4 mt-0.5" />
                <span>
                  Asunción, Paraguay
                  <br />
                  Av. Mariscal López 1234
                </span>
              </div>
            </div>

            <div className="flex gap-4 mt-8">
              <a
                href="#"
                className="w-10 h-10 border border-gray-700 flex items-center justify-center hover:border-[#A38A75] hover:text-[#A38A75] transition-colors"
              >
                <Globe className="w-4 h-4" />
              </a>
              <a
                href="#"
                className="w-10 h-10 border border-gray-700 flex items-center justify-center hover:border-[#A38A75] hover:text-[#A38A75] transition-colors"
              >
                <Globe className="w-4 h-4" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-sm tracking-[0.2em] font-medium text-[#A38A75] mb-6">
              CONTACTANOS
            </h4>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <input
                  type="text"
                  placeholder="Nombre"
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
                  required
                  className="w-full bg-transparent border-2 border-gray-700 px-4 py-3 text-sm text-white placeholder-gray-500 outline-none focus:border-[#A38A75] transition-colors"
                />
              </div>
              <div>
                <input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full bg-transparent border-2 border-gray-700 px-4 py-3 text-sm text-white placeholder-gray-500 outline-none focus:border-[#A38A75] transition-colors"
                />
              </div>
              <div>
                <textarea
                  placeholder="Tu mensaje"
                  rows={4}
                  value={mensaje}
                  onChange={(e) => setMensaje(e.target.value)}
                  required
                  className="w-full bg-transparent border-2 border-gray-700 px-4 py-3 text-sm text-white placeholder-gray-500 outline-none focus:border-[#A38A75] transition-colors resize-none"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-[#A38A75] hover:bg-[#8c7562] text-white py-3 text-sm tracking-[0.15em] font-medium transition-colors flex items-center justify-center gap-2"
              >
                <Send className="w-4 h-4" />
                {enviado ? "MENSAJE ENVIADO" : "ENVIAR MENSAJE"}
              </button>
            </form>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-gray-500">
            &copy; {new Date().getFullYear()} GAIA. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}

import React from 'react';
import { Link } from 'react-router-dom';
import Logo from '../ui/Logo'; 

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-black text-zinc-400 py-10 border-t border-white/10 font-sans text-sm">
      <div className="container mx-auto px-6 flex flex-col items-center justify-center gap-8 text-center">
        <div className="flex flex-col items-center gap-4">
          <div className="brightness-0 invert opacity-80 w-20"> 
             <Logo /> 
          </div>
          <p className="text-zinc-600 text-xs max-w-md">
             La liga de básquet más emocionante de la ciudad. <br/>
             Organización profesional y compromiso.
          </p>
        </div>
        <nav className="flex flex-wrap justify-center gap-x-8 gap-y-3 text-zinc-300 font-medium">
          <Link to="/" className="hover:text-orange-500 transition-colors">Inicio</Link>
          <Link to="/torneo" className="hover:text-orange-500 transition-colors">Torneo</Link>
          <Link to="/galeria" className="hover:text-orange-500 transition-colors">Galería</Link>
          <a href="/#about" className="hover:text-orange-500 transition-colors">Nosotros</a>
          <Link to="/inscripciones" className="hover:text-orange-500 transition-colors">Inscripción</Link>
        </nav>
        <div className="flex flex-wrap justify-center gap-4 text-xs text-zinc-500">
          <span className="hover:text-zinc-300 cursor-pointer transition-colors">
            📧 contacto@ligabasquet.com
          </span>
          <span className="hidden sm:inline">|</span>
          <span className="hover:text-zinc-300 cursor-pointer transition-colors">
            📱 +54 9 11 1234-5678
          </span>
        </div>
        <div className="text-zinc-700 text-[10px] mt-2">
           © {currentYear} Liga Cuarto Cuarto. Todos los derechos reservados.
        </div>

      </div>
    </footer>
  );
}
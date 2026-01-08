
import React from 'react';
import { Link } from 'react-router-dom';
import Logo from '../ui/Logo'; 

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-gray-300 py-12 border-t border-gray-800">
      <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="flex flex-col gap-4">
          <div className="brightness-0 invert opacity-80 w-fit"> 
             <Logo /> 
          </div>
          <p className="text-sm text-gray-400 max-w-xs">
            La liga de básquet amateur más emocionante de la ciudad. 
            Organización profesional, estadísticas en tiempo real y pura pasión.
          </p>
        </div>
        <div className="flex flex-col gap-2">
          <h3 className="text-white font-bold mb-2 uppercase tracking-wider text-sm">Navegación</h3>
          <Link to="/" className="hover:text-orange-500 transition-colors">Inicio</Link>
          <Link to="/torneo" className="hover:text-orange-500 transition-colors">Torneo</Link>
          <Link to="/inscripcion" className="hover:text-orange-500 transition-colors">Inscripción</Link>
          <a href="#about" className="hover:text-orange-500 transition-colors">Nosotros</a>
        </div>
        <div className="flex flex-col gap-2">
          <h3 className="text-white font-bold mb-2 uppercase tracking-wider text-sm">Contacto</h3>
          <p className="hover:text-white transition-colors cursor-pointer">📧 contacto@ligabasquet.com</p>
          <p className="hover:text-white transition-colors cursor-pointer">📱 +54 9 11 1234-5678</p>
          <p className="hover:text-white transition-colors cursor-pointer">📍 Polideportivo Central</p>
        </div>

      </div>

      <div className="container mx-auto px-6 mt-12 pt-8 border-t border-gray-800 text-center text-xs text-gray-500">
        © {currentYear} Liga Cuarto Cuarto. Todos los derechos reservados.
      </div>
    </footer>
  );
}
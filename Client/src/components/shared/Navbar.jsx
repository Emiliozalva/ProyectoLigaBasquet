import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const linkStyle = "hover:text-black/60 transition-colors duration-200 cursor-pointer";

  return (
    <>
      <nav className={`
        fixed z-50 transition-all duration-300
        top-6 left-4 md:left-1/2 md:-translate-x-1/2
        rounded-full bg-white/30 backdrop-blur-md border border-white/20 shadow-lg
        ${isOpen ? 'bg-white/50' : 'hover:bg-white/40'}
        px-4 md:px-6 py-2 md:py-3
        w-auto max-w-[90%]
      `}>
        
        <div className="flex items-center gap-6">
          
          {/* Menú Desktop */}
          <ul className="hidden md:flex items-center gap-8 font-sans text-sm font-medium text-gray-900">
            <li><Link to="/" className={linkStyle}>Inicio</Link></li>
            <li><Link to="/galeria" className={linkStyle}>Galeria</Link></li>
            <li><Link to="/torneo" className={linkStyle}>Torneo</Link></li>
            <li>
              <Link to="/aboutUs" className={linkStyle}>
                About us
              </Link>
            </li>
            <li>
              <Link to="/inscripciones" className={linkStyle}>
                Inscripción
              </Link>
            </li>
          </ul>

          {/* Botón Móvil */}
          <button 
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden flex items-center gap-2 text-gray-900 focus:outline-none pl-1 pr-2"
          >
            {isOpen ? (
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 9h16.5m-16.5 6.75h16.5" />
              </svg>
            )}
            <span className="text-sm font-bold uppercase tracking-widest mt-[1px]">Menú</span>
          </button>
        </div>
      </nav>

      {/* Desplegable en Móvil */}
      {isOpen && (
        <div className="
          fixed top-24 left-4 z-40 
          w-[85vw] max-w-[300px]
          rounded-2xl
          bg-white/95 backdrop-blur-xl border border-white/40 shadow-2xl
          p-6
          md:hidden
          animate-in slide-in-from-top-4 fade-in duration-200
        ">
          <ul className="flex flex-col gap-5 text-left text-lg font-medium text-gray-800">
            <li><Link to="/" onClick={() => setIsOpen(false)}>Inicio</Link></li>
            <li><Link to="/galeria" onClick={() => setIsOpen(false)}>Galeria</Link></li>
            <li><Link to="/torneo" onClick={() => setIsOpen(false)}>Torneo</Link></li>
            <li><Link to="/aboutUs" onClick={() => setIsOpen(false)}>About Us</Link></li>
            <hr className="border-gray-300/50" /> 
            <li>
              <Link to="/inscripciones" onClick={() => setIsOpen(false)} className="font-bold text-orange-600">
                Inscripción
              </Link>
            </li>
          </ul>
        </div>
      )}
    </>
  );
}
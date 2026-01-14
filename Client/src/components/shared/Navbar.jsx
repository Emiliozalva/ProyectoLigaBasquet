import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const linkStyle = "hover:text-black/60 transition-colors duration-200 cursor-pointer";

  const handleAboutClick = (e) => {
    e.preventDefault();
    setIsOpen(false); 

    if (location.pathname === '/') {
      const section = document.getElementById('about');
      if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      navigate('/#about'); 

    }
  };

  return (
    <>
      <nav className={`
        fixed top-6 left-1/2 z-50 -translate-x-1/2
        rounded-full
        bg-white/30 backdrop-blur-md border border-white/20 shadow-lg
        transition-all duration-300
        ${isOpen ? 'bg-white/50' : 'hover:bg-white/40'}
        px-6 py-3
        w-auto max-w-[90%]
      `}>
        
        <div className="flex items-center justify-between gap-6">

          <ul className="hidden md:flex items-center gap-8 font-sans text-sm font-medium text-gray-900">
            <li><Link to="/" className={linkStyle}>Inicio</Link></li>
            <li><Link to="/galeria" className={linkStyle}>Galeria y Novedades</Link></li>
            <li><Link to="/torneo" className={linkStyle}>Torneo</Link></li>
            
            
            
            <li>
              <a href="#about" onClick={handleAboutClick} className={linkStyle}>
                About us
              </a>
            </li>

            <li>
              <span className={`${linkStyle} opacity-50 cursor-not-allowed`} title="Próximamente">
                Inscripción
              </span>
            </li>
          </ul>

          <button 
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden flex items-center gap-2 text-gray-900 focus:outline-none"
          >
            <span className="text-sm font-bold uppercase tracking-widest">Menú</span>
            {isOpen ? (
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 9h16.5m-16.5 6.75h16.5" />
              </svg>
            )}
          </button>
        </div>
      </nav>

      {isOpen && (
        <div className="
          fixed top-24 left-1/2 z-40 -translate-x-1/2
          w-[90%] max-w-sm
          rounded-2xl
          bg-white/90 backdrop-blur-xl border border-white/40 shadow-2xl
          p-8
          md:hidden
          animate-in slide-in-from-top-4 fade-in duration-200
        ">
          <ul className="flex flex-col gap-6 text-center text-lg font-medium text-gray-800">
            <li><Link to="/" onClick={() => setIsOpen(false)}>Inicio</Link></li>
            <li><Link to="/galeria" onClick={() => setIsOpen(false)}>Galeria y Novedades</Link></li>
            <li><Link to="/torneo" onClick={() => setIsOpen(false)}>Torneo</Link></li>
            
            <li>
              <a href="#about" onClick={handleAboutClick}>About us</a>
            </li>
            
            <hr className="border-gray-300/50" /> 
            
            <li>
              <span className="text-gray-400 cursor-not-allowed">
                Inscripción
              </span>
            </li>
          </ul>
        </div>
      )}
    </>
  );
}
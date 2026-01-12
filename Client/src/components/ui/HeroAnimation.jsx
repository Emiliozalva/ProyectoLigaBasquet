import React, { useState, useEffect } from 'react';
import MatchesCarousel from '../shared/MatchesCarousel'; // Importamos el carrusel aquí
// IMPORTA TUS IMÁGENES DE LOGOS AQUÍ...
import Logo2Aux from '../../assets/Logo2CuartoCuartoaux.png';
import Logo2White from '../../assets/Logo2CuartoCuartoWhite.png';
import Logo1Aux from '../../assets/LogoCuartoCuartoaux.png';
import Logo1White from '../../assets/LogoCuartoCuartoWhite.png';

// --- SUB-COMPONENTES (LogoStrobe y TextShifter) ---
// (MANTÉN TU CÓDIGO DE LogoStrobe y TextShifter IGUAL QUE ANTES AQUÍ)
// ... Solo copio los componentes pequeños para ahorrar espacio en el chat, 
// ... pero tú usa los que ya escribiste que estaban perfectos.

const LogoStrobe = ({ baseSrc, whiteSrc, isGlitching }) => {
  return (
    <div className={`relative w-64 h-64 md:w-96 md:h-96 flex justify-center items-center ${isGlitching ? 'animate-glitch-active' : ''}`}>
      <img src={baseSrc} alt="Logo Base" className="absolute inset-0 w-full h-full object-contain z-10" />
      <img src={whiteSrc} alt="Effect" className="absolute inset-0 w-full h-full object-contain z-20 animate-strobe mix-blend-screen" />
    </div>
  );
};

const TextShifter = ({ isGlitching }) => {
  // BORRAMOS el useState de currentFont porque no lo estamos usando ahora
  
  return (
    <div className={`text-center relative z-10 p-4 ${isGlitching ? 'animate-glitch-active' : ''}`}>
      <h1 className="text-6xl md:text-9xl text-white font-black tracking-tighter italic drop-shadow-[0_0_15px_rgba(255,255,255,0.4)]">
        NO TE <br /> <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400">ACHIQUES</span>
      </h1>
    </div>
  );
};


// --- COMPONENTE PRINCIPAL ACTUALIZADO ---
const HeroAnimation = () => {
  const [phase, setPhase] = useState(0);
  const [isGlitching, setIsGlitching] = useState(false);

  // ... (MANTÉN TU USEEFFECT DEL CICLO DE TIEMPO AQUÍ) ...
  useEffect(() => {
    const PHASE_DURATION = 5000; 
    const GLITCH_DURATION = 400; 

    const cycle = setInterval(() => {
      setIsGlitching(true);
      setTimeout(() => {
        setPhase(prev => (prev + 1) % 3); 
        setTimeout(() => setIsGlitching(false), 200);
      }, GLITCH_DURATION);
    }, PHASE_DURATION);
    return () => clearInterval(cycle);
  }, []);

  const renderContent = () => {
    switch(phase) {
      case 0: return <LogoStrobe baseSrc={Logo2Aux} whiteSrc={Logo2White} isGlitching={isGlitching} />;
      case 1: return <LogoStrobe baseSrc={Logo1Aux} whiteSrc={Logo1White} isGlitching={isGlitching} />;
      case 2: return <TextShifter isGlitching={isGlitching} />;
      default: return null;
    }
  };

  return (
    // CAMBIO CLAVE: h-screen (Pantalla completa obligatoria)
    <div className="relative w-full h-screen bg-black overflow-hidden flex flex-col">
      
      {/* 1. FONDO CON RUIDO Y DEGRADADO */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-zinc-800 via-black to-black z-0"></div>
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none z-0"></div>
      
      {/* 2. CONTENIDO CENTRAL (Logos/Texto) */}
      {/* flex-grow hace que ocupe todo el espacio disponible */}
      <div className="relative z-10 flex-grow flex justify-center items-center pb-20"> 
        {renderContent()}
      </div>

      {/* 3. CARRUSEL INTEGRADO AL PIE (Tipo TV) */}
      <div className="relative z-20 w-full">
         <MatchesCarousel />
      </div>

    </div>
  );
};

export default HeroAnimation;
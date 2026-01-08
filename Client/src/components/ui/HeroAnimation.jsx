import React, { useState, useEffect } from 'react';

// --- IMPORTACIÓN DE ASSETS (Basado en tu captura) ---
// Ajusta la cantidad de "../" según dónde guardes este archivo
import Logo2Aux from '../../assets/Logo2CuartoCuartoaux.png';
import Logo2White from '../../assets/Logo2CuartoCuartoWhite.png';
import Logo1Aux from '../../assets/LogoCuartoCuartoaux.png';
import Logo1White from '../../assets/LogoCuartoCuartoWhite.png';

// --- SUB-COMPONENTE: Logo Strobe (Maneja el par de logos) ---
const LogoStrobe = ({ baseSrc, whiteSrc, isGlitching }) => {
  return (
    <div className={`relative w-64 h-64 md:w-80 md:h-80 flex justify-center items-center ${isGlitching ? 'animate-glitch-active' : ''}`}>
      {/* Imagen Base (Siempre visible) */}
      <img 
        src={baseSrc} 
        alt="Logo Base" 
        className="absolute inset-0 w-full h-full object-contain z-10"
      />
      {/* Imagen Blanca (Parpadea encima para efecto eléctrico) */}
      <img 
        src={whiteSrc} 
        alt="Logo White Effect" 
        className="absolute inset-0 w-full h-full object-contain z-20 animate-strobe mix-blend-screen"
      />
    </div>
  );
};

// --- SUB-COMPONENTE: Texto Cambiante ---
const TextShifter = ({ isGlitching }) => {
  const [currentFont, setCurrentFont] = useState('font-cyber-1');

  // Efecto para cambiar la fuente aleatoriamente mientras se muestra el texto
  useEffect(() => {
    const interval = setInterval(() => {
      // 30% de probabilidad de cambiar de fuente en cada tick rápido
      if (Math.random() > 0.7) {
        setCurrentFont(prev => prev === 'font-cyber-1' ? 'font-cyber-2' : 'font-cyber-1');
      }
    }, 150); // Cambio rápido

    return () => clearInterval(interval);
  }, []);

  return (
    <div className={`text-center relative z-10 p-4 ${isGlitching ? 'animate-glitch-active' : ''}`}>
      <h1 className={`text-5xl md:text-8xl text-white font-bold tracking-widest transition-all duration-75 ${currentFont} drop-shadow-[0_0_10px_rgba(255,255,255,0.5)]`}>
        NO TE <br /> ACHIQUES
      </h1>
    </div>
  );
};

// --- COMPONENTE PRINCIPAL ---
const HeroAnimation = () => {
  // Fases: 0 = Logo2Pair, 1 = Logo1Pair, 2 = Texto
  const [phase, setPhase] = useState(0);
  const [isGlitching, setIsGlitching] = useState(false);

  useEffect(() => {
    const PHASE_DURATION = 5000; // 5 segundos por bloque
    const GLITCH_DURATION = 400; // Tiempo de transición ruidosa

    const cycle = setInterval(() => {
      // 1. Activar Glitch de salida
      setIsGlitching(true);

      // 2. Cambiar contenido
      setTimeout(() => {
        setPhase(prev => (prev + 1) % 3); // 0 -> 1 -> 2 -> 0
        
        // 3. Desactivar Glitch (pequeño delay para que se sienta la entrada)
        setTimeout(() => setIsGlitching(false), 200);
      }, GLITCH_DURATION);

    }, PHASE_DURATION);

    return () => clearInterval(cycle);
  }, []);

  // Función para decidir qué renderizar según la fase
  const renderContent = () => {
    switch(phase) {
      case 0:
        return <LogoStrobe baseSrc={Logo2Aux} whiteSrc={Logo2White} isGlitching={isGlitching} />;
      case 1:
        return <LogoStrobe baseSrc={Logo1Aux} whiteSrc={Logo1White} isGlitching={isGlitching} />;
      case 2:
        return <TextShifter isGlitching={isGlitching} />;
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-black text-white font-sans overflow-hidden">
      
      {/* SECCIÓN SUPERIOR: Animación Central (Ocupa el espacio restante) */}
      <div className="flex-1 flex justify-center items-center relative bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-gray-800 via-black to-black">
        {/* Decoración de fondo tipo grilla o ruido opcional */}
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none"></div>
        
        {renderContent()}
      </div>

      {/* SECCIÓN INFERIOR: Carrusel de Imágenes (Fijo abajo) */}
      {/* Nota: Aquí iría tu componente <Carrusel /> si ya lo tienes, o un placeholder */}
      <div className="h-48 md:h-64 w-full bg-gray-900 border-t-2 border-white/10 relative">
        <div className="absolute top-2 left-2 bg-black/50 px-2 py-1 text-xs text-gray-400 font-mono">
            // LIVE FEED
        </div>
        {/* Aquí puedes importar tu componente <Carrusel /> de shared */}
         <img 
            src="https://images.unsplash.com/photo-1546519638-68e109498ffc?q=80&w=2090&auto=format&fit=crop" 
            className="w-full h-full object-cover opacity-60 hover:opacity-100 transition-opacity duration-500 grayscale hover:grayscale-0"
            alt="Fondo Basket"
         />
      </div>

    </div>
  );
};

export default HeroAnimation;
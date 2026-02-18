import React from 'react';
import TablaPosiciones from '../components/shared/TablaPosiciones';
import EquiposGrid from '../components/shared/EquiposGrid';

export default function Torneo() {
  return (
    <div className="bg-black min-h-screen pt-24 pb-20">
      
      <div className="py-12 px-6 text-center text-white border-b border-white/5 mb-12">
        <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tighter mb-4">
          Torneo <span className="text-orange-600">Apertura</span>
        </h1>
        <p className="text-zinc-400 max-w-lg mx-auto text-sm">
          Sigue de cerca las estadísticas, posiciones y todos los equipos que conforman nuestra liga.
        </p>
      </div>
      <div className="container mx-auto px-4 md:px-6 max-w-5xl">
        
        <TablaPosiciones />

        <EquiposGrid />
        
      </div>
      
    </div>
  );
}
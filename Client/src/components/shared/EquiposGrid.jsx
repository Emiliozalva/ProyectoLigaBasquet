import React from 'react';
import { teams } from '../../data/mockDB';

export default function EquiposGrid() {
  return (
    <div className="w-full mt-24">
      <div className="text-center mb-10">
        <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter text-white">
          Nuestros <span className="text-orange-600">Equipos</span>
        </h2>
        <p className="text-zinc-500 text-sm mt-2 max-w-md mx-auto">
          Conoce a las franquicias que están dejando todo en la cancha.
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6">
        {teams.map((equipo) => (
          <div 
            key={equipo.id}
            className="group bg-zinc-900 border border-zinc-800 rounded-2xl p-6 flex flex-col items-center justify-center hover:bg-zinc-800 hover:border-orange-500/50 transition-all duration-300 cursor-pointer"
          >
            {/* Logo Placeholder */}
            <div className="w-20 h-20 md:w-24 md:h-24 bg-black rounded-full mb-4 flex items-center justify-center shadow-lg border border-zinc-700 group-hover:scale-110 group-hover:border-orange-500 transition-all duration-300">
               <span className="text-3xl font-black text-zinc-600 group-hover:text-orange-500 transition-colors">
                  {equipo.name.charAt(0)}
               </span>
            </div>
            
            <h3 className="text-white font-bold text-sm md:text-base text-center uppercase tracking-wider group-hover:text-orange-400 transition-colors">
              {equipo.name}
            </h3>
          </div>
        ))}
      </div>
    </div>
  );
}
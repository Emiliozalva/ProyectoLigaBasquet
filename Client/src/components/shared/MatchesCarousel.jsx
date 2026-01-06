import React from 'react';
import CardMatch from '../ui/CardMatch'; 
import { teams, partidos } from '../../data/mockDB'; 

export default function MatchesCarousel() {
  const partidosInfinitos = [...partidos, ...partidos];

  return (
    <section className="w-full py-6 overflow-hidden bg-transparent"> 
      <style>{`
        @keyframes slide {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        .animate-slide {
          animation: slide 30s linear infinite;
        }
        /* Opcional: Pausar si pasas el mouse por encima */ /*
        .carousel-container:hover .animate-slide {
          animation-play-state: paused;*/
        }
      `}</style>

      <div className="mb-4 px-4">
        <h2 className="text-sm font-bold uppercase tracking-wider text-gray-400">
          Últimos Resultados
        </h2>
      </div>
      <div className="carousel-container relative w-full overflow-hidden">
        <div className="flex w-max gap-4 animate-slide">
          
          {partidosInfinitos.map((partido, index) => {
            const equipoA = teams.find(t => t.id === partido.teamAId);
            const equipoB = teams.find(t => t.id === partido.teamBId);

            if (!equipoA || !equipoB) return null;

            return (
              <CardMatch
                key={`${partido.id}-${index}`} 
                teamA={equipoA.name}
                logoA={equipoA.logo}
                scoreA={partido.scoreA}
                teamB={equipoB.name}
                logoB={equipoB.logo}
                scoreB={partido.scoreB}
              />
            );
          })}
        </div>

        {/* (OPCIONAL) DEGRADADO A LOS LADOS
           Esto le da un efecto visual muy pro de "desvanecimiento" en los bordes
        */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-8 bg-gradient-to-r from-gray-900 to-transparent"></div>
        <div className="pointer-events-none absolute inset-y-0 right-0 w-8 bg-gradient-to-l from-gray-900 to-transparent"></div>

      </div>
    </section>
  );
}
import React from 'react';
import CardMatch from '../ui/CardMatch'; 
import { teams, partidos } from '../../data/mockDB'; 

export default function MatchesCarousel() {
  const partidosInfinitos = [...partidos, ...partidos];

  return (
    <section className="w-full overflow-hidden bg-transparent"> 
      
      <style>{`
        @keyframes slide {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        .animate-slide {
          animation: slide 40s linear infinite;
        }
      `}</style>

      <div className="carousel-container relative w-full py-4">
        <div className="flex w-max gap-4 animate-slide px-4">
          
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
      </div>
    </section>
  );
}
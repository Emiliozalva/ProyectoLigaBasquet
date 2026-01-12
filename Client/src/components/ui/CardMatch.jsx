import React from 'react';

export default function CardMatch({ 
  teamA, logoA, scoreA, 
  teamB, logoB, scoreB 
}) {
  const isAWin = scoreA > scoreB;
  const isBWin = scoreB > scoreA;

  return (
    <div className="
      w-[180px] min-w-[180px] 
      flex flex-col gap-2 
      rounded-xl 
      border border-white/5 
      bg-zinc-900/60 backdrop-blur-md /* Más transparente y sutil */
      p-3 
      hover:bg-zinc-800/80 transition-colors duration-300
    ">
      
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2 overflow-hidden">
          <img src={logoA} alt={teamA} className="h-8 w-8 object-contain" />
          <span className={`truncate text-xs font-bold uppercase tracking-wide ${isAWin ? 'text-white' : 'text-gray-500'}`}>
            {teamA}
          </span>
        </div>
        <span className={`text-lg font-black ${isAWin ? 'text-orange-500' : 'text-zinc-600'}`}>
          {scoreA}
        </span>
      </div>

      <div className="h-px w-full bg-white/5"></div>

      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2 overflow-hidden">
          <img src={logoB} alt={teamB} className="h-8 w-8 object-contain" />
          <span className={`truncate text-xs font-bold uppercase tracking-wide ${isBWin ? 'text-white' : 'text-gray-500'}`}>
            {teamB}
          </span>
        </div>
        <span className={`text-lg font-black ${isBWin ? 'text-orange-500' : 'text-zinc-600'}`}>
          {scoreB}
        </span>
      </div>

    </div>
  );
}
import React from 'react';

export default function CardMatch({ 
  teamA, logoA, scoreA, 
  teamB, logoB, scoreB 
}) {
  const isAWin = scoreA > scoreB;
  const isBWin = scoreB > scoreA;

  return (
    <div className="
      /* DIMENSIONES REDUCIDAS */
      w-[160px] min-w-[160px] 
      flex flex-col gap-2 
      rounded-lg border border-gray-700/50 
      bg-gray-800/80 backdrop-blur-sm /* Fondo oscuro semi-transparente */
      p-3 shadow-lg
    ">
      
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2 overflow-hidden">
          <img src={logoA} alt={teamA} className="h-6 w-6 rounded-full object-cover bg-gray-200" />
          <span className={`truncate text-xs font-medium ${isAWin ? 'text-white' : 'text-gray-400'}`}>
            {teamA}
          </span>
        </div>
        <span className={`text-sm font-bold ${isAWin ? 'text-yellow-400' : 'text-gray-500'}`}>
          {scoreA}
        </span>
      </div>
      <div className="h-px w-full bg-gray-700"></div>
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2 overflow-hidden">
          <img src={logoB} alt={teamB} className="h-6 w-6 rounded-full object-cover bg-gray-200" />
          <span className={`truncate text-xs font-medium ${isBWin ? 'text-white' : 'text-gray-400'}`}>
            {teamB}
          </span>
        </div>
        <span className={`text-sm font-bold ${isBWin ? 'text-yellow-400' : 'text-gray-500'}`}>
          {scoreB}
        </span>
      </div>

    </div>
  );
}
import React from 'react';

// Recibimos 'teams' como prop para poder buscar los nombres
export default function AdminPartidos({ nextMatchData, setNextMatchData, partidos, setPartidos, teams }) {
  
  const handleScoreChange = (id, field, value) => {
    const updatedPartidos = partidos.map(p => 
      p.id === id ? { ...p, [field]: Number(value) } : p
    );
    setPartidos(updatedPartidos);
  };

  const toggleFinalizado = (id) => {
    const updatedPartidos = partidos.map(p => 
      p.id === id ? { ...p, finalizado: !p.finalizado } : p
    );
    setPartidos(updatedPartidos);
  };

  // Función auxiliar para obtener nombre del equipo por ID
  const getTeamName = (id) => {
    const team = teams.find(t => t.id === id);
    return team ? team.name : 'Desconocido';
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      
      {/* --- SECCIÓN 1: PRÓXIMA FECHA (AVISO) --- */}
      <section className="bg-zinc-900 border border-zinc-800 p-6 rounded-2xl">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold text-white flex items-center gap-2">
            <span className="text-orange-500">★</span> Configurar "Próxima Fecha"
          </h3>
          <span className="text-xs text-zinc-500 bg-zinc-950 px-2 py-1 rounded">Visible en Home</span>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          
          <div className="md:col-span-2">
            <label className="block text-xs text-zinc-500 mb-1 uppercase font-bold">Título del Evento</label>
            <input 
              type="text" 
              value={nextMatchData.titulo}
              onChange={(e) => setNextMatchData({...nextMatchData, titulo: e.target.value})} 
              className="w-full bg-zinc-950 border border-zinc-700 text-white rounded p-2 focus:border-orange-600 outline-none transition-colors" 
            />
          </div>

          <div>
            <label className="block text-xs text-zinc-500 mb-1 uppercase font-bold">Fecha</label>
            <input 
              type="date" 
              value={nextMatchData.fecha}
              onChange={(e) => setNextMatchData({...nextMatchData, fecha: e.target.value})} 
              className="w-full bg-zinc-950 border border-zinc-700 text-white rounded p-2 focus:border-orange-600 outline-none transition-colors" 
            />
          </div>

          <div>
            <label className="block text-xs text-zinc-500 mb-1 uppercase font-bold">Hora Inicio</label>
            <input 
              type="time" 
              value={nextMatchData.hora}
              onChange={(e) => setNextMatchData({...nextMatchData, hora: e.target.value})} 
              className="w-full bg-zinc-950 border border-zinc-700 text-white rounded p-2 focus:border-orange-600 outline-none transition-colors" 
            />
          </div>

          <div>
            <label className="block text-xs text-zinc-500 mb-1 uppercase font-bold">Lugar / Cancha</label>
            <input 
              type="text" 
              value={nextMatchData.cancha}
              onChange={(e) => setNextMatchData({...nextMatchData, cancha: e.target.value})} 
              className="w-full bg-zinc-950 border border-zinc-700 text-white rounded p-2 focus:border-orange-600 outline-none transition-colors" 
            />
          </div>

          {/* LINK GOOGLE MAPS */}
          <div className="md:col-span-2">
            <label className="block text-xs text-zinc-500 mb-1 uppercase font-bold text-orange-400">Link Google Maps 📍</label>
            <input 
              type="url" 
              placeholder="https://maps.google.com/..."
              value={nextMatchData.linkMapa || ''} 
              onChange={(e) => setNextMatchData({...nextMatchData, linkMapa: e.target.value})} 
              className="w-full bg-zinc-950 border border-zinc-700 text-white rounded p-2 focus:border-orange-600 outline-none transition-colors" 
            />
          </div>

        </div>
        
        <div className="mt-4 flex justify-end">
          <button className="bg-white text-black px-6 py-2 rounded font-bold text-sm hover:bg-orange-500 hover:text-white transition-colors uppercase tracking-wider">
            Actualizar Aviso
          </button>
        </div>
      </section>

      {/* --- SECCIÓN 2: CARGA DE RESULTADOS --- */}
      <section className="bg-zinc-900 border border-zinc-800 p-6 rounded-2xl">
        <div className="flex justify-between items-center mb-6">
           <h3 className="text-xl font-bold text-white">Resultados de la Fecha</h3>
           <div className="text-xs text-zinc-500">
             Mostrando {partidos.length} partidos
           </div>
        </div>

        <div className="space-y-3">
          {partidos.map((p) => {
            // Buscamos los nombres usando los IDs del mock
            const nombreA = getTeamName(p.teamAId);
            const nombreB = getTeamName(p.teamBId);

            return (
              <div key={p.id} className={`flex flex-col md:flex-row md:items-center justify-between p-4 rounded-xl border gap-4 transition-colors ${p.finalizado ? 'bg-zinc-950 border-green-900/30' : 'bg-black border-zinc-800'}`}>
                 
                 {/* Equipos (Nombres buscados dinámicamente) */}
                 <div className="flex flex-col min-w-[200px] gap-2">
                    <div className="flex justify-between items-center">
                      <span className="text-zinc-300 font-bold text-sm">{nombreA}</span>
                    </div>
                    <div className="w-full h-px bg-zinc-800 md:hidden"></div>
                    <div className="flex justify-between items-center">
                      <span className="text-zinc-300 font-bold text-sm">{nombreB}</span>
                    </div>
                 </div>
                 
                 {/* Inputs de Resultado */}
                 <div className="flex gap-3 items-center justify-center bg-zinc-900 p-2 rounded-lg border border-zinc-800">
                    <div className="flex flex-col items-center">
                       <input 
                          type="number" 
                          value={p.scoreA}
                          onChange={(e) => handleScoreChange(p.id, 'scoreA', e.target.value)}
                          className="w-12 h-10 bg-black text-white text-center text-lg font-bold rounded border border-zinc-700 focus:border-orange-500 outline-none" 
                       />
                    </div>
                    <span className="text-zinc-600 font-black">-</span>
                    <div className="flex flex-col items-center">
                       <input 
                          type="number" 
                          value={p.scoreB}
                          onChange={(e) => handleScoreChange(p.id, 'scoreB', e.target.value)}
                          className="w-12 h-10 bg-black text-white text-center text-lg font-bold rounded border border-zinc-700 focus:border-orange-500 outline-none" 
                       />
                    </div>
                 </div>
                 
                 {/* Botón de Acción */}
                 <div className="flex items-center justify-end min-w-[120px]">
                    <button 
                      onClick={() => toggleFinalizado(p.id)}
                      className={`h-10 px-4 rounded font-bold text-xs transition-colors uppercase w-full md:w-auto ${
                        p.finalizado 
                        ? 'bg-green-500/10 text-green-500 border border-green-500/50 hover:bg-green-500 hover:text-white' 
                        : 'bg-zinc-800 text-zinc-400 hover:bg-white hover:text-black'
                      }`}
                    >
                      {p.finalizado ? 'Finalizado ✓' : 'Guardar'}
                    </button>
                 </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
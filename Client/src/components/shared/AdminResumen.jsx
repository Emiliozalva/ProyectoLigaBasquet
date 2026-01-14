import React from 'react';

export default function AdminResumen({ inscripcionesAbiertas, setInscripcionesAbiertas, stats }) {
  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      <h2 className="text-2xl font-bold text-white mb-6">Panel de Control</h2>
      
      {/* Card de Inscripciones */}
      <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-2xl flex flex-col md:flex-row items-center justify-between gap-4">
        <div>
          <h3 className="text-lg font-bold text-white">Estado de Inscripciones</h3>
          <p className="text-zinc-400 text-sm mt-1">
            {inscripcionesAbiertas 
              ? "🟢 Formulario visible en la web." 
              : "🔴 Formulario oculto (Cerrado)."}
          </p>
        </div>
        
        <button 
          onClick={() => setInscripcionesAbiertas(!inscripcionesAbiertas)}
          className={`relative w-16 h-8 rounded-full transition-colors duration-300 border border-white/10 ${
            inscripcionesAbiertas ? 'bg-green-600' : 'bg-zinc-800'
          }`}
        >
          <div className={`absolute top-1 left-1 w-6 h-6 bg-white rounded-full shadow-md transform transition-transform duration-300 ${
            inscripcionesAbiertas ? 'translate-x-8' : 'translate-x-0'
          }`} />
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-2xl">
          <p className="text-zinc-500 text-xs font-bold uppercase">Novedades Activas</p>
          <p className="text-3xl font-black text-white mt-2">{stats.novedadesCount}</p>
        </div>
        <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-2xl">
          <p className="text-zinc-500 text-xs font-bold uppercase">Equipos en Tabla</p>
          <p className="text-3xl font-black text-white mt-2">{stats.equiposCount}</p>
        </div>
        <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-2xl">
          <p className="text-zinc-500 text-xs font-bold uppercase">Visitas Hoy</p>
          <p className="text-3xl font-black text-white mt-2">124</p>
        </div>
      </div>
    </div>
  );
}
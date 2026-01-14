import React from 'react';

export default function AdminNovedades({ novedades }) {
  return (
    <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-2xl animate-in fade-in duration-300">
      <div className="flex justify-between items-center mb-6">
         <h3 className="text-xl font-bold text-white">Novedades Web</h3>
         <button className="bg-orange-600 text-white px-4 py-2 rounded-lg font-bold text-xs hover:bg-orange-700 shadow-lg shadow-orange-900/20">
           + Crear Nueva
         </button>
      </div>

      <div className="space-y-4">
        {novedades.map((novedad) => (
          <div key={novedad.id} className="bg-zinc-950 border border-zinc-800 p-4 rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4 group hover:border-zinc-700 transition-colors">
             
             <div className="flex items-start gap-4">
               {/* Icono Placeholder */}
               <div className="w-16 h-16 bg-zinc-800 rounded-lg flex-shrink-0 flex items-center justify-center text-2xl">
                 📰
               </div>
               
               <div>
                 <p className="text-white font-bold text-lg">{novedad.titulo}</p>
                 <p className="text-zinc-500 text-xs italic mb-2 line-clamp-1">{novedad.texto}</p>
                 <span className="bg-green-500/10 text-green-500 text-[10px] px-2 py-1 rounded font-bold uppercase tracking-wide border border-green-500/20">
                   Publicada
                 </span>
               </div>
             </div>

             <div className="flex gap-2 self-end sm:self-center opacity-100 sm:opacity-0 group-hover:opacity-100 transition-opacity">
               <button className="p-2 text-zinc-400 hover:text-white bg-zinc-900 border border-zinc-800 rounded-lg hover:bg-zinc-800" title="Editar">
                 ✏️
               </button>
               <button className="p-2 text-zinc-400 hover:text-red-500 bg-zinc-900 border border-zinc-800 rounded-lg hover:bg-red-900/20 hover:border-red-900/30" title="Eliminar">
                 🗑️
               </button>
             </div>
          </div>
        ))}
      </div>
    </div>
  );
}
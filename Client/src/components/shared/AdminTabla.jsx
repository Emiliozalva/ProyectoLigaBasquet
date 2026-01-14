import React from 'react';

export default function AdminTabla({ tabla}) {
  return (
    <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-2xl animate-in fade-in duration-300">
      <div className="flex justify-between items-center mb-6">
         <h3 className="text-xl font-bold text-white">Tabla de Posiciones</h3>
         <button className="text-xs text-orange-500 border border-orange-500/30 px-3 py-1 rounded hover:bg-orange-500/10">
           + Agregar Equipo
         </button>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left text-zinc-400">
          <thead className="text-xs text-zinc-500 uppercase bg-zinc-950">
            <tr>
              <th className="px-4 py-3 rounded-tl-lg">Equipo</th>
              <th className="px-2 py-3 text-center">PTS</th>
              <th className="px-2 py-3 text-center hidden sm:table-cell">PJ</th>
              <th className="px-2 py-3 text-center hidden sm:table-cell">PG</th>
              <th className="px-2 py-3 text-center hidden sm:table-cell">PP</th>
              <th className="px-2 py-3 text-center rounded-tr-lg">Acción</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-800">
            {tabla.map((fila, index) => (
              <tr key={index} className="hover:bg-zinc-800/30 transition-colors group">
                <td className="px-4 py-3 font-medium text-white">{fila.equipo}</td>
                <td className="px-2 py-3 text-center">
                    <input defaultValue={fila.pts} className="w-10 bg-transparent text-center text-white font-bold border-b border-zinc-700 focus:border-orange-500 outline-none p-1" />
                </td>
                <td className="px-2 py-3 text-center hidden sm:table-cell">
                    <input defaultValue={fila.pj} className="w-8 bg-transparent text-center border-b border-zinc-800 focus:border-zinc-500 outline-none" />
                </td>
                <td className="px-2 py-3 text-center text-green-500 hidden sm:table-cell">{fila.pg}</td>
                <td className="px-2 py-3 text-center text-red-500 hidden sm:table-cell">{fila.pp}</td>
                <td className="px-2 py-3 text-center">
                   <button className="text-blue-500 hover:text-blue-400 text-xs font-bold opacity-0 group-hover:opacity-100 transition-opacity">
                     Guardar
                   </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="mt-4 bg-blue-500/10 border border-blue-500/20 p-3 rounded text-blue-400 text-xs">
         ℹ️ Modifica los valores directamente en la tabla y presiona "Guardar" o Enter.
      </div>
    </div>
  );
}
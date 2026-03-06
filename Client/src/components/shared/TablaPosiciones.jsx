import React, { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../firebase/config';

export default function TablaPosiciones() {
  const [tabla, setTabla] = useState([]);
  const [cargando, setCargando] = useState(true); 

  useEffect(() => {
    const obtenerEquipos = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "equipos"));
        
        const equiposData = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        equiposData.sort((a, b) => b.puntos - a.puntos);
        setTabla(equiposData);
      } catch (error) {
        console.error("Error al obtener los equipos:", error);
      } finally {
        setCargando(false);
      }
    };

    obtenerEquipos();
  }, []); 

  return (
    <div className="w-full" loading="lazy">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl md:text-3xl font-black uppercase tracking-tighter text-white flex items-center gap-3">

        </h2>
      </div>

      <div className="bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden shadow-2xl">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left text-zinc-300">
            <thead className="text-xs text-zinc-500 uppercase bg-black border-b border-zinc-800">
              <tr>
                <th className="px-4 py-4 font-black w-12 text-center">#</th>
                <th className="px-4 py-4 font-black">Equipo</th>
                <th className="px-4 py-4 text-center font-black text-white">PTS</th>
                <th className="px-4 py-4 text-center font-black">FECHAS JUGADAS</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800/50">
              
              {cargando && (
                <tr>
                  <td colSpan="4" className="px-4 py-8 text-center text-zinc-500 font-bold">
                    Cargando posiciones...
                  </td>
                </tr>
              )}
              {!cargando && tabla.length === 0 && (
                <tr>
                  <td colSpan="4" className="px-4 py-8 text-center text-zinc-500 font-bold">
                    Aún no hay equipos inscriptos en el torneo.
                  </td>
                </tr>
              )}

              {!cargando && tabla.length > 0 && tabla.map((fila, index) => {
                const isTop4 = index < 4; 
                
                return (
                  <tr key={fila.id} className="hover:bg-zinc-800/80 transition-colors group">
                    <td className="px-4 py-3 text-center">
                      <span className={`inline-flex w-6 h-6 items-center justify-center rounded text-xs font-bold ${
                        isTop4 ? 'bg-orange-600/20 text-orange-500' : 'bg-zinc-800 text-zinc-500'
                      }`}>
                        {index + 1}
                      </span>
                    </td>
                    <td className="px-4 py-3 font-bold text-white flex items-center gap-3">
                      {/* --- AQUÍ RENDERIZAMOS EL LOGO REAL O LAS LETRAS --- */}
                      <div className="w-8 h-8 bg-black rounded-full flex items-center justify-center text-[10px] uppercase border border-zinc-700 group-hover:border-orange-500 transition-colors overflow-hidden flex-shrink-0">
                        {fila.logo ? (
                           <img src={fila.logo} alt={fila.nombre} loading="lazy" className="w-full h-full object-cover" />
                        ) : (
                           fila.nombre ? fila.nombre.substring(0, 2) : "??"
                        )}
                      </div>
                      {fila.nombre}
                    </td>
                    <td className="px-4 py-3 text-center font-black text-orange-500 text-base">
                      {fila.puntos || 0}
                    </td>
                    <td className="px-4 py-3 text-center font-bold">
                      {fila.fechasJugadas || 0}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
      
      <div className="mt-4 flex gap-4 text-xs text-zinc-500 font-medium">
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded bg-orange-600/20 border border-orange-500/50 block"></span>
          Zona de Clasificación
        </div>
      </div>
    </div>
  );
}
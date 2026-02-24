import React, { useState, useEffect } from 'react';
import { collection, addDoc, getDocs, doc, deleteDoc, writeBatch } from 'firebase/firestore';
import { db } from '../../firebase/config';

export default function AdminTabla() {
  const [nombreEquipo, setNombreEquipo] = useState('');
  const [equipos, setEquipos] = useState([]);
  const [cargando, setCargando] = useState(false);
  const [guardandoTabla, setGuardandoTabla] = useState(false);

  const obtenerEquipos = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "equipos"));
      const equiposData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      equiposData.sort((a, b) => a.nombre.localeCompare(b.nombre));
      setEquipos(equiposData);
    } catch (error) {
      console.error("Error al obtener equipos:", error);
    }
  };

  useEffect(() => {
    obtenerEquipos();
  }, []);

  const handleAgregarEquipo = async (e) => {
    e.preventDefault();
    if (!nombreEquipo.trim()) return;
    setCargando(true);
    
    try {
      await addDoc(collection(db, "equipos"), {
        nombre: nombreEquipo,
        puntos: 0,
        fechasJugadas: 0,
        logo: "" 
      });
      setNombreEquipo('');
      obtenerEquipos();
      alert("¡Equipo creado exitosamente!");
    } catch (error) {
      console.error("Error al agregar:", error);
      alert("Hubo un error al crear el equipo.");
    } finally {
      setCargando(false);
    }
  };

  const handleInputChange = (id, campo, valor) => {
    const numeroFormateado = Math.max(0, Number(valor));
    
    setEquipos(equipos.map(equipo => 
      equipo.id === id ? { ...equipo, [campo]: numeroFormateado } : equipo
    ));
  };

  const guardarTablaModificada = async () => {
    setGuardandoTabla(true);
    try {
      const batch = writeBatch(db);

      equipos.forEach(equipo => {
        const equipoRef = doc(db, "equipos", equipo.id);
        batch.update(equipoRef, {
          puntos: equipo.puntos,
          fechasJugadas: equipo.fechasJugadas
        });
      });

      await batch.commit();
      alert("¡Tabla actualizada correctamente en el sistema!");
    } catch (error) {
      console.error("Error al guardar la tabla:", error);
      alert("Hubo un error al guardar los cambios.");
    } finally {
      setGuardandoTabla(false);
    }
  };

  const eliminarEquipo = async (id, nombre) => {
    if (window.confirm(`¿Estás completamente seguro de que deseas ELIMINAR a "${nombre}" del torneo? Esta acción no se puede deshacer.`)) {
      try {
        await deleteDoc(doc(db, "equipos", id));
        setEquipos(equipos.filter(equipo => equipo.id !== id));
      } catch (error) {
        console.error("Error al eliminar:", error);
        alert("Hubo un error al intentar eliminar el equipo.");
      }
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-black text-white uppercase tracking-tighter mb-6">
        Gestión de <span className="text-orange-600">Equipos y Tabla</span>
      </h2>

      <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 mb-8 max-w-md">
        <h3 className="text-lg font-bold text-white mb-4">Agregar Nuevo Equipo</h3>
        <form onSubmit={handleAgregarEquipo} className="flex flex-col gap-4">
          <div>
            <label className="block text-xs font-bold text-zinc-500 uppercase mb-2">Nombre del Equipo</label>
            <input 
              type="text" 
              value={nombreEquipo}
              onChange={(e) => setNombreEquipo(e.target.value)}
              placeholder="..."
              className="w-full bg-black border border-zinc-800 text-white rounded-lg p-3 focus:border-orange-500 outline-none transition-all"
              required
            />
          </div>
          <button 
            type="submit" 
            disabled={cargando}
            className="w-full bg-zinc-800 hover:bg-zinc-700 text-white font-bold uppercase tracking-widest py-3 rounded-lg transition-colors border border-zinc-700"
          >
            {cargando ? 'Creando...' : 'Crear Equipo'}
          </button>
        </form>
      </div>

      <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
          <h3 className="text-lg font-bold text-white">Editar Posiciones</h3>
          
          <button 
            onClick={guardarTablaModificada}
            disabled={guardandoTabla || equipos.length === 0}
            className={`font-black uppercase tracking-widest py-3 px-6 rounded-lg transition-colors shadow-lg flex items-center gap-2 ${
              guardandoTabla || equipos.length === 0
                ? 'bg-zinc-800 text-zinc-500 cursor-not-allowed' 
                : 'bg-orange-600 hover:bg-orange-500 text-white shadow-orange-600/20'
            }`}
          >
            {guardandoTabla ? 'Guardando cambios...' : 'Guardar Tabla Modificada'}
          </button>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left text-zinc-300">
            <thead className="text-xs text-zinc-500 uppercase bg-black">
              <tr>
                <th className="px-4 py-3 font-black">Equipo</th>
                <th className="px-4 py-3 text-center font-black">Fechas Jugadas</th>
                <th className="px-4 py-3 text-center font-black text-orange-500">Puntos (PTS)</th>
                <th className="px-4 py-3 text-center font-black text-red-500">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800">
              {equipos.map((equipo) => (
                <tr key={equipo.id} className="hover:bg-zinc-800/50">
                  <td className="px-4 py-3 font-bold text-white">{equipo.nombre}</td>
                  
                  <td className="px-4 py-3 text-center">
                    <input 
                      type="number" 
                      min="0"
                      value={equipo.fechasJugadas}
                      onChange={(e) => handleInputChange(equipo.id, 'fechasJugadas', e.target.value)}
                      className="w-16 bg-black border border-zinc-700 rounded text-center text-white p-1 focus:border-orange-500 outline-none"
                    />
                  </td>

                  <td className="px-4 py-3 text-center">
                    <input 
                      type="number" 
                      min="0"
                      value={equipo.puntos}
                      onChange={(e) => handleInputChange(equipo.id, 'puntos', e.target.value)}
                      className="w-16 bg-black border border-orange-500/50 rounded text-center text-orange-500 font-black p-1 focus:border-orange-500 outline-none"
                    />
                  </td>

                  <td className="px-4 py-3 text-center">
                    <button 
                      onClick={() => eliminarEquipo(equipo.id, equipo.nombre)}
                      className="text-zinc-500 hover:text-red-500 hover:bg-red-500/10 p-2 rounded transition-colors"
                      title="Eliminar equipo"
                    >
                      Eliminar equipo.
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          
          {equipos.length === 0 && (
            <p className="text-center text-zinc-500 mt-6 py-4">No hay equipos creados todavía.</p>
          )}
        </div>
      </div>

    </div>
  );
}
import React, { useState, useEffect } from 'react';
import { collection, doc, getDoc, setDoc, addDoc, getDocs, deleteDoc } from 'firebase/firestore';
import { db } from '../../firebase/config';

export default function AdminPartidos() {
  
  // --- ESTADO: PRÓXIMA FECHA ---
  const [fechaData, setFechaData] = useState({ titulo: '', dia: '', hora: '', lugar: '', linkMaps: '' });
  const [guardandoFecha, setGuardandoFecha] = useState(false);

  // --- ESTADO: EQUIPOS Y PARTIDOS ---
  const [equipos, setEquipos] = useState([]);
  const [partidos, setPartidos] = useState([]);
  
  // Estado para el formulario del nuevo partido
  const [nuevoPartido, setNuevoPartido] = useState({
    equipoA: '',
    resultadoA: '',
    equipoB: '',
    resultadoB: '',
    numeroFecha: '' // Ej: "Fecha 1", "Semifinal"
  });
  const [creandoPartido, setCreandoPartido] = useState(false);

  // --- CARGA INICIAL DE DATOS ---
  useEffect(() => {
    const cargarDatos = async () => {
      try {
        // 1. Cargar Próxima Fecha
        const docSnap = await getDoc(doc(db, "configuracion", "proxima_fecha"));
        if (docSnap.exists()) setFechaData(docSnap.data());

        // 2. Cargar Lista de Equipos (Para los selectores)
        const equiposSnap = await getDocs(collection(db, "equipos"));
        const equiposList = equiposSnap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        // Ordenamos alfabéticamente para que sea más fácil buscar en el select
        equiposList.sort((a, b) => a.nombre.localeCompare(b.nombre));
        setEquipos(equiposList);

        // 3. Cargar Partidos ya creados
        obtenerPartidos();
      } catch (error) {
        console.error("Error al cargar datos:", error);
      }
    };
    cargarDatos();
  }, []);

  // Función separada para recargar solo los partidos después de crear/eliminar uno
  const obtenerPartidos = async () => {
    const partidosSnap = await getDocs(collection(db, "partidos"));
    const partidosList = partidosSnap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    setPartidos(partidosList);
  };

  // --- FUNCIONES: PRÓXIMA FECHA ---
  const handleGuardarFecha = async () => {
    setGuardandoFecha(true);
    try {
      await setDoc(doc(db, "configuracion", "proxima_fecha"), fechaData);
      alert("¡Aviso de próxima fecha actualizado!");
    } catch (error) {
      console.error("Error al guardar la fecha:", error);
    } finally {
      setGuardandoFecha(false);
    }
  };

  // --- FUNCIONES: PARTIDOS ---
  const handleCrearPartido = async (e) => {
    e.preventDefault();
    
    // Validación básica
    if (!nuevoPartido.equipoA || !nuevoPartido.equipoB) {
      return alert("Debes seleccionar ambos equipos.");
    }
    if (nuevoPartido.equipoA === nuevoPartido.equipoB) {
      return alert("Un equipo no puede jugar contra sí mismo.");
    }

    setCreandoPartido(true);
    try {
      await addDoc(collection(db, "partidos"), nuevoPartido);
      alert("¡Partido creado con éxito!");
      
      // Limpiamos el formulario (dejamos "numeroFecha" por si quiere cargar varios de la misma fecha)
      setNuevoPartido({ ...nuevoPartido, equipoA: '', resultadoA: '', equipoB: '', resultadoB: '' });
      
      // Recargamos la lista
      obtenerPartidos();
    } catch (error) {
      console.error("Error al crear partido:", error);
      alert("Hubo un error al guardar el partido.");
    } finally {
      setCreandoPartido(false);
    }
  };

  const handleEliminarPartido = async (id) => {
    if (window.confirm("¿Estás seguro de que deseas eliminar este partido?")) {
      try {
        await deleteDoc(doc(db, "partidos", id));
        // Filtramos la lista localmente para no hacer otra petición a Firebase
        setPartidos(partidos.filter(p => p.id !== id));
      } catch (error) {
        console.error("Error al eliminar partido:", error);
      }
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      
      {/* --- SECCIÓN 1: PRÓXIMA FECHA --- */}
      <section className="bg-zinc-900 border border-zinc-800 p-6 rounded-2xl">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold text-white flex items-center gap-2">
            <span className="text-orange-500">★</span> Configurar "Próxima Fecha"
          </h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="md:col-span-2">
            <label className="block text-xs text-zinc-500 mb-1 uppercase font-bold">Título del Evento</label>
            <input type="text" value={fechaData.titulo || ''} onChange={(e) => setFechaData({...fechaData, titulo: e.target.value})} className="w-full bg-zinc-950 border border-zinc-700 text-white rounded p-2 focus:border-orange-600 outline-none transition-colors" placeholder="Ej: Fecha 3 - Torneo Apertura" />
          </div>
          <div>
            <label className="block text-xs text-zinc-500 mb-1 uppercase font-bold">Día de la Fecha</label>
            <input type="text" value={fechaData.dia || ''} onChange={(e) => setFechaData({...fechaData, dia: e.target.value})} className="w-full bg-zinc-950 border border-zinc-700 text-white rounded p-2 focus:border-orange-600 outline-none transition-colors" placeholder="Ej: Sábado 24/05" />
          </div>
          <div>
            <label className="block text-xs text-zinc-500 mb-1 uppercase font-bold">Hora Inicio</label>
            <input type="text" value={fechaData.hora || ''} onChange={(e) => setFechaData({...fechaData, hora: e.target.value})} className="w-full bg-zinc-950 border border-zinc-700 text-white rounded p-2 focus:border-orange-600 outline-none transition-colors" placeholder="Ej: Desde las 18:00 hs" />
          </div>
          <div>
            <label className="block text-xs text-zinc-500 mb-1 uppercase font-bold">Lugar / Cancha</label>
            <input type="text" value={fechaData.lugar || ''} onChange={(e) => setFechaData({...fechaData, lugar: e.target.value})} className="w-full bg-zinc-950 border border-zinc-700 text-white rounded p-2 focus:border-orange-600 outline-none transition-colors" placeholder="Ej: Plaza Candioti" />
          </div>
          <div className="md:col-span-2">
            <label className="block text-xs text-zinc-500 mb-1 uppercase font-bold text-orange-400">Link Google Maps 📍</label>
            <input type="url" value={fechaData.linkMaps || ''} onChange={(e) => setFechaData({...fechaData, linkMaps: e.target.value})} className="w-full bg-zinc-950 border border-zinc-700 text-white rounded p-2 focus:border-orange-600 outline-none transition-colors" />
          </div>
        </div>
        
        <div className="mt-4 flex justify-end">
          <button onClick={handleGuardarFecha} disabled={guardandoFecha} className="bg-white text-black px-6 py-2 rounded font-bold text-sm hover:bg-orange-500 hover:text-white transition-colors uppercase">
            {guardandoFecha ? 'Guardando...' : 'Actualizar Aviso'}
          </button>
        </div>
      </section>

      <section className="bg-zinc-900 border border-zinc-800 p-6 rounded-2xl">
        <h3 className="text-xl font-bold text-white mb-6">Crear Nuevo Partido</h3>
        
        <form onSubmit={handleCrearPartido} className="bg-black border border-zinc-800 p-4 rounded-xl flex flex-col gap-4">
          
          <div>
            <label className="block text-xs text-zinc-500 mb-1 uppercase font-bold">¿A qué fecha pertenece?</label>
            <input 
              type="text" 
              required
              value={nuevoPartido.numeroFecha}
              onChange={(e) => setNuevoPartido({...nuevoPartido, numeroFecha: e.target.value})}
              placeholder="Ej: Fecha 4, Semifinal, Amistoso..."
              className="w-full bg-zinc-900 border border-zinc-700 text-white rounded p-2 focus:border-orange-600 outline-none"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 items-center">
            
            <div className="md:col-span-2">
              <label className="block text-xs text-zinc-500 mb-1 uppercase font-bold">Equipo Local</label>
              <select 
                required
                value={nuevoPartido.equipoA}
                onChange={(e) => setNuevoPartido({...nuevoPartido, equipoA: e.target.value})}
                className="w-full bg-zinc-900 border border-zinc-700 text-white rounded p-2 focus:border-orange-600 outline-none"
              >
                <option value="">-- Seleccionar Equipo --</option>
                {equipos.map(eq => <option key={eq.id} value={eq.nombre}>{eq.nombre}</option>)}
              </select>
              <input 
                type="text" 
                placeholder="Resultado (Ej: 2, PP, GP)"
                value={nuevoPartido.resultadoA}
                onChange={(e) => setNuevoPartido({...nuevoPartido, resultadoA: e.target.value})}
                className="w-full bg-zinc-900 border border-zinc-700 text-white rounded p-2 mt-2 focus:border-orange-600 outline-none"
              />
            </div>

            <div className="text-center hidden md:block text-zinc-600 font-black text-xl">VS</div>

            {/* Equipo B */}
            <div className="md:col-span-2">
              <label className="block text-xs text-zinc-500 mb-1 uppercase font-bold">Equipo Visitante</label>
              <select 
                required
                value={nuevoPartido.equipoB}
                onChange={(e) => setNuevoPartido({...nuevoPartido, equipoB: e.target.value})}
                className="w-full bg-zinc-900 border border-zinc-700 text-white rounded p-2 focus:border-orange-600 outline-none"
              >
                <option value="">-- Seleccionar Equipo --</option>
                {equipos.map(eq => <option key={eq.id} value={eq.nombre}>{eq.nombre}</option>)}
              </select>
              <input 
                type="text" 
                placeholder="Resultado (Ej: 1, PP, GP)"
                value={nuevoPartido.resultadoB}
                onChange={(e) => setNuevoPartido({...nuevoPartido, resultadoB: e.target.value})}
                className="w-full bg-zinc-900 border border-zinc-700 text-white rounded p-2 mt-2 focus:border-orange-600 outline-none"
              />
            </div>

          </div>

          <button 
            type="submit" 
            disabled={creandoPartido}
            className="w-full bg-orange-600 hover:bg-orange-500 text-white font-bold py-3 rounded-lg uppercase tracking-widest transition-colors mt-2"
          >
            {creandoPartido ? 'Creando...' : '+ Agregar Partido'}
          </button>
        </form>
      </section>

      {/* --- SECCIÓN 3: LISTA DE PARTIDOS CREADOS --- */}
      <section className="bg-zinc-900 border border-zinc-800 p-6 rounded-2xl">
        <div className="flex justify-between items-center mb-6">
           <h3 className="text-xl font-bold text-white">Partidos Guardados</h3>
           <div className="text-xs text-zinc-500">Total: {partidos.length}</div>
        </div>

        <div className="space-y-3">
          {partidos.length === 0 ? (
            <p className="text-zinc-500 text-center py-4">Aún no hay partidos creados.</p>
          ) : (
            partidos.map((p) => (
              <div key={p.id} className="flex flex-col md:flex-row items-center justify-between p-4 rounded-xl border border-zinc-800 bg-black gap-4">
                 
                 {/* Info del partido */}
                 <div className="flex-1 w-full">
                    <span className="text-xs text-orange-500 font-bold uppercase tracking-wider block mb-2">{p.numeroFecha}</span>
                    <div className="flex items-center justify-between md:justify-start gap-4">
                      <span className="text-white font-bold w-1/3 text-right">{p.equipoA}</span>
                      
                      {/* Cuadro de resultados */}
                      <div className="bg-zinc-900 border border-zinc-800 px-4 py-1 rounded font-black text-lg min-w-[80px] text-center text-zinc-300 shadow-inner">
                        {p.resultadoA || '-'} : {p.resultadoB || '-'}
                      </div>
                      
                      <span className="text-white font-bold w-1/3 text-left">{p.equipoB}</span>
                    </div>
                 </div>
                 
                 {/* Botón Eliminar */}
                 <button 
                    onClick={() => handleEliminarPartido(p.id)}
                    className="text-zinc-500 hover:text-red-500 hover:bg-red-500/10 p-2 rounded transition-colors"
                    title="Eliminar partido"
                 >
                    Borrar
                 </button>
              </div>
            ))
          )}
        </div>
      </section>
    </div>
  );
}
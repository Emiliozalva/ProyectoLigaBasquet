import React, { useState, useEffect } from 'react';
import { doc, getDoc, setDoc, collection, getDocs } from 'firebase/firestore';
import { db } from '../../firebase/config';

export default function AdminResumen() {
  const [inscripcionesAbiertas, setInscripcionesAbiertas] = useState(false);
  const [cargandoEstado, setCargandoEstado] = useState(true);
  
  const [stats, setStats] = useState({ equipos: 0, novedades: 0 });

  useEffect(() => {
    const cargarDatos = async () => {
      try {
        const docRef = doc(db, "configuracion", "inscripciones");
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setInscripcionesAbiertas(docSnap.data().abiertas);
        }

        const equiposSnap = await getDocs(collection(db, "equipos"));
        const novedadesSnap = await getDocs(collection(db, "novedades"));
        
        setStats({
          equipos: equiposSnap.size, 
          novedades: novedadesSnap.size
        });
      } catch (error) {
        console.error("Error al cargar resumen:", error);
      } finally {
        setCargandoEstado(false);
      }
    };

    cargarDatos();
  }, []);

  const toggleInscripciones = async () => {
    const nuevoEstado = !inscripcionesAbiertas;
    setInscripcionesAbiertas(nuevoEstado); 
    
    try {
      await setDoc(doc(db, "configuracion", "inscripciones"), { abiertas: nuevoEstado });
    } catch (error) {
      console.error("Error al guardar estado de inscripciones:", error);
   
      setInscripcionesAbiertas(!nuevoEstado);
      alert("Error al actualizar el estado en el servidor.");
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      <h2 className="text-2xl font-bold text-white mb-6">Panel de Control</h2>
      
      <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-2xl flex flex-col md:flex-row items-center justify-between gap-4">
        <div>
          <h3 className="text-lg font-bold text-white">Estado de Inscripciones</h3>
          <p className="text-zinc-400 text-sm mt-1 flex items-center gap-2">
            <span className={`w-2 h-2 rounded-full ${inscripcionesAbiertas ? 'bg-green-500' : 'bg-red-500'}`}></span>
            {cargandoEstado 
              ? "Cargando estado..." 
              : inscripcionesAbiertas 
                ? "Formulario visible en la web." 
                : "Formulario oculto (Cerrado)."}
          </p>
        </div>
        
        <button 
          onClick={toggleInscripciones}
          disabled={cargandoEstado}
          className={`relative w-16 h-8 rounded-full transition-colors duration-300 border border-white/10 ${
            inscripcionesAbiertas ? 'bg-green-600' : 'bg-zinc-800'
          } ${cargandoEstado ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          <div className={`absolute top-1 left-1 w-6 h-6 bg-white rounded-full shadow-md transform transition-transform duration-300 ${
            inscripcionesAbiertas ? 'translate-x-8' : 'translate-x-0'
          }`} />
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-2xl">
          <p className="text-zinc-500 text-xs font-bold uppercase">Novedades Activas</p>
          <p className="text-3xl font-black text-white mt-2">{stats.novedades}</p>
        </div>
        <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-2xl">
          <p className="text-zinc-500 text-xs font-bold uppercase">Equipos en Tabla</p>
          <p className="text-3xl font-black text-white mt-2">{stats.equipos}</p>
        </div>
        <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-2xl opacity-50">
          <p className="text-zinc-500 text-xs font-bold uppercase">Visitas Hoy</p>
          <p className="text-3xl font-black text-white mt-2">--</p>
          <p className="text-[10px] text-zinc-600 mt-1">Próximamente</p>
        </div>
      </div>
    </div>
  );
}
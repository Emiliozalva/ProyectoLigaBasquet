import React, { useState, useEffect } from 'react';
import { doc, getDoc, setDoc, collection, getDocs } from 'firebase/firestore';
import { db } from '../../firebase/config';

export default function AdminResumen() {
  const [inscripcionesAbiertas, setInscripcionesAbiertas] = useState(false);
  const [linkInscripcion, setLinkInscripcion] = useState('');
  const [guardandoLink, setGuardandoLink] = useState(false);
  const [cargandoEstado, setCargandoEstado] = useState(true);
  
  // Agregamos instagram a las estadísticas
  const [stats, setStats] = useState({ equipos: 0, novedades: 0, instagram: 0 });

  useEffect(() => {
    const cargarDatos = async () => {
      try {
        // 1. Cargamos la configuración de inscripciones (Estado y Link)
        const docRef = doc(db, "configuracion", "inscripciones");
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setInscripcionesAbiertas(docSnap.data().abiertas || false);
          setLinkInscripcion(docSnap.data().link || "");
        }

        // 2. Cargamos las estadísticas de todas las colecciones
        const equiposSnap = await getDocs(collection(db, "equipos"));
        const novedadesSnap = await getDocs(collection(db, "novedades"));
        const instagramSnap = await getDocs(collection(db, "instagram_posts")); // <-- Nueva consulta
        
        setStats({
          equipos: equiposSnap.size, 
          novedades: novedadesSnap.size,
          instagram: instagramSnap.size // <-- Guardamos la cantidad
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
      // Usamos { merge: true } para no borrar el link cuando cambiamos el botón
      await setDoc(doc(db, "configuracion", "inscripciones"), { abiertas: nuevoEstado }, { merge: true });
    } catch (error) {
      console.error("Error al guardar estado de inscripciones:", error);
      setInscripcionesAbiertas(!nuevoEstado);
      alert("Error al actualizar el estado en el servidor.");
    }
  };

  const handleGuardarLink = async () => {
    setGuardandoLink(true);
    try {
      // Usamos { merge: true } para no borrar el estado de Abierto/Cerrado cuando cambiamos el link
      await setDoc(doc(db, "configuracion", "inscripciones"), { link: linkInscripcion }, { merge: true });
      alert("¡Link de inscripción actualizado correctamente!");
    } catch (error) {
      console.error("Error al guardar link:", error);
      alert("Hubo un error al guardar el link.");
    } finally {
      setGuardandoLink(false);
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      <h2 className="text-2xl font-bold text-white mb-6">Panel de Control</h2>
      
      {/* --- MÓDULO DE INSCRIPCIONES --- */}
      <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-2xl flex flex-col gap-6">
        
        {/* Fila 1: Botón On/Off */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
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

        {/* Fila 2: Link del formulario */}
        <div className="pt-6 border-t border-zinc-800">
          <label className="block text-xs font-bold text-zinc-500 uppercase mb-2">Link del Formulario (Google Forms, Typeform, etc.)</label>
          <div className="flex flex-col sm:flex-row gap-3">
            <input 
              type="url" 
              value={linkInscripcion}
              onChange={(e) => setLinkInscripcion(e.target.value)}
              placeholder="https://docs.google.com/forms/..."
              className="flex-1 bg-black border border-zinc-700 text-white rounded-lg p-3 focus:border-orange-500 outline-none transition-all"
            />
            <button 
              onClick={handleGuardarLink}
              disabled={guardandoLink || cargandoEstado}
              className="bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 text-white font-bold px-6 py-3 rounded-lg transition-colors whitespace-nowrap uppercase tracking-wider text-sm"
            >
              {guardandoLink ? "Guardando..." : "Guardar Link"}
            </button>
          </div>
        </div>

      </div>

      {/* --- MÓDULO DE ESTADÍSTICAS --- */}
      {/* Cambié a grid-cols-2 md:grid-cols-4 para que entren las 4 tarjetas */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-2xl">
          <p className="text-zinc-500 text-xs font-bold uppercase">Novedades Activas</p>
          <p className="text-3xl font-black text-white mt-2">{stats.novedades}</p>
        </div>
        <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-2xl">
          <p className="text-zinc-500 text-xs font-bold uppercase">Posts Instagram</p>
          <p className="text-3xl font-black text-white mt-2">{stats.instagram}</p>
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
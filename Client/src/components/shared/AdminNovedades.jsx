import React, { useState, useEffect } from 'react';
import { collection, addDoc, getDocs, deleteDoc, doc, orderBy, query } from 'firebase/firestore';
import { db } from '../../firebase/config';
import { uploadImageToCloudinary } from '../../utils/cloudinary'; // <-- IMPORTAMOS EL MOTOR DE SUBIDA

export default function AdminNovedades() {
  const [novedades, setNovedades] = useState([]);
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [cargando, setCargando] = useState(false);
  const [subiendoImagen, setSubiendoImagen] = useState(false); // <-- ESTADO PARA LA BARRA DE CARGA
  
  const [nuevaNovedad, setNuevaNovedad] = useState({
    titulo: '',
    texto: '',
    imagen: ''
  });

  const obtenerNovedades = async () => {
    try {
      const q = query(collection(db, "novedades"), orderBy("fechaCreacion", "desc"));
      const querySnapshot = await getDocs(q);
      const novedadesData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setNovedades(novedadesData);
    } catch (error) {
      console.error("Error al obtener novedades:", error);
    }
  };

  useEffect(() => {
    obtenerNovedades();
  }, []);

  // --- FUNCIÓN PARA MANEJAR LA SUBIDA DE LA FOTO ---
  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setSubiendoImagen(true); // Mostramos "Subiendo..."
    const url = await uploadImageToCloudinary(file); // Llamamos a Cloudinary
    
    if (url) {
      setNuevaNovedad({ ...nuevaNovedad, imagen: url }); // Guardamos el link
    } else {
      alert("Hubo un error al subir la imagen. Intenta de nuevo.");
    }
    setSubiendoImagen(false); // Ocultamos "Subiendo..."
  };

  const handleCrearNovedad = async (e) => {
    e.preventDefault();
    setCargando(true);

    try {
      await addDoc(collection(db, "novedades"), {
        titulo: nuevaNovedad.titulo,
        texto: nuevaNovedad.texto,
        imagen: nuevaNovedad.imagen || "https://images.unsplash.com/photo-1546519638-68e109498ffc?auto=format&fit=crop&q=80&w=1000",
        fechaCreacion: Date.now() 
      });
      
      setNuevaNovedad({ titulo: '', texto: '', imagen: '' });
      setMostrarFormulario(false);
      obtenerNovedades();
    } catch (error) {
      console.error("Error al crear novedad:", error);
      alert("Hubo un error al guardar la novedad.");
    } finally {
      setCargando(false);
    }
  };

  const handleEliminar = async (id) => {
    if (window.confirm("¿Estás seguro de que deseas eliminar esta novedad?")) {
      try {
        await deleteDoc(doc(db, "novedades", id));
        setNovedades(novedades.filter(n => n.id !== id));
      } catch (error) {
        console.error("Error al eliminar:", error);
      }
    }
  };

  return (
    <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-2xl animate-in fade-in duration-300">
      <div className="flex justify-between items-center mb-6">
         <h3 className="text-xl font-bold text-white">Novedades Web</h3>
         <button 
            onClick={() => setMostrarFormulario(!mostrarFormulario)}
            className="bg-orange-600 text-white px-4 py-2 rounded-lg font-bold text-xs hover:bg-orange-700 shadow-lg shadow-orange-900/20 uppercase tracking-wider"
         >
           {mostrarFormulario ? "Cancelar" : "+ Crear Nueva"}
         </button>
      </div>

      {mostrarFormulario && (
        <form onSubmit={handleCrearNovedad} className="bg-black border border-zinc-800 p-6 rounded-xl mb-6 flex flex-col gap-4">
          <div>
            <label className="block text-xs font-bold text-zinc-500 uppercase mb-2">Título de la noticia</label>
            <input 
              type="text" 
              required
              value={nuevaNovedad.titulo}
              onChange={(e) => setNuevaNovedad({...nuevaNovedad, titulo: e.target.value})}
              className="w-full bg-zinc-900 border border-zinc-700 text-white rounded p-3 focus:border-orange-600 outline-none"
              placeholder="Ej: Final de Temporada"
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-zinc-500 uppercase mb-2">Descripción corta</label>
            <textarea 
              required
              value={nuevaNovedad.texto}
              onChange={(e) => setNuevaNovedad({...nuevaNovedad, texto: e.target.value})}
              className="w-full bg-zinc-900 border border-zinc-700 text-white rounded p-3 focus:border-orange-600 outline-none min-h-[80px]"
              placeholder="Ej: Este sábado se juegan las finales..."
            />
          </div>
          
          {/* --- CAMBIO: INPUT DE TIPO ARCHIVO PARA LA IMAGEN --- */}
          <div>
            <label className="block text-xs font-bold text-zinc-500 uppercase mb-2">Imagen de la Novedad</label>
            <input 
              type="file" 
              accept="image/*"
              onChange={handleImageUpload}
              className="w-full bg-zinc-900 border border-zinc-700 text-zinc-400 rounded p-2 focus:border-orange-600 outline-none
                file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-xs file:font-bold file:bg-zinc-800 file:text-white hover:file:bg-zinc-700 transition-all cursor-pointer"
            />
            {/* Mensaje de carga */}
            {subiendoImagen && <p className="text-orange-500 text-xs font-bold mt-2 animate-pulse">Subiendo imagen a la nube...</p>}
            
            {/* Vista previa de la foto */}
            {nuevaNovedad.imagen && !subiendoImagen && (
              <div className="mt-4 relative w-32 h-20 rounded-lg overflow-hidden border border-zinc-700">
                <img src={nuevaNovedad.imagen} alt="Vista previa" className="w-full h-full object-cover" />
              </div>
            )}
          </div>

          <button 
            type="submit" 
            disabled={cargando || subiendoImagen} // Bloqueamos el botón si se está subiendo la foto
            className={`w-full font-bold py-3 rounded-lg uppercase tracking-widest transition-colors mt-2 ${
              cargando || subiendoImagen ? 'bg-zinc-800 text-zinc-500 cursor-not-allowed' : 'bg-orange-600 hover:bg-orange-500 text-white'
            }`}
          >
            {cargando ? "Publicando..." : "Publicar Novedad"}
          </button>
        </form>
      )}

      {/* --- LISTA DE NOVEDADES (Se mantiene igual) --- */}
      <div className="space-y-4">
        {novedades.length === 0 && !cargando ? (
          <p className="text-zinc-500 text-center py-4 text-sm">No hay novedades publicadas.</p>
        ) : (
          novedades.map((novedad) => (
            <div key={novedad.id} className="bg-zinc-950 border border-zinc-800 p-4 rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4 group hover:border-zinc-700 transition-colors">
               
               <div className="flex items-start gap-4">
                 <div className="w-16 h-16 bg-zinc-900 rounded-lg flex-shrink-0 flex items-center justify-center overflow-hidden border border-zinc-800">
                   {novedad.imagen ? (
                     <img src={novedad.imagen} alt={novedad.titulo} className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-opacity" />
                   ) : (
                     <svg className="w-6 h-6 text-zinc-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                     </svg>
                   )}
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
                 <button onClick={() => handleEliminar(novedad.id)} className="p-2 text-zinc-400 hover:text-red-500 bg-zinc-900 border border-zinc-800 rounded-lg hover:bg-red-900/20 hover:border-red-900/30 transition-colors">
                   <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                   </svg>
                 </button>
               </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
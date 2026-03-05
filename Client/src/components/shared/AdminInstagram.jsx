import React, { useState, useEffect } from 'react';
import { collection, addDoc, getDocs, deleteDoc, doc, orderBy, query } from 'firebase/firestore';
import { db } from '../../firebase/config';
import { uploadImageToCloudinary } from '../../utils/cloudinary'; 

export default function AdminInstagram() {
  const [posts, setPosts] = useState([]);
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [cargando, setCargando] = useState(false);
  const [subiendoImagen, setSubiendoImagen] = useState(false);
  
  const [nuevoPost, setNuevoPost] = useState({
    link: '',
    descripcion: '',
    likes: '',
    fecha: '',
    imagen: ''
  });

  const obtenerPosts = async () => {
    try {
      const q = query(collection(db, "instagram_posts"), orderBy("fechaCreacion", "desc"));
      const querySnapshot = await getDocs(q);
      const postsData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setPosts(postsData);
    } catch (error) {
      console.error("Error al obtener posts:", error);
    }
  };

  useEffect(() => {
    obtenerPosts();
  }, []);

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setSubiendoImagen(true);
    const url = await uploadImageToCloudinary(file);
    
    if (url) {
      setNuevoPost({ ...nuevoPost, imagen: url });
    } else {
      alert("Hubo un error al subir la imagen. Intenta de nuevo.");
    }
    setSubiendoImagen(false);
  };

  const handleCrearPost = async (e) => {
    e.preventDefault();
    if (!nuevoPost.imagen) {
      alert("Por favor, sube una imagen para la publicación.");
      return;
    }

    setCargando(true);
    try {
      await addDoc(collection(db, "instagram_posts"), {
        ...nuevoPost,
        fechaCreacion: Date.now() 
      });
      
      setNuevoPost({ link: '', descripcion: '', likes: '', fecha: '', imagen: '' });
      setMostrarFormulario(false);
      obtenerPosts();
    } catch (error) {
      console.error("Error al crear post:", error);
      alert("Hubo un error al guardar la publicación.");
    } finally {
      setCargando(false);
    }
  };

  const handleEliminar = async (id) => {
    if (window.confirm("¿Estás seguro de que deseas eliminar este post?")) {
      try {
        await deleteDoc(doc(db, "instagram_posts", id));
        setPosts(posts.filter(p => p.id !== id));
      } catch (error) {
        console.error("Error al eliminar:", error);
      }
    }
  };

  return (
    <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-2xl animate-in fade-in duration-300">
      <div className="flex justify-between items-center mb-6">
         <h3 className="text-xl font-bold text-white">Feed de Instagram</h3>
         <button 
            onClick={() => setMostrarFormulario(!mostrarFormulario)}
            className="bg-orange-600 text-white px-4 py-2 rounded-lg font-bold text-xs hover:bg-orange-700 shadow-lg shadow-orange-900/20 uppercase tracking-wider"
         >
           {mostrarFormulario ? "Cancelar" : "+ Nuevo Post"}
         </button>
      </div>

      {mostrarFormulario && (
        <form onSubmit={handleCrearPost} className="bg-black border border-zinc-800 p-6 rounded-xl mb-6 flex flex-col gap-4">
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-zinc-500 uppercase mb-2">Enlace de la publicación original</label>
              <input 
                type="url" required value={nuevoPost.link}
                onChange={(e) => setNuevoPost({...nuevoPost, link: e.target.value})}
                className="w-full bg-zinc-900 border border-zinc-700 text-white rounded p-3 focus:border-orange-600 outline-none"
                placeholder="https://www.instagram.com/p/..."
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-zinc-500 uppercase mb-2">Likes (Ej: "124", "1.5K")</label>
              <input 
                type="text" required value={nuevoPost.likes}
                onChange={(e) => setNuevoPost({...nuevoPost, likes: e.target.value})}
                className="w-full bg-zinc-900 border border-zinc-700 text-white rounded p-3 focus:border-orange-600 outline-none"
                placeholder="..."
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-zinc-500 uppercase mb-2">Fecha (Ej: "Hace 2 días")</label>
            <input 
              type="text" required value={nuevoPost.fecha}
              onChange={(e) => setNuevoPost({...nuevoPost, fecha: e.target.value})}
              className="w-full bg-zinc-900 border border-zinc-700 text-white rounded p-3 focus:border-orange-600 outline-none"
              placeholder="Ej: Hace 2 días"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-zinc-500 uppercase mb-2">Descripción (Caption)</label>
            <textarea 
              required value={nuevoPost.descripcion}
              onChange={(e) => setNuevoPost({...nuevoPost, descripcion: e.target.value})}
              className="w-full bg-zinc-900 border border-zinc-700 text-white rounded p-3 focus:border-orange-600 outline-none min-h-[80px]"
              placeholder="..."
            />
          </div>
          
          <div>
            <label className="block text-xs font-bold text-zinc-500 uppercase mb-2">Foto de la Publicación</label>
            <input 
              type="file" accept="image/*" onChange={handleImageUpload}
              className="w-full bg-zinc-900 border border-zinc-700 text-zinc-400 rounded p-2 focus:border-orange-600 outline-none
                file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-xs file:font-bold file:bg-zinc-800 file:text-white hover:file:bg-zinc-700 cursor-pointer"
            />
            {subiendoImagen && <p className="text-orange-500 text-xs font-bold mt-2 animate-pulse">Subiendo imagen...</p>}
            {nuevoPost.imagen && !subiendoImagen && (
              <div className="mt-4 relative w-24 h-24 rounded-lg overflow-hidden border border-zinc-700">
                <img src={nuevoPost.imagen} alt="Vista previa" className="w-full h-full object-cover" />
              </div>
            )}
          </div>

          <button 
            type="submit" disabled={cargando || subiendoImagen}
            className={`w-full font-bold py-3 rounded-lg uppercase tracking-widest transition-colors mt-2 ${
              cargando || subiendoImagen ? 'bg-zinc-800 text-zinc-500 cursor-not-allowed' : 'bg-orange-600 hover:bg-orange-500 text-white'
            }`}
          >
            {cargando ? "Guardando..." : "Guardar Publicación"}
          </button>
        </form>
      )}

      <div className="space-y-4">
        {posts.length === 0 && !cargando ? (
          <p className="text-zinc-500 text-center py-4 text-sm">No hay posts de Instagram guardados.</p>
        ) : (
          posts.map((post) => (
            <div key={post.id} className="bg-zinc-950 border border-zinc-800 p-4 rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4 group hover:border-zinc-700 transition-colors">
               
               <div className="flex items-start gap-4">
                 <div className="w-16 h-16 bg-zinc-900 rounded-lg flex-shrink-0 flex items-center justify-center overflow-hidden border border-zinc-800">
                   {post.imagen && <img src={post.imagen} alt="Post" className="w-full h-full object-cover" />}
                 </div>
                 
                 <div>
                   <p className="text-white font-bold text-sm">❤️ {post.likes} likes • {post.fecha}</p>
                   <p className="text-zinc-500 text-xs italic mb-2 line-clamp-2 mt-1">{post.descripcion}</p>
                   <a href={post.link} target="_blank" rel="noreferrer" className="text-orange-500 hover:text-orange-400 text-[10px] font-bold uppercase tracking-wide">
                     Ver original ↗
                   </a>
                 </div>
               </div>

               <div className="flex gap-2 self-end sm:self-center opacity-100 sm:opacity-0 group-hover:opacity-100 transition-opacity">
                 <button onClick={() => handleEliminar(post.id)} className="p-2 text-zinc-400 hover:text-red-500 bg-zinc-900 border border-zinc-800 rounded-lg hover:bg-red-900/20 hover:border-red-900/30 transition-colors">
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
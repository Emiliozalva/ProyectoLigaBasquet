import React, { useState, useEffect } from 'react';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import { db } from '../../firebase/config';
import logoPerfil from '../../assets/LogoCuartoCuarto.jpeg'; 

export default function InstagramFeed() {
  const [posts, setPosts] = useState([]);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
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
        console.error("Error al obtener los posts de Instagram:", error);
      } finally {
        setCargando(false);
      }
    };

    obtenerPosts();
  }, []);

  return (
    <div className="w-full py-12">
      <div className="flex items-center justify-between mb-8 px-4 md:px-0">
        <div>
          <h2 className="text-3xl font-black uppercase tracking-tighter text-white flex items-center gap-2">
            <svg className="w-8 h-8 text-orange-500" fill="currentColor" viewBox="0 0 24 24">
              <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
            </svg>
            En la Cancha
          </h2>
          <p className="text-zinc-500 text-sm mt-1">Síguenos en @cuartocuarto.ar</p>
        </div>
        <a href="https://www.instagram.com/cuartocuarto.ar" target="_blank" rel="noopener noreferrer" className="hidden md:flex items-center gap-2 px-4 py-2 bg-zinc-900 hover:bg-zinc-800 text-white text-sm font-bold rounded-lg transition-colors">
          Ver perfil
        </a>
      </div>

      {cargando ? (
        <div className="flex justify-center py-12">
          <p className="text-orange-500 font-bold animate-pulse">Cargando publicaciones...</p>
        </div>
      ) : posts.length === 0 ? (
        <div className="flex justify-center py-12">
          <p className="text-zinc-500">Aún no hay publicaciones recientes.</p>
        </div>
      ) : (
        <div className="
          flex 
          overflow-x-auto 
          snap-x snap-mandatory 
          gap-6 
          px-4 md:px-0 pb-8
          [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden
        ">
          {posts.map((post) => (
            <a 
              key={post.id} 
              href={post.link}
              target="_blank" 
              rel="noopener noreferrer"
              className="
                relative flex-shrink-0 snap-center
                w-[85vw] md:w-[350px] lg:w-[400px]
                group bg-zinc-950 border border-white/10 rounded-xl overflow-hidden hover:border-orange-500/50 transition-all duration-300 hover:-translate-y-1 block
              "
            >
              <div className="p-3 flex items-center gap-2">
                <div className="w-8 h-8 bg-gradient-to-tr from-yellow-400 via-red-500 to-purple-500 rounded-full p-[2px] flex-shrink-0">
                  <img 
                    src={logoPerfil} 
                    alt="Liga Cuarto Cuarto" 
                    className="w-full h-full object-cover rounded-full border border-black bg-black"
                  />
                </div>
                
                <div className="flex-1 flex items-center gap-1">
                  <p className="text-sm font-bold text-white leading-none">cuartocuarto.ar</p>
                  <svg className="w-3.5 h-3.5 text-[#0095F6]" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1.18 14.83l-4.13-4.13 1.76-1.76 2.37 2.37 6.03-6.03 1.76 1.76-7.79 7.79z"/>
                  </svg>
                </div>
                
                <svg className="w-5 h-5 text-zinc-500 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24"><path d="M12 8a2 2 0 100-4 2 2 0 000 4zm0 6a2 2 0 100-4 2 2 0 000 4zm0 6a2 2 0 100-4 2 2 0 000 4z"/></svg>
              </div>

              <div className="w-full aspect-square bg-zinc-900 overflow-hidden relative">
                <img 
                  src={post.imagen} 
                  alt="Publicación" 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors"></div>
              </div>

              <div className="p-4">
                <div className="flex items-center gap-4 mb-3 text-white">
                  <svg className="w-6 h-6 hover:text-zinc-300 transition-colors" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"/></svg>
                  <svg className="w-6 h-6 hover:text-zinc-300 transition-colors" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 20.25c4.97 0 9-3.694 9-8.25s-4.03-8.25-9-8.25S3 7.444 3 12c0 2.104.859 4.023 2.273 5.48.432.447.74 1.04.586 1.641a4.483 4.483 0 01-.923 1.785A5.969 5.969 0 006 21c1.282 0 2.47-.402 3.445-1.087.81.22 1.668.337 2.555.337z"/></svg>
                  <svg className="w-6 h-6 hover:text-zinc-300 transition-colors ml-auto" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z"/></svg>
                </div>
                
                <p className="text-sm font-bold text-white mb-1">{post.likes} Me gusta</p>
                
                <p className="text-sm text-zinc-300 line-clamp-2">
                  <span className="font-bold text-white mr-2">cuartocuarto.ar</span>
                  {post.descripcion}
                </p>
                
                <p className="text-[10px] text-zinc-500 mt-2 uppercase tracking-wide">{post.fecha}</p>
              </div>
            </a>
          ))}
        </div>
      )}
      
      <div className="px-4 md:px-0">
        <a href="https://www.instagram.com/cuartocuarto.ar" target="_blank" rel="noopener noreferrer" className="md:hidden mt-2 w-full flex items-center justify-center gap-2 px-4 py-3 bg-zinc-900 text-white text-sm font-bold rounded-lg">
          Ver perfil en Instagram
        </a>
      </div>
    </div>
  );
}
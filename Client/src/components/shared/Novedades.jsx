import React, { useState, useEffect } from 'react';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import { db } from '../../firebase/config';

export default function Novedades() {
  const [novedades, setNovedades] = useState([]);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
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
        console.error("Error al obtener las novedades:", error);
      } finally {
        setCargando(false);
      }
    };

    obtenerNovedades();
  }, []);

  if (!cargando && novedades.length === 0) {
    return null;
  }

  return (
    <section className="bg-zinc-950 py-12 border-b border-white/10">
      <div className="container mx-auto">
        <div className="px-6 mb-8">
           <h2 className="text-2xl md:text-4xl font-black uppercase tracking-tighter text-white flex items-center gap-3">
            <span className="bg-orange-600 w-2 h-8 md:h-10 block rounded-sm"></span>
            Novedades
          </h2>
        </div>
        
        <div className="
          flex 
          overflow-x-auto 
          snap-x snap-mandatory 
          gap-4 md:gap-6 
          px-6 pb-4
          [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden
        ">
          
          {cargando ? (
            <div className="w-full text-center py-10">
              <span className="text-zinc-500 text-sm font-bold uppercase tracking-widest animate-pulse">
                Cargando noticias...
              </span>
            </div>
          ) : (
            novedades.map((item) => (
              <div 
                key={item.id}
                className="
                  relative 
                  flex-shrink-0 
                  snap-center 
                  w-[85vw] md:w-[500px] h-[300px] md:h-[350px]
                  rounded-xl overflow-hidden
                  border border-white/10 shadow-lg
                  group cursor-pointer
                "
              >
                <img 
                  src={item.imagen} 
                  alt={item.titulo}
                  className="w-full h-full object-cover brightness-[0.7] group-hover:brightness-[0.9] group-hover:scale-105 transition-all duration-700"
                />
                <div className="absolute top-4 right-4 max-w-[70%]">
                  <h3 className="text-lg md:text-xl font-black uppercase tracking-wider text-white text-right leading-none drop-shadow-md">
                    {item.titulo}
                  </h3>
                  <div className="h-1 w-8 bg-orange-600 ml-auto mt-2 rounded-full"></div>
                </div>

                <div className="
                  absolute bottom-0 left-0 w-full 
                  bg-gradient-to-t from-black via-black/60 to-transparent 
                  p-6
                ">
                  <p className="text-zinc-200 font-medium text-sm md:text-base leading-snug drop-shadow-sm max-w-[90%] line-clamp-3">
                    {item.texto}
                  </p>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
}
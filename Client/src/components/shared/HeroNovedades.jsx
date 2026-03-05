import React, { useState, useEffect } from 'react';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import { db } from '../../firebase/config';

export default function HeroNovedades() {
  const [novedades, setNovedades] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const obtenerNovedades = async () => {
      try {
        const q = query(collection(db, "novedades"), orderBy("fechaCreacion", "desc"));
        const querySnapshot = await getDocs(q);
        const novedadesData = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        
        const activas = novedadesData.filter(n => n.activa !== false);
        setNovedades(activas.length > 0 ? activas : novedadesData);

      } catch (error) {
        console.error("Error al obtener las novedades:", error);
      } finally {
        setCargando(false);
      }
    };

    obtenerNovedades();
  }, []);

  
  useEffect(() => {
    if (novedades.length <= 1) return;
    
    const timer = setInterval(() => {
      setCurrent((prev) => (prev === novedades.length - 1 ? 0 : prev + 1));
    }, 6000);
    
    return () => clearInterval(timer);
  }, [novedades.length]);

  if (cargando) {
    return (
      <div className="relative w-full h-[85vh] md:h-screen bg-black flex items-center justify-center">
        <span className="text-zinc-500 text-sm font-bold uppercase tracking-widest animate-pulse">
          Cargando Liga...
        </span>
      </div>
    );
  }

  if (novedades.length === 0) {
    return (
      <div className="relative w-full h-[85vh] md:h-screen bg-black flex items-center justify-center">
        <h1 className="text-4xl md:text-[6rem] font-black text-white uppercase tracking-tighter">
          LIGA CUARTO CUARTO
        </h1>
      </div>
    );
  }

  return (
    <div className="relative w-full h-[85vh] md:h-screen bg-black overflow-hidden block">
      
      
      <div 
        className="flex w-full h-full transition-transform duration-1000 ease-in-out"
        style={{ transform: `translateX(-${current * 100}%)` }}
      >
        {novedades.map((slide) => (
        
          <div key={slide.id} className="w-full h-full flex-shrink-0 relative">
            
            
            <div 
              className="absolute inset-0 bg-cover bg-center"
              style={{ 
                backgroundImage: `url(${slide.imagen || 'https://images.unsplash.com/photo-1504450758481-7338eba7524a?q=80&w=1920&auto=format&fit=crop'})` 
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent"></div>
            </div>

            
            <div className="relative z-10 flex flex-col items-center justify-end h-full pb-20 md:pb-32 px-4 text-center">
              <h1 className="text-4xl md:text-[6rem] font-black text-white uppercase tracking-tighter leading-none mb-4 drop-shadow-2xl">
                {slide.titulo}
              </h1>
              <p className="text-base md:text-xl text-zinc-300 mb-10 font-medium max-w-3xl drop-shadow-md line-clamp-2">
                {slide.texto}
              </p>
              
              {slide.link && (
                <a 
                  href={slide.link}
                  target={slide.link.includes('http') ? "_blank" : "_self"}
                  rel="noopener noreferrer"
                  className="bg-white text-black px-8 py-4 md:px-12 md:py-5 rounded-full font-black text-sm md:text-lg uppercase tracking-widest hover:bg-zinc-200 hover:scale-105 transition-transform"
                >
                  Saber más
                </a>
              )}
            </div>
          </div>
        ))}
      </div>

      {novedades.length > 1 && (
        <div className="absolute bottom-8 left-0 right-0 flex justify-center gap-2 z-20">
          {novedades.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrent(index)}
              className={`h-2 md:h-3 rounded-full transition-all duration-500 ${
                index === current ? 'bg-orange-600 w-8 md:w-12' : 'bg-white/40 hover:bg-white/80 w-2 md:w-3'
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
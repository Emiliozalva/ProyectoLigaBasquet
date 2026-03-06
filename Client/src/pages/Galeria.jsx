import React, {useState} from 'react';
import NextMatchCard from '../components/shared/NextMatchCard';
import Novedades from '../components/shared/HeroNovedades';

export default function Galeria() {
  
  const DRIVE_LINK = "https://drive.google.com/drive/folders/1HD4td-PVdT6O7pdLzBtwJpcQ_Hjp18bN";

  const [touchedIndex, setTouchedIndex] = useState(null);
  
const images = [
    "https://res.cloudinary.com/doajyizjm/image/upload/q_auto,f_auto/v1772804617/galeria1-convertido-de-jpg_ps7fzs.webp",
    "https://res.cloudinary.com/doajyizjm/image/upload/q_auto,f_auto/v1772804617/galeria2-convertido-de-jpg_ofvtjm.webp",
    "https://res.cloudinary.com/doajyizjm/image/upload/q_auto,f_auto/v1772804615/galeria3-convertido-de-jpg_ve3fdi.webp",
    "https://res.cloudinary.com/doajyizjm/image/upload/q_auto,f_auto/v1772804614/galeria4-convertido-de-jpg_eiujo2.webp",
    "https://res.cloudinary.com/doajyizjm/image/upload/q_auto,f_auto/v1772804620/galeria5-convertido-de-jpg_hrvoxj.webp",
    "https://res.cloudinary.com/doajyizjm/image/upload/q_auto,f_auto/v1772804614/galeria9-convertido-de-jpg_gmet1o.webp",
    "https://res.cloudinary.com/doajyizjm/image/upload/q_auto,f_auto/v1772804614/galeria6-convertido-de-jpg_b4enwx.webp",
    "https://res.cloudinary.com/doajyizjm/image/upload/q_auto,f_auto/v1772804614/galeria8-convertido-de-jpg_l8muum.webp",
    "https://res.cloudinary.com/doajyizjm/image/upload/q_auto,f_auto/v1772804613/galeria10-convertido-de-jpg_k0no9r.webp",
    "https://res.cloudinary.com/doajyizjm/image/upload/q_auto,f_auto/v1772804614/galeria7-convertido-de-jpg_f2huc7.webp",
    "https://res.cloudinary.com/doajyizjm/image/upload/q_auto,f_auto/v1772804613/galeria11-convertido-de-jpg_njxtcm.webp",
    "https://res.cloudinary.com/doajyizjm/image/upload/q_auto,f_auto/v1772804613/galeria12-convertido-de-jpg_pyjs3v.webp",
  ];
  
  const handleInteraction = (e, index) => {
    if (touchedIndex !== index) {
      e.preventDefault(); 
      setTouchedIndex(index); 
    }
  };

  return (
    <div className="bg-black min-h-screen pt-24">
      
      
      <div className="py-12 px-6 text-center text-white">
        <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tighter mb-4">
          Nuestra <span className="text-orange-600">Galería</span>
        </h1>
        <p className="text-zinc-400 max-w-lg mx-auto text-sm">
          <span className="md:hidden">Revive los mejores momentos de la fecha.</span>
          <span className="hidden md:inline">Revive los mejores momentos de la fecha.</span>
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 w-full">
        {images.map((imgSrc, index) => {
        
          const isActive = touchedIndex === index;

          return (
            <a 
              key={index}
              href={DRIVE_LINK}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => handleInteraction(e, index)}
              className="group relative block aspect-square overflow-hidden cursor-pointer bg-zinc-900"
            >
              <img
                src={imgSrc}
                alt={`Foto ${index}`}
                loading="lazy"
                className={`
                  w-full h-full object-cover
                  transition-all duration-500 ease-in-out
                  
                  ${isActive ? 'grayscale-0 scale-110' : 'grayscale group-hover:grayscale-0 group-hover:scale-110'}
                `}
              />
              <div className={`
                absolute inset-0 
                bg-black/20 
                flex items-center justify-center
                transition-opacity duration-300
                
                ${isActive ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}
              `}>
                <span className={`
                  bg-white/90 text-black px-3 py-1 text-xs font-bold uppercase tracking-widest backdrop-blur-sm rounded-sm 
                  transition-transform duration-300
                  ${isActive ? 'translate-y-0' : 'translate-y-4 group-hover:translate-y-0'}
                `}>
                  Ver en Drive ↗
                </span>
              </div>
            </a>
          );
        })}
      </div>
      
      <div className="py-16 text-center">
         <a 
           href={DRIVE_LINK}
           target="_blank"
           rel="noopener noreferrer"
           className="inline-block border border-white/20 text-white px-8 py-3 uppercase text-xs font-bold tracking-[0.2em] hover:bg-white hover:text-black transition-colors"
         >
           Ver álbum completo
         </a>
      </div>

    </div>
  );
}
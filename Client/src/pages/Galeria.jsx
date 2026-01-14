import React, {useState} from 'react';
import foto1 from "../assets/galeria/galeria1.jpg";
import foto2 from "../assets/galeria/galeria2.jpg";
import foto3 from "../assets/galeria/galeria3.jpg";
import foto4 from "../assets/galeria/galeria4.jpg";
import foto5 from "../assets/galeria/galeria5.jpg";
import foto6 from "../assets/galeria/galeria6.jpg";
import foto7 from "../assets/galeria/galeria7.jpg";
import foto8 from "../assets/galeria/galeria8.jpg";
import foto9 from "../assets/galeria/galeria9.jpg";
import foto10 from "../assets//galeria/galeria10.jpg";
import foto11 from "../assets/galeria/galeria11.jpg";
import foto12 from "../assets/galeria/galeria12.jpg";
import NextMatchCard from '../components/shared/NextMatchCard';
import Novedades from '../components/shared/Novedades';




export default function Galeria() {
  
  const DRIVE_LINK = "https://drive.google.com/drive/folders/1HD4td-PVdT6O7pdLzBtwJpcQ_Hjp18bN";

  const [touchedIndex, setTouchedIndex] = useState(null);
  const images = [
    foto1,foto2,foto8,
    foto4,foto5,foto6,
    foto7,foto3,foto9,
    foto10,foto11,foto12,
  ];
  
  const handleInteraction = (e, index) => {
    
    if (touchedIndex !== index) {
      e.preventDefault(); 
      setTouchedIndex(index); 
    }
  };

  return (
    <div className="bg-black min-h-screen pt-24">
      <NextMatchCard/>
      <Novedades />
      <div className="w-full"></div>
      <div className="w-full"></div>
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
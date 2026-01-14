import React from 'react';

// Datos de ejemplo (Mock Data)
const newsData = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1518407613690-d9fc990e795f?auto=format&fit=crop&q=80&w=1000",
    title: "Final de Temporada",
    description: "Este sábado se juegan las finales de oro y plata en el polideportivo central."
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1504450758481-7338eba7524a?auto=format&fit=crop&q=80&w=1000",
    title: "Nuevas Camisetas",
    description: "Ya están disponibles los nuevos modelos de la liga para la temporada de verano."
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1546519638-68e109498ffc?auto=format&fit=crop&q=80&w=1000",
    title: "Clínica de Tiro",
    description: "El ex-jugador profesional Marcos López dará una clínica gratuita para inscriptos."
  },
];

export default function Novedades() {
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
          
          {newsData.map((item) => (
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
                src={item.image} 
                alt={item.title}
                className="w-full h-full object-cover brightness-[0.7] group-hover:brightness-[0.9] group-hover:scale-105 transition-all duration-700"
              />
              <div className="absolute top-4 right-4 max-w-[70%]">
                <h3 className="text-lg md:text-xl font-black uppercase tracking-wider text-white text-right leading-none drop-shadow-md">
                  {item.title}
                </h3>
                <div className="h-1 w-8 bg-orange-600 ml-auto mt-2 rounded-full"></div>
              </div>

              <div className="
                absolute bottom-0 left-0 w-full 
                bg-gradient-to-t from-black via-black/60 to-transparent 
                p-6
              ">
                <p className="text-zinc-200 font-medium text-sm md:text-base leading-snug drop-shadow-sm max-w-[90%]">
                  {item.description}
                </p>
              </div>

            </div>
          ))}
        </div>
        {/* SE puede quitar esto*/}
        <p className="text-center text-zinc-600 text-[10px] md:hidden mt-2 uppercase tracking-widest animate-pulse">
          Desliza →
        </p>

      </div>
    </section>
  );
}
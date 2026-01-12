import React from 'react';

export default function AboutUs() {
  const cards = [
    {
      id: 1,
      title: "PASIÓN",
      desc: "Más que un deporte, un estilo de vida.",
      img: "https://images.unsplash.com/photo-1546519638-68e109498ee3?auto=format&fit=crop&q=80&w=600",
      offset: "md:mt-0"
    },
    {
      id: 2,
      title: "COMUNIDAD",
      desc: "Un lugar donde nacen amistades.",
      img: "https://images.unsplash.com/photo-1519861531473-920026393112?auto=format&fit=crop&q=80&w=600",
      offset: "md:mt-16"
    },
    {
      id: 3,
      title: "COMPETENCIA",
      desc: "Nivel, estadísticas y premios reales.",
      img: "https://images.unsplash.com/photo-1574623452334-1e0ac2b3ccb4?auto=format&fit=crop&q=80&w=600",
      offset: "md:mt-8" 
    }
  ];

  return (
    <section id="about" className="py-20 bg-gray-50 overflow-hidden">
      <div className="container mx-auto px-6">
        
        <div className="text-center mb-16 max-w-2xl mx-auto">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Sobre Nosotros</h2>
          <p className="text-gray-600">
            La liga amateur con estándares profesionales. Organizamos torneos 
            donde cada detalle cuenta, desde la estadística hasta la experiencia en cancha.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
          
          {cards.map((item) => (
            <div 
              key={item.id} 
              className={`
                relative group rounded-2xl overflow-hidden shadow-xl h-96 cursor-pointer
                ${item.offset} /* Aquí aplicamos el desplazamiento vertical */
              `}
            >
              <img 
                src={item.img} 
                alt={item.title} 
                className="
                  absolute inset-0 w-full h-full object-cover
                  /* ESTADO INICIAL: Gris, opaco */
                  grayscale brightness-75 
                  /* ESTADO HOVER: Color, brillo, zoom */
                  group-hover:grayscale-0 group-hover:brightness-110 group-hover:scale-110
                  transition-all duration-700 ease-out
                "
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-90 group-hover:opacity-60 transition-opacity duration-500" />

              <div className="absolute bottom-0 left-0 p-6 translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                <h3 className="text-3xl font-black text-white italic uppercase mb-2 drop-shadow-lg">
                  {item.title}
                </h3>
                <p className="text-white/90 text-sm font-medium transform opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 delay-100">
                  {item.desc}
                </p>
              </div>

              <div className="absolute inset-0 border-4 border-orange-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl scale-95 group-hover:scale-100" />
            </div>
          ))}
          
        </div>
      </div>
    </section>
  );
}
import React, { useRef, useState, useEffect } from 'react';


const AboutSection = ({ item }) => {
  const ref = useRef(null);
  const [isInView, setIsInView] = useState(false);

useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      { 
        threshold: 0.5
      }
    );

    const currentElement = ref.current;

    if (currentElement) {
      observer.observe(currentElement);
    }

    return () => {

      if (currentElement) observer.unobserve(currentElement);
    };
  }, []);

  return (
    <div 
      ref={ref}
      className="relative w-full h-[500px] overflow-hidden group cursor-default"
    >
      <img 
        src={item.image} 
        alt={item.title}
        className={`
          absolute inset-0 w-full h-full object-cover transition-all duration-700 ease-in-out
          
     
          grayscale scale-100


          md:group-hover:grayscale-0 
          md:group-hover:scale-110

          ${isInView ? 'max-md:grayscale-0 max-md:scale-110' : ''}
        `}
      />
      <div className={`
        absolute inset-0 transition-colors duration-700
        bg-black/60 
        md:group-hover:bg-black/40
        ${isInView ? 'max-md:bg-black/40' : ''}
      `} />

      <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-4 md:px-20">
        
        <h2 className="text-4xl md:text-5xl font-black text-white tracking-widest mb-4 drop-shadow-lg uppercase">
          {item.title}
        </h2>
        
        <div className={`
          w-24 h-1 bg-orange-500 mb-6 transition-transform duration-500
          scale-x-50 md:group-hover:scale-x-100

          ${isInView ? 'max-md:scale-x-100' : 'max-md:scale-x-50'}
        `}></div>

        <p className="text-gray-200 text-lg max-w-2xl leading-relaxed drop-shadow-md">
          {item.text}
        </p>
        
      </div>
    </div>
  );
};

export default function AboutUs2() {
  const sections = [
    {
      id: 1,
      title: "¿QUIÉNES SOMOS?",
      text: (
        <>
          CuartoCuarto es la única liga libre de básquet 3x3 de Santa Fe.
          <br />
          Nació de una idea simple: agarrar la pelota y jugar, sin necesidad de estar federado ni pertenecer a un club.
          <br />
          Hoy somos un movimiento que reúne a más de 70 jugadores por fin de semana, de todos los barrios de la ciudad, con un solo propósito en común: jugar.
        </>
      ),
      image: "https://res.cloudinary.com/doajyizjm/image/upload/v1774393864/DSC04921-convertido-de-jpg_irooqc.webp" 
    },
    {
      id: 2,
      title: "IMPACTO",
      text: (
        <>
          Creemos que el deporte es mejor cuando se disfruta en comunidad.
          <br />
          CuartoCuarto nació para generar un espacio donde el juego y el encuentro van de la mano. No es solo un torneo, es un punto de encuentro real, con estructura y organización que fomenta la competencia, pero sin perder lo más importante: que la gente la pase bien, se conozca, y vuelva cada fin de semana con más ganas.
        </>
      ),
      image: "https://res.cloudinary.com/doajyizjm/image/upload/v1774393864/DSC04934-convertido-de-jpg_uznljc.webp"
    },
    {
      id: 3,
      title: "VALORES",
      text: (
        <>
          <strong>Unión.</strong> Porque los mejores equipos se arman entre amigos, vecinos y desconocidos que comparten una cancha.
          <br />
          <strong>Buen juego.</strong> Porque la forma en que se juega importa tanto como el resultado.
          <br />
          <strong>Integridad.</strong> Porque el respeto entre rivales es lo que hace que este espacio funcione y crezca.
          <br />
          <strong>Profesionalismo.</strong> Porque cada detalle importa, desde la organización del evento hasta la producción del contenido. Hacemos las cosas bien.
        </>
      ),
      image: "https://res.cloudinary.com/doajyizjm/image/upload/v1774393864/DSC05147-convertido-de-jpg_dlslba.webp"
    }
  ];

  return (
    <section id="about" className="w-full bg-black">
      {sections.map((item) => (
        <AboutSection key={item.id} item={item} />
      ))}
    </section>
  );
}
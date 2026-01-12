import React, { useRef, useState, useEffect } from 'react';
import foto1 from "../../assets/CC2.jpg";
import foto2 from "../../assets/CC5.jpg";
import foto3 from "../../assets/CC7.jpg";

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

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) observer.unobserve(ref.current);
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
      title: "LOREM IPSUM DOLOR",
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
      image: foto1 
    },
    {
      id: 2,
      title: "CONSECTETUR ADIPISCING",
      text: "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
      image: foto2
    },
    {
      id: 3,
      title: "SED DO EIUSMOD",
      text: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.",
      image: foto3
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
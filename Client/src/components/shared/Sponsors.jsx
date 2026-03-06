import React from 'react';
import Logo from '../../assets/LogoCuartoCuartoWhite.png';

const sponsors = [
  { id: 1, name: "Sponsor A", logo: Logo },
  { id: 2, name: "Sponsor B", logo: Logo},
  { id: 3, name: "Sponsor C", logo: Logo },
  { id: 4, name: "Sponsor D", logo: Logo },
];

export default function Sponsors() {
  return (
    <section className="bg-black py-16 border-t border-white/10">
      <div className="container mx-auto px-4 text-center">
        <h3 className="text-zinc-500 text-xs font-bold uppercase tracking-[0.3em] mb-10">
          Nuestros Sponsors
        </h3>
        
        <div className="flex flex-wrap justify-center items-center gap-10 md:gap-20 opacity-60 hover:opacity-100 transition-opacity duration-500">
          {sponsors.map((sponsor) => (
            <img 
              key={sponsor.id} 
              src={sponsor.logo} 
              alt={sponsor.name} 
              className="h-8 md:h-12 w-auto object-contain grayscale hover:grayscale-0 transition-all duration-300"
            />
          ))}
        </div>
      </div>
    </section>
  );
}
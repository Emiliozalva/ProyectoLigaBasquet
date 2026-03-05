import React from 'react';

// Importaciones
import HeroNovedades from '../components/shared/HeroNovedades';
import MatchesCarousel from '../components/shared/MatchesCarousel';
import NextMatchCard from '../components/shared/NextMatchCard';
import TablaPosiciones from '../components/shared/TablaPosiciones'; 
import InstagramFeed from '../components/shared/InstagramFeed';
import Sponsors from '../components/shared/Sponsors';

const Home = () => {
  return (
    // Fondo principal totalmente negro
    <div className="w-full bg-black min-h-screen">
      
      {/* 1. PORTADA ESTILO NIKE (Borde a borde) */}
      <HeroNovedades />
      
      {/* 2. CARRUSEL DE PARTIDOS (Redujimos py-6 a py-2 para pegarlo más a la portada) */}
      <section className="relative z-10 w-full bg-black py-2">
        <MatchesCarousel />
      </section>

      {/* CONTENEDOR PRINCIPAL */}
      {/* Redujimos py-12 a py-8 y el hueco enorme de space-y-20 a space-y-10 */}
      <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
        
        {/* 3. PRÓXIMO PARTIDO */}
        <section>
          <NextMatchCard />
        </section>

        {/* 4. TABLA DE POSICIONES */}
        <section>
          {/* Redujimos mb-10 a mb-6 para que la tabla esté más cerca de su título */}
          <div className="flex justify-center items-center gap-4 mb-6">
             <div className="w-2 h-8 md:h-10 bg-orange-600 rounded-sm"></div>
             <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter text-white drop-shadow-md">
               Tabla de Posiciones
             </h2>
          </div>
          <TablaPosiciones /> 
        </section>

      </main>

      {/* 5. INSTAGRAM FEED */}
      {/* Redujimos py-16 a py-8 y corregimos z-8 a z-10 */}
      <section className="relative z-10 bg-black py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <InstagramFeed />
        </div>
      </section>




    </div>
  )
}

export default Home;
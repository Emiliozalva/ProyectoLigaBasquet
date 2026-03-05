import React from 'react';
import { Outlet } from 'react-router-dom';
import { Navbar } from '../components/shared/Navbar'; 
import Logo from '../components/ui/Logo';
import Logo2 from '../components/ui/Logo2';
import Sponsors from '../components/shared/Sponsors'; 
import Footer from '../components/shared/Footer';
import NextMatchCard from '../components/shared/NextMatchCard';


export default function PublicLayout() {
  return (
    <div className="min-h-screen flex flex-col bg-black font-sans selection:bg-orange-500 selection:text-white">
      
      <Navbar />

      {/* --- LOGOS PARA ESCRITORIO --- */}
      <div className="fixed top-6 right-6 z-50 hidden md:block">
         <Logo className="hover:scale-105 transition-transform duration-300" />
      </div>
      <div className="fixed top-6 left-6 z-50 hidden md:block">
         <Logo2 className="hover:scale-105 transition-transform duration-300" />
      </div>
      <NextMatchCard/>
      {/* --- LOGO PARA MÓVIL --- */}
      <div className="fixed top-5 right-6 z-50 block md:hidden">
         <Logo className="w-12 h-12 md:w-14 md:h-14 hover:scale-105 transition-transform duration-300" /> 
      </div>

      {/* CONTENIDO PRINCIPAL DE CADA PÁGINA */}
      <main className="flex-grow w-full relative">
        <Outlet />
      </main>

      {/* SPONSORS  */}
      <div className="relative z-10 w-full pt-8 pb-16 bg-black">
        <Sponsors />
      </div>

      <Footer />
      
    </div>
  );
}
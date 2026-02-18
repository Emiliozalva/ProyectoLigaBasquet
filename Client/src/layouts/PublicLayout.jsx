import React from 'react';
import { Outlet } from 'react-router-dom';
import { Navbar } from '../components/shared/Navbar'; 
import Logo from '../components/ui/Logo';
import Logo2 from '../components/ui/Logo2';
import Footer from '../components/shared/Footer';

export default function PublicLayout() {
  return (
    
    <div className="min-h-screen flex flex-col font-sans selection:bg-orange-500 selection:text-white">
      
      <Navbar />

      <div className="fixed top-6 right-6 z-50 hidden md:block">
         <Logo className="hover:scale-105 transition-transform duration-300" />
      </div>
      <div className="fixed top-6 left-6 z-50 hidden md:block">
         <Logo2 className="hover:scale-105 transition-transform duration-300" />
      </div>
      <main className="flex-grow w-full relative">
        <Outlet />
      </main>

      <Footer />
      
    </div>
  );
}
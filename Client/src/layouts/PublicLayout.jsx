
import React from 'react';
import { Outlet } from 'react-router-dom';
import { Navbar } from '../components/shared/Navbar'; 
import Logo from '../components/ui/Logo';
import Footer from '../components/shared/Footer';

export default function PublicLayout() {
  return (
    
    <div className="min-h-screen flex flex-col bg-gray-50 font-sans selection:bg-orange-100 selection:text-orange-600">
      
      <Navbar />

      <div className="fixed top-6 right-6 z-50 hidden md:block">
         <Logo className="hover:scale-105 transition-transform duration-300" />
      </div>
      <main className="flex-grow w-full relative">
        <Outlet />
      </main>

      <Footer />
      
    </div>
  );
}
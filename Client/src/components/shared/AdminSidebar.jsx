import React from 'react';
import { Link } from 'react-router-dom';

const SidebarItem = ({ id, icon, label, isActive, onClick }) => (
  <button
    onClick={() => onClick(id)}
    className={`
      w-full flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-xl transition-all duration-200
      ${isActive 
        ? 'bg-orange-600 text-white shadow-lg shadow-orange-900/20 translate-x-1' 
        : 'text-zinc-400 hover:bg-zinc-900 hover:text-white hover:translate-x-1'}
    `}
  >
    <span className="text-lg">{icon}</span>
    <span>{label}</span>
  </button>
);

export default function AdminSidebar({ activeTab, setActiveTab }) {
  return (
    <aside className="w-full md:w-64 bg-zinc-950 border-r border-white/10 flex flex-col h-auto md:h-screen sticky top-0 z-50">
      
      {/* Header */}
      <div className="p-6 border-b border-white/10 flex items-center gap-3">
        <div className="w-8 h-8 bg-orange-600 rounded-md flex items-center justify-center font-black text-black">
          A
        </div>
        <div>
          <h1 className="text-sm font-black uppercase tracking-wider text-white">
            Admin Panel
          </h1>
          <p className="text-[10px] text-zinc-500">Liga Cuarto Cuarto</p>
        </div>
      </div>
      
      {/* Menú */}
      <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
        <SidebarItem 
          id="resumen" 
          label="Resumen" 
          icon="📊" 
          isActive={activeTab === 'resumen'} 
          onClick={setActiveTab} 
        />
        <SidebarItem 
          id="partidos" 
          label="Gestión Partidos" 
          icon="🏀" 
          isActive={activeTab === 'partidos'} 
          onClick={setActiveTab} 
        />
        <SidebarItem 
          id="tabla" 
          label="Tabla Posiciones" 
          icon="🏆" 
          isActive={activeTab === 'tabla'} 
          onClick={setActiveTab} 
        />
        <SidebarItem 
          id="novedades" 
          label="Novedades" 
          icon="📰" 
          isActive={activeTab === 'novedades'} 
          onClick={setActiveTab} 
        />
      </nav>

      {/* Footer / Salir */}
      <div className="p-4 border-t border-white/10">
        <Link to="/" className="flex items-center gap-3 px-4 py-3 text-xs font-bold text-red-500 hover:bg-red-500/10 rounded-xl transition-colors uppercase tracking-widest">
          <span>🚪</span> Cerrar Sesión
        </Link>
      </div>
    </aside>
  );
}
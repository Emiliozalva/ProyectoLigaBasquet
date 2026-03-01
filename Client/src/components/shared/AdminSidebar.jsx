import React from 'react';
import { useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth } from '../../firebase/config';

const SidebarItem = ({ id, icon, label, isActive, onClick }) => (
  <button
    onClick={() => onClick(id)}
    className={`
      flex md:w-full items-center justify-center md:justify-start gap-1 md:gap-3 
      px-2 py-3 md:px-4 md:py-3 text-[10px] md:text-sm font-medium rounded-xl transition-all duration-200
      flex-col md:flex-row
      ${isActive 
        ? 'text-orange-500 md:bg-orange-600 md:text-white shadow-none md:shadow-lg md:shadow-orange-900/20 md:translate-x-1' 
        : 'text-zinc-500 md:text-zinc-400 hover:text-white md:hover:bg-zinc-900 md:hover:translate-x-1'}
    `}
  >
    <span className="w-5 h-5 flex items-center justify-center">{icon}</span>
    <span className="hidden md:inline">{label}</span>
    <span className="md:hidden mt-1 text-[9px] uppercase tracking-wider">{label.split(' ')[0]}</span> 
  </button>
);

export default function AdminSidebar({ activeTab, setActiveTab }) {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate('/login-admin');
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    }
  };

  return (
    <>

      <aside className="hidden md:flex w-64 bg-zinc-950 border-r border-white/10 flex-col h-screen sticky top-0 z-50">
        
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
        
        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          <NavItems activeTab={activeTab} setActiveTab={setActiveTab} />
        </nav>

        <div className="p-4 border-t border-white/10">
          <button 
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-3 px-4 py-3 text-xs font-bold text-red-500 hover:bg-red-500/10 rounded-xl transition-colors uppercase tracking-widest"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75" />
            </svg>
            Cerrar Sesión
          </button>
        </div>
      </aside>

      {/* DISEÑO MÓVIL (Barra Inferior)*/}
      <div className="md:hidden flex items-center justify-between p-4 bg-zinc-950 border-b border-white/10 sticky top-0 z-40">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 bg-orange-600 rounded flex items-center justify-center font-black text-black text-xs">
            A
          </div>
          <h1 className="text-xs font-black uppercase tracking-wider text-white">
            Admin Panel
          </h1>
        </div>
        <button onClick={handleLogout} className="text-zinc-500 hover:text-red-500">
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75" />
          </svg>
        </button>
      </div>

      <nav className="md:hidden fixed bottom-0 left-0 w-full bg-zinc-950 border-t border-white/10 z-50 px-2 pb-safe pt-1 flex justify-between items-center">
         <NavItems activeTab={activeTab} setActiveTab={setActiveTab} />
      </nav>

    </>
  );
}


const NavItems = ({ activeTab, setActiveTab }) => (
  <>
    <SidebarItem 
      id="resumen" 
      label="Resumen" 
      icon={
        <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 0 1 3 19.875v-6.75ZM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V8.625ZM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V4.125Z" />
        </svg>
      } 
      isActive={activeTab === 'resumen'} 
      onClick={setActiveTab} 
    />
    <SidebarItem 
      id="partidos" 
      label="Partidos" 
      icon={
        <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.362 5.214A8.252 8.252 0 0 1 12 21 8.25 8.25 0 0 1 6.038 7.047 8.287 8.287 0 0 0 9 9.601a8.983 8.983 0 0 1 3.361-6.867 8.21 8.21 0 0 0 3 2.48Z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 18a3.75 3.75 0 0 0 .495-7.468 5.99 5.99 0 0 0-1.925 3.547 5.975 5.975 0 0 1-2.133-1.001A3.75 3.75 0 0 0 12 18Z" />
        </svg>
      } 
      isActive={activeTab === 'partidos'} 
      onClick={setActiveTab} 
    />
    <SidebarItem 
      id="tabla" 
      label="Tabla" 
      icon={
        <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 18.75h-9m9 0a3 3 0 0 1 3 3h-15a3 3 0 0 1 3-3m9 0v-3.375c0-.621-.503-1.125-1.125-1.125h-.871M7.5 18.75v-3.375c0-.621.504-1.125 1.125-1.125h.872m5.007 0H9.497m5.007 0a7.454 7.454 0 0 1-.982-3.172M9.497 14.25a7.454 7.454 0 0 0 .981-3.172M5.25 4.236c-.982.143-1.954.317-2.916.52A6.003 6.003 0 0 0 7.73 9.728M5.25 4.236V4.5c0 2.108.966 3.99 2.48 5.228M5.25 4.236V2.721C7.456 2.41 9.71 2.25 12 2.25c2.291 0 4.545.16 6.75.47v1.516M7.73 9.728a6.726 6.726 0 0 0 2.748 1.35m8.272-6.842V4.5c0 2.108-.966 3.99-2.48 5.228m2.48-5.492a46.32 46.32 0 0 1 2.916.52 6.003 6.003 0 0 1-5.395 4.972m0 0a6.726 6.726 0 0 1-2.749 1.35m0 0a6.772 6.772 0 0 1-3.044 0" />
        </svg>
      } 
      isActive={activeTab === 'tabla'} 
      onClick={setActiveTab} 
    />
    <SidebarItem 
      id="novedades" 
      label="Noticias" 
      icon={
        <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 7.5h1.5m-1.5 3h1.5m-7.5 3h7.5m-7.5 3h7.5m3-9h3.375c.621 0 1.125.504 1.125 1.125V18a2.25 2.25 0 0 1-2.25 2.25M16.5 7.5V18a2.25 2.25 0 0 0 2.25 2.25h13.5M6 7.5h3v3H6v-3Z" />
        </svg>
      } 
      isActive={activeTab === 'novedades'} 
      onClick={setActiveTab} 
    />
  </>
);
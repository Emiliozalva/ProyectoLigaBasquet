import React, { useState } from 'react';
import AdminSidebar from '../components/shared/AdminSideBar'; // (o AdminSideBar dependiendo de tu archivo)
import AdminResumen from '../components/shared/AdminResumen';
import AdminPartidos from '../components/shared/AdminPartidos';
import AdminTabla from '../components/shared/AdminTabla';
import AdminNovedades from '../components/shared/AdminNovedades';
import AdminInstagram from '../components/shared/AdminInstagram'; // <-- 1. IMPORTAMOS EL NUEVO COMPONENTE

export default function Admin() {
  const [activeTab, setActiveTab] = useState('resumen');
  
  const [inscripcionesAbiertas, setInscripcionesAbiertas] = useState(false);
  
  const [novedades, setNovedades] = useState([
    { id: 1, titulo: "Final de Temporada", texto: "Lorem ipsum...", activa: true },
    { id: 2, titulo: "Nuevas Camisetas", texto: "Consectetur...", activa: true },
  ]);

  const [nextMatchData, setNextMatchData] = useState({
    titulo: "Fecha 5 - Fase de Grupos",
    fecha: "2026-01-20",
    hora: "14:00",
    cancha: "Polideportivo Central",
    linkMapa: "" 
  });

  const [partidos, setPartidos] = useState([]);
  const [tabla, setTabla] = useState([]);

  const [teams] = useState([
    { id: "1", nombre: "Los Toros", logo: "" },
    { id: "2", nombre: "Las Águilas", logo: "" },
    { id: "3", nombre: "Club Central", logo: "" },
    { id: "4", nombre: "Deportivo Norte", logo: "" }
  ]);

  return (
    <div className="min-h-screen bg-black text-zinc-100 font-sans flex flex-col md:flex-row">
      
      <AdminSidebar activeTab={activeTab} setActiveTab={setActiveTab} />

      <main className="flex-1 bg-black p-4 pb-24 md:p-8 lg:p-12 overflow-y-auto h-screen">
        <div className="max-w-5xl mx-auto">
          
          <header className="mb-8">
             <h2 className="text-3xl font-black uppercase tracking-tighter text-white">
               {activeTab === 'resumen' && "Vista General"}
               {activeTab === 'partidos' && "Gestión de Fechas"}
               {activeTab === 'tabla' && "Tabla del Torneo"}
               {activeTab === 'novedades' && "Editor de Novedades"}
               {activeTab === 'instagram' && "Publicaciones de Instagram"} {/* <-- 2. TÍTULO */}
             </h2>
             <p className="text-zinc-500 text-sm">Administración del sitio web</p>
          </header>

          {activeTab === 'resumen' && (
            <AdminResumen 
              inscripcionesAbiertas={inscripcionesAbiertas}
              setInscripcionesAbiertas={setInscripcionesAbiertas}
              stats={{ novedadesCount: novedades.length, equiposCount: tabla.length }}
            />
          )}
          
          {activeTab === 'partidos' && (
            <AdminPartidos 
              nextMatchData={nextMatchData}
              setNextMatchData={setNextMatchData}
              partidos={partidos}
              setPartidos={setPartidos}
              teams={teams} 
            />
          )}
          
          {activeTab === 'tabla' && (
            <AdminTabla tabla={tabla} setTabla={setTabla} />
          )}
          
          {activeTab === 'novedades' && (
            <AdminNovedades novedades={novedades} setNovedades={setNovedades} />
          )}

          {/* --- 3. RENDERIZAMOS EL COMPONENTE --- */}
          {activeTab === 'instagram' && (
            <AdminInstagram />
          )}
          
        </div>
      </main>

    </div>
  );
}
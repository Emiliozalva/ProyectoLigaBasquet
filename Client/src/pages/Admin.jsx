import React, { useState } from 'react';
import AdminSidebar from '../components/shared/AdminSideBar';
import AdminResumen from '../components/shared/AdminResumen';
import AdminPartidos from '../components/shared/AdminPartidos';
import AdminTabla from '../components/shared/AdminTabla';
import AdminNovedades from '../components/shared/AdminNovedades';

// 1. IMPORTAMOS EL MOCK DATA
import { teams, partidos as initialMatches, obtenerTablaGeneral } from '../data/mockDB.jsx';

export default function Admin() {
  const [activeTab, setActiveTab] = useState('resumen');
  
  const [inscripcionesAbiertas, setInscripcionesAbiertas] = useState(false);
  
  const [novedades, setNovedades] = useState([
    { id: 1, titulo: "Final de Temporada", texto: "Lorem ipsum...", activa: true },
    { id: 2, titulo: "Nuevas Camisetas", texto: "Consectetur...", activa: true },
  ]);

  // Estado para la "Próxima Fecha" (Cartel de Aviso)
  const [nextMatchData, setNextMatchData] = useState({
    titulo: "Fecha 5 - Fase de Grupos",
    fecha: "2026-01-20",
    hora: "14:00",
    cancha: "Polideportivo Central",
    linkMapa: "" 
  });

  // 2. ESTADO PARA PARTIDOS (Inicializado con el Mock)
  // Agregamos un campo 'finalizado' localmente para manejar la UI, 
  // ya que el mock de partidos solo tiene scores.
  const [partidos, setPartidos] = useState(
    initialMatches.map(m => ({ ...m, finalizado: false }))
  );

  // 3. ESTADO PARA TABLA (Calculado con la función del mock)
  // Nota: Si quieres editarla manualmente, usa useState. 
  // Si quieres que sea automática basada en el mock, usa la función.
  const [tabla, setTabla] = useState(obtenerTablaGeneral());

  return (
    <div className="min-h-screen bg-black text-zinc-100 font-sans flex flex-col md:flex-row">
      
      <AdminSidebar activeTab={activeTab} setActiveTab={setActiveTab} />

      <main className="flex-1 bg-black p-4 md:p-8 lg:p-12 overflow-y-auto h-screen">
        <div className="max-w-5xl mx-auto">
          
          <header className="mb-8">
             <h2 className="text-3xl font-black uppercase tracking-tighter text-white">
               {activeTab === 'resumen' && "Vista General"}
               {activeTab === 'partidos' && "Gestión de Fechas"}
               {activeTab === 'tabla' && "Tabla del Torneo"}
               {activeTab === 'novedades' && "Editor de Novedades"}
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
              teams={teams} // <--- PASAMOS LA LISTA DE EQUIPOS (Lookup)
            />
          )}
          
          {activeTab === 'tabla' && (
            <AdminTabla tabla={tabla} setTabla={setTabla} />
          )}
          
          {activeTab === 'novedades' && (
            <AdminNovedades novedades={novedades} setNovedades={setNovedades} />
          )}
          
        </div>
      </main>

    </div>
  );
}
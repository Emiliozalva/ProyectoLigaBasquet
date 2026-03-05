import React, { useState, useEffect } from 'react';
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase/config';

export default function Inscripciones() {
  const [abiertas, setAbiertas] = useState(false);
  const [cargando, setCargando] = useState(true);
  
  const [linkWhatsApp, setLinkWhatsApp] = useState(""); 

  useEffect(() => {
    const docRef = doc(db, "configuracion", "inscripciones");

    const unsubscribe = onSnapshot(docRef, (docSnap) => {
      if (docSnap.exists()) {
        const data = docSnap.data();
        setAbiertas(data.abiertas || false);
        setLinkWhatsApp(data.link || ""); 
      } else {
        setAbiertas(false);
        setLinkWhatsApp("");
      }
      setCargando(false);
    }, (error) => {
      console.error("Error al escuchar inscripciones:", error);
      setCargando(false);
    });

    return () => unsubscribe();
  }, []);

  return (
    <div className="pt-32 px-6 max-w-4xl mx-auto pb-20">
      
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tighter text-white">
          Inscripción a la <span className="text-orange-600">Proxima Fecha</span>
        </h1>
      </div>

      {cargando ? (
        <div className="flex justify-center items-center h-40">
          <p className="text-zinc-500 font-bold uppercase tracking-widest animate-pulse">
            Verificando estado...
          </p>
        </div>
      ) : abiertas ? (
        
        /* --- VISTA: INSCRIPCIONES ABIERTAS --- */
        <div className="bg-zinc-950/50 border border-zinc-800 rounded-md p-6 md:p-10 shadow-2xl animate-in fade-in slide-in-from-bottom-4 duration-500">
          
          <div className="flex flex-col items-center justify-center gap-3 mb-8 text-center">
            <h2 className="text-2xl md:text-3xl font-black uppercase tracking-wide text-white">Inscripciones Abiertas</h2>
          </div>
          
          <div className="space-y-8 text-zinc-300">
            <p className="text-center text-sm md:text-base max-w-2xl mx-auto">
              Para inscribir a tu equipo en la próxima temporada, el proceso se realiza directamente con la administración de la liga.
            </p>
            
            <div className="bg-black border border-zinc-800 rounded-sm p-6 md:p-8 max-w-2xl mx-auto">
              <h3 className="text-orange-500 font-bold uppercase tracking-widest mb-4 text-xs text-center">Pasos a seguir</h3>
              <ol className="list-decimal list-inside space-y-4 font-medium text-white text-sm md:text-base">
                <li className="pl-2">Haz clic en el botón de abajo para acceder al formulario o iniciar la conversación.</li>
                <li className="pl-2">Envíanos el nombre de tu equipo y del delegado responsable.</li>
                <li className="pl-2">Te enviaremos los métodos de pago disponibles y el reglamento.</li>
                <li className="pl-2">Una vez confirmado el pago, se les asignará el cupo oficial.</li>
              </ol>
            </div>

            <div className="pt-4 flex justify-center">
              <a 
                href={linkWhatsApp || "#"} 
                target={linkWhatsApp ? "_blank" : "_self"}
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center w-full md:w-auto px-10 py-4 bg-orange-600 hover:bg-orange-500 text-white font-black uppercase tracking-widest rounded-sm transition-all shadow-lg hover:shadow-orange-600/20 border border-orange-500 hover:border-orange-400"
              >
                INSCRIBITE
              </a>
            </div>
          </div>
        </div>

      ) : (
        
        /* --- VISTA: INSCRIPCIONES CERRADAS --- */
        <div className="bg-zinc-950/50 border border-zinc-800 rounded-md p-10 md:p-12 text-center shadow-xl animate-in fade-in duration-500 mt-10 max-w-2xl mx-auto">
          <div className="w-16 h-16 bg-black border border-zinc-800 rounded-sm mx-auto flex items-center justify-center mb-6">
            <svg className="w-8 h-8 text-zinc-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
          <h2 className="text-xl md:text-2xl font-black uppercase tracking-wide text-white mb-4">
            Cupos Completos
          </h2>
          <p className="text-zinc-400 text-sm md:text-base">
            Las inscripciones no están abiertas en este momento. Los cupos para el torneo actual ya se encuentran cubiertos. Mantente atento a nuestras novedades para la próxima temporada.
          </p>
        </div>
      )}

    </div>
  );
}
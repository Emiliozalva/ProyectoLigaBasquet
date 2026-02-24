import React, { useState, useEffect } from 'react';
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase/config';

export default function Inscripciones() {
  const [abiertas, setAbiertas] = useState(false);
  const [cargando, setCargando] = useState(true);

  const linkWhatsApp = ""; 

  useEffect(() => {
    const docRef = doc(db, "configuracion", "inscripciones");

    const unsubscribe = onSnapshot(docRef, (docSnap) => {
      if (docSnap.exists() && docSnap.data().abiertas) {
        setAbiertas(true);
      } else {
        setAbiertas(false);
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
          Inscripción al <span className="text-orange-600">Torneo</span>
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
            <div className="flex items-center justify-center gap-2">
            </div>
            <h2 className="text-2xl md:text-3xl font-black uppercase tracking-wide text-white">Inscripciones Abiertas</h2>
          </div>
          
          <div className="space-y-8 text-zinc-300">
            <p className="text-center text-sm md:text-base max-w-2xl mx-auto">
              Para inscribir a tu equipo en la próxima temporada, el proceso se realiza a través de WhatsApp directamente con la administración de la liga.
            </p>
            
            <div className="bg-black border border-zinc-800 rounded-sm p-6 md:p-8 max-w-2xl mx-auto">
              <h3 className="text-orange-500 font-bold uppercase tracking-widest mb-4 text-xs text-center">Pasos a seguir</h3>
              <ol className="list-decimal list-inside space-y-4 font-medium text-white text-sm md:text-base">
                <li className="pl-2">Haz clic en el botón de abajo para iniciar la conversación.</li>
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
                <svg className="w-5 h-5 mr-3" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                Envianos un WhatsApp
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
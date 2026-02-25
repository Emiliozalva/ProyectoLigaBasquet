import React, { useState, useEffect } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase/config";

export default function NextMatchCard() {
  const [isVisible, setIsVisible] = useState(true);
  
  const [datosFecha, setDatosFecha] = useState({
    dia: "A confirmar",
    hora: "",
    lugar: "Cancha a definir",
    linkMaps: ""
  });

  useEffect(() => {
    const obtenerFecha = async () => {
      try {
        const docRef = doc(db, "configuracion", "proxima_fecha");
        const docSnap = await getDoc(docRef);
        
        if (docSnap.exists()) {
          setDatosFecha(docSnap.data());
        }
      } catch (error) {
        console.error("Error al obtener la próxima fecha:", error);
      }
    };

    obtenerFecha();
  }, []);

  if (!isVisible) return null;

  return (
    <div className="
      fixed bottom-6 left-6 
      z-50
      w-auto 
      min-w-[140px] 
      bg-zinc-950
      text-white 
      shadow-[0_5px_15px_rgba(0,0,0,0.8)]
      border border-zinc-800
      p-1
      animate-in fade-in slide-in-from-bottom-4 duration-500
    ">
      
      <button 
        onClick={() => setIsVisible(false)}
        className="
          absolute top-1.5 right-1.5
          z-20
          text-zinc-600 hover:text-zinc-200
          transition-colors duration-200
          cursor-pointer
        "
        aria-label="Cerrar"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>

      <div className="
        w-full h-full 
        px-3 py-2
        border-x-[1.5px] border-dashed border-white/25
      ">
        
        <h3 className="mb-0.5 text-[8px] font-black uppercase tracking-[0.15em] text-zinc-500">
          Próxima Fecha
        </h3>
        
        <p className="text-sm font-bold leading-none tracking-tight text-white uppercase flex flex-col gap-1 mt-1.5">
          <span>{datosFecha.dia}</span>
          {/* Solo mostramos la hora si el admin escribió algo */}
          {datosFecha.hora && (
            <span className="text-[10px] text-zinc-400">{datosFecha.hora}</span>
          )}
        </p>
        
        <div className="w-full h-px bg-white/10 my-1.5"></div>

        {datosFecha.linkMaps ? (
          <a 
            href={datosFecha.linkMaps} 
            target="_blank" 
            rel="noopener noreferrer"
            className="group flex items-center gap-1.5 text-[10px] font-medium text-zinc-400 hover:text-orange-500 transition-colors"
          >
            <span className="text-orange-500 text-[10px]">📍</span>
            <span className="uppercase tracking-wide group-hover:underline decoration-zinc-700 underline-offset-2">
              {datosFecha.lugar}
            </span>
          </a>
        ) : (
          <div className="flex items-center gap-1.5 text-[10px] font-medium text-zinc-400">
            <span className="text-orange-500 text-[10px]">📍</span>
            <span className="uppercase tracking-wide">
              {datosFecha.lugar}
            </span>
          </div>
        )}

      </div>
    </div>
  );
}
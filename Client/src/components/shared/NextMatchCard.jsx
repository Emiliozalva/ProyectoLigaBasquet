import React, { useState } from "react"

export default function NextMatchCard() {
  const [isVisible, setIsVisible] = useState(true);

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
        
        <p className="text-sm font-bold leading-none tracking-tight text-white uppercase">
          Sáb 01/01
        </p>
        
        <div className="w-full h-px bg-white/10 my-1.5"></div>

        <a 
          href="https://www.google.com/maps/search/?api=1&query=Plaza+Candioti" 
          target="_blank" 
          rel="noopener noreferrer"
          className="group flex items-center gap-1.5 text-[10px] font-medium text-zinc-400 hover:text-orange-500 transition-colors"
        >
          <span className="text-orange-500 text-[10px]">📍</span>
          <span className="uppercase tracking-wide group-hover:underline decoration-zinc-700 underline-offset-2">
            PLAZA CANDIOTI
          </span>
        </a>

      </div>
    </div>
  )
}
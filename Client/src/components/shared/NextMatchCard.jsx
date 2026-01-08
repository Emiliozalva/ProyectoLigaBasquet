import React from "react"

export default function NextMatchCard(){
    return(<div className="
      fixed bottom-6 left-6 z-40 
      w-auto min-w-[180px] 
      rounded-xl 
      border border-white/10 
      bg-gray-900/95 backdrop-blur-sm 
      p-4 
      text-white 
      shadow-xl
    ">
      
      <h3 className="mb-1 text-[10px] font-bold uppercase tracking-wider text-gray-400">
        PRÓXIMA FECHA:
      </h3>
      
      <p className="mb-2 text-base font-bold leading-tight">
        Sábado 01/01/2026
      </p>
      <a 
        href="https://www.google.com/maps/search/?api=1&query=Plaza+Candioti" 
        target="_blank" 
        rel="noopener noreferrer"
        className="flex items-center gap-1.5 text-xs font-medium text-gray-300 hover:text-blue-300 transition-colors"
      >
        <span className="text-sm">📍</span>
        <span className="underline decoration-gray-500/50 underline-offset-2">Plaza Candioti</span>
      </a>

    </div>
    )
}
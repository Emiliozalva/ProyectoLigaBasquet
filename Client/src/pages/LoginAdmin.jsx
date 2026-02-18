import React from "react";
import { Link } from "react-router-dom";

export default function LoginAdmin() {
  return (
    <div className="min-h-screen bg-black flex flex-col justify-center items-center p-4 selection:bg-orange-500 selection:text-white font-sans">
      
      {/* Botón para volver al inicio */}
      <Link 
        to="/" 
        className="absolute top-8 left-8 text-zinc-500 hover:text-white flex items-center gap-2 text-sm font-bold uppercase transition-colors"
      >
        <span>←</span> Volver al inicio
      </Link>

      {/* Tarjeta de Login */}
      <div className="w-full max-w-md bg-zinc-900 border border-zinc-800 rounded-2xl p-8 shadow-2xl relative overflow-hidden">
        
        {/* Detalle visual superior */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-orange-600 to-orange-400"></div>

        {/* Encabezado */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-black uppercase tracking-tighter text-white mb-2">
            Panel <span className="text-orange-600">Admin</span>
          </h2>
          <p className="text-zinc-500 text-sm">
            Ingresar credenciales.
          </p>
        </div>

        <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
          
          
          <div>
            <label className="block text-xs font-bold text-zinc-400 uppercase tracking-wider mb-2">
              Usuario
            </label>
            <input 
              type="Usuario" 
              placeholder="admin@cuartocuarto.com"
              className="w-full bg-black border border-zinc-800 text-white rounded-lg p-3 focus:border-orange-500 focus:ring-1 focus:ring-orange-500 outline-none transition-all"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-zinc-400 uppercase tracking-wider mb-2">
              Contraseña
            </label>
            <input 
              type="password" 
              placeholder="••••••••"
              className="w-full bg-black border border-zinc-800 text-white rounded-lg p-3 focus:border-orange-500 focus:ring-1 focus:ring-orange-500 outline-none transition-all"
            />
          </div>

          {/* Botón de Ingreso */}
          <button 
            type="submit"
            className="w-full bg-orange-600 hover:bg-orange-500 text-white font-black uppercase tracking-widest py-3 rounded-lg mt-4 transition-colors"
          >
            Ingresar
          </button>
        </form>



      </div>
    </div>
  );
}
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/config";

export default function LoginAdmin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [cargando, setCargando] = useState(false);
  
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setCargando(true);

    try {
      await signInWithEmailAndPassword(auth, email, password);
      
      navigate('/admin');
    } catch (err) {
      console.error("Error al iniciar sesión:", err);
      setError('Credenciales incorrectas. Verifica tu usuario y contraseña.');
    } finally {
      setCargando(false);
    }
  };

  return (
    <div className="min-h-screen bg-black flex flex-col justify-center items-center p-4 selection:bg-orange-500 selection:text-white font-sans">
      
      <Link 
        to="/" 
        className="absolute top-8 left-8 text-zinc-500 hover:text-white flex items-center gap-2 text-sm font-bold uppercase transition-colors"
      >
        <span>←</span> Volver al inicio
      </Link>

      <div className="w-full max-w-md bg-zinc-900 border border-zinc-800 rounded-2xl p-8 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-orange-600 to-orange-400"></div>
        
        <div className="text-center mb-8">
          <h2 className="text-3xl font-black uppercase tracking-tighter text-white mb-2">
            Panel <span className="text-orange-600">Admin</span>
          </h2>
          <p className="text-zinc-500 text-sm">
            Ingresar credenciales.
          </p>
        </div>

        {/* Mensaje de error si se equivocan en la clave */}
        {error && (
          <div className="bg-red-500/10 border border-red-500/50 text-red-500 text-sm font-bold p-3 rounded-lg mb-6 text-center">
            {error}
          </div>
        )}

        <form className="space-y-5" onSubmit={handleLogin}>
          <div>
            <label className="block text-xs font-bold text-zinc-400 uppercase tracking-wider mb-2">
              Usuario
            </label>
            <input 
              type="email" 
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full bg-black border border-zinc-800 text-white rounded-lg p-3 focus:border-orange-500 focus:ring-1 focus:ring-orange-500 outline-none transition-all"
            />
          </div>

          <button 
            type="submit"
            disabled={cargando}
            className={`w-full font-black uppercase tracking-widest py-3 rounded-lg mt-4 transition-colors ${
              cargando 
                ? 'bg-zinc-800 text-zinc-500 cursor-not-allowed' 
                : 'bg-orange-600 hover:bg-orange-500 text-white'
            }`}
          >
            {cargando ? 'Cargando...' : 'Ingresar'}
          </button>
        </form>

      </div>
    </div>
  );
}
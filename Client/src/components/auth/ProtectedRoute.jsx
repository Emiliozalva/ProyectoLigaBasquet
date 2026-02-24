import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../../firebase/config';

export default function ProtectedRoute({ children }) {
  const [user, setUser] = useState(null);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setCargando(false);
    });

    return () => unsubscribe();
  }, []);

  if (cargando) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <p className="text-orange-500 font-bold uppercase tracking-widest animate-pulse">
          Verificando credenciales...
        </p>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login-admin" />;
  }

  return children;
}
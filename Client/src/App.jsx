import React, { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import PublicLayout from './layouts/PublicLayout';
import ProtectedRoute from './components/auth/ProtectedRoute';
const Home = lazy(() => import('./pages/Home'));
const Torneo = lazy(() => import('./pages/Torneo'));
const Inscripciones = lazy(() => import('./pages/Inscripciones'));
const Galeria = lazy(() => import('./pages/Galeria'));
const AboutUsPage = lazy(() => import('./pages/AboutUsPage'));
const Admin = lazy(() => import('./pages/Admin'));
const LoginAdmin = lazy(() => import('./pages/LoginAdmin'));

function App() {
  return (
    <Suspense 
      fallback={
        <div className="min-h-screen bg-black flex items-center justify-center">
          <div className="w-10 h-10 border-4 border-zinc-800 border-t-orange-500 rounded-full animate-spin"></div>
        </div>
      }
    >
      <Routes>
        <Route path="/" element={<PublicLayout />}>
          <Route index element={<Home />} />
          <Route path="torneo" element={<Torneo />} />
          <Route path="galeria" element={<Galeria />} />
          <Route path="aboutUs" element={<AboutUsPage />} />
          <Route path="inscripciones" element={<Inscripciones />} />
        </Route>

        <Route path="/login-admin" element={<LoginAdmin/>}/>
        <Route 
          path="/admin" 
          element={
            <ProtectedRoute>
              <Admin />
            </ProtectedRoute>
          } 
        />
      </Routes>
    </Suspense>
  );
}

export default App;
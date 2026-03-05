import { Routes, Route } from 'react-router-dom'
import PublicLayout from './layouts/PublicLayout'
import Home from './pages/Home'
import Torneo from './pages/Torneo'   
import Inscripciones from './pages/Inscripciones';
import Galeria from './pages/Galeria' 
import Admin from './pages/Admin'
import LoginAdmin from './pages/LoginAdmin'
import ProtectedRoute from './components/auth/ProtectedRoute';
import InstagramFeed from './components/shared/InstagramFeed';
import AboutUsPage from './pages/AboutUsPage';

function App() {
  return (
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
      {/*RECORDAR QUITAR !!!!!!!!!!!!!!!!!!!!!!!!!!!!!! */}
      <Route 
        path="/demo-instagram" 
        element={
          <div className="min-h-screen bg-black flex items-center justify-center p-4 md:p-8">
            <div className="max-w-5xl w-full">
              <InstagramFeed />
            </div>
          </div>
        } 
      />{/*RECORDAR QUITAR !!!!!!!!!!!!!!!!!!!!!!!!!!!!!! */}
    </Routes>
  )
}

export default App
import { Routes, Route } from 'react-router-dom'
import PublicLayout from './layouts/PublicLayout'
import Home from './pages/Home'
import Torneo from './pages/Torneo'   
import Inscripciones from './pages/Inscripciones';
import Galeria from './pages/Galeria' 
import Admin from './pages/Admin'
import LoginAdmin from './pages/LoginAdmin'
import ProtectedRoute from './components/auth/ProtectedRoute';

function App() {
  return (
    <Routes>
      <Route path="/" element={<PublicLayout />}>
        <Route index element={<Home />} />
        <Route path="torneo" element={<Torneo />} />
        <Route path="galeria" element={<Galeria />} />
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
  )
}

export default App
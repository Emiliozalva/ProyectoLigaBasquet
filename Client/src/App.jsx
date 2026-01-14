import { Routes, Route } from 'react-router-dom'
import PublicLayout from './layouts/PublicLayout'
import Home from './pages/Home'
import Torneo from './pages/Torneo'   
import Galeria from './pages/Galeria' 
import Admin from './pages/Admin'

function App() {
  return (
    <Routes>
      <Route path="/" element={<PublicLayout />}>
        
        
        <Route index element={<Home />} />
        <Route path="torneo" element={<Torneo />} />
        <Route path="galeria" element={<Galeria />} />

      </Route>
      <Route path="/admin" element={<Admin />} />
    </Routes>
  )
}

export default App
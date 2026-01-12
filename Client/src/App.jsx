import { Routes, Route } from 'react-router-dom'
import PublicLayout from './layouts/PublicLayout'
import Home from './pages/Home'
import Torneo from './pages/Torneo'   // <--- Nueva importación
import Galeria from './pages/Galeria' // <--- Nueva importación

function App() {
  return (
    <Routes>
      <Route path="/" element={<PublicLayout />}>
        
        
        <Route index element={<Home />} />
        <Route path="torneo" element={<Torneo />} />
        <Route path="galeria" element={<Galeria />} />

      </Route>
    </Routes>
  )
}

export default App
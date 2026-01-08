import { Routes, Route } from 'react-router-dom'
import PublicLayout from './layouts/PublicLayout'
import Home from './pages/Home' // <--- Importamos la página que creamos

function App() {
  return (
    <Routes>

      <Route path="/" element={<PublicLayout />}>
        
        <Route index element={<Home />} />
        
      </Route>
    </Routes>
  )
}

export default App
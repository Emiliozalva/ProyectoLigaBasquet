import './App.css'
import { Navbar } from './components/shared/Navbar.jsx'
import NextMatchCard from './components/shared/NextMatchCard.jsx'
import MatchesCarousel from './components/shared/MatchesCarousel.jsx'

function App() {
  return (
    <div className="min-h-screen bg-gray-900">
       <Navbar/>
       <NextMatchCard/>
       <div className="pt-24">
          <MatchesCarousel />
       </div>
    </div>

  )
}

export default App

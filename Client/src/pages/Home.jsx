import React from 'react'
import NextMatchCard from '../components/shared/NextMatchCard'
import MatchesCarousel from '../components/shared/MatchesCarousel'
import HeroAnimation from '../components/ui/HeroAnimation'

const Home = () => {
  return (
    <div className="pb-10">
      <HeroAnimation />
      <div className="space-y-8 mt-8">
        <div className="relative z-10">
           <NextMatchCard />
        </div>
        <div className="container mx-auto px-4">
           <MatchesCarousel />
        </div>
      </div>
    </div>
  )
}

export default Home
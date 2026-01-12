import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import NextMatchCard from '../components/shared/NextMatchCard'
import HeroAnimation from '../components/ui/HeroAnimation'
import Sponsors from '../components/shared/Sponsors'
import AboutUs2 from '../components/shared/AboutUs2'


const Home = () => {
  const location = useLocation();

  useEffect(() => {
    if (location.hash === '#about') {
      const section = document.getElementById('about');
      if (section) {
        setTimeout(() => { 
          section.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    }
  }, [location]);
  return (
    <div className="w-full bg-zinc-950">
      <NextMatchCard />
      <HeroAnimation />
      <div className="w-full">
        <AboutUs2/>
        <Sponsors/>
        
      </div>

    </div>
  )
}

export default Home
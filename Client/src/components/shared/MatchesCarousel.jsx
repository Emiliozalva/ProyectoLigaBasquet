import React, { useState, useEffect } from 'react';
import CardMatch from '../ui/CardMatch'; 
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../firebase/config'; 

export default function MatchesCarousel() {
  const [partidos, setPartidos] = useState([]);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    const obtenerPartidos = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "partidos"));
        const partidosData = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setPartidos(partidosData);
      } catch (error) {
        console.error("Error al obtener los partidos:", error);
      } finally {
        setCargando(false);
      }
    };

    obtenerPartidos();
  }, []);

  if (cargando || partidos.length === 0) return null;

  const partidosInfinitos = [...partidos, ...partidos];

  return (
    <section className="w-full overflow-hidden bg-transparent"> 
      
      <style>{`
        @keyframes slide {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        .animate-slide {
          animation: slide 10s linear infinite;
        }
      `}</style>

      <div className="carousel-container relative w-full py-4">
        <div className="flex w-max gap-4 animate-slide px-4">
          
          {partidosInfinitos.map((partido, index) => (
            <CardMatch
              key={`${partido.id}-${index}`} 
              teamA={partido.equipoA}
              logoA={""} 
              scoreA={partido.resultadoA}
              teamB={partido.equipoB}
              logoB={""} 
              scoreB={partido.resultadoB}
              fecha={partido.numeroFecha} 
            />
          ))}
          
        </div>
      </div>
    </section>
  );
}
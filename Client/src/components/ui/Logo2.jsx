import React from "react";
import { Link } from "react-router-dom";
import Logo2 from "../../assets/Logo2CuartoCuartoWhite.png"; 

export default function Logo({ className }) { 
  return (
    <Link to="/" className={`block ${className || ""}`}>
       <img 
         src={Logo2} 
         alt="Logo Liga Basquet" 
         className="h-10 w-auto transition-transform duration-300 hover:scale-105"
       />
    </Link>
  );
}
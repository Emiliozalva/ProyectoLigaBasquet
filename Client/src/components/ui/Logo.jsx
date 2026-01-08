import React from "react";
import { Link } from "react-router-dom";
import LogoWhite from "../../assets/LogoCuartoCuartoWhite.png"; 

export default function Logo({ className }) { 
  return (
    <Link to="/" className={`block ${className || ""}`}>
       <img 
         src={LogoWhite} 
         alt="Logo Liga Basquet" 
         className="h-12 w-auto transition-transform duration-300 hover:scale-105"
       />
    </Link>
  );
}
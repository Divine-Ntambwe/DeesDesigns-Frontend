import React, { useState } from 'react'
import { createContext } from 'react';
import {dotenv} from 'dotenv'
export const appContext = createContext();


function AppContext({children}) {
  //  const url = import.meta.env.VITE_ELASTIC_IP;
   const fullUrl = new URL(window.location);
   const ip = fullUrl.searchParams.get('ip') || localStorage.getItem("ip");
   localStorage.setItem("ip",ip);
   const url = `http://${ip}:5000`;
   window.history.pushState({}, '', fullUrl); // Updates URL without reloading

   function handleOpenCart(cart){
    cart.style.display = "flex"
   }

  return (
    <div>

        <appContext.Provider  value={{handleOpenCart,url}}>
                {children}
        </appContext.Provider>
        
    </div>
    
    
  )
}

export default AppContext
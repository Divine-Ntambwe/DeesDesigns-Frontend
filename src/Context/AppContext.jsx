import React, { useState } from 'react'
import { createContext } from 'react';
import {dotenv} from 'dotenv'
export const appContext = createContext();


function AppContext({children}) {
   const url = import.meta.env.VITE_ELASTIC_IP;

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
import React, { useState } from 'react'
import { createContext } from 'react';
export const appContext = createContext();


function AppContext({children}) {
   const url = "http://localhost:5000"

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
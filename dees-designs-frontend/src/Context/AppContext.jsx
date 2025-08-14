import React, { useState } from 'react'
import { createContext } from 'react';
export const appContext = createContext();


function AppContext({children}) {
  

   function handleOpenCart(cart){
    cart.style.display = "flex"
   }

  return (
    <div>

        <appContext.Provider  value={{handleOpenCart}}>
                {children}
        </appContext.Provider>
        
    </div>
    
    
  )
}

export default AppContext
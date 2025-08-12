import React, { useState } from 'react'
import { createContext } from 'react';
export const appContext = createContext();


function AppContext({children}) {
    console.log(children)
    const [isA,setIsAuthenticated] = useState("check2");
    const [check,setCheck] = useState("checking");

  return (
    <div>

        <appContext.Provider  value={{check,isA,setCheck}}>
                {children}

            
        </appContext.Provider>
        
    </div>
    
    
  )
}

export default AppContext
import React,{useEffect, useState} from 'react'
import { createContext } from 'react'
export const themeContext = createContext() 

function ThemeContext({children}) {

    const [theme,setTheme] = useState(localStorage.getItem("theme")||"light"); 
    const root = document.querySelector(':root');
    const [colorBW,setColorBW] = useState(theme === "light"?"black":"white")

    useEffect(()=>{
      document.querySelector("*").classList.toggle("transition")
      if (theme === "light"){
        root.style.setProperty("--background-color1","#f1f1f1");
        root.style.setProperty("--text-color2","black");
        root.style.setProperty("--skeleton-color","grey.900");
       
          
    } else {
        root.style.setProperty("--background-color1","black");
        root.style.setProperty("--text-color2","white");
        root.style.setProperty("--skeleton-color","grey.900");
        
    }

    },[theme])
    
  return (
    <div>
        <themeContext.Provider value={{setTheme,colorBW,theme,setColorBW}}>
        {children}
     </themeContext.Provider>
    </div>
  
  )
}

export default ThemeContext
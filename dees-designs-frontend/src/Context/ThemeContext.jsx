import React,{useState} from 'react'
import { createContext } from 'react'
export const themeContext = createContext() 

function ThemeContext({children}) {

    const [theme,setTheme] = useState(localStorage.getItem("theme")||"dark");
    console.log(theme)  
    const root = document.querySelector(':root');
    const [colorBW,setColorBW] = useState(theme === "light"?"black":"white")


    if (theme === "light"){
        root.style.setProperty("--background-color1","#f1f1f1");
        root.style.setProperty("--text-color2","black");
        root.style.setProperty("background-color3","#f09ff6");
       
          
    } else {
        root.style.setProperty("--background-color1","black");
        root.style.setProperty("--text-color2","white");
        root.style.setProperty("background-color3","#6a04a5");
        
    }

  return (
    <div>
        <themeContext.Provider value={{setTheme,colorBW,theme,setColorBW}}>
        {children}
     </themeContext.Provider>
    </div>
  
  )
}

export default ThemeContext
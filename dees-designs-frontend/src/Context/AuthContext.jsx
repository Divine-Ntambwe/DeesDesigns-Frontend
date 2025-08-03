import React,{createContext,useState} from 'react'
const Authentication = createContext()

export function AuthContext() {
    const [isAuthenticated,setIsAuthenticated] = useState()
  return (
   <></>
  )
}

export default AuthContext
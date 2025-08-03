import React, { useContext, useEffect } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { Authentication } from '../App'

function SplashScreen() {
  const {isAuthenticated} = useContext(Authentication);
  const nav = useNavigate();

  useEffect(()=>{

    if (isAuthenticated === true){
      nav("/Home")
    }
  },[])

  
  return (
<>
  { !isAuthenticated && <div className='splash-screen'>
      <div id="splash-navbar">
        <h1>Dees Designs</h1>
        <p></p>
        
        <Link to="/customerSignup"><button>Sign Up</button></Link>
      </div>
      <div id="splash-imgs">
        <img src="fa884148afd79d442edbc9d620c1509a-removebg-preview (1).png"/>
      
      </div> 
    </div>}
    </>
  )
}

export default SplashScreen
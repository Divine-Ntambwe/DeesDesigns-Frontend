import React from 'react'
import { Link } from 'react-router-dom'

function SplashScreen() {
  return (
    <div className='splash-screen'>
      <div id="splash-navbar">
        <h1>Dees Designs</h1>
        <p></p>
        
        <Link to="/custSignup"><button>Sign Up</button></Link>
      </div>
      <div id="splash-imgs">
        <img src="fa884148afd79d442edbc9d620c1509a-removebg-preview (1).png"/>
      
      </div>
    </div>
  )
}

export default SplashScreen
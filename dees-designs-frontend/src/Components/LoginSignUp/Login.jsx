import React from 'react'
import { useState } from 'react';
import useFetch from '../../useFetch';
import { Link,useNavigate } from 'react-router-dom';

function Login() {
    const [isDesigner,setIsDesigner] = useState(false),
    [email,setEmail] = useState(""),
    [password,setPassword] = useState("")
  
    const {post:postLogin,loading,data} = useFetch("http://localhost:5000/userLogin");
    const nav = useNavigate()

    function handleLogin(e){
      
      e.preventDefault();
      const creds = {email,password,isDesigner};
      
      postLogin(creds,()=>{
      
      nav("/")
      })
      
     
      
    }
  return (
    <div className='Login loginSignUp'>
        <div className='form-container'>
          <h2>Log In</h2>
          {data && <p className='cred-error'>{data.error}</p>}
          <form onSubmit={handleLogin}>  

            <label>Email:</label>
            <input required type='email' onChange={(e)=> setEmail(e.target.value)}/>  

            <label>Password:</label>
            <input required type='password' onChange={(e)=> setPassword(e.target.value)}/>  

            <div className='gender'>
             
              <input type="checkbox" onChange={(e)=> setIsDesigner(true)}/>
              <label>Are you a designer?</label>
              </div>
  
            <input className="submit button"type="submit" value="Log In"/>
          </form>
          
          <p className='login-signup-link'>Already Have An Account?<Link to="/">Log In</Link></p>
          <p className='login-signup-link'><Link to="/">Sign Up as a designer?</Link></p>
          
        </div>
    </div>
  )
}

export default Login
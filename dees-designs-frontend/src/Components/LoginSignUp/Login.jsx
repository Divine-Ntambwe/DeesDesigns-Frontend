import React from 'react'
import { useState,useContext } from 'react';
import useFetch from '../../useFetch';
import { Link,useNavigate } from 'react-router-dom';
import { Authentication } from '../../App';
import Button from '@mui/material/Button';

function Login() {
    const [isDesigner,setIsDesigner] = useState(false),
    [email,setEmail] = useState(""),
    [password,setPassword] = useState("");
   const navigate = useNavigate();

    
    const {setIsAuthenticated,setRole} = useContext(Authentication);
  
    const {post:postLogin,loading,data,error} = useFetch("http://localhost:5000/userLogin");
   

    function handleLogin(e){   
      e.preventDefault();
      const creds = {email,password,isDesigner};
      
      postLogin(creds,(d)=>{
        setIsAuthenticated(true);
        setRole(isDesigner?"designer":"customer");
        localStorage.setItem("userDetails",d.userId);
        localStorage.setItem("role",isDesigner?"designer":"customer");

        if (isDesigner === true){
          navigate("/DesignersHome")
        } else {
          navigate("/Home");
        }
        
      })   
    }


  return (
    <>
   
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
             
              <input type="checkbox" onChange={(e)=> setIsDesigner(!isDesigner)}/>
              <label>Are you a designer?</label>
              </div>
  
            <input className="submit button"type="submit" value="Log In"/>
          </form>
          
          <p className='login-signup-link'>Don't Have An Account?<Link to="/CustomerSignUp"> Sign Up as Customer?</Link></p>
          <p className='login-signup-link'><Link to="/DesignerSignUp">Sign Up as a Designer?</Link></p>
          
        </div>
    </div>
    </>
  )
}

export default Login
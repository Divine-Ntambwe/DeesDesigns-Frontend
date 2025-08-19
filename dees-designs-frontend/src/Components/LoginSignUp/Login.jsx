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

    
    const {setIsAuthenticated,setRole,setUserDetails,setAuthCred,authCred,userDetails} = useContext(Authentication);
  
    const {post:postLogin,loading,data,error} = useFetch("/userLogin");
   

    function handleLogin(e){   
      e.preventDefault();
      const creds = {email,password,isDesigner};
      
      postLogin(creds,(d)=>{
        delete d.message
        setIsAuthenticated(true);
        setRole(isDesigner?"designer":"customer");
        setUserDetails(d);

        const {email,password} = d;
        setAuthCred(btoa(`${email}:${password}`));

        localStorage.setItem("userDetails",JSON.stringify(d));
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
          {error && <p className='cred-error'>Network Error Please Refresh Or Try Again Later</p>}
          <form onSubmit={handleLogin}>  

            <label>Email:</label>
            <input required type='email' onChange={(e)=> setEmail(e.target.value)}/>  

            <label>Password:</label>
            <input required type='password' onChange={(e)=> setPassword(e.target.value)}/>  

            <div className='gender'>
             
              <input type="checkbox" onChange={(e)=> setIsDesigner(!isDesigner)}/>
              <label>Are you a designer?</label>
              </div>
            <Button
          type="submit"
          loading={loading}
           sx={{
        backgroundColor: "#6a04a5",   // button color
        color: "white",            // text color
        width: "100%",            // custom width
        height: "45px",            // custom height
        "&:hover": {
          backgroundColor: "gray", // hover color
        },
        marginBottom: "10px"
      }}
        >
          Login
        </Button>
            {/* <input className="submit button"type="submit" value="Log In"/> */}
          </form>
          
          <p className='login-signup-link'>Don't Have An Account?<Link to="/CustomerSignUp"> Sign Up as Customer?</Link></p>
          <p className='login-signup-link'><Link to="/DesignerSignUp">Sign Up as a Designer?</Link></p>
          
        </div>
    </div>
    </>
  )
}

export default Login
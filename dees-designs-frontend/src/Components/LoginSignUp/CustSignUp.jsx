import React,{useEffect, useState,useContext}from 'react'
import './LoginSignUp.css'
import useFetch from '../../useFetch';
import { Link, useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import { Authentication } from '../../App';


function CustSignUp() {
  const [name,setName] = useState(""), 
  [surname,setSurname] = useState(""),
  [email,setEmail] = useState(""),
  [gender,setGender] = useState(""),
  [number,setNumber] = useState(""),
  [password,setPassword] = useState(""),
  [conPassword,setConPassword] = useState("");

  const {post:postSignUp,loading,data,error} = useFetch("/customersSignUp");
  const navigate = useNavigate();
  const {setRole,setIsAuthenticated} = useContext(Authentication);

  function handleSignUp(e){
    e.preventDefault()
    const cred = {name,surname,email,gender,password,confirmPassword:conPassword};
    postSignUp(cred,(d)=>{
      if (d){
        localStorage.setItem("userId",d.userId);
        localStorage.setItem("role","customer");
        setIsAuthenticated(true);
        setRole("customer")
        navigate('/Home')
      }
     
    })
    console.log(error.toString())
    
  }


  
  return (
    <div className='CustSignUp loginSignUp'>
        <div className='form-container'>
          <h2>Sign Up</h2>
          {data && <p className='cred-error'>{data.error}</p>}
          {error && <p className='cred-error'>Network Error Please Refresh Or Try Again Later</p>}
          <form onSubmit={handleSignUp} id="customer-signup-form" className='signup-login-form'>

            <label>Name:</label>
            <input required type='text' onChange={(e)=> setName(e.target.value)}/>

            <label>Surname:</label>
            <input required type='text' onChange={(e)=> setSurname(e.target.value)}/>  

            <label>Email:</label>
            <input required type='email' onChange={(e)=> setEmail(e.target.value)}/>  

            <fieldset>
              <legend>Gender:</legend>
              
              <div className='gender'>
             
              <input type="radio" name="gender" value="male" onChange={(e)=> setGender("M")}/>
              <label>Male</label>
              </div>

              <div className='gender'>
              <input type="radio" name="gender" value="female" onChange={(e)=> setGender("F")}/>
              <label>Female</label>
              </div>
              
            </fieldset>

           

            <label>Password:</label>
            <input required type='password' onChange={(e)=> setPassword(e.target.value)}/>  

            <label>Confirm Password:</label>
            <input required type='password' onChange={(e)=> setConPassword(e.target.value)}/>  

          
  
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

          </form>
          
          <p className='login-signup-link'>Already Have An Account?<Link to="/Login"> Log In</Link></p>
          <p className='login-signup-link'><Link to="/">Sign Up as a designer?</Link></p>
          
        </div>
    </div>
  )
}

export default CustSignUp
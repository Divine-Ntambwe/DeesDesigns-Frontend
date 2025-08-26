import React,{useEffect, useState,useContext}from 'react'
import './LoginSignUp.css'
import useFetch from '../../useFetch';
import { Link, useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import { Authentication } from '../../App';
import TextFieldComp from '../TextField';


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
  const {setIsAuthenticated,setRole,setUserDetails,setAuthCred} = useContext(Authentication);

  function handleSignUp(e){
    e.preventDefault()
    const creds = {name,surname,email,number,gender,password,confirmPassword:conPassword};
    postSignUp(creds,(d)=>{
        delete d.message

        const {email,password} = d;
        setAuthCred(btoa(`${email}:${password}`)); 

        localStorage.setItem("userDetails",JSON.stringify(d));
        setUserDetails(d);

        localStorage.setItem("role","customer");
        setIsAuthenticated(true);
        setRole("customer")
        navigate('/Home')

      
     
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

            <TextFieldComp value={name}id="cust-name" name="custName" label="Name" onChange={(e)=> setName(e.target.value)}/>
            <TextFieldComp value={surname} id="cust-surname" name="custSurname" label="Surname" onChange={(e)=> setSurname(e.target.value)}/>
            <TextFieldComp value={email} id="cust-email" name="custEmail" label="Email" type='email' onChange={(e)=> setEmail(e.target.value)}/>  
              <fieldset>
              <legend>Gender:</legend>
              
              <div className='gender'>
             
              <input required type="radio" name="gender" value="male"  onChange={(e)=> setGender("M")}/>
              <label>Male</label>
              </div>

              <div className='gender'>
              <input required type="radio" name="gender" value="female" onChange={(e)=> setGender("F")}/>
              <label>Female</label>
              </div>
              
            </fieldset>
            <TextFieldComp value={number} label="Mobile Number" id="cust-number" name="custNumber" onChange={(e)=>{setNumber(e.target.value)}}/>
            <TextFieldComp value={password} label="Password" id="password" type='password' onChange={(e)=> setPassword(e.target.value)}/>
            <TextFieldComp value={conPassword} label="Confirm Password" name="confirmPassword" id="confirm-password"type="password" onChange={(e)=> setConPassword(e.target.value)}/> 
            
           
            <Button
          type="submit"
          loading={loading}
           sx={{
        backgroundColor: "var(--med-purple)",   // button color
        color: "white",            // text color
        width: "100%",            // custom width
        height: "45px",            // custom height
        "&:hover": {
          backgroundColor: "gray", // hover color
        },
        marginBottom: "10px"
      }}
        >
          Sign Up
        </Button>

          </form>
          
          <p className='login-signup-link'>Already Have An Account?<Link to="/Login"> Log In</Link></p>
          <p className='login-signup-link'><Link to="/DesignerSignUp">Sign Up as a designer?</Link></p>
          
        </div>
    </div>
  )
}

export default CustSignUp
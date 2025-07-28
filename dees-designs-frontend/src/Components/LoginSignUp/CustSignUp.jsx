import React,{useEffect, useState}from 'react'
import './LoginSignUp.css'
import useFetch from '../../useFetch';

function CustSignUp() {
  const [name,setName] = useState(""), 
  [surname,setSurname] = useState(""),
  [email,setEmail] = useState(""),
  [gender,setGender] = useState(""),
  [number,setNumber] = useState(""),
  [password,setPassword] = useState(""),
  [conPassword,setConPassword] = useState("");

  const {post:postSignUp,loading,data} = useFetch("http://localhost:5000/customersSignUp");
  
 


  function handleSignUp(e){
    e.preventDefault()
    const cred = {name,surname,email,gender,password,confirmPassword:conPassword};
    postSignUp(cred,()=>{

    })
   
    
  }


  
  return (
    <div className='CustSignUp loginSignUp'>
        <div className='form-container'>
          <h2>Sign Up</h2>
          {data && <p className='cred-error'>{data.error}</p>}
          <form onSubmit={handleSignUp}>

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

            

            <input className="submit"type="submit" value="Sign Up"/>
          </form>
          <p className='login-signup-link'>Already Have An Account?<a>Log In</a></p>
          
        </div>
    </div>
  )
}

export default CustSignUp
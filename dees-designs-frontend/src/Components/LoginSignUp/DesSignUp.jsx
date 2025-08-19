import React,{useEffect, useState,useRef, useContext} from 'react'
import './LoginSignUp.css'
import useFetch from '../../useFetch';
import {Link, useNavigate} from 'react-router';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Pagination, Navigation } from 'swiper/modules';
import { Authentication } from '../../App';
import Button from '@mui/material/Button';


function DesSignUp() {
  const [name,setName] = useState(""), 
  [surname,setSurname] = useState(""),
  [email,setEmail] = useState(""),
  [gender,setGender] = useState(""),
  [number,setNumber] = useState(""),
  [password,setPassword] = useState(""),
  [conPassword,setConPassword] = useState("");

  const [pfpPicture,setPfp] = useState("emptyPfp.jpeg");
  const {postMedia:postSignUp,loading,data} = useFetch("/designersSignUp");
  const uploadFile = useRef();
  const [displayErr,setDisplayErr] = useState("");
  const [pfpFile,setPfpFile] = useState("");
  const navigate = useNavigate()
  const {setIsAuthenticated,setRole} = useContext(Authentication)


  async function handleFilePicker(){
    uploadFile.current.click()
  }
  function handleSignUp(e){
    e.preventDefault();
    const details = {name,surname,email,gender,phoneNumber:number,password,confirmPassword:conPassword};
    const formData = new FormData();
    formData.append("pfp",pfpFile);
    formData.append("details",JSON.stringify(details));
    postSignUp(formData,(d)=>{
      if (d){
        localStorage.setItem("userId",d.userId);
        localStorage.setItem("role","designer");
        setIsAuthenticated(true)
        setRole("designer")
        navigate("/DesignersHome")
      }
     
    });
  }
  return (
    <div className='loginSignUp'>
        <div className='form-container' id="desSignup">
        <h2>Sign Up</h2>
        {data && <p className='cred-error'>{data.error}</p>}
        <form method="POST" onSubmit={handleSignUp}>
          <div id="upload-file-cont">
            <img className="des-pfp"src={pfpPicture} onClick={handleFilePicker} ></img> 
                <input required ref={uploadFile} name="pfp" id="upload-file" type="file" accept="image/*" onChange={(e)=>{
                setPfpFile(e.target.files[0])
                if (e.target.files[0].type.startsWith("image")){
                setPfp(URL.createObjectURL(e.target.files[0]));
               
                } else {
                    alert("Please select an image file")
                    setPfp("emptyPfp.jpeg")
                }

            }}/>
               
                upload a profile picture
            </div>
           <label>Name:</label>
            <input required type='text' onChange={(e)=> setName(e.target.value)}/>

            <label>Surname:</label>
            <input required type='text' onChange={(e)=> setSurname(e.target.value)}/>  

            <label>Email:</label>
            <input required type='email' onChange={(e)=> setEmail(e.target.value)}/>  

            <fieldset>
              <legend>Gender:</legend>
              
              <div className='gender'>
             
              <input required type="radio" name="gender" value="male" onChange={(e)=> setGender("M")}/>
              <label>Male</label>
              </div>

              <div className='gender'>
              <input required type="radio" name="gender" value="female" onChange={(e)=> setGender("F")}/>
              <label>Female</label>
              </div>
              
            </fieldset>

            <label>Phone Number</label>
            <input required type='text' onChange={(e)=> setNumber(e.target.value)}/>   

        
                


            <div>
            <label>Password:</label>
            <input required type='password' onChange={(e)=> setPassword(e.target.value)}/> 
            </div>
            
            <div>
            <label>Confirm Password:</label>
            <input required type='password' onChange={(e)=> setConPassword(e.target.value)}/>
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
          Sign Up
        </Button>
            <p className='login-signup-link'>Already Have An Account? <Link to="/Login">Log In</Link></p>

        {/* <Swiper
        navigation={true}
        modules={[Pagination, Navigation]}
        className="mySwiper"
      >
        <SwiperSlide>
          

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

            <label>Phone Number</label>
            <input required type='text' onChange={(e)=> setNumber(e.target.value)}/>   

        
            <button type='button' className="submit button">Next {">"}</button>
          <p className='login-signup-link'>Already Have An Account? <a>Log In</a></p>
        </SwiperSlide>
        <SwiperSlide id="signup-slide2">
            <div id="upload-file-cont">
            <img className="des-pfp"src={pfpPicture} onClick={handleFilePicker} ></img> 
                <input ref={uploadFile} name="pfp" id="upload-file" type="file" accept="image/*" onChange={(e)=>{
                setPfpFile(e.target.files[0])
                if (e.target.files[0].type.startsWith("image")){
                setPfp(URL.createObjectURL(e.target.files[0]));
               
                } else {
                    alert("Please select an image file")
                    setPfp("emptyPfp.jpeg")
                }

            }}/>
               
                upload a profile picture
            </div>
                


            <div>
            <label>Password:</label>
            <input required type='password' onChange={(e)=> setPassword(e.target.value)}/> 
            </div>
            
            <div>
            <label>Confirm Password:</label>
            <input required type='password' onChange={(e)=> setConPassword(e.target.value)}/>
            </div>

            <button className='button' type='button' >Prev</button>
            <button className='button' type='button' onClick={handleSignUp}>Sign Up</button>
            
            </SwiperSlide>
      </Swiper> */}
      </form>
        </div>
        
    </div>
  )
}

export default DesSignUp
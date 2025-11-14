import React, { useEffect, useState, useRef, useContext } from "react";
import "./LoginSignUp.css";
import "../../App.css";
import useFetch from "../../useFetch";
import { Link, useNavigate } from "react-router";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Pagination, Navigation } from "swiper/modules";
import { Authentication } from "../../App";
import Button from "@mui/material/Button";
import TextFieldComp from "../TextField";
import { styled } from "@mui/material/styles";
import { appContext } from "../../Context/AppContext";

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

function DesSignUp() {
  const [name, setName] = useState(""),
    [surname, setSurname] = useState(""),
    [email, setEmail] = useState(""),
    [gender, setGender] = useState(""),
    [number, setNumber] = useState(""),
    [password, setPassword] = useState(""),
    [conPassword, setConPassword] = useState("");

  const [pfpPicture, setPfp] = useState("emptyPfp.jpeg");
  const {
    postAuth: postSignUp,
    loading,
    data,
    error,
  } = useFetch("/designersSignUp");
  const uploadFile = useRef();
  const [displayErr, setDisplayErr] = useState("");
  const [pfpFile, setPfpFile] = useState("");
  const navigate = useNavigate();
  const { setIsAuthenticated, setRole, setUserDetails, setAuthCred } =
    useContext(Authentication);
  const { url } = useContext(appContext);
  const heading = useRef();

  async function handleSignUp(e) {
    e.preventDefault();
    heading.current.scrollIntoView({ behavior: "smooth" });
    const res = await fetch(`${url}/s3Url`);
    const {url:secureUrl} = await res.json() ;
    

    try{
      await fetch(secureUrl,{
        method:"PUT",
        headers:{
          "Content-Type":"multipart/form-data"
        },
        body: pfpFile
      })
    } catch(e){
      console.log(e)
      return
    }

    const pfpPath = secureUrl.split('?')[0]
    
    const details = {
      name,
      surname,
      email,
      gender,
      phoneNumber: number,
      password,
      confirmPassword: conPassword,
      pfpPath
    };
    const formData = new FormData();
    formData.append("details", JSON.stringify(details));
    

    postSignUp(details, (d) => {
      delete d.message;

      const { email, password } = d;
      setAuthCred(btoa(`${email}:${password}`));

      localStorage.setItem("userDetails", JSON.stringify(d));
      setUserDetails(d);

      localStorage.setItem("role", "designer");
      setIsAuthenticated(true);
      setRole("designer");
      navigate("/DesignersHome");
      window.location.reload(true);
    });
  }
  return (
    <div className="loginSignUp">
      <div className="form-container" id="desSignup">
        <h2 id="des-sign-up-heading" ref={heading}>
          Sign Up
        </h2>
        {data && <p className="cred-error">{data.error}</p>}
        {error && (
          <p className="cred-error">
            Network Error Please Refresh Or Try Again Later
          </p>
        )}

        <form
          method="POST"
          onSubmit={handleSignUp}
          className="signup-login-form"
        >
          <div id="upload-file-cont">
            <img className="des-pfp" src={pfpPicture}></img>

            <Button
              name="upload-pfp"
              id="upload-pfp"
              component="label"
              role={undefined}
              variant="contained"
              tabIndex={-1}
              sx={{
                backgroundColor: "transparent",
              }}
            >
              Upload Profile Picture
              <VisuallyHiddenInput
                required
                ref={uploadFile}
                name="pfp"
                id="upload-file"
                type="file"
                accept="image/*"
                onChange={(e) => {
                  setPfpFile(e.target.files[0]);
                  if (e.target.files[0].type.startsWith("image")) {
                    setPfp(URL.createObjectURL(e.target.files[0]));
                  } else {
                    alert("Please select an image file");
                    setPfp("emptyPfp.jpeg");
                  }
                }}
              />
            </Button>
          </div>

          <TextFieldComp
            id="des-name"
            name="desName"
            label="Name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <TextFieldComp
            id="des-surname"
            name="desSurname"
            label="Surname"
            type="text"
            value={surname}
            onChange={(e) => setSurname(e.target.value)}
          />
          <TextFieldComp
            id="des-signup-email"
            name="desSignUpEmail"
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <fieldset>
            <legend>Gender:</legend>

            <div className="gender">
              <input
                style={{ accentColor: "var(--med-purple)" }}
                required
                type="radio"
                name="gender"
                value="male"
                onChange={(e) => setGender("M")}
              />
              <label>Male</label>
            </div>

            <div className="gender">
              <input
                style={{ accentColor: "var(--med-purple)" }}
                required
                type="radio"
                name="gender"
                value="female"
                onChange={(e) => setGender("F")}
              />
              <label>Female</label>
            </div>
          </fieldset>

          <TextFieldComp
            id="des-number"
            name="desNumber"
            label="Mobile Number"
            value={number}
            onChange={(e) => setNumber(e.target.value)}
          />

          <TextFieldComp
            id="des-signup-password"
            name="desSignUpPassword"
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <TextFieldComp
            id="des-signup-con-password"
            name="desSignUpConPassword"
            label="Confirm Password"
            type="password"
            value={conPassword}
            onChange={(e) => setConPassword(e.target.value)}
          />

          <Button
            id="des-signup"
            type="submit"
            loading={loading}
            sx={{
              backgroundColor: "var(--med-purple)", // button color
              color: "white", // text color
              width: "100%", // custom width
              height: "45px", // custom height
              "&:hover": {
                backgroundColor: "gray", // hover color
              },
              marginBottom: "10px",
            }}
          >
            Sign Up
          </Button>
          <p className="login-signup-link">
            Already Have An Account? <Link to="/Login">Log In</Link>
          </p>

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
  );
}

export default DesSignUp;

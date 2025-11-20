import React,{useContext,useRef, useEffect} from 'react'
import { designerContext } from "../../Context/DesignerContext";
import Navbar from "../Navbar";
import "./DesHome.modular.css";
import Footer from "../Footer";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import { useNavigate } from 'react-router-dom';


function Designers() {
    const {allDesigners} = useContext(designerContext);
    const nav = useNavigate()
    const heading = useRef();
      useEffect(() => {
        heading.current.scrollIntoView({});
      },[]);
  return (
    <div className='designers des-home'>
         <div  className="navbar">
          <Navbar
            handleOpenCart={() => {
              handleOpenCart(cartPopUp.current);
            }}
          />
        </div>
        <div style={{padding:"0 20px"}}>

        <h1 ref={heading}>Local Designers</h1>
        <br/>
        <div id="all-designers">

         {allDesigners &&
         allDesigners.map((designer)=>(

         <div id="designer" style={{cursor:"pointer"}} onClick={()=>{
            nav(`/DesignerProfile/${designer._id}`)
         }} className="designers-details" >
            <img src={`${designer.pfpPath}`}/>

          <div className="contact-info">
            <h1 style={{ color: "var(--med-purple)", fontSize: "2.5em" }}>
            {designer.name} {designer.surname}
          </h1>
            <p style={{color:"var(--med-purple)"}}>{designer.rating.length === 0?"0":(designer.rating.reduce((acc,i)=>{return acc +i},0)/designer.rating.length).toFixed(1)} <StarBorderIcon size="large" sx={{}}/>  <span> ({designer.rating.length} reviews)</span></p>
        
            <p>{designer.email}</p>
            <p>{designer.phoneNumber}</p>
            </div>
          <br/>
          </div>
          
         ))
          }
        </div>

        </div>
        <div id="footer">
        <Footer />
      </div>
    </div>
  )
}

export default Designers
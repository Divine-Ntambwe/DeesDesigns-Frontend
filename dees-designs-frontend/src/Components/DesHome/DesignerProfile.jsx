import React, { useState, useRef, useContext, useEffect } from "react";
import "./DesHome.modular.css";
import Footer from "../Footer";
import { Authentication } from "../../App";
import Button from "@mui/material/Button";
import { products } from "../../Context/ProductsContext";
import { appContext } from "../../Context/AppContext";
import useFetch from "../../useFetch";
import { useParams,useNavigate } from "react-router-dom";
import { designerContext } from "../../Context/DesignerContext";
import Navbar from "../Navbar";
import Cart from "../CartOrders/Cart";

function DesignerProfile() {
  const { userDetails, authCred } = useContext(Authentication);
  const { url,handleOpenCart } = useContext(appContext);
  const [designersUploads,setDesignersUploads] = useState();
  const {designerProducts} = useContext(products);
  const {allDesigners} = useContext(designerContext)
  const [designerId,setDesignerId] = useState(useParams().designerId);
  const [designer,setDesigner] = useState()
  const cartPopUp = useRef();
   const nav = useNavigate();


  useEffect(()=>{
    designerProducts && setDesignersUploads(designerProducts.filter((prod)=>{return prod.designerId === designerId}))
    allDesigners && setDesigner(allDesigners.find((designer)=>{return designer._id === designerId}))
  },[designerProducts])
 
 
  return (
   <div className="des-home">
        <div className="navbar">
          <Navbar
            handleOpenCart={() => {
              handleOpenCart(cartPopUp.current);
            }}
          />
        </div>
        <div className="cart-popup" ref={cartPopUp}>
          <Cart />
        </div>

      <div className="des-home-content">
         {designer && <><div className="designers-details" >
            <img src={`${url}/${designer.pfpPath}`}/>

          <div className="contact-info">
            <h1 style={{ color: "var(--med-purple)", fontSize: "2.5em" }}>
            {designer.name} {designer.surname}
          </h1>
            <p>{designer.email}</p>
            <p>{designer.phoneNumber}</p>
          </div>
          </div>
          <br/>
             <h2>{designer.name}'s Designs:</h2>
          </>
          }
          
             

       

          <div className="designers-uploads">
            {designersUploads &&
              designersUploads.map((design) => (
                <div key={design._id} className="design" style={{cursor:"pointer"}}onClick={()=>{nav("/AddDesignToCart/" + design._id)}}>
                  <img src={`${url}/${design.imagePath}`} />
                  <div className="product-details">
                    <div>
                      <p className="product-name">{design.name}</p>
                      <p className="price">R{design.price}.00</p>
                    </div>
                    
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
  )
}

export default DesignerProfile
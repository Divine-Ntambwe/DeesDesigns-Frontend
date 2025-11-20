import React, { useContext, useState } from "react";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import { Link } from "react-router-dom";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import Tooltip from "@mui/material/Tooltip";
import { cartContext } from "../../Context/CartContext";
import useFetch from "../../useFetch";
import { Authentication } from "../../App";
import { appContext } from "../../Context/AppContext";
import Button from "@mui/material/Button";
import { Skeleton } from "@mui/material";
import {themeContext} from "../../Context/ThemeContext";
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';

function Cart() {
  function handleCloseCart() {
    document.querySelector(".cart-popup").style.display = "none";
  }

  const {cartItems,cartNum,cartTotal,handleRemoveItem,loading} = useContext(cartContext);
  const {authCred} = useContext(Authentication);
  const {theme} = useContext(themeContext);
  const {url} = useContext(appContext);
  

  

  return (
    <div className="cart-page">
      <div id="cart-menu">
        <h1>
          Cart{" "}
          <span onClick={handleCloseCart} className="close-sidemenu">
            <CloseOutlinedIcon style={{ cursor: "pointer" }} />
          </span>
        </h1>
        <div id="all-cart-items">
          {
            cartNum === 0 && <span style={{color:"var(--text-color2)",display:"flex",alignItems:"center", fontSize:"1.5em",gap:"5px"}}><span>No Cart Items Yet</span> <SentimentVeryDissatisfiedIcon size= "large"/></span>
          }
          {!cartItems && [1,2,3].map(()=>
          <div className="cart-items">
             <Skeleton
                animation="wave"
                sx={{ bgcolor: theme === "light" ? "grey.400" : "grey.900" }}
                variant="rectangular"
                width={350}
                height={220}
              ></Skeleton>
              <div style={{display:"flex",gap:"20px",flexDirection:"column"}}>
               <Skeleton
                animation="wave"
                sx={{ bgcolor: theme === "light" ? "grey.400" : "grey.900" }}
                variant="rectangular"
                width={350}
                height={30}
              ></Skeleton>

               <Skeleton
                animation="wave"
                sx={{ bgcolor: theme === "light" ? "grey.400" : "grey.900" }}
                variant="rectangular"
                width={100}
                height={30}
              ></Skeleton>

               <Skeleton
                animation="wave"
                sx={{ bgcolor: theme === "light" ? "grey.400" : "grey.900" }}
                variant="rectangular"
                width={100}
                height={30}
              ></Skeleton>
                </div>
          </div>
          
          
          )}
          {cartItems &&
            cartItems.map((item) => (
              <div key={item["_id"]} className="cart-items">
                <img
                  src={item.productProvider === "stockProduct"?item.imgPath:`${item.imgPath}`}
                  alt={`A picture of ${item.productName}`}
                />

                <div>
                  <h4 id={`cart-item-${item.productId}`} className="cart-item-name">{item.productName}</h4>
                  <p>R{item.price}.00</p>
                  <p>Size: {item.size}</p>
                  <p>Qty: {item.quantity}</p>
                </div>
                <Tooltip title="Remove from Cart" placement="top">
                  <DeleteOutlineIcon
            
                    id={item["_id"]}
                    onClick={(e)=>{handleRemoveItem(e.target.id)}}
                    sx={{
                      cursor: "pointer",
                      "&:hover": {
                        color: "red", // on hover
                      },
                    }}
                  />
                </Tooltip>
              </div>
            ))}
        </div>

        

       {Boolean(cartNum) &&<> <p id="cart-total">Total: R{cartTotal}.00</p>
        <Link to="/CheckOut">
            <Button
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
           Checkout
        </Button>
        </Link> </>}
      </div>
    </div>
  );
}

export default Cart;

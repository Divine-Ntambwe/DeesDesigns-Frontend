import React, { useContext, useState, useRef, useEffect } from "react";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import StepContent from "@mui/material/StepContent";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import FilterListIcon from "@mui/icons-material/FilterList";
import { Select, StepConnector } from "@mui/material";
import { styled } from "@mui/material/styles";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Navbar from "../Navbar";
import Footer from "../Footer";
import Cart from "./Cart";
import { appContext } from "../../Context/AppContext";
import { themeContext } from "../../Context/ThemeContext";
import useFetch from "../../useFetch";
import { Authentication } from "../../App";

const LongConnector = styled(StepConnector)(({ theme }) => ({
  [`& .MuiStepConnector-line`]: {
    minHeight: 50, // line thickness
    flex: 2, // makes lines longer
  },
}));

function TrackOrder() {
  const { handleOpenCart } = useContext(appContext);
  const { colorBW } = useContext(themeContext);
  const cartPopUp = useRef();
  const orderStatus = [
    "placed",
    "confirmed",
    "is being processed",
    "in transit",
    "has hit the road!",
    "delivered",
  ];
  const [orders,setOrders] = useState()
  const {userDetails} = useContext(Authentication);
  const {get} = useFetch(`/customerOrders/${userDetails["_id"]}`);

  useEffect(()=>{
    get((d)=>{
      setOrders(d)
    
    })
  },[])
  
  return (
    <>
      <div className="track-order-page">
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

        <div className="order-content">
          <h1 id="orders-heading">Orders</h1>
          <br />
          <Box sx={{ minWidth: 120 }}>
            <FormControl>
              <InputLabel
                sx={{
                  color: colorBW,
                  "&.Mui-focused": {
                    color: colorBW, // when focused
                  },
                }}
                id="demo-simple-select-label"
              >
                <FilterListIcon />
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={""}
                sx={{
                  width: 100,
                  color: colorBW,
                  "& .MuiSvgIcon-root": {
                    color: colorBW, // arrow
                  },
                  "& .MuiOutlinedInput-notchedOutline": {
                    borderColor: "darkviolet", // outline color
                  },
                  "&:hover .MuiOutlinedInput-notchedOutline": {
                    borderColor: colorBW, // on hover
                  },
                  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                    borderColor: "darkviolet", // on focus
                  },
                }}
              >
                <MenuItem value={10}>Ten</MenuItem>
                <MenuItem value={20}>Twenty</MenuItem>
                <MenuItem value={30}>Thirty</MenuItem>
              </Select>
            </FormControl>
          </Box>

          {orders && 

          orders.map((order)=>(
            <>
            <div className="order">
            <h2 className="order-id-text">Order ID: {order._id}</h2>
            <Stepper
              connector={<LongConnector />}
              activeStep={orderStatus.indexOf(order.statusOfExchange)}
              orientation="vertical"
              sx={{
                "& .MuiStepLabel-label.Mui-completed": {
                  color: "darkviolet", // Completed step label color
                },
                "& .MuiStepLabel-label.Mui-active": {
          color: "var(--med-purple)", // active step text color
          fontWeight: "bold",
        },
                "& .MuiStepLabel-label": { color: "var(--text-color2)" },
                "& .MuiStepIcon-root": { color: "darkviolet" },
                "& .MuiStepIcon-root.Mui-active": { color: "purple" },
                "& .MuiStepIcon-root.Mui-completed": { color: "darkviolet" },
              }}
            >
              <Step>
                <StepLabel>Order Placed</StepLabel>
              </Step>

              <Step>
                <StepLabel>Order Confirmed</StepLabel>
              </Step>

              <Step>
                <StepLabel>Order is being processed</StepLabel>
              </Step>

              <Step>
                <StepLabel>Order in transit</StepLabel>
              </Step>

              <Step>
                <StepLabel>Order has hit the road!</StepLabel>
              </Step>

              <Step>
                <StepLabel>Delivered</StepLabel>
              </Step>
            </Stepper>
            <div className="order-details">
              <div>
                <p>
                  <b>Order Date:</b> {new Date(order.dateOfPurchase).toDateString()}
                </p>
                <br />
                <p>
                  <b>Estimated Time Of Delivery:</b>{new Date(order.dateOfDelivery).toDateString()}
                </p>
                <br />
                <p>
                  <b>Delivery Address:</b>
                  <address>
                    {order.address.streetAddress}
                    <br />
                    {order.address.suburb}, {order.address.postalCode}
                    <br />
                    {order.address.city}, South Africa
                  </address>
                </p>
              </div>

              <div className="ordered-items">
                {order.purchasedProducts.map((prod)=>(
                  <div>
                  <img src={prod.imgPath} />
                  <p>
                    <p>{prod.productName}</p>
                    <p>R{prod.price}.00</p>
                    <p>Size: {prod.size}</p>
                    <p>qty: {prod.quantity}</p>
                  </p>
                </div>
                ))}
              </div>
            </div>
            
          </div>
          <hr />
          </>
          
          ))
          
          }

          
        </div>
      </div>

      <div id="footer">
        <Footer />
      </div>
    </>
  );
}

export default TrackOrder;

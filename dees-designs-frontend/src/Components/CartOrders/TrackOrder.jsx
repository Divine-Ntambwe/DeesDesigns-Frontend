import React, { useContext, useState, useRef } from "react";
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
    "Order Placed",
    "Order Confirmed",
    "Order is being processed",
    "Order in transit",
    "Order has hit the road!",
    "Delivered",
  ];
  const {userDetails} = useContext(Authentication);
  const {get} = useFetch(`/customerOrders/${userDetails["_id"]}`)
  
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

          <div className="order">
            <h2 className="order-id-text">Order ID: 09309293211</h2>
            <Stepper
              connector={<LongConnector />}
              activeStep={3}
              orientation="vertical"
              sx={{
                "& .MuiStepLabel-label.Mui-completed": {
                  color: "darkviolet", // Completed step label color
                },
                "& .MuiStepLabel-label": { color: colorBW },
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
                  <b>Order Date:</b> Tuesday, 16 February 2025
                </p>
                <br />
                <p>
                  <b>Estimated Time Of Delivery:</b> Monday, 21 February 2025
                </p>
                <br />
                <p>
                  <b>Delivery Address:</b>
                  <address>
                    15 Church Street
                    <br />
                    Turffontein, 2190
                    <br />
                    Johannesburg, South Africa
                  </address>
                </p>
              </div>

              <div className="ordered-items">
                <div>
                  <img src="./Pietà Evening.jpeg" />
                  <p>
                    <p>Red Satin Transparent Sleeve Dress</p>
                    <p>R750</p>
                    <p>qty: 1</p>
                  </p>
                </div>

                <div>
                  <img src="./Pietà Evening.jpeg" />
                  <p>
                    <p>Red Satin Transparent Sleeve Dress</p>
                    <p>R750</p>
                    <p>qty: 1</p>
                  </p>
                </div>

                <div>
                  <img src="./Pietà Evening.jpeg" />
                  <p>
                    <p>Red Satin Transparent Sleeve Dress</p>
                    <p>R750</p>
                    <p>qty: 1</p>
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="order">
            <h2 className="order-id-text">Order ID: 09309293211</h2>
            <Stepper
              connector={<LongConnector />}
              activeStep={0}
              orientation="vertical"
              sx={{
                "& .MuiStepLabel-label": { color: { colorBW } },
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
            <div>Order Date</div>
          </div>
        </div>
      </div>

      <div id="footer">
        <Footer />
      </div>
    </>
  );
}

export default TrackOrder;

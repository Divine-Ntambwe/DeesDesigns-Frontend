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
import LinearProgress from "@mui/material/LinearProgress";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import Cart from "../CartOrders/Cart";
import Rating from "@mui/material/Rating";
import SentimentVeryDissatisfiedIcon from "@mui/icons-material/SentimentVeryDissatisfied";
import {
  Container,
  Grid,
  Box,
  Card,
  CardMedia,
  Typography,
  Chip,
  TextField,
  IconButton,
  Paper,
  Divider,
  Stack,
  Alert,  
  ToggleButton,
  ToggleButtonGroup,
  Tooltip,
} from "@mui/material";


function DesignerProfile() {
  const { userDetails, authCred } = useContext(Authentication);
  const { url,handleOpenCart } = useContext(appContext);
  const [designersUploads,setDesignersUploads] = useState();
  const {designerProducts, reviews,getDesignersReviews} = useContext(products);
  const {allDesigners} = useContext(designerContext);
  const [designerId,setDesignerId] = useState(useParams().designerId);
  const [designer,setDesigner] = useState()
  const cartPopUp = useRef();
   const nav = useNavigate();
   const heading = useRef();
     useEffect(() => {
       heading.current.scrollIntoView({});
     },[]);


  useEffect(()=>{
    designerProducts && setDesignersUploads(designerProducts.filter((prod)=>{return prod.designerId === designerId}))
    allDesigners && setDesigner(allDesigners.find((designer)=>{return designer._id === designerId}));
     designerProducts && getDesignersReviews(designerId);
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

      <div ref={heading} className="des-home-content">
         {designer && <><div className="designers-details" >
            <img src={`${designer.pfpPath}`}/>

          <div className="contact-info">
            <h1 style={{ color: "var(--med-purple)", fontSize: "2.5em" }}>
            {designer.name} {designer.surname}
          </h1>
            <p style={{color:"var(--med-purple)"}}>{designer.rating.length === 0?"0":(designer.rating.reduce((acc,i)=>{return acc +i},0)/designer.rating.length).toFixed(1)} <StarBorderIcon size="large" sx={{}}/>  <span> ({designer.rating.length} reviews)</span></p>
        
            <p>{designer.email}</p>
            <p>{designer.phoneNumber}</p>
            </div>
          </div>
          <br/>
             <h2>{designer.name}'s Designs:</h2>
             <br/>
          </>
          }
          
             

       

          <div className="designers-uploads">
            {designersUploads &&
              designersUploads.map((design) => (
                <div key={design._id} className="design" style={{cursor:"pointer"}}onClick={()=>{nav("/AddDesignToCart/" + design._id)}}>
                  <img src={`${design.imagePath}`} />
                  <div className="product-details">
                    <div>
                      <p className="product-name">{design.name}</p>
                      <p className="price">R{design.price}.00</p>
                    </div>
                    
                  </div>
                </div>
              ))}
          </div>

          <div className="review-rating">
            <div className="cart-reviews">
              <h4 id="review-heading">Reviews for Designer</h4>

              <div className="reviews">
                {typeof reviews === "string" && (
                  <span
                    style={{
                      color: "var(--text-color2)",
                      display: "flex",
                      alignItems: "center",
                      fontSize: "2em",
                      gap: "5px",
                    }}
                  >
                    <span>No Reviews Yet</span>{" "}
                    <SentimentVeryDissatisfiedIcon size="large" />
                  </span>
                )}

                {typeof reviews !== "string" &&
                  reviews.map((review) => (
                    <Stack spacing={3}>
              {reviews.map((review, idx) => (
                <Paper
                  key={idx}
                  variant="outlined"
                  sx={{
                    p: 3,
                    borderLeft: 5,
                    borderColor: "var(--dark-purple)",
                    bgcolor: "background.paper",
                  }}
                >
                  <Stack
                    direction={{ xs: "column", sm: "row" }}
                    justifyContent="space-between"
                    mb={1.5}
                  >
                    <Typography variant="h6" fontWeight={600} color="var(--dark-purple)">
                      {review.name} {review.surname}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      {new Date(review.dateOfUpload).toLocaleDateString()}
                    </Typography>
                  </Stack>

                  <Rating
                    value={review.rating}
                    precision={0.5}
                    readOnly
                    sx={{ mb: 1.5, "& .MuiRating-iconFilled": { color: "orange" } }}
                  />

                  <Typography variant="body1" color="text.primary" lineHeight={1.7}>
                    {review.review}
                  </Typography>
                </Paper>
              ))}
            </Stack>
                  ))}
              </div>
            </div>
          </div>

        </div>
            <div id="footer">
        <Footer />
      </div>
      </div>
  )
}

export default DesignerProfile
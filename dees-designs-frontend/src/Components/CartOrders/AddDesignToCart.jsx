import React,{useContext,useEffect,useRef, useState} from 'react'
import Navbar from '../Navbar'
import './cartOrders.modules.css'
import Rating from '@mui/material/Rating';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import LinearProgress from '@mui/material/LinearProgress';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import TextField from '@mui/material/TextField';
import Footer from '../Footer';
import {Link,useParams} from 'react-router-dom';
import Cart from './Cart';
import { appContext } from '../../Context/AppContext';
import { products } from '../../Context/ProductsContext';
import useFetch from '../../useFetch';
import { cartContext } from "../../Context/CartContext";
import Button from '@mui/material/Button';
import { Authentication } from "../../App";

function AddDesignToCart() {
  const [progress,setProgress] = useState(90)
  const {handleOpenCart,url} = useContext(appContext);
  const cartPopUp = useRef();
  const { productDetails, handleGoToAddDesignToCart, designerProducts, reviews } = useContext(products);
  const productId = useParams().productId;
  const {setFetch} = useContext(cartContext);
  const { userDetails } = useContext(Authentication);

  useEffect(()=>{
    handleGoToAddDesignToCart(productId);
  },[designerProducts]);

  const { postAuth, loading, error } = useFetch("/addToCart");

  function handleAddToCart(e) {
    e.preventDefault();
    const cartItem = {
      customerId: userDetails["_id"],
      productId,
      productName: productDetails.name,
      price: productDetails.price,
      size:"M",
      quantity:1,
      imgPath: productDetails.imagePath,
      productProvider:"designer"
    };
    postAuth(cartItem,(d)=>{
      setFetch(true);
      handleOpenCart(cartPopUp.current);
    });
    
    
  }
  function getMeasurements() {
    const arr = [];
    for (let [x, y] of Object.entries(productDetails.measurementDescription)) {
      arr.push(x + ": " + y);
    }
    return arr;
  }
  function calcStarsProgress(starNum) {
    return reviews.length === 0? 0:(
      (reviews.filter((i) => {
        return i.rating === starNum;
      }).length /
        reviews.length) *
      100
    );
  }
 

  return (
    <>
    <div className='AddToCart'>
        <div className='navbar'>
            <Navbar
            handleOpenCart={()=>{handleOpenCart(cartPopUp.current)}}
            />
        </div>

        <div className='cart-popup' ref={cartPopUp}>
        <Cart/>
        </div>

        <div className='add-to-cart-content'>
          <h1>Add To Cart</h1>

          {productDetails && <div className='add-cart-prod'>
            <img src={`${url}/${productDetails.imagePath}`}/>
            <div className='add-cart-prod-details'>
              <h2>{productDetails.name}</h2>
              <p className='cart-rating'><b>Uploaded By:</b> <Link to={`/DesignersProfile/${productDetails["_id"]}`} style={{textDecoration:"underline"}}>{productDetails.uploadedBy}</Link></p>
              <Rating name="half-rating-read"  sx={{
    '& .MuiRating-iconFilled': {
      color: 'darkviolet', // filled stars
    },
    '& .MuiRating-iconEmpty': {
      color: 'darkviolet', // empty stars
    },
    '& .MuiRating-iconHover': {
      color: 'darkviolet', // on hover
    },
  }}
  defaultValue={2} precision={0.5} readOnly/>
              <p className='cart-rating'><span>4.7 rating</span><span> 11 reviews</span></p>
              <p className='add-to-cart-price'>R{productDetails.price}.00</p>

              <h3>Product Description</h3>
               <textarea rows={50} cols={20} style={{pointerEvents: "none"}}>
                {productDetails.productDescription}
               </textarea>

             {error && <p className='cred-error'>Network Error Please Refresh Or Try Again Later</p>}
                  <Button
                  onClick={handleAddToCart}
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
          <ShoppingCartOutlinedIcon/> Add To Cart
        </Button>


            </div>
          </div>}
<div className='review-rating'>
            
          <div className='cart-reviews'>
            <h4 id="review-heading">Reviews</h4>
            
            <div className='reviews'>
              <div id="review-details">
                <span className='review-title'><h4 className='writer-name'>Jane Doe</h4> <span className='review-date'>26 March 2024</span></span>
              <p className='review'>This red dress is stunning! The color is bold and eye-catching. It fits well and feels comfy. Perfect for a date night or party! </p>
              <Rating  sx={{
    '& .MuiRating-iconFilled': {
      color: 'purple', // filled stars
    },
    '& .MuiRating-iconEmpty': {
      color: 'lightgray', // empty stars
    },
    '& .MuiRating-iconHover': {
      color: 'darkviolet', // on hover
    },
  }} name="half-rating-read" defaultValue={2} precision={0.5} readOnly/>
              <hr/>
              </div>

              <div id="review-details">
                <span className='review-title'><h4 className='writer-name'>Jane Doe</h4> <span className='review-date'>26 March 2024</span></span>
              <p className='review'>This red dress is stunning! The color is bold and eye-catching. It fits well and feels comfy. Perfect for a date night or party! </p>
              <Rating  sx={{
    '& .MuiRating-iconFilled': {
      color: 'purple', // filled stars
    },
    '& .MuiRating-iconEmpty': {
      color: 'lightgray', // empty stars
    },
    '& .MuiRating-iconHover': {
      color: 'darkviolet', // on hover
    },
  }}name="half-rating-read" defaultValue={2} precision={0.5} readOnly/>
              <hr/>
              </div>

               <div id="review-details">
                <span className='review-title'><h4 className='writer-name'>Jane Doe</h4> <span className='review-date'>26 March 2024</span></span>
              <p className='review'>This red dress is stunning! The color is bold and eye-catching. It fits well and feels comfy. Perfect for a date night or party! </p>
              <Rating  sx={{
    '& .MuiRating-iconFilled': {
      color: 'purple', // filled stars
    },
    '& .MuiRating-iconEmpty': {
      color: 'lightgray', // empty stars
    },
    '& .MuiRating-iconHover': {
      color: 'darkviolet', // on hover
    },
  }} name="half-rating-read" defaultValue={2} precision={0.5} readOnly/>
              <hr/>
              </div>

             
              
            </div>

            

            
          </div>

             
          </div>

          
        </div>
        
    </div>
    <div id="footer">
      <Footer/>
    </div>
    </>
  )
}

export default AddDesignToCart
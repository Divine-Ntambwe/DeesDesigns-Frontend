import React from 'react'
import Navbar from '../Navbar'
import './cartOrders.modules.css'
import Rating from '@mui/material/Rating';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import LinearProgress from '@mui/material/LinearProgress';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import TextField from '@mui/material/TextField';
import Footer from '../Footer';
import {Link} from 'react-router-dom';

function AddDesignToCart() {
  const [progress, setProgress] = React.useState(90);
  return (
    <>
    <div className='AddToCart'>
        <div className='navbar'>
            <Navbar/>
        </div>

        <div className='add-to-cart-content'>
          <h1>Add To Cart</h1>

          <div className='add-cart-prod'>
            <img src="./Pietà Evening.jpeg"/>
            <div className='add-cart-prod-details'>
              <h2>Red Satin Transparent Sleeve Dress</h2>
              <p className='cart-rating'><b>Uploaded By:</b> <Link>Janee Lori</Link></p>
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
              <p className='add-to-cart-price'>R750.00</p>

              <h3>Product Description</h3>
               <textarea rows={50} cols={20} style={{pointerEvents: "none"}}>
                lkjbv cfdftgyhujikoopiuiuytr
               </textarea>

              <form>       
                <button id="add-to-cart" type='sumbit' className='submit button'><ShoppingCartOutlinedIcon/> Add To Cart</button>
             </form>


            </div>
          </div>
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

             <div className="rating">
            <h4 id="review-heading">Ratings</h4>
              <div>
                <span className='rate-num'>5 <StarBorderIcon/> </span>
                <LinearProgress style={{height: "2vh", borderRadius:"5px",backgroundColor:"gray"}}   variant="determinate" value={progress} />
              </div>

              <div>
                <span className='rate-num'>4 <StarBorderIcon/></span>
                <LinearProgress style={{height: "2vh", borderRadius:"5px",backgroundColor:"gray"}}   variant="determinate" value={80} />
              </div>

              <div>
                <span className='rate-num'>3 <StarBorderIcon/></span>
                <LinearProgress style={{height: "2vh", borderRadius:"5px",backgroundColor:"gray"}}   variant="determinate" value={progress} />
              </div>

              <div>
                <span className='rate-num'>2 <StarBorderIcon/></span>
                <LinearProgress style={{height: "2vh", borderRadius:"5px",backgroundColor:"gray"}}   variant="determinate" value={40} />
              </div>

              <div>
                <span className='rate-num'>1 <StarBorderIcon/></span>
                <LinearProgress style={{height: "2vh", borderRadius:"5px",backgroundColor:"gray"}}   variant="determinate" value={10} />
              </div>
               
            </div>
          </div>

          
        </div>
        
    </div>
    <div>
      <Footer/>
    </div>
    </>
  )
}

export default AddDesignToCart
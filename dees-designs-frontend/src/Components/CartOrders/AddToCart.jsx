import React,{useContext,useEffect,useRef} from 'react'
import Navbar from '../Navbar'
import './cartOrders.modules.css'
import Rating from '@mui/material/Rating';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import LinearProgress from '@mui/material/LinearProgress';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import Footer from '../Footer';
import Cart from './Cart';
import { appContext } from '../../Context/AppContext';
import { products } from '../../Context/ProductsContext';
import { useParams } from "react-router-dom";
function AddToCart() {
  const [progress, setProgress] = React.useState(90);
  const {handleOpenCart} = useContext(appContext);
  const cartPopUp = useRef();
  const {productDetails,handleGoToAddToCart,allProducts,reviews} = useContext(products);

  function handleAddToCart(e){
    e.preventDefault();
    handleOpenCart(cartPopUp.current);
  }
  const productId = useParams().productId

  useEffect(()=>{
    handleGoToAddToCart(productId)
  },[allProducts])
   
  function getMeasurements(){
    const arr = []
    for (let [x,y] of Object.entries(productDetails.measurementDescription)){
      arr.push(x + ": " + y)
    }
    return arr
  }
  console.log(new Date().toLocaleDateString())




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
          <h1 id='AddToCart'>Add To Cart</h1>

         {productDetails && <div className='add-cart-prod'>
          <div className="overlay"></div>
            <img src={productDetails.imagePath[0]}/>
            <div className='add-cart-prod-details'>
              <h2>{productDetails.name}</h2>
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
  defaultValue={productDetails.rating} precision={0.5} readOnly/>
              <p className='cart-rating'><span>{productDetails.rating} rating</span><span> {reviews.length} reviews</span></p>
              <p className='add-to-cart-price'>R{productDetails.price}.00</p>

              <h3>Standard Measurement:</h3>
             {productDetails && <div className='measurements'>
               {getMeasurements().map((i)=>(
                <span>{i}</span>
               ))}
              </div>}

              <form onSubmit={handleAddToCart} id="add-to-cart-form">
                <span>
                  <select className='add-to-cart-input'>
                    <option>XS</option>
                    <option>S</option>
                    <option>M</option>
                    <option>L</option>
                    <option>XL</option>
                  </select>

                   <input className='add-to-cart-input' type='number' value={1}min={1} max={6}/>
                </span>
                
                <button  id="add-to-cart" type='sumbit' className='submit button'><ShoppingCartOutlinedIcon/> Add To Cart</button>
              </form>


            </div>
          </div>}
<div className='review-rating'>
            
          <div className='cart-reviews'>
            <h4 id="review-heading">Reviews</h4>
            
            <div className='reviews'>
              {reviews && reviews.map((review)=>(
                <div id="review-details">
                <span className='review-title'><h4 className='writer-name'>{review.name} {review.surname}</h4> <span className='review-date'>{new Date(review.dateOfUpload).toLocaleDateString()}</span></span>
              <p className='review'>{review.review}</p>
              <Rating  sx={{
    '& .MuiRating-iconFilled': {
      color: 'orange', // filled stars
    },
    '& .MuiRating-iconEmpty': {
      color: 'lightgray', // empty stars
    },
    '& .MuiRating-iconHover': {
      color: 'darkviolet', // on hover
    },
  }} name="half-rating-read" defaultValue={review.rating} precision={0.5} readOnly/>
              <hr/>
              </div>
              ))
               }
              

             
              
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
    <div id="footer">
      <Footer/>
    </div>
    </>
  )
}

export default AddToCart
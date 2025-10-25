import React, { useContext, useEffect, useRef, useState } from "react";
import Navbar from "../Navbar";
import "./cartOrders.modules.css";
import Rating from "@mui/material/Rating";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import LinearProgress from "@mui/material/LinearProgress";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import Footer from "../Footer";
import Cart from "./Cart";
import { appContext } from "../../Context/AppContext";
import { products } from "../../Context/ProductsContext";
import { useParams } from "react-router-dom";
import { Authentication } from "../../App";
import useFetch from "../../useFetch";
import { cartContext } from "../../Context/CartContext";
import Button from '@mui/material/Button';
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';
function AddToCart() {
  const [progress, setProgress] = React.useState(90);
  const { handleOpenCart } = useContext(appContext);
  const cartPopUp = useRef();
  const { productDetails, handleGoToAddToCart, allProducts, reviews } = useContext(products);
  const [size, setSize] = useState("XS");
  const [quantity, setQuantity] = useState(1);
  const { userDetails } = useContext(Authentication);
  const productId = useParams().productId;
  const {setFetch} = useContext(cartContext)
  const [rating,setRating] = useState()

  const increase = () => setQuantity((q) => (q < 10 ? q + 1 : 10));
  const decrease = () => setQuantity((q) => (q > 1 ? q - 1 : 1));
  const { postAuth, loading, error } = useFetch("/addToCart");

  function handleAddToCart(e) {
    e.preventDefault();
    const cartItem = {
      customerId: userDetails["_id"],
      productId,
      productName: productDetails.name,
      price: productDetails.price,
      size,
      quantity,
      imgPath: productDetails.imagePath[0],
      productProvider:"stockProduct"
    };
    postAuth(cartItem,(d)=>{
      setFetch(true);
      handleOpenCart(cartPopUp.current);
    });
    
  }

  useEffect(() => {
    handleGoToAddToCart(productId);
    if (productDetails.productId === productId)setRating(productDetails.rating.length === 0?"0":productDetails.rating.reduce((acc,i)=>{return acc +i},0)/productDetails.rating.length)
  }, [allProducts]);

  function getMeasurements() {
    const arr = [];
    for (let [x, y] of Object.entries(productDetails.measurementDescription)) {
      arr.push(x + ": " + y);
    }
    return arr;
  }



  return (
    <>
      <div className="AddToCart">
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

        <div className="add-to-cart-content">
          <h1 id="AddToCart">Add To Cart</h1>

          {productDetails.rating && (
            <div className="add-cart-prod">
              <div className="overlay"></div>
              <img src={productDetails.imagePath[0]} />
              <div className="add-cart-prod-details">
                <h2>{productDetails.name}</h2>

             {reviews && productDetails &&   <p className="cart-rating">
                  <span style={{ display:"flex",alignItems:"flex-start"}}> {productDetails.rating.length === 0?"0":(productDetails.rating.reduce((acc,i)=>{return acc +i},0)/productDetails.rating.length).toFixed(1)}<StarBorderIcon sx={{fontSize:"1.5em"}}/></span>
                  <span> ({productDetails.rating.length} reviews)</span>
                </p>}
                <p className="add-to-cart-price">R{productDetails.price}.00</p>

                <h3>Standard Measurement:</h3>
                {productDetails && (
                  <div className="measurements">
                    {getMeasurements().map((i) => (
                      <span>{i}</span>
                    ))}
                  </div>
                )}

                <form onSubmit={handleAddToCart} id="add-to-cart-form">
                  <h3>Quanitiy:</h3>
                  <span>
                    <div className="quantity-selector">
                      <button type="button" onClick={decrease} className="btn">
                        -
                      </button>
                      <span className="number">{quantity}</span>
                      <button type="button" onClick={increase} className="btn">
                        +
                      </button>
                    </div>
                  </span>
                  <h3>Size:</h3>
                  <span>
                    {productDetails &&
                      Object.entries(productDetails.itemsInStock)
                        .filter(([X, y]) => {
                          return y > 0;
                        })
                        .map(([x, y]) => (
                          <span
                            className="measurement-sizes"
                            onClick={(e) => {
                              for (let i of e.target.parentElement.children) {
                                i.style.backgroundColor = "transparent";
                              }
                              e.target.style.backgroundColor = "var(--dark-purple)";
                              setSize(e.target.textContent);
                            }}
                            // onMouseOver={(e) => {
                            //   e.target.style.borderColor = "var(--dark-purple)";
                            // }}
                            // onMouseLeave={(e) => {
                            //   e.target.style.borderColor = "var(text-color2)";
                            // }}
                          >
                            {x}
                          </span>
                        ))}
                  </span>
{error && <p className='cred-error'>Network Error Please Refresh Or Try Again Later</p>}
                  <Button
          type="submit"
          loading={loading}
           sx={{
        fontSize:"0.7em",    
        backgroundColor: "var(--med-purple)",   // button color
        color: "white",            // text color
        width: "100%",            // custom width
        height: "3.5em",            // custom height
        "&:hover": {
          backgroundColor: "gray", // hover color
        },
        marginTop: "10px"
      }}
        >
          <ShoppingCartOutlinedIcon sx={{ fontSize:"2em"}}/>Add To Cart
        </Button>
                </form>
              </div>
            </div>
          )}
          <div className="review-rating">
            <div className="cart-reviews">
              <h4 id="review-heading">Reviews</h4>

              <div className="reviews">
                {
                  typeof reviews === "string"&&
                  <span style={{color:"var(--text-color2)",display:"flex",alignItems:"center", fontSize:"2em",gap:"5px"}}><span>No Reviews Yet</span> <SentimentVeryDissatisfiedIcon size= "large"/></span>
                }

                {typeof reviews !== "string" &&
                  reviews.map((review) => (
                    <div id="review-details">
                      <span className="review-title">
                        <h4 className="writer-name">
                          {review.name} {review.surname}
                        </h4>{" "}
                        <span className="review-date">
                          {new Date(review.dateOfUpload).toLocaleDateString()}
                        </span>
                      </span>
                     
                      <Rating
                        sx={{
                          "& .MuiRating-iconFilled": {
                            color: "orange", // filled stars
                          },
                          "& .MuiRating-iconEmpty": {
                            color: "lightgray", // empty stars
                          },
                          "& .MuiRating-iconHover": {
                            color: "darkviolet", // on hover
                          },
                        }}
                        name="half-rating-read"
                        defaultValue={review.rating}
                        precision={0.5}
                        readOnly
                      />
                       <p className="review">{review.review}</p>
                      <hr />
                    </div>
                  ))}
              </div>
            </div>

            {/* {reviews && (
              <div className="rating">
                <h4 id="review-heading">Ratings</h4>
                {[5, 4, 3, 2, 1].map((i) => (
                  <div>
                    <span className="rate-num">
                      {i} <StarBorderIcon />{" "}
                    </span>
                    <LinearProgress
                      style={{
                        height: "2vh",
                        borderRadius: "5px",
                        backgroundColor: "gray",
                      }}
                      variant="determinate"
                      value={calcStarsProgress(i)}
                    />
                  </div>
                ))}
              </div>
            )} */}
          </div>
        </div>
      </div>
      <div id="footer">
        <Footer />
      </div>
    </>
  );
}

export default AddToCart;

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
function AddToCart() {
  const [progress, setProgress] = React.useState(90);
  const { handleOpenCart } = useContext(appContext);
  const cartPopUp = useRef();
  const { productDetails, handleGoToAddToCart, allProducts, reviews } = useContext(products);
  const [size, setSize] = useState("XS");
  const [quantity, setQuantity] = useState(1);
  const { userDetails } = useContext(Authentication);
  const productId = useParams().productId;
  const {setFetch,cartNum,setCartNum} = useContext(cartContext)

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
      productProvider:"stock"
    };
    postAuth(cartItem,(d)=>{
      setFetch(true);
      handleOpenCart(cartPopUp.current);
    });
    
  }

  useEffect(() => {
    handleGoToAddToCart(productId);
  }, [allProducts]);

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

          {productDetails && (
            <div className="add-cart-prod">
              <div className="overlay"></div>
              <img src={productDetails.imagePath[0]} />
              <div className="add-cart-prod-details">
                <h2>{productDetails.name}</h2>
                <Rating
                  name="half-rating-read"
                  sx={{
                    "& .MuiRating-iconFilled": {
                      color: "darkviolet", // filled stars
                    },
                    "& .MuiRating-iconEmpty": {
                      color: "darkviolet", // empty stars
                    },
                    "& .MuiRating-iconHover": {
                      color: "darkviolet", // on hover
                    },
                  }}
                  defaultValue={productDetails.rating}
                  precision={0.5}
                  readOnly
                />
                <p className="cart-rating">
                  <span>{productDetails.rating} rating</span>
                  <span> {reviews.length} reviews</span>
                </p>
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
                              e.target.style.backgroundColor = "black";
                              setSize(e.target.textContent);
                            }}
                            onMouseOver={(e) => {
                              e.target.style.borderColor = "black";
                            }}
                            onMouseLeave={(e) => {
                              e.target.style.borderColor = "white";
                            }}
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
                </form>
              </div>
            </div>
          )}
          <div className="review-rating">
            <div className="cart-reviews">
              <h4 id="review-heading">Reviews</h4>

              <div className="reviews">
                {reviews &&
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
                      <p className="review">{review.review}</p>
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
                      <hr />
                    </div>
                  ))}
              </div>
            </div>

            {reviews && (
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
            )}
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

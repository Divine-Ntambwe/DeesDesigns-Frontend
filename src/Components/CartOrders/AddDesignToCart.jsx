import React, { useContext, useEffect, useRef, useState } from "react";
import Navbar from "../Navbar";
import "./cartOrders.modules.css";
import Rating from "@mui/material/Rating";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import LinearProgress from "@mui/material/LinearProgress";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import TextField from "@mui/material/TextField";
import Footer from "../Footer";
import { Link, useNavigate, useParams } from "react-router-dom";
import Cart from "./Cart";
import { appContext } from "../../Context/AppContext";
import { products } from "../../Context/ProductsContext";
import useFetch from "../../useFetch";
import { cartContext } from "../../Context/CartContext";
import Button from "@mui/material/Button";
import { Authentication } from "../../App";
import SentimentVeryDissatisfiedIcon from "@mui/icons-material/SentimentVeryDissatisfied";

function AddDesignToCart() {
  const [progress, setProgress] = useState(90);
  const { handleOpenCart, url } = useContext(appContext);
  const cartPopUp = useRef();
  const {
    productDetails,
    handleGoToAddDesignToCart,
    designerProducts,
    reviews,
  } = useContext(products);
  const productId = useParams().productId;
  const { setFetch } = useContext(cartContext);
  const { userDetails } = useContext(Authentication);
  const nav = useNavigate();

  useEffect(() => {
    designerProducts && handleGoToAddDesignToCart(productId);
    if (productDetails && productDetails.productProvider === "designer")
      nav("/ProductNotFound");
  }, [designerProducts]);

  const heading = useRef();
  useEffect(() => {
    heading.current.scrollIntoView({});
  }, []);
  const { postAuth, loading, error } = useFetch("/addToCart");

  function handleAddToCart(e) {
    e.preventDefault();
    const cartItem = {
      customerId: userDetails["_id"],
      productId,
      designerId:productDetails.designerId,
      productName: productDetails.name,
      price: productDetails.price,
      size: "M",
      quantity: 1,
      imgPath: productDetails.imagePath,
      productProvider: "designerProduct",
    };
    postAuth(cartItem, (d) => {
      setFetch(true);
      handleOpenCart(cartPopUp.current);
    });
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
          <h1 ref={heading}>Add To Cart</h1>

          {productDetails && (
            <div className="add-cart-prod">
              <img src={`${productDetails.imagePath}`} />
              <div className="add-cart-prod-details">
                <h2>{productDetails.name}</h2>
                <p className="cart-rating">
                  <b>Uploaded By: </b>{" "}
                  <Link
                    to={`/DesignerProfile/${productDetails["designerId"]}`}
                    style={{ textDecoration: "underline" }}
                  >
                    {productDetails.uploadedBy}
                  </Link>
                </p>
                <p className="add-to-cart-price">R{productDetails.price}.00</p>

                <h3>Product Description</h3>
                <textarea
                  rows={10}
                  cols={20}
                  value={productDetails.productDescription}
                  style={{ pointerEvents: "none", fontSize: "1.5em" }}
                ></textarea>

                {error && (
                  <p className="cred-error">
                    Network Error Please Refresh Or Try Again Later
                  </p>
                )}
                <Button
                  onClick={handleAddToCart}
                  loading={loading}
                  sx={{
                    backgroundColor: "var(--dark-purple)", // button color
                    color: "white", // text color
                    width: "100%", // custom width
                    height: "45px", // custom height
                    "&:hover": {
                      backgroundColor: "gray", // hover color
                    },
                    marginBottom: "10px",
                  }}
                >
                  <ShoppingCartOutlinedIcon /> Add To Cart
                </Button>
              </div>
            </div>
          )}
          {/* <div className="review-rating">
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
          </div> */}
        </div>
      </div>
      <div id="footer">
        <Footer />
      </div>
    </>
  );
}

export default AddDesignToCart;

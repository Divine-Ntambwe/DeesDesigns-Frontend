import React, { useContext, useEffect, useRef, useState } from "react";
import "./categories.modules.css";
import Footer from "../Footer";
import Navbar from "../Navbar";
import Cart from "../CartOrders/Cart";
import { appContext } from "../../Context/AppContext";
import { products } from "../../Context/ProductsContext";
import useFetch from "../../useFetch";
import GlareHover from "../ReactBitComp/GlareHover";
import { useNavigate } from "react-router-dom";
import { Skeleton } from "@mui/material";
import { themeContext } from "../../Context/ThemeContext";

function Likes() {
    const { handleOpenCart } = useContext(appContext);
      const { theme } = useContext(themeContext);
      const { likedProducts, allProducts } = useContext(products);
      const cartPopUp = useRef();
      const nav = useNavigate();
      
      const heading = useRef()
      useEffect(()=>{
         heading.current.scrollIntoView({ });
      },[])
      function handleProdHover(e, imgSrc) {
        setTimeout(() => {
          e.target.children[0].src = imgSrc;
        }, 300);
      }
  return (
 <>
      <div className="liked-products categories">
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

        <div className="categories-content">
          {/* <p className="category-links">
            <span>Long Dresses</span> |<span>Short Dresses</span> |
            <span>Ballroom Dresses</span> |<span>Bride Dresses</span> |
            <span>Braidmaid Dresses</span> |<span>Graduation</span> |
            <span>Matric Dance</span> |<span>Wedding</span> |
            <span>Evening Dresses</span> |<span>Date Night</span> |
            <span>Shoes</span> |<span>Accessories</span>
          </p> */}
          <h1 ref={heading}>Liked Products</h1>

          <div className="categories-products" id="popular">
            {allProducts && likedProducts.length === 0 && (
              <p style={{ fontSize: "2em" }}>No Likes Yet</p>
            )}
            {!likedProducts &&
              !allProducts &&
              [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(() => (
                <>
                  <div>
                    <Skeleton
                      animation="wave"
                      sx={{
                        bgcolor: theme === "light" ? "grey.400" : "grey.900",
                        height: "100%",
                      }}
                      variant="rectangular"
                    ></Skeleton>
                    <Skeleton
                      animation="wave"
                      sx={{
                        bgcolor: theme === "light" ? "grey.400" : "grey.900",
                      }}
                      variant="rectangular"
                    ></Skeleton>
                    <Skeleton
                      animation="wave"
                      sx={{
                        bgcolor: theme === "light" ? "grey.400" : "grey.900",
                      }}
                      variant="rectangular"
                    ></Skeleton>
                  </div>
                </>
              ))}
            {likedProducts &&
              likedProducts.map((product) => (
                <div
                  id={product["_id"]}
                  key={product["_id"]}
                  className="popular-prod"
                  onMouseOver={(e) => {
                    handleProdHover(e, product.imagePath[1]);
                  }}
                  onMouseOut={(e) => {
                    handleProdHover(e, product.imagePath[0]);
                  }}
                  onClick={(e) => {
                    // handleGoToAddToCart(product["_id"]);
                    nav(`/AddToCart/${product.productId}`);
                  }}
                >
                  <GlareHover
                    glareColor="#ffffff"
                    glareOpacity={0.3}
                    glareAngle={-30}
                    glareSize={300}
                    transitionDuration={800}
                    playOnce={false}
                    className="popular-prod"
                  >
                    <img
                      alt={`A picture of ${product.name}`}
                      src={product.imagePath[0] || null}
                    />
                  </GlareHover>
                  <p className="product-name">
                    {product.name.length >= 30
                      ? `${product.name.slice(0, 27)}...`
                      : product.name}
                  </p>
                  <p>
                    <span className="price">R{product.price}.00</span>
                    {/* <span>{product.menOrWomen}</span> */}
                  </p>
                </div>
              ))}
          </div>
        </div>
      </div>

      <div id="footer">
        <Footer />
      </div>
    </>
  )
}

export default Likes
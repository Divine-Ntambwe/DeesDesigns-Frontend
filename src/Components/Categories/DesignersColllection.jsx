import React, { useContext, useRef, useEffect, useState } from "react";
import "./categories.modules.css";
import Footer from "../Footer";
import Navbar from "../Navbar";
import { Link, useNavigate } from "react-router-dom";
import Cart from "../CartOrders/Cart";
import { appContext } from "../../Context/AppContext";
import { products } from "../../Context/ProductsContext";
import useFetch from "../../useFetch";
import GlareHover from "../ReactBitComp/GlareHover";
import { Skeleton } from "@mui/material";
import { themeContext } from "../../Context/ThemeContext";
function DesignersCollection() {
  const { theme } = useContext(themeContext);
  const { handleOpenCart, url } = useContext(appContext);
  const { designerProducts, handleGoToAddDesignToCart, allProducts } =
    useContext(products);
  const cartPopUp = useRef();
  const nav = useNavigate();
  const heading = useRef()
    useEffect(()=>{
       heading.current.scrollIntoView({ });
    })

  return (
    <>
      <div className="designers-collec categories">
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
          <h1 ref={heading}>Designer's Collection</h1>
          {/* <p className="category-links">
            <span>Graduation</span> |<span>Matric Dance</span> |
            <span>Wedding</span> |<span>Men</span> |<span>Women</span>
          </p> */}

          <div className="categories-products" id="popular">
            {allProducts && designerProducts.length === 0 && (
              <p style={{ fontSize: "2em" }}>Product Not Found</p>
            )}
            {!designerProducts.length &&
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
            {designerProducts &&
              designerProducts.map((product) => (
                <div
                  id={product["_id"]}
                  key={product["_id"]}
                  className="popular-prod"
                  onClick={(e) => {
                    nav(`/AddDesignToCart/${product["_id"]}`);
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
                      src={`${product.imagePath}` || null}
                    />
                  </GlareHover>
                  <p className="product-name">
                    {product.name.length >= 30
                      ? `${product.name.slice(0, 27)}...`
                      : product.name}
                  </p>
                  <p>
                    <span className="price">R{product.price}.00</span>
                    <span>{product.uploadedBy}</span>
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
  );
}

export default DesignersCollection;

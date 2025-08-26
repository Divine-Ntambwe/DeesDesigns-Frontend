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
function WomenWear() {
  const { handleOpenCart } = useContext(appContext);
  const { womenProducts } = useContext(products);
  const cartPopUp = useRef();
  const nav = useNavigate()
  function handleProdHover(e, imgSrc) {
    setTimeout(() => {
      e.target.children[0].src = imgSrc;
    }, 300);
  }

  return (
    <>
      <div className="women-wear categories">
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

          <div className="categories-products" id="popular">
            {womenProducts &&
              womenProducts.map((product) => (
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
                    nav(`/AddToCart/${product._id}`);
                      
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
                  <p className="product-name">{product.name}</p>
                  <p>
                    <span className="price">R{product.price}.00</span>
                    <span>{product.menOrWomen}</span>
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

export default WomenWear;

import React, { useContext, useRef, useState, useEffect } from "react";
import "./categories.modules.css";
import Footer from "../Footer";
import Navbar from "../Navbar";
import Cart from "../CartOrders/Cart";
import { appContext } from "../../Context/AppContext";
import { products } from "../../Context/ProductsContext";
import GlareHover from "../ReactBitComp/GlareHover";
import { useNavigate } from "react-router-dom";
function MenWear() {
  const { handleOpenCart } = useContext(appContext);
  const { menProducts } = useContext(products);
  const cartPopUp = useRef();
  const nav = useNavigate()
  function handleProdHover(e, imgSrc) {
    setTimeout(() => {
      e.target.children[0].src = imgSrc;
    }, 300);
  }

  return (
    <>
      <div className="men-wear categories">
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
            <span>Suits</span> |<span>Tuxedos</span> |<span>Blazers</span> |
            <span>Graduation</span> |<span>Matric Dance</span> |
            <span>Wedding</span> |<span>Date Night</span> |<span>Shoes</span> |
            <span>Accessories</span>
          </p> */}

          <div className="categories-products" id="popular">
            {menProducts &&
              menProducts.map((product) => (
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
                    nav(`/AddToCart/${product["_id"]}`);
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

export default MenWear;

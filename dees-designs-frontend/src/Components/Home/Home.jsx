import React, { useContext, useEffect, useRef, useState } from "react";
import Navbar from "../Navbar";
import "./Home.css";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Autoplay } from "swiper/modules";
import Footer from "../Footer";
import { useNavigate, Link } from "react-router-dom";
import Cart from "../CartOrders/Cart";
import { appContext } from "../../Context/AppContext";
import useFetch from "../../useFetch";
import { products } from "../../Context/ProductsContext";
import GlareHover from "../ReactBitComp/GlareHover";
import Tooltip from "@mui/material/Tooltip";
import { Authentication } from "../../App";

function HomePage() {
  const { handleOpenCart } = useContext(appContext);
  const cartPopUp = useRef();
  const displayedProducts = useRef()
  const nav = useNavigate();
  const {
    allProducts,
    setAllProducts,
    setProductDetails,
    handleGoToAddToCart,
    homeProducts,
  } = useContext(products);
  const { get, data, loading, error } = useFetch(
    "http://localhost:5000/stockProducts"
  );
  const prodImg = useRef();
  const { userDetails } = useContext(Authentication);

  function getGenderCat() {
    return userDetails.gender === "M" ? "Men" : "Women";
  }

  function handleProdHover(e, imgSrc) {
    setTimeout(() => {
      e.target.children[0].src = imgSrc;
    }, 300);
  }

  return (
    <>
      <div className="home-page">
        <div className="navbar">
          <Navbar
            handleOpenCart={() => {
              handleOpenCart(cartPopUp.current);
            }}
            displayedProducts={displayedProducts.current}
          />
        </div>

        <div className="cart-popup" ref={cartPopUp}>
          <Cart />
        </div>

        <div className="home-header">
          <div className="slides" id="slide1">
            <div>
              <h1 id="slogan">
                Get <span>dee</span> best for You!
              </h1>
              <p id="short-desc">
                Discover the best designer wear from top global brands to
                skilled local creators, all crafted with style and precision to
                fit you perfectly. Whether you prefer luxury labels or unique
                custom pieces, you’ll enjoy fashion that reflects your taste and
                enhances your look.
              </p>
            </div>

            <img src="./Ідеї фото для пар❤️.jpeg" />
          </div>
        </div>

        <div className="home-content">
          <h2>Product Categories</h2>
          <div className="main-section" id="product-cat">
            <div id="category">
              <img id="category-img" src="./image copy 6.png" />
              <button
                className="view-collection"
                onClick={() => {
                  nav("/WomenWear");
                }}
              >
                View Women Wear
              </button>
            </div>

            <div id="category">
              <img id="category-img" src="./image copy 8.png" />
              <button
                className="view-collection"
                onClick={() => {
                  nav("/MenWear");
                }}
              >
                View Men Wear
              </button>
            </div>

            <div id="category">
              <img id="category-img" src="./20250419_221038.jpg" />
              <button
                className="view-collection"
                onClick={() => {
                  nav("/DesignersCollection");
                }}
              >
                View Designer's Collection
              </button>
            </div>
          </div>

          <h2 ref={displayedProducts} id="home-products">Home</h2>

          <div className="main-section" id="popular">
            {homeProducts &&
              homeProducts.map((product) => (
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
          <h2>Our Services</h2>

          <div className="main-section" id="our-services">
            <Tooltip title="See our designers" placement="right-end">
              <Link>
                <div className="services">
                  <img
                    id="services-img"
                    src=".\_Woman Designing Dress On Dummy_ by Stocksy Contributor _Danil Nevsky_ (copy).jpeg"
                  />
                  <h4 className="services-headings">Stylist Assistance</h4>
                </div>
              </Link>
            </Tooltip>

            <Tooltip
              title="Learn More About The Designers"
              placement="right-end"
            >
              <Link>
                <div className="services">
                  <img id="services-img" src=".\image.png" />
                  <h4 className="services-headings">Made-to-Measure Fit</h4>
                </div>
              </Link>
            </Tooltip>

            <Tooltip title="Go to designer's collection" placement="right-end">
              <Link to="/DesignersCollection">
                <div className="services">
                  <img id="services-img" src=".\v7d6P_vQ.jpeg" />
                  <h4 className="services-headings">Made For You</h4>
                </div>
              </Link>
            </Tooltip>
          </div>
        </div>
      </div>

      <div id="footer">
        <Footer />
      </div>
    </>
  );
}

export default HomePage;

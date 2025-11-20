import React, { useContext, useEffect, useRef, useState } from "react";
import Navbar from "../Navbar";
import "./Home.css";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination, Autoplay, EffectFade } from "swiper/modules";
import Footer from "../Footer";
import { useNavigate, Link } from "react-router-dom";
import Cart from "../CartOrders/Cart";
import { appContext } from "../../Context/AppContext";
import useFetch from "../../useFetch";
import { products } from "../../Context/ProductsContext";
import GlareHover from "../ReactBitComp/GlareHover";
import Tooltip from "@mui/material/Tooltip";
import { Authentication } from "../../App";
import { Skeleton } from "@mui/material";
import { themeContext } from "../../Context/ThemeContext";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import TextType from "../ReactBitComp/TextType";
import 'swiper/css/effect-fade';

function HomePage() {
  const { handleOpenCart } = useContext(appContext);
  const { theme } = useContext(themeContext);
  const cartPopUp = useRef();
  const displayedProducts = useRef();
  const nav = useNavigate();
  const {
    allProducts,
    homeProducts,
    handleLikeProduct,
    likedProducts,
    handleRemoveLikedItem,
    setNumOfHomeProducts,
    numOfHomeProducts
  } = useContext(products);
  const { userDetails } = useContext(Authentication);

  function handleProdHover(e, imgSrc) {
    setTimeout(() => {
      e.target.children[0].src = imgSrc;
    }, 300);
  }

  const slidesNum = window.matchMedia("(max-width: 600px)").matches ? 1 : 4;
  
 
  return (
    <>
      <div  className="home-page">
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

        <div className="home-header main-section">
          <div className="slides" id="slide1">
            <video loop autoPlay muted >
              <source src="./homeVid.mp4"></source>
            </video>
            <div className="home-info">
              <h1 data-testid="main-slogan" id="slogan">
                <TextType
                  text={["Get DEE best for you!", `Made with care`]}
                  typingSpeed={75}
                  pauseDuration={1500}
                  showCursor={true}
                  cursorCharacter="|"
                />
              </h1>
              <p id="short-desc">
                Discover the best designer wear from top global brands to
                skilled local creators, all crafted with style and precision to
                fit you perfectly. Whether you prefer luxury labels or unique
                custom pieces, you will enjoy fashion that reflects your taste
                and enhances your look.
              </p>
            </div>
            {/* <img style={{width:"100%"}} src="./home2.jpg"/> */}
           {/* <Swiper
              className="home-swiper"
              effect={'fade'}
              loop={true}
              autoplay={{
                delay: 3000,
                disableOnInteraction: false,
              }}
              
              modules={[Autoplay,EffectFade]}
            >
           
              <SwiperSlide>
                <img src="./home.jpeg" />
              </SwiperSlide>
              <SwiperSlide>
                <img src="./home1.jpg" />
              </SwiperSlide>
              <SwiperSlide>
                <img src="./home3.jpg" />
              </SwiperSlide>
            </Swiper> */}
          </div>
        </div>

        <div className="home-content">
          <div className="main-section product-cat">
            <h2>
              <span>Shop By Categories</span>
            </h2>

            <Swiper
              slidesPerView={slidesNum}
              spaceBetween={90}
              loop={true}
              autoplay={{
                delay: 4000,
                disableOnInteraction: false,
              }}
              pagination={{
                clickable: true,
              }}
              modules={[Autoplay]}
              className="mySwiper"
            >
              <SwiperSlide className="cat-slides">
                <div className="category">
                  <button
                    className="view-collection"
                    onClick={() => {
                      nav("/WomenWear");
                    }}
                  >
                    Shop Women Wear
                  </button>
                  <img className="category-img" src=".\WomenWear.jpg" />
                </div>
              </SwiperSlide>
              <SwiperSlide className="cat-slides">
                <div className="category">
                  <img className="category-img" src=".\MenWear.jpg" />
                  <button
                    className="view-collection"
                    onClick={() => {
                      nav("/MenWear");
                    }}
                  >
                    Shop Men's Wear
                  </button>
                </div>
              </SwiperSlide>
              <SwiperSlide className="cat-slides">
                <div className="category">
                  <img className="category-img" src=".\Accessoriesw.jpg" />
                  <button
                    className="view-collection"
                    onClick={() => {
                      nav("/WomenAccessories");
                    }}
                  >
                    Shop Women Accessories
                  </button>
                </div>
              </SwiperSlide>

              <SwiperSlide className="cat-slides">
                <div className="category">
                  <img className="category-img" src="./Accessories.jpg" />
                  <button
                    className="view-collection"
                    onClick={() => {
                      nav("/MenAccessories");
                    }}
                  >
                    Shop Men Accessories
                  </button>
                </div>
              </SwiperSlide>
              <SwiperSlide className="cat-slides">
                <div className="category">
                  <img className="category-img" src=".\Collection.jpg" />
                  <button
                    className="view-collection"
                    onClick={() => {
                      nav("/DesignersCollection");
                    }}
                  >
                    Shop Designer's Collection
                  </button>
                </div>
              </SwiperSlide>


              
            </Swiper>
            {/* <div className="category">
              <img className="category-img" src=".\Party Formal Dress Cape Black White Color Block Pearl Boat Neck Maxi D.jpeg" />
              <button
                className="view-collection"
                onClick={() => {
                  nav("/WomenWear");
                }}
              >
                View Women Wear
              </button>
            </div>

            <div className="category">
              <img className="category-img" src="./image copy 8.png" />
              <button
                className="view-collection"
                onClick={() => {
                  nav("/MenWear");
                }}
              >
                View Men Wear
              </button>
            </div>

            <div className="category">
              <img className="category-img" src="./20250419_221038.jpg" />
              
              <button
                className="view-collection"
                onClick={() => {
                  nav("/DesignersCollection");
                }}
              >
                View Designer's Collection
              </button>

              
            </div>
            <div className="category">
              <img className="category-img" src=".\Accessories.jpeg" />
              <button
                className="view-collection"
                onClick={() => {
                  nav("/Accessories");
                }}
              >
                View Accessories
              </button>
            </div> */}
          </div>

          <h2 ref={displayedProducts} id="home-products">
            Home
          </h2>

          <div className="main-section" id="popular">
            {allProducts && homeProducts.length === 0 && (
              <p style={{ fontSize: "2em" }}>Product Not Found</p>
            )}
            {!homeProducts.length &&
              !allProducts &&
              [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(() => (
                <>
                  <div className="popular-prod">
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
            {homeProducts &&
              homeProducts.map((product) => (
                <>
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
                  >
                    <div
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
                          loading="lazy"
                        />
                      </GlareHover>
                    </div>
                    <p className="product-name">
                      {product.name.length >= 35
                        ? `${product.name.slice(0, 27)}...`
                        : product.name}
                    </p>
                    <p>
                      <span className="price">R{product.price}.00</span>
                      {likedProducts && (
                        <span style={{ zIndex: 1 }}>
                          {!likedProducts.find((liked) => {
                            return liked.productId === product._id;
                          }) ? (
                            <FavoriteBorderIcon
                              onClick={() => {
                                handleLikeProduct(product);
                              }}
                            />
                          ) : (
                            <FavoriteIcon
                              onClick={() => {
                                handleRemoveLikedItem(product);
                              }}
                            />
                          )}
                        </span>
                      )}
                    </p>
                  
                  </div>
                  
                </>
              ))}
          </div>
              <div style={{width:"95vw",height:"0",minHeight:"0",display:"flex",alignItems:"center"}}>


              </div>
          <h2>Our Services</h2>

          <div className="main-section" id="our-services">
            <Tooltip title="meet our designers" placement="right-start">
              <Link to="/Designers">
                <div className="services">
                  <img
                    id="services-img"
                    src=".\_Woman Designing Dress On Dummy_ by Stocksy Contributor _Danil Nevsky_ (copy).jpeg"
                  />
                  <h4 className="services-headings">Stylist Assistance</h4>
                </div>
              </Link>
            </Tooltip>

            <Tooltip title="about us" placement="right-start">
              <Link to="/AboutUs">
                <div className="services">
                  <img id="services-img" src=".\image.png" />
                  <h4 className="services-headings">Made-to-Measure Fit</h4>
                </div>
              </Link>
            </Tooltip>

            <Tooltip title="see designers collection" >
              <Link to="/DesignersCollection">
                <div className="services">
                  <img id="services-img" src="./madeForYou.png" />
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

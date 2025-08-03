import React from 'react'
import Navbar from '../Navbar'
import './Home.css'
import { Swiper, SwiperSlide } from "swiper/react";
import 'swiper/css';
import { Autoplay } from 'swiper/modules';
import Footer from '../Footer';
import { useNavigate } from 'react-router-dom';
function HomePage() {
  const nav = useNavigate()
  function handleGoToAddToCart(){
    nav("/AddToCart")
  }
  return (
    <>
    <div className='home-page'>
      <div className='navbar'>
        <Navbar/>
      </div>

      <div className='home-content'>
      <Swiper
        slidesPerView={4}
        spaceBetween={30}
        loop={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        modules={[Autoplay]}
        className="mySwiper"
      >
        <SwiperSlide className="slides"id="slide1">
        <img src='./81a2eb27167b044d4acef466471402fd.jpg'/>
          
        </SwiperSlide>

        <SwiperSlide className='slides'>
          <img src="/image copy 7.png"/>
        </SwiperSlide>

        <SwiperSlide className="slides">
          <img src="./image copy.png"/>
        </SwiperSlide>

        <SwiperSlide className="slides">
          <img src="./image copy 9.png"/>
        </SwiperSlide>


        <SwiperSlide className="slides">
          <img src="./image copy 4.png"/>
        </SwiperSlide>

        <SwiperSlide className="slides">
          <img src="./image copy 10.png"/>
        </SwiperSlide>

        <SwiperSlide className="slides">
          <img src="./image copy 5.png"/>
        </SwiperSlide>

        <SwiperSlide className="slides">
          <img src="./image copy 11.png"/>
        </SwiperSlide>

        
      </Swiper>
      <h1>Get DEE best for You!</h1>

      <h2>Product Categories</h2>
      <div id="product-cat">
        <div>
        <img src="./image copy 6.png"/>

        <h3>Women's Wear</h3>
        </div>

        <div>
        <img src="./image copy 8.png"/>
        <h3>Men's Wear</h3>
        </div>

        <div>
          <img src="./20250419_221038.jpg"/>
          <h3>Designer's Designs</h3>
        </div>

      </div>

      <h2>Popular</h2>

      <div id="popular">
        <div onClick={handleGoToAddToCart}>
        <img src="./Pietà Evening.jpeg"/>
        <p className='product-name'>Red Satin Transparent Sleeve Dress</p>
        <p className='price'>R750</p>
        </div>
        <div>
        <img src="./Pietà Evening.jpeg"/>
        <p className='product-name'>Red Satin Transparent Sleeve Dress</p>
        <p className='price'>R750</p>
        </div>
        <div>
        <img src="./Pietà Evening.jpeg"/>
        <p className='product-name'>Red Satin Transparent Sleeve Dress</p>
        <p className='price'>R750</p>
        </div>
        <div>
        <img src="./Pietà Evening.jpeg"/>
        <p className='product-name'>Red Satin Transparent Sleeve Dress</p>
        <p className='price'>R750</p>
        </div>
        <div>
        <img src="./Pietà Evening.jpeg"/>
        <p className='product-name'>Red Satin Transparent Sleeve Dress</p>
        <p className='price'>R750</p>
        </div>
      </div>
      <h2>Our Services</h2>
      <div id="my services">

      </div>
      </div>
     
    </div>

    <div>
        <Footer/>
      </div>
    </>
  )
}

export default HomePage

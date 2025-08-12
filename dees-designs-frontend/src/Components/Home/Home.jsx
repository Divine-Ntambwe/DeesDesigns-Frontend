import React, { useContext } from 'react'
import Navbar from '../Navbar'
import './Home.css'
import { Swiper, SwiperSlide } from "swiper/react";
import 'swiper/css';
import { Autoplay } from 'swiper/modules';
import Footer from '../Footer';
import { useNavigate } from 'react-router-dom';
import Cart from '../CartOrders/Cart';
import { appContext } from '../../Context/AppContext';
function HomePage() {
  const nav = useNavigate()
  function handleGoToAddToCart(){
    nav("/AddToCart")
  }

  return (
    <>
    <div className='home-page'>
      <div className='navbar'>
        <Navbar
        />
      </div>

      
      <div className="home-header">
       <Swiper
        spaceBetween={30}
        // loop={true}
        // autoplay={{
        //   delay: 2500,
        //   disableOnInteraction: false,
        // }}
        // modules={[Autoplay]}
        className="mySwiper"
      >
        <SwiperSlide className="slides"id="slide1">
          <div>
            <h1 id="slogan">Get <span>dee</span> best for You!</h1>
         <p id="short-desc">Discover the best designer wear from top global brands to skilled local creators, all crafted with style and precision to fit you perfectly. Whether you prefer luxury labels or unique custom pieces, you’ll enjoy fashion that reflects your taste and enhances your look.
</p>
          </div>
         
        <img src='./Ідеї фото для пар❤️.jpeg'/>
         
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
      </div>  
     
     <div className='home-content'>
      <h2>Product Categories</h2>
      <div className='main-section' id="product-cat">
        <div id="category">
        <img id="category-img" src="./image copy 6.png"/>
        <button className='view-collection'>View Women Wear</button>
        </div>

        <div id="category">
        <img id="category-img" src="./image copy 8.png"/>
         <button className='view-collection'>View Men Wear</button>
        </div>

        <div id="category">
          <img id="category-img" src="./20250419_221038.jpg"/>
          <button className='view-collection'>View Designer's Collection</button>
         </div>

      </div>

      <h2>Popular</h2>

      <div className='main-section' id="popular">
        <div className="popular-prod"onClick={handleGoToAddToCart}>

        <img src="./Pietà Evening.jpeg"/>
        <p className='product-name'>Red Satin Transparent Sleeve Dress</p>
        <p><span className='price'>R750</span><span>Women</span></p>
       
        </div>


        <div>
        <img src="./Pietà Evening.jpeg"/>
        <p className='product-name'>Red Satin Transparent Sleeve Dress</p>
        <p className='price'>R750</p>
        </div>

        <div  className="popular-prod"onClick={handleGoToAddToCart}>
        <img src="./Pietà Evening.jpeg"/>
        <p className='product-name'>Red Satin Transparent Sleeve Dress</p>
        <p><span className='price'>R750</span><span>Women</span></p>
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
      <div className='main-section' id="my services">

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

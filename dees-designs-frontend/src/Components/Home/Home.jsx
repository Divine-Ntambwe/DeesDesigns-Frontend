import React, { useContext,useEffect,useRef } from 'react'
import Navbar from '../Navbar'
import './Home.css'
import { Swiper, SwiperSlide } from "swiper/react";
import 'swiper/css';
import { Autoplay } from 'swiper/modules';
import Footer from '../Footer';
import { useNavigate,Link } from 'react-router-dom';
import Cart from '../CartOrders/Cart';
import { appContext } from '../../Context/AppContext';
import useFetch from '../../useFetch';
import { shopContext } from '../../Context/ShopContext';
import GlareHover from './GlareHover'
function HomePage() {
  const {handleOpenCart} = useContext(appContext);
  const cartPopUp = useRef();
  const nav = useNavigate()
  function handleGoToAddToCart(productId){
    setProductDetails(allProducts.find((prod)=>prod["_id"] === productId ));
    nav("/AddToCart");
  }

  const {allProducts,setAllProducts,productDetails,setProductDetails} = useContext(shopContext)
  const {get,data,loading,error} = useFetch("http://localhost:5000/stockProducts");
  const prodImg = useRef()
  useEffect(()=>{
    if (allProducts.length === 0){
      get((d)=>{setAllProducts(d)})
    }
    
  },[])

  function handleProdHover(e,imgSrc){
    setTimeout(
      () =>{
         e.target.children[0].src = imgSrc
        },
        300);

  }

  return (
    <>
    <div className='home-page'>
      <div className='navbar'>
        <Navbar
         handleOpenCart={()=>{handleOpenCart(cartPopUp.current)}}
        />
      </div>

      <div className='cart-popup' ref={cartPopUp}>
        <Cart/>
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
        <button className='view-collection'><Link to="/WomenWear">View Women Wear</Link></button>
        </div>

        <div id="category">
        <img id="category-img" src="./image copy 8.png"/>
         <button className='view-collection'><Link to="/MenWear">View Men Wear</Link></button>
        </div>

        <div id="category">
          <img id="category-img" src="./20250419_221038.jpg"/>
          <button className='view-collection'><Link to="/DesignersCollection">View Designer's Collection</Link></button>
         </div>

      </div>

      <h2>Popular</h2>

      <div className='main-section' id="popular">

        {
          allProducts.length !== 0 && allProducts.map((product)=>(
             
             <div  id={product["_id"]} className="popular-prod" onMouseOver={(e)=>{handleProdHover(e,product.imagePath[1])}} onMouseOut={(e)=>{handleProdHover(e,product.imagePath[0])}} onClick={(e)=> {handleGoToAddToCart(product["_id"])}}>
              <GlareHover
    glareColor="#ffffff"
    glareOpacity={0.3}
    glareAngle={-30}
    glareSize={300}
    transitionDuration={800}
    playOnce={false}
    className="popular-prod"
  >
     <img ref={prodImg} src={product.imagePath[0]||null}/>
  </GlareHover>
  <p className='product-name'>{product.name}</p>
        <p><span className='price'>R{product.price}.00</span><span>{product.menOrWomen}</span></p>
             </div>
             
          ))
        }

       
      </div>
      <h2>Our Services</h2>
      <div className='main-section' id="my services">

      </div>
      </div>
     
    </div>

    <div id="footer">
        <Footer/>
      </div>
    </>
  )
}

export default HomePage

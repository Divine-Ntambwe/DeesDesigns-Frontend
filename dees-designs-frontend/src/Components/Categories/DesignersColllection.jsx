import React,{useContext,useRef,useEffect,useState} from 'react'
import './categories.modules.css'
import Footer from '../Footer'
import Navbar from '../Navbar'
import { Link } from 'react-router-dom';
import Cart from '../CartOrders/Cart';
import { appContext } from '../../Context/AppContext';
import { products } from '../../Context/ProductsContext';
import useFetch from '../../useFetch';
import GlareHover from '../ReactBitComp/GlareHover'
function DesignersCollection() {
    const {handleOpenCart} = useContext(appContext);
    const {designerProducts} = useContext(products)
    const cartPopUp = useRef();
   
    function handleProdHover(e,imgSrc){
     

  }
  return (
    <>
    <div className='designers-collec categories'>
        <div className="navbar">
            <Navbar
            handleOpenCart={()=>{handleOpenCart(cartPopUp.current)}}
            />
        </div>
        <div className='cart-popup' ref={cartPopUp}>
        <Cart/>
       </div>

        <div className="categories-content">
            <p className='category-links'>
                <span>Graduation</span> | 
                <span>Matric Dance</span> | 
                <span>Wedding</span> | 
                <span>Men</span> | 
                <span>Women</span> 
            </p>

            <div className="categories-products" id="popular">
              {
          designerProducts  && designerProducts.map((product)=>(
             
             <div  id={product["_id"]} key={product["_id"]} className="popular-prod" onClick={(e)=> {handleGoToAddToCart(product["_id"]); nav("/AddToCart");}}>
              <GlareHover
    glareColor="#ffffff"
    glareOpacity={0.3}
    glareAngle={-30}
    glareSize={300}
    transitionDuration={800}
    playOnce={false}
    className="popular-prod"
  >
     <img alt={`A picture of ${product.name}`} src={product.imagePath ||null}/>
  </GlareHover>
  <p className='product-name'>{product.name}</p>
        <p><span className='price'>R{product.price}.00</span><span>{product.menOrWomen}</span></p>
             </div>
             
          ))
        }
        
            </div>
        </div>
        
    </div>

    <div id='footer'>
        <Footer/>
    </div>
    </>
    
  )
}

export default DesignersCollection
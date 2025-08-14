import React,{useContext,useRef} from 'react'
import './categories.modules.css'
import Footer from '../Footer'
import Navbar from '../Navbar'
import Cart from '../CartOrders/Cart';
import { appContext } from '../../Context/AppContext';
function MenWear() {
    const {handleOpenCart} = useContext(appContext);
    const cartPopUp = useRef();
  return (
    <>
    <div className='men-wear categories'>
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
                <span>Suits</span> |
                <span>Tuxedos</span> | 
                <span>Blazers</span> | 
                <span>Graduation</span> | 
                <span>Matric Dance</span> | 
                <span>Wedding</span> | 
                <span>Date Night</span> | 
                <span>Shoes</span> | 
                <span>Accessories</span>
            </p>

            <div className="categories-products" id="popular">
                <div className="popular-prod">

        <img src=".\image copy 8.png"/>
        <p className='product-name'>Red Satin Transparent Sleeve Dress</p>
        <p><span className='price'>R750</span><span>Women</span></p>
       
        </div>

                <div className="cat-product">
                    
                </div>

                <div className="cat-product">
                    
                </div>

                <div className="cat-product">
                    
                </div>

                <div className="cat-product">
                    
                </div>

                <div className="cat-product">
                    
                </div>
            </div>
        </div>
        
    </div>

    <div id="footer">
        <Footer/>
    </div>
    </>
    
  )
}

export default MenWear
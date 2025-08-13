import React from 'react'
import './categories.modules.css'
import Footer from '../Footer'
import Navbar from '../Navbar'
function MenWear() {
  return (
    <>
    <div className='men-wear categories'>
        <div className="navbar">
            <Navbar/>
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

    <div>
        <Footer/>
    </div>
    </>
    
  )
}

export default MenWear
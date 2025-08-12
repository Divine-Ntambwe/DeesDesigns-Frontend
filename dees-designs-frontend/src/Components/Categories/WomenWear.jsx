import React from 'react'
import './categories.modules.css'
import Footer from '../Footer'
import Navbar from '../Navbar'
function WomenWear() {
  return (
    <>
    <div className='women-wear categories'>
        <div className="navbar">
            <Navbar/>
        </div>

        <div className="categories-content">
            <h1 id="women-heading">Women Wear</h1>
            <p className='category-links'>
                <span>Long Dresses</span> |
                <span>Short Dresses</span> | 
                <span>Ballroom Dresses</span> | 
                <span>Bride Dresses</span> | 
                <span>Braidmaid Dresses</span> |
                <span>Graduation</span> | 
                <span>Matric Dance</span> | 
                <span>Wedding</span> | 
                <span>Evening Dresses</span> | 
                <span>Date Night</span> | 
                <span>Shoes</span> | 
                <span>Accessories</span>
            </p>

            <div className="categories-products" id="popular">
                <div className="popular-prod">

        <img src="./Pietà Evening.jpeg"/>
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

export default WomenWear
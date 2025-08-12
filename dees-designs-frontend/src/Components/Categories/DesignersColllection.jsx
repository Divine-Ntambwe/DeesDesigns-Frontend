import React from 'react'
import './categories.modules.css'
import Footer from '../Footer'
import Navbar from '../Navbar'
function DesignersCollection() {
  return (
    <>
    <div className='designers-collec categories'>
        <div className="navbar">
            <Navbar/>
        </div>

        <div className="categories-content">
            <h1>Designer's Collection</h1>
            <p className='category-links'>
                <span>Graduation</span> | 
                <span>Matric Dance</span> | 
                <span>Wedding</span> | 
                <span>Men</span> | 
                <span>Women</span> 
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

export default DesignersCollection
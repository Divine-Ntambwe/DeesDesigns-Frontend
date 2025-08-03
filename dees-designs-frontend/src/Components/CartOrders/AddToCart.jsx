import React from 'react'
import Navbar from '../Navbar'
import './cartOrders.css'

function AddToCart() {
  return (
    <div className='AddToCart'>
        <div className='navbar'>
            <Navbar/>
        </div>
        <h1>Add To Cart</h1>
    </div>
  )
}

export default AddToCart
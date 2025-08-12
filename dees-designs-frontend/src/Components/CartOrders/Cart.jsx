import React from 'react'
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import {Link} from 'react-router-dom'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import Tooltip from '@mui/material/Tooltip';

function Cart() {
    function handleCloseCart(){
        document.querySelector(".cart-popup").style.display = "none"
    }
  return (
    <div className='cart-page'>
        <div id="cart-menu">
             <h1>Cart  <span onClick={handleCloseCart} className='close-sidemenu'><CloseOutlinedIcon style={{cursor:"pointer"}}/></span></h1>
            <div id="all-cart-items">
           
            
            <div className='cart-items'>
                <img src="./image copy 8.png"/>

                <div>
                    <h4 className='cart-item-name' >Red Satin Transparent Sleeve Dress</h4>
                    <p>R750.00</p>
                    <p>Size: M</p>
                    <p>Qty: 1</p>
                </div>
                <Tooltip title="Remove from Cart" placement="top">
                    <DeleteOutlineIcon
                    sx={{cursor:"pointer",'&:hover': {
      color: 'red', // on hover
    }}}/>
                </Tooltip>
                
                
            </div>

            <div className='cart-items'>
                <img src="./image copy 8.png"/>

                <div>
                    <h4 className='cart-item-name' >Red Satin Transparent Sleeve Dress</h4>
                    <p>R750.00</p>
                    <p>Size: M</p>
                    <p>Qty: 1</p>
                </div>
                <Tooltip title="Remove from Cart" placement="top">
                    <DeleteOutlineIcon/>
                </Tooltip>

                
            </div>
            </div>


            <p id="cart-total">Total: R750.00</p>
            <Link to="/CheckOut"><button id="checkout" className='button'>Check Out</button></Link>
            
        </div>
    
    </div>
  )
}

export default Cart
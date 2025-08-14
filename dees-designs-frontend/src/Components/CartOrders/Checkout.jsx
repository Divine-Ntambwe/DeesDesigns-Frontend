import React,{useContext,useRef} from 'react'
import Navbar from '../Navbar'
import Footer from '../Footer'
import Cart from './Cart';
import { appContext } from '../../Context/AppContext'

function Checkout() {
    const {handleOpenCart} = useContext(appContext);
    const cartPopUp = useRef();
  return (
    <>
    <div className='checkout-page'>

        <div className="navbar">
            <Navbar
            handleOpenCart={()=>{handleOpenCart(cartPopUp.current)}}
            />
        </div>

        <div className='cart-popup' ref={cartPopUp}>
        <Cart/>
       </div>
       

        <form>
             <h1>Checkout</h1>
            <div className="checkout">
            
            <div className='checkout-forms-cont' id="delivery-info">
                <h2>Delivery Information</h2>

                <div className='checkout-forms'>
                    <div>
                        <label>Name:<span className='astrix'>*</span></label>
                        <input className='text-input'/>
                    </div>

                    <div>
                        <label>Mobile Number:<span className='astrix'>*</span></label>
                        <input className='text-input'/>
                    </div>

                    <div>
                        <label>City:<span className='astrix'>*</span></label>
                        <input className='text-input'/>
                    </div>

                    <div>
                        <label>Suburb:<span className='astrix'>*</span></label>
                        <input className='text-input'/>
                    </div>

                    <div>
                        <label>Address:<span className='astrix'>*</span></label>
                        <input className='text-input'/>
                    </div>

                    <div>
                        <label>Building Type:</label>
                        <select className='text-input'>
                            <option>Apartment</option>
                            <option>Office Building</option>
                        </select>
                    </div>

                    <div>
                        <label>Unit No:</label>
                        <input className='text-input'/>
                    </div>
                    
                </div>
                
            </div>

             <div  className='checkout-forms-cont' id="order-summary">
                <h2>Order Summary</h2>
                <div className='cart-items'>
                <img src="./image copy 8.png"/>

                <div>
                    <h4 className='cart-item-name' >Red Satin Transparent Sleeve Dress</h4>
                    <p>R750.00</p>
                    <p>Size: M</p>
                    <p>Qty: 1</p>
                </div>

                
            </div>
            </div>

            <div  className='checkout-forms-cont' id="payment">
                <h2>Payment Method</h2>
                <div>
                   <label><input className='pay-method' name="payment-method" value="Cash On Delivery" type='radio'/> Cash On Delievery</label>
                   <label><input className='pay-method' name="payment-method" value="Card On Delivery" type='radio'/> Card On Delievery</label>
                   <label><input className='pay-method' name="payment-method" value="EFT" type='radio'/> EFT</label>
                 
                </div>

            </div>

            <div  className='checkout-forms-cont' id="bank-details">
                <h2>Bank Details</h2>
                <div className="checkout-forms">

                     <div id="card-number-cont">
                        <label>Card Number:</label>
                        <input id="card-number" className='text-input'/>
                    </div>
                     <div>
                        <label>Expiry Date:</label>
                        <input className='text-input' type='date'/>
                    </div>

                     <div>
                        <label>CVV:</label>
                        <input className='text-input'/>
                    </div>
                </div>
            </div>

           
        </div>
        </form>

        
        
    </div>
    <div id="footer">
        <Footer/>
    </div>
    </>
  )
}

export default Checkout
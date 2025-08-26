import React from 'react'
import InstagramIcon from '@mui/icons-material/Instagram';
import XIcon from '@mui/icons-material/X';
import PinterestIcon from '@mui/icons-material/Pinterest';
import { Link } from 'react-router-dom';
function Footer() {
  return (
    <div className='footer'>
        <div>
            <h1>
                Dee's 
            </h1>

            <h1>
            esigns
            </h1>
        </div>

        <div className='footer-links'>
            <h2>Company</h2>
            <Link to="/AboutUs"><p>About Us</p></Link>
            <Link to="/ShippingAndReturns"><p>Shipping & Returns</p></Link>
            
            
            <Link to="/ContactUs"><p>Contact Us</p></Link>
        </div>

        <div className='footer-links'>
            <h2>Terms & Policies</h2>
            <Link to="/TermsAndConditions"><p>Terms & Conditions</p></Link>
            
            <Link to="/PrivacyPolicy"><p>Privacy Policy</p></Link>
        </div>

        <div className='footer-icons footer-links'>
            <InstagramIcon/>
            <XIcon/>
            <PinterestIcon/>

        </div>

       
    </div>
  )
}

export default Footer
import React from 'react'
import InstagramIcon from '@mui/icons-material/Instagram';
import XIcon from '@mui/icons-material/X';
import PinterestIcon from '@mui/icons-material/Pinterest';
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
            <p>About Us</p>
            <p>Shipping & Returns</p>
            <p>Contact Us</p>
        </div>

        <div className='footer-links'>
            <h2>Terms & Policies</h2>
            <p>Terms & Conditions</p>
            <p>Privacy Policy</p>
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
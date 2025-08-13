import React from 'react'
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined';
import PermContactCalendarOutlinedIcon from '@mui/icons-material/PermContactCalendarOutlined';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import BedtimeOutlinedIcon from '@mui/icons-material/BedtimeOutlined';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import {Link} from 'react-router-dom';
import {useRef} from 'react'
import Cart from './CartOrders/Cart';
let goHome 

function Navbar() {
  const sideMenuEl = useRef();
  const navBar = useRef();
  const cartPopUp = useRef();
  goHome = useRef();
  

  function handleOpenMenu(){
    sideMenuEl.current.style.display = "block"
    navBar.current.style.display = "none"
  }

  function handleCloseMenu(){
    sideMenuEl.current.style.display = "none"
    navBar.current.style.display = "flex"
  }

  function handleOpenCart(){
    cartPopUp.current.style.display = "flex"
  }

  return (
    <>
      <div className='cart-popup' ref={cartPopUp}>
        <Cart/>
      </div>
    
    <div className='nav-bar-comp'>
      
        <div className="top-navbar" ref={navBar}>

        <span className='top-nav-links'><span>Home</span> <span>Orders</span> <span>Shop Now</span> <span>Contact Us</span> </span>
        
        <span><h1>Dee's Designs</h1></span>
        
        <span className="navbar-icons"> <Box sx={{ display: 'flex', alignItems: 'flex-end',border:'1px solid #6a04a5', borderRadius:"180px", backgroundColor:"var(--background-color1)", padding:"0 15px 5px"}}>
        <SearchOutlinedIcon sx={{ color: 'white', mr: 0.5, my: 0.5 }} />
        <TextField id="input-with-sx" variant='standard' sx={{borderRadius:"180px",'& .MuiInput-underline:hover:before': {
      borderBottomColor: 'white', // hover
    },
    '& .MuiInput-underline:before': {
      borderBottomColor: 'gray', // default
    },
    '& .MuiInput-underline:after': {
      borderBottomColor: '#6a04a5', // focus
    },'& input::placeholder': {
      color: 'gray',
      opacity: 1, // needed to fully apply color
    },'& .MuiInputBase-input': {
      color: 'white', // text color
    }}} placeholder="search" />
      </Box> <AccountCircleOutlinedIcon onClick={handleOpenMenu} style={{fontSize: "1.5em"}}/> <ShoppingCartOutlinedIcon onClick={handleOpenCart} style={{fontSize: "1.3em"}}/><span id='num-of-cart-items'>08</span></span>
        </div>

        <div ref={sideMenuEl} className='nav-dropdown'>
        <h1>Dee's Designs  <span className='close-sidemenu' onClick={handleCloseMenu}><CloseOutlinedIcon style={{cursor:"pointer"}}/></span></h1>

        <div className='side-bar-links'>
        <Link><HomeOutlinedIcon ref={goHome}style={{fontSize: "2em"}}/>Home</Link>
        <Link><AccountCircleOutlinedIcon style={{fontSize: "2em"}}/>Profile </Link>
        <Link><ShoppingCartOutlinedIcon style={{fontSize: "2em"}}/>Cart </Link>
        <Link><ShoppingBagOutlinedIcon style={{fontSize: "2em"}}/>Orders  </Link>
        <Link><BedtimeOutlinedIcon  style={{fontSize: "2em"}}/>Dark mode</Link>
        <Link><PermContactCalendarOutlinedIcon  style={{fontSize: "2em"}}/>Contact us </Link>
        <Link><LogoutOutlinedIcon style={{fontSize: "2em"}}/> Log Out</Link>

        </div>
        
        </div>
    </div>
    </>
  )
}

export {goHome}
export default Navbar

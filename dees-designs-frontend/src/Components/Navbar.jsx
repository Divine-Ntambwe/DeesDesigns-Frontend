import React,{useContext, useState} from 'react'
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
import { appContext } from '../Context/AppContext';
import { themeContext } from '../Context/ThemeContext';
import { cartContext } from '../Context/CartContext';

function Navbar({handleOpenCart}) {
  const sideMenuEl = useRef();
  const navBar = useRef();
  const cartPopUp = useRef();
  const {colorBW,theme,setTheme,setColorBW} = useContext(themeContext);
  const [modeText,setModeText] = useState(theme === "light"?"Dark":"Light");
  const {cartNum} = useContext(cartContext)

  function handleOpenMenu(){
    sideMenuEl.current.style.display = "block"
    navBar.current.style.display = "none"
  }

  function handleCloseMenu(){
    sideMenuEl.current.style.display = "none"
    navBar.current.style.display = "flex"
  }

  function handleChangeTheme(){
   if (theme === "light"){
    setTheme("dark");
    setModeText("Light");
    setColorBW("white");
    localStorage.setItem("theme","dark")
   }else {
    setTheme("light");
    setModeText("Dark");
    setColorBW("black");
    localStorage.setItem("theme","light")
   }
  }

  return (
    <>
    
    <div className='nav-bar-comp'>
      
        <div className="top-navbar" ref={navBar}>

        <span className='top-nav-links'><Link to="/Home">Home</Link> <Link to="/Orders">Orders</Link> <Link>Shop Now</Link> <a href="#footer">Contact Us</a> </span>
        
        <span><h1>Dee's Designs</h1></span>
        
        <span className="navbar-icons"> <Box sx={{ display: 'flex', alignItems: 'flex-end',border:'1px solid #6a04a5', borderRadius:"180px", backgroundColor:"var(--background-color1)", padding:"0 15px 5px"}}>
        <SearchOutlinedIcon sx={{ color: {colorBW}, mr: 0.5, my: 0.5 }} />
        <TextField id="input-with-sx" variant='standard' sx={{borderRadius:"180px",'& .MuiInput-underline:hover:before': {
      borderBottomColor: {colorBW}, // hover
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
      color: colorBW, // text color
    }}} placeholder="search" />
      </Box> <AccountCircleOutlinedIcon onClick={handleOpenMenu} style={{fontSize: "1.5em"}}/> <ShoppingCartOutlinedIcon onClick={handleOpenCart} style={{fontSize: "1.3em"}}/><span id='num-of-cart-items'>{cartNum}</span></span>
        </div>

        <div ref={sideMenuEl} className='nav-dropdown'>
        <h1>Dee's Designs  <span className='close-sidemenu' onClick={handleCloseMenu}><CloseOutlinedIcon style={{cursor:"pointer"}}/></span></h1>
        <p id="user-details">
          <p>Hi Divine!</p>
          <p>divinentambwe@gmail.com</p>
          </p>
        <div className='side-bar-links'>
        <Link className="side-bar-link" to="/Home"><HomeOutlinedIcon style={{fontSize: "2em"}}/>Home</Link>

        <span className="side-bar-link" onClick={()=>{handleCloseMenu();handleOpenCart()}} ><ShoppingCartOutlinedIcon  style={{fontSize: "2em"}}/>Cart</span>
        <Link className="side-bar-link" to="/Orders" ><ShoppingBagOutlinedIcon style={{fontSize: "2em"}}/>Orders</Link>
        <span className="side-bar-link" onClick={handleChangeTheme}><BedtimeOutlinedIcon  style={{fontSize: "2em"}}/>{modeText} Mode</span>
        <a href="#footer" onClick={handleCloseMenu} className="side-bar-link" ><PermContactCalendarOutlinedIcon  style={{fontSize: "2em"}}/>Contact us </a>
        <Link className="side-bar-link" ><LogoutOutlinedIcon style={{fontSize: "2em"}}/> Log Out</Link>

        </div>
        
        </div>
    </div>
    </>
  )
}


export default Navbar

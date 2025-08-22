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
import FileUploadIcon from '@mui/icons-material/FileUpload';
import PublishIcon from '@mui/icons-material/Publish';
import {Link} from 'react-router-dom';
import {useRef} from 'react'


function DesNavbar() {
  const sideMenuEl = useRef();
  const navBar = useRef()

  function handleOpenMenu(){
    sideMenuEl.current.style.display = "block"
    navBar.current.style.display = "none"
  }

  function handleCloseMenu(){
    sideMenuEl.current.style.display = "none"
    navBar.current.style.display = "flex"
  }
  return (
    <div className='nav-bar-comp'>
        <div className="top-navbar" ref={navBar}>
        {/* <span className="navbar-icons"onClick={handleOpenMenu}><MenuOutlinedIcon style={{fontSize: "1.3em"}}/></span> */}
        <h1>Dee's Designs</h1>
        <p></p>
        <span className="navbar-icons"><SearchOutlinedIcon style={{fontSize: "1.3em"}}/>  <AccountCircleOutlinedIcon style={{fontSize: "1.3em"}}/></span>
        </div>

        <div ref={sideMenuEl} className='nav-dropdown'>
        <h1>Dee's Designs  <span className='close-sidemenu' onClick={handleCloseMenu}><CloseOutlinedIcon style={{cursor:"pointer"}}/></span></h1>

        <div className='side-bar-links'>
        <Link><HomeOutlinedIcon style={{fontSize: "2em"}}/>Home</Link>
        <Link><AccountCircleOutlinedIcon style={{fontSize: "2em"}}/>Profile </Link>
        <Link><PublishIcon style={{fontSize: "2em"}}/>Publish A Design</Link>
        <Link><FileUploadIcon style={{fontSize: "2em"}}/>Upload A Design For a Customer</Link>
        <Link><BedtimeOutlinedIcon  style={{fontSize: "2em"}}/>Dark mode</Link>
        <Link><PermContactCalendarOutlinedIcon  style={{fontSize: "2em"}}/>Contact us </Link>
        <Link><LogoutOutlinedIcon style={{fontSize: "2em"}}/> Log Out</Link>

        </div>
        
        </div>
    </div>
  )
}

export default DesNavbar

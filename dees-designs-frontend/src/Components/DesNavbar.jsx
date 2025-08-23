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
import {useRef,useContext} from 'react'
import { themeContext } from '../Context/ThemeContext';
import { useNavigate } from 'react-router-dom';


function DesNavbar() {
  const { colorBW, theme, setTheme, setColorBW } = useContext(themeContext);
  const nav = useNavigate();


  function handleChangeTheme() {
    if (theme === "light") {
      setTheme("dark");
      setColorBW("white");
      localStorage.setItem("theme", "dark");
    } else {
      setTheme("light");
      setColorBW("black");
      localStorage.setItem("theme", "light");
    }
  }

    function handleLogOut() {
    localStorage.clear();
    nav("/Login");
   
  }
  
  
  return (
    <div className='nav-bar-comp'>
        <div className="top-navbar" >
        <h1>Dee's Designs</h1>
        <p></p>
        <span className="navbar-icons"><BedtimeOutlinedIcon onClick={handleChangeTheme} style={{fontSize: "1.3em"}}/>  <LogoutOutlinedIcon onClick={handleLogOut}style={{fontSize: "1.3em"}}/></span>
        </div>

        
    </div>
  )
}

export default DesNavbar

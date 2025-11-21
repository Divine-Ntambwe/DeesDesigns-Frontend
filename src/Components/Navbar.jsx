import React, { useContext, useState } from "react";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import PermContactCalendarOutlinedIcon from "@mui/icons-material/PermContactCalendarOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import BedtimeOutlinedIcon from "@mui/icons-material/BedtimeOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import PeopleOutlineIcon from '@mui/icons-material/PeopleOutline';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { styled } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import Badge, { badgeClasses } from '@mui/material/Badge';
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import { useRef } from "react";
import { themeContext } from "../Context/ThemeContext";
import { cartContext } from "../Context/CartContext";
import { products } from "../Context/ProductsContext";
import { Authentication } from "../App";
import GradientText from "./ReactBitComp/GradientText"

const CartBadge = styled(Badge)`
  & .${badgeClasses.badge} {
    top: -12px;
    right: -6px;
  }
`;

function Navbar({ handleOpenCart, displayedProducts }) {
  const sideMenuEl = useRef();
  const navBar = useRef();
  const { userDetails } = useContext(Authentication);
  const nav = useNavigate();
  const { colorBW, theme, setTheme, setColorBW } = useContext(themeContext);
  const [modeText, setModeText] = useState(
    theme === "light" ? "Dark" : "Light"
  );
  const { cartNum } = useContext(cartContext);
  const { handleSearchProducts } = useContext(products);

  function handleOpenMenu() {
    sideMenuEl.current.style.display = "block";
    navBar.current.style.display = "none";
  }

  function handleCloseMenu() {
    sideMenuEl.current.style.display = "none";
    navBar.current.style.display = "flex";
  }

  function handleChangeTheme() {
    if (theme === "light") {
      setTheme("dark");
      setModeText("Light");
      setColorBW("white");
      localStorage.setItem("theme", "dark");
    } else {
      setTheme("light");
      setModeText("Dark");
      setColorBW("black");
      localStorage.setItem("theme", "light");
    }
  }

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const location = useLocation();
  const searchPaths = [
    "/Home",
    "/MenWear",
    "/WomenWear",
    "/DesignersCollection",
    "/Accessories"
  ];
  function handleSearchFocus() {
    if (!searchPaths.includes(location.pathname)) {
      nav("/Home");
    }
  }

  function handleSearchProductsInput(e) {
    if (location.pathname === "/Home")
      document
        .getElementById("home-products")
        .scrollIntoView({ behavior: "smooth" });
    handleSearchProducts(e.target.value, location.pathname);
  }

  function handleLogOut() {
    localStorage.clear(); 
    nav("/Login"); 
  
  }
  return (
    <>
      <div className="nav-bar-comp">
        <div className="top-navbar" ref={navBar}>
          
          
       

          <span id="nav-links-cont">
            <p id="burger-menu"><MenuOutlinedIcon onClick={
              handleOpenMenu
            } /></p>
            
            <span id="top-nav-links" className="top-nav-links">
           
            <Link to="/Home">Home</Link>
             {/* <Link to="/Orders">Orders</Link>{" "} */}
            <Link
              id="basic-button"
              aria-controls={open ? "basic-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
              // onMouseLeave={handleClose}
              onClick={handleClick}
            >
              Shop Now
            </Link>
            <Menu
              id="basic-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              slotProps={{
                list: {
                  "aria-labelledby": "basic-button",
                },
              }}
              PaperProps={{
                sx: {
                  bgcolor: "var(--background-color1)", // background of menu
                  color: "var(--dark-purple)", // text color
                  borderRadius: 2, // rounded corners
                  border: "1px solid var(--dark-purple)",
                },
              }}
            >
              <Link  to="/WomenWear"><MenuItem
                sx={{
                  color:"var(--dark-purple)",
                  "&:hover": {
                    bgcolor: "transparent",
                    color: "var(--text-color2)", // hover text
                  },
                }}
                onClick={handleClose}
              >
                Women Wear
              </MenuItem>
              </Link>

              <Link to="/MenWear">
              <MenuItem
                sx={{
                  color:"var(--dark-purple)",
                  "&:hover": {
                    bgcolor: "transparent",
                    color: "var(--text-color2)", // hover text
                  },
                }}
                onClick={handleClose}
              >
                Men Wear
              </MenuItem>
              </Link>

               <Link to="/WomenAccessories">
              <MenuItem
                sx={{
                  color:"var(--dark-purple)",
                  "&:hover": {
                    bgcolor: "transparent",
                    color: "var(--text-color2)", // hover text
                  },
                }}
                onClick={handleClose}
              >
                Women Accessories
              </MenuItem>
              </Link>

                <Link to="/MenAccessories">
              <MenuItem
                sx={{
                  color:"var(--dark-purple)",
                  "&:hover": {
                    bgcolor: "transparent",
                    color: "var(--text-color2)", // hover text
                  },
                }}
                onClick={handleClose}
              >
                Men Accessories
              </MenuItem>
              </Link>

            <Link to="/DesignersCollection">
              <MenuItem
                sx={{
                  color:"var(--dark-purple)",
                  "&:hover": {
                    bgcolor: "transparent",
                    color: "var(--text-color2)", // hover text
                  },
                }}
                onClick={handleClose}
              >
                Designer's Collection
              </MenuItem>
            </Link>

            </Menu>{" "}
            <a href="#footer">Contact Us</a>{" "}
          </span>
          </span>


          <span>
            <Link to="/Home">
            <h1 id="navbar-heading" style={{cursor:"pointer"}}>
              
          <GradientText
 colors = {['#d07a7a','#e54848','#9b4f4f','#c49a9a']}
  animationSpeed={8}
  showBorder={false}
  className="custom-class"
>
  Dee's Designs
</GradientText>
              
              </h1></Link>
          </span>

          <span className="navbar-icons">
            {" "}
            <Box
              sx={{
                // height: "1.3em",
                display: "flex",
                alignItems: "flex-end",
                border: "1px solid var(--dark-purple)",
                borderRadius: "180px",
                backgroundColor: "var(--background-color1)",
                padding: "0 15px 5px 15px",
              }}
              className="search-bar"
            >
              <SearchOutlinedIcon
                sx={{ color: { colorBW }, mr: 0.5, my: 0.5 }}
              />
              <TextField
                autoComplete={false}
                autoSave={false}
                onFocus={handleSearchFocus}
                onChange={(e) => {
                  handleSearchProductsInput(e);
                }}
                id="search-input"
                variant="standard"
                sx={{
                  // height: 20, 
                  // "& .MuiInputBase-root": { height: 20 },
                  "& .MuiInput-underline:hover:before": {
                    borderBottomColor: { colorBW }, // hover
                  },
                  "& .MuiInput-underline:before": {
                    borderBottomColor: "gray", // default
                  },
                  "& .MuiInput-underline:after": {
                    borderBottomColor: "var(--dark-purple)", // focus
                  },
                  "& input::placeholder": {
                    color: "gray",
                    opacity: 1, // needed to fully apply color
                  },
                  "& .MuiInputBase-input": {
                    color: colorBW, // text color
                  },
                }}
                placeholder="search"
              />
            </Box>{" "}
            <AccountCircleOutlinedIcon
              className="cart-profile hideOnMob"
              onClick={handleOpenMenu}
              style={{ fontSize: "1.5em" }}
            />{" "}
            <FavoriteBorderIcon
            className="hideOnMob"
            onClick={()=>{nav("/likes")}}
            style={{ fontSize: "1.5em" }}
            />
            <ShoppingBagOutlinedIcon className="hideOnMob"  onClick={()=>{nav("/orders")}} style={{ fontSize: "1.5em" }} />
           
            {/* <IconButton>
  <ShoppingCartOutlinedIcon  />
  <CartBadge badgeContent={2} color="primary" overlap="circular" />
</IconButton> */}
            <ShoppingCartOutlinedIcon
            className="cart-profile "
              onClick={handleOpenCart}
              style={{ fontSize: "1.5em" }}
            />
            
            {Boolean(cartNum) &&  <span id="num-of-cart-items">{cartNum}</span>}
          </span>
        </div>

        <div ref={sideMenuEl} className="nav-dropdown">
          <h1>
            Dee's Designs{" "}
            <span className="close-sidemenu" onClick={handleCloseMenu}>
              <CloseOutlinedIcon style={{ cursor: "pointer" }} />
            </span>
          </h1>
          <p id="user-details">
            <p>Hi {userDetails.name}!</p>
            <p>{userDetails.email}</p>
          </p>
          <div className="side-bar-links">
            <Link className="side-bar-link" to="/Home">
              <HomeOutlinedIcon style={{ fontSize: "2em" }} />
              Home
            </Link>

            <span
              className="side-bar-link"
              onClick={() => {
                handleCloseMenu();
                handleOpenCart();
              }}
            >
              <ShoppingCartOutlinedIcon style={{ fontSize: "2em" }} />
              Cart
            </span>
            <Link className="side-bar-link" to="/Orders">
              <ShoppingBagOutlinedIcon style={{ fontSize: "2em" }} />
              Orders
            </Link>
            <Link className="side-bar-link" to="/Likes">
              <FavoriteBorderIcon  style={{ fontSize: "2em" }} />
              Likes
            </Link>

             <Link className="side-bar-link" to="/Designers">
              <PeopleOutlineIcon  style={{ fontSize: "2em" }} />
              Local Designers
            </Link>

            
            <span
              className="side-bar-link"
              onClick={() => {
                handleChangeTheme();
                handleCloseMenu();
              }}
            >
              <BedtimeOutlinedIcon style={{ fontSize: "2em" }} />
              {modeText} Mode
            </span>
            <a
              href="#footer"
              onClick={handleCloseMenu}
              className="side-bar-link"
            >
              <PermContactCalendarOutlinedIcon style={{ fontSize: "2em" }} />
              Contact us{" "}
            </a>
            <span className="side-bar-link" onClick={handleLogOut}>
              <LogoutOutlinedIcon style={{ fontSize: "2em" }} /> Log Out
            </span>
          </div>
        </div>
      </div>
    </>
  );
}

export default Navbar;

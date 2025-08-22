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
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import { useRef } from "react";
import { themeContext } from "../Context/ThemeContext";
import { cartContext } from "../Context/CartContext";
import { products } from "../Context/ProductsContext";
import { Authentication } from "../App";

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
          <span className="top-nav-links">
            <Link to="/Home">Home</Link> <Link to="/Orders">Orders</Link>{" "}
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
              <MenuItem
                sx={{
                  "&:hover": {
                    bgcolor: "transparent",
                    color: "var(--text-color2)", // hover text
                  },
                }}
                onClick={handleClose}
              >
                <Link to="/WomenWear">Women Wear</Link>
              </MenuItem>
              <MenuItem
                sx={{
                  "&:hover": {
                    bgcolor: "transparent",
                    color: "var(--text-color2)", // hover text
                  },
                }}
                onClick={handleClose}
              >
                <Link to="/MenWear">Men Wear</Link>
              </MenuItem>
              <MenuItem
                sx={{
                  "&:hover": {
                    bgcolor: "transparent",
                    color: "var(--text-color2)", // hover text
                  },
                }}
                onClick={handleClose}
              >
                <Link to="/DesignersCollection">Designer's Collection</Link>
              </MenuItem>
            </Menu>{" "}
            <a href="#footer">Contact Us</a>{" "}
          </span>

          <span>
            <h1>Dee's Designs</h1>
          </span>

          <span className="navbar-icons">
            {" "}
            <Box
              sx={{
                display: "flex",
                alignItems: "flex-end",
                border: "1px solid var(--dark-purple)",
                borderRadius: "180px",
                backgroundColor: "var(--background-color1)",
                padding: "0 15px 5px",
              }}
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
                id="input-with-sx"
                variant="standard"
                sx={{
                  borderRadius: "180px",
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
              className="cart-profile"
              onClick={handleOpenMenu}
              style={{ fontSize: "1.5em" }}
            />{" "}
            <ShoppingCartOutlinedIcon
            className="cart-profile"
              onClick={handleOpenCart}
              style={{ fontSize: "1.3em" }}
            />
            <span id="num-of-cart-items">{cartNum}</span>
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

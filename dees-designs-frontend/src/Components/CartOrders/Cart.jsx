import React, { useContext, useState } from "react";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import { Link } from "react-router-dom";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import Tooltip from "@mui/material/Tooltip";
import { cartContext } from "../../Context/CartContext";
import useFetch from "../../useFetch";
import { Authentication } from "../../App";
import { appContext } from "../../Context/AppContext";
import Button from "@mui/material/Button";

function Cart() {
  function handleCloseCart() {
    document.querySelector(".cart-popup").style.display = "none";
  }

  const {cartItems,setFetch,cartNum,cartTotal} = useContext(cartContext);
  const {authCred} = useContext(Authentication);

   const {url} = useContext(appContext)
  async function handleRemoveItem(e) {
    const removeCartItemId = e.currentTarget.id;
    try {
      const res = await fetch(
        `${url}/removeCartItem/${removeCartItemId}`,
        {
          method: "DELETE",
          headers: {
            authentication: "application/json",
            Authorization: `Basic ${authCred}`,
          },
        }
      );

      const result = await res.json();

      if (res.status === 200) {
        setFetch(true)
      }
    } catch (e) {
      console.error("error getting", e);
    }
  }

  return (
    <div className="cart-page">
      <div id="cart-menu">
        <h1>
          Cart{" "}
          <span onClick={handleCloseCart} className="close-sidemenu">
            <CloseOutlinedIcon style={{ cursor: "pointer" }} />
          </span>
        </h1>
        <div id="all-cart-items">
          {cartItems &&
            cartItems.map((item) => (
              <div key={item["_id"]} className="cart-items">
                <img
                  src={item.productProvider === "stockProduct"?item.imgPath:`${url}/${item.imgPath}`}
                  alt={`A picture of ${item.productName}`}
                />

                <div>
                  <h4 className="cart-item-name">{item.productName}</h4>
                  <p>R{item.price}.00</p>
                  <p>Size: {item.size}</p>
                  <p>Qty: {item.quantity}</p>
                </div>
                <Tooltip title="Remove from Cart" placement="top">
                  <DeleteOutlineIcon
                    id={item["_id"]}
                    onClick={handleRemoveItem}
                    sx={{
                      cursor: "pointer",
                      "&:hover": {
                        color: "red", // on hover
                      },
                    }}
                  />
                </Tooltip>
              </div>
            ))}
        </div>

       {Boolean(cartNum) &&<> <p id="cart-total">Total: R{cartTotal}.00</p>
        <Link to="/CheckOut">
            <Button
           sx={{
        backgroundColor: "var(--med-purple)",   // button color
        color: "white",            // text color
        width: "100%",            // custom width
        height: "45px",            // custom height
        "&:hover": {
          backgroundColor: "gray", // hover color
        },
        marginBottom: "10px"
      }}
        >
           Checkout
        </Button>
        </Link> </>}
      </div>
    </div>
  );
}

export default Cart;

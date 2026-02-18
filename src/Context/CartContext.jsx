import React, { createContext, useContext, useEffect, useState } from "react";
export const cartContext = createContext();
import useFetch from "../useFetch";
import { Authentication } from "../App";
import { appContext } from "./AppContext";
function CartContext({ children }) {
  const { userDetails, authCred } = useContext(Authentication);
  const { url } = useContext(appContext);
  const { get } = useFetch(`/cart/${userDetails["_id"]}`);
  const [cartItems, setCartItems] = useState();
  const [fetchCartInfo, setFetch] = useState();
  const [cartNum, setCartNum] = useState();
  const [cartTotal, setCartTotal] = useState();

  useEffect(() => {
    if (!userDetails) return;
    setFetch(false);
    get((d) => {
      setCartItems(d);
      setCartNum(
        d.reduce((acc, product) => {
          return acc + product.quantity;
        }, 0),
      );
      setCartTotal(
        d.reduce((acc, product) => {
          return acc + Number(product.price) * product.quantity;
        }, 0),
      );
    });
  }, [userDetails, fetchCartInfo]);

  function updateCartInfo() {
    setCartNum(
      cartItems.reduce((acc, product) => {
        return acc + product.quantity;
      }, 0),
    );
    setCartTotal(
      cartItems.reduce((acc, product) => {
        return acc + Number(product.price) * product.quantity;
      }, 0),
    );
  }
  const [loading, setLoading] = useState(false);
  async function handleRemoveItem(removeCartItemId) {
    setLoading(true);
    try {
      const res = await fetch(`${url}/removeCartItem/${removeCartItemId}`, {
        method: "DELETE",
        headers: {
          authentication: "application/json",
          Authorization: `Basic ${authCred}`,
        },
      });

      const result = await res.json();

      if (res.status === 200) {
        setLoading(false);
        const removedItem = cartItems.find((i) => {
          return i._id === removeCartItemId;
        });
        cartItems.splice(cartItems.indexOf(removedItem), 1);
        setCartItems(cartItems);
        updateCartInfo();
      }
    } catch (e) {
      console.error("error getting", e);
    }
  }

  async function handleUpdateCartItem(cartItemId, cartItem) {
    try {
      setLoading(true);
      console.log("the stuff",cartItem)
      const res = await fetch(`${url}/updateCartItem/${cartItemId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Basic ${authCred}`,
        },
        body: JSON.stringify(cartItem),
      });
      
      if (res.status === 200) {
        setCartItems((prevItems) => {
          return prevItems.map((item) => {
            if (item._id === cartItemId) {
              return { ...item, ...cartItem };
            }
            return item;
          });
        });
        updateCartInfo()
        setLoading(false);
      } else {
        throw new Error("Failed to update cart item");
      }
    } catch (e) {
      console.error("Error updating cart item", e);
      setLoading(false);
    }
  }

  return (
    <cartContext.Provider
      value={{
        loading,
        handleUpdateCartItem,
        cartItems,
        setFetch,
        cartNum,
        cartTotal,
        handleRemoveItem,
        setCartItems,
      }}
    >
      {children}
    </cartContext.Provider>
  );
}

export default CartContext;

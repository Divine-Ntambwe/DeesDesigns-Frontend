import React, { createContext, useContext, useEffect, useState } from 'react'
export const cartContext = createContext();
import useFetch from '../useFetch';
import { Authentication } from '../App'
function CartContext({children}) {
    const {userDetails} = useContext(Authentication);
    const {get} = useFetch(`/cart/${userDetails["_id"]}`);
    const [cartItems,setCartItems] = useState();
    const [fetch,setFetch] = useState();
    const [cartNum,setCartNum] = useState();
    const [cartTotal,setCartTotal] = useState()

    useEffect(()=>{
      setFetch(false)
       get((d)=>{
        setCartItems(d)
        setCartNum(
           d.reduce((acc,product)=>{
            return acc + product.quantity
          },0)
        );
        setCartTotal(
          d.reduce((acc,product)=>{
            return acc + (Number(product.price)*product.quantity)
          },0)
        )
       })

    },[fetch])
  return (
    <cartContext.Provider value = {{cartItems,setFetch,cartNum,cartTotal}}>
        {children}
    </cartContext.Provider>
  )
}

export default CartContext
import React, { createContext, useState } from 'react'
export const shopContext = createContext()

function ShopContext({children}) {
    const [allProducts,setAllProducts] = useState("");
    const [productDetails,setProductDetails] = useState("")
  return (

    <div>
        <shopContext.Provider value={{allProducts,setAllProducts,productDetails,setProductDetails}}>
            {children}
        </shopContext.Provider>
    </div>
  )
}

export default ShopContext
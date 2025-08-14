import React, { createContext, useState } from 'react'
export const shopContext = createContext()

function ShopContext({children}) {
    const [allProducts,setAllProducts] = useState("");

  return (

    <div>
        <shopContext.Provider value={{allProducts,setAllProducts}}>
            {children}
        </shopContext.Provider>
    </div>
  )
}

export default ShopContext
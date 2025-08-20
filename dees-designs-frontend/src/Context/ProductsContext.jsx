import React, { createContext, useEffect, useState, useContext } from "react";
import useFetch from "../useFetch";
import { Authentication } from "../App";
import { appContext } from "./AppContext";

export const products = createContext();

function ProductsContext({ children }) {
  const [allProducts, setAllProducts] = useState("");
  const [productDetails, setProductDetails] = useState("");
  const [homeProducts, setHomeProducts] = useState("");
  const [menProducts, setMenProducts] = useState("");
  const [womenProducts, setWomenProducts] = useState("");
  const [designerProducts, setDesignerProducts] = useState("");
  const [allDesignerProducts, setAllDesignerProducts] = useState("");
  const [reviews, setReviews] = useState("");
  const { userDetails } = useContext(Authentication);
  const { get: getStockProducts } = useFetch("/stockProducts");
  const { get: getDesignerProducts } = useFetch("/allDesignerProducts");

  function getGenderCat() {
    return userDetails.gender === "M" ? "Men" : "Women";
  }

  useEffect(() => {
    getStockProducts((d) => {
      console.log(d);
      setAllProducts(d);
      setHomeProducts(
        [
          ...Object.groupBy(d, ({ menOrWomen }) => {
            return menOrWomen === getGenderCat() ? "1" : "2";
          })["1"],
          ...Object.groupBy(d, ({ menOrWomen }) => {
            return menOrWomen === getGenderCat() ? "1" : "2";
          })["2"],
        ].slice(0, 16)
      );
      setWomenProducts(
        Object.groupBy(d, ({ menOrWomen }) => {
          return menOrWomen === "Women" ? "women" : "men";
        }).women
      );
      setMenProducts(
        Object.groupBy(d, ({ menOrWomen }) => {
          return menOrWomen === "Men" ? "men" : "women";
        }).men
      );
    });

    getDesignerProducts((d) => {
      setDesignerProducts(d);
      setAllDesignerProducts(d)
    });
  }, []);

  const { authCred } = useContext(Authentication);
  const { url } = useContext(appContext);
  async function getReviews(productId) {
    try {
      const res = await fetch(`${url}/reviews/${productId}`, {
        method: "GET",
        headers: {
          authentication: "application/json",
          Authorization: `Basic ${authCred}`,
        },
      });

      const result = await res.json();

      if (res.status === 200) {
        setReviews(result);
      }
    } catch (e) {
      console.error("error getting", e);
    }
  }
  function handleGoToAddToCart(productId) {
    if (allProducts) {
      setProductDetails(allProducts.find((prod) => prod["_id"] === productId));
      getReviews(productId);
    }
  }

  function handleGoToAddDesignToCart(productId) {
    console.log(designerProducts);
    if (designerProducts) {
      setProductDetails(
        designerProducts.find((prod) => prod["_id"] === productId)
      );
      getReviews(productId);
    }
  }

  function handleSearchProducts(searchText, path) {
    let original;
    switch (path) {
      case "/Home":
        original = allProducts

        setHomeProducts(
          original.filter((prod) => {
            return prod.name.toLowerCase().includes(searchText.toLowerCase());
          })
        );
        break;
      case "/WomenWear":
        original =  
          Object.groupBy(allProducts, ({ menOrWomen }) => {
          return menOrWomen === "Women" ? "women" : "men";
        }).women
        
   
    
    setWomenProducts(
      original.filter((prod)=>{
       return prod.name.toLowerCase().includes(searchText.toLowerCase())
      })
      
    )
      break;

    case "/MenWear":
        original =  
          Object.groupBy(allProducts, ({ menOrWomen }) => {
          return menOrWomen === "Men" ? "men" : "women";
        }).men
        
   
    
    setMenProducts(
      original.filter((prod)=>{
       return prod.name.toLowerCase().includes(searchText.toLowerCase())
      })
      
    )
      break; 
      
    case "/DesignersCollection":
        original = allDesignerProducts
        
   
    
    setDesignerProducts(
      original.filter((prod)=>{
       return prod.name.toLowerCase().includes(searchText.toLowerCase())
      })
      
    )
      break;   
    }


  }
  console.log(homeProducts);

  return (
    <div>
      <products.Provider
        value={{
          productDetails,
          setProductDetails,
          handleGoToAddToCart,
          handleGoToAddDesignToCart,
          homeProducts,
          womenProducts,
          menProducts,
          designerProducts,
          allProducts,
          reviews,
          handleSearchProducts,
        }}
      >
        {children}
      </products.Provider>
    </div>
  );
}

export default ProductsContext;

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
  const [accessories, setAaccesories] = useState("");
  const [designerProducts, setDesignerProducts] = useState("");
  const [allDesignerProducts, setAllDesignerProducts] = useState("");
  const [reviews, setReviews] = useState("");
  const { userDetails } = useContext(Authentication);
  const { get: getStockProducts } = useFetch("/stockProducts");
  const { get: getDesignerProducts } = useFetch("/allDesignerProducts");
  const [fetchProducts, setFetchProducts] = useState(false);

  function getGenderCat() {
    return userDetails.gender === "M" ? "Men" : "Women";
  }

  useEffect(() => {
    setFetchProducts(false);
    getStockProducts((d) => {
      setAllProducts(d);
      setHomeProducts(
        [
          ...Object.groupBy(d, ({ menOrWomen, categories }) => {
            return menOrWomen === getGenderCat() &&
              !categories.includes("Accessories")
              ? "1"
              : "2";
          })["1"],
          ...Object.groupBy(d, ({ menOrWomen, categories }) => {
            return menOrWomen === getGenderCat() &&
              !categories.includes("Accessories")
              ? "1"
              : "2";
          })["2"],
        ].slice(0, 20)
      );
      setWomenProducts(
        Object.groupBy(d, ({ menOrWomen, categories }) => {
          return menOrWomen === "Women" && !categories.includes("Accessories")
            ? "women"
            : "men";
        }).women
      );
      setMenProducts(
        Object.groupBy(d, ({ menOrWomen, categories }) => {
          return menOrWomen === "Men" && !categories.includes("Accessories")
            ? "men"
            : "women";
        }).men
      );

      setAaccesories(
        Object.groupBy(d, ({ categories }) => {
          return categories.includes("Accessories")
            ? "accessories"
            : "non-accessories";
        }).accessories
      );
    });

    getDesignerProducts((d) => {
      setDesignerProducts(d);
      setAllDesignerProducts(d);
    });
  }, [fetchProducts]);

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
      console.error("error getting reviews", e);
    }
  }

  async function getDesignersReviews(designerId) {
    console.log(designerId);
    try {
      const res = await fetch(`${url}/designerReviews/${designerId}`, {
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
      console.error("error getting reviews", e);
    }
  }

  function handleGoToAddToCart(productId) {
    if (allProducts) {
      setProductDetails(allProducts.find((prod) => prod["_id"] === productId));
      getReviews(productId);
    }
  }

  function handleGoToAddDesignToCart(productId) {
    if (designerProducts) {
      const prod = designerProducts.find((prod) => prod["_id"] === productId);
      setProductDetails(prod);
      getDesignersReviews(prod.designerId);
    }
  }

  function handleSearchProducts(searchText, path) {
    let original;
    switch (path) {
      case "/Home":
        if (searchText.length === 0) {
          setHomeProducts(
            [
              ...Object.groupBy(allProducts, ({ menOrWomen }) => {
                return menOrWomen === getGenderCat() ? "1" : "2";
              })["1"],
              ...Object.groupBy(allProducts, ({ menOrWomen }) => {
                return menOrWomen === getGenderCat() ? "1" : "2";
              })["2"],
            ].slice(0, 20)
          );
          return;
        }

        setHomeProducts(
          allProducts.filter((prod) => {
            return prod.name.toLowerCase().includes(searchText.toLowerCase());
          })
        );
        break;
      case "/WomenWear":
        original = Object.groupBy(allProducts, ({ menOrWomen }) => {
          return menOrWomen === "Women" ? "women" : "men";
        }).women;

        setWomenProducts(
          original.filter((prod) => {
            return prod.name.toLowerCase().includes(searchText.toLowerCase());
          })
        );
        break;

      case "/MenWear":
        original = Object.groupBy(allProducts, ({ menOrWomen }) => {
          return menOrWomen === "Men" ? "men" : "women";
        }).men;

        setMenProducts(
          original.filter((prod) => {
            return prod.name.toLowerCase().includes(searchText.toLowerCase());
          })
        );
        break;

      case "/DesignersCollection":
        original = allDesignerProducts;

        setDesignerProducts(
          original.filter((prod) => {
            return prod.name.toLowerCase().includes(searchText.toLowerCase());
          })
        );
        break;
      case "/Accessories":
        original = Object.groupBy(allProducts, ({ categories }) => {
          return categories.includes("Accessories")
            ? "accessories"
            : "non-accessories";
        }).accessories;

        setAaccesories(
          original.filter((prod) => {
            return prod.name.toLowerCase().includes(searchText.toLowerCase());
          })
        );
        break;
    }
  }

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
          setFetchProducts,
          accessories,
        }}
      >
        {children}
      </products.Provider>
    </div>
  );
}

export default ProductsContext;

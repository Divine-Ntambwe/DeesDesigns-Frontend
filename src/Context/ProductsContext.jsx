import React, {
  createContext,
  useEffect,
  useState,
  useContext,
  Profiler,
} from "react";
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
  const [womenAccessories, setWomenAccessories] = useState("");
  const [menAccessories, setMenAccessories] = useState("");
  const [designerProducts, setDesignerProducts] = useState("");
  const [likedProducts, setLikedProducts] = useState(null);
  const [allDesignerProducts, setAllDesignerProducts] = useState("");
  const [orders, setOrders] = useState(null);
  const [reviews, setReviews] = useState("");
  const { userDetails } = useContext(Authentication);
  const { get: getStockProducts } = useFetch("/stockProducts");
  const { get: getDesignerProducts } = useFetch("/allDesignerProducts");
  const { get: getOrders } = useFetch(`/customerOrders/${userDetails["_id"]}`);
  const { get: getLikes } = useFetch(`/likes/${userDetails["_id"]}`);
  const [numOfHomeProducts,setNumOfHomeProducts] = useState(10)

  const [fetchProducts, setFetchProducts] = useState(false);
  const [random,setRandom] = useState(Math.floor(Math.random()*21));

  function getGenderCat() {
    return userDetails.gender === "M" ? "Men" : "Women";
  }

  useEffect(() => {
    if (!userDetails) return;
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
        ].slice(random, random+numOfHomeProducts)
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

      setWomenAccessories(
        Object.groupBy(d, ({ categories,menOrWomen }) => {
          return categories.includes("Accessories") && menOrWomen === "Women"
            ? "accessories"
            : "non-accessories";
        }).accessories
      );
      setMenAccessories(
        Object.groupBy(d, ({ categories,menOrWomen }) => {
          return categories.includes("Accessories") && menOrWomen === "Men"
            ? "accessories"
            : "non-accessories";
        }).accessories
      );
    });

    getDesignerProducts((d) => {
      setDesignerProducts(d);
      setAllDesignerProducts(d);
    });
    getOrders((d) => {
      setOrders(d);
    });
    getLikes((d) => {
      setLikedProducts(d);
      console.log(d)
    });
  }, [fetchProducts]);

  useEffect(()=>{
allProducts && setHomeProducts(
        [
          ...Object.groupBy(allProducts, ({ menOrWomen, categories }) => {
            return menOrWomen === getGenderCat() &&
              !categories.includes("Accessories")
              ? "1"
              : "2";
          })["1"],
          ...Object.groupBy(allProducts, ({ menOrWomen, categories }) => {
            return menOrWomen === getGenderCat() &&
              !categories.includes("Accessories")
              ? "1"
              : "2";
          })["2"],
        ].slice(random, random+numOfHomeProducts)
      );
  },[numOfHomeProducts])

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
        // if (typeofreviews)

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
          ...Object.groupBy(allProducts, ({ menOrWomen, categories }) => {
            return menOrWomen === getGenderCat() &&
              !categories.includes("Accessories")
              ? "1"
              : "2";
          })["1"],
          ...Object.groupBy(allProducts, ({ menOrWomen, categories }) => {
            return menOrWomen === getGenderCat() &&
              !categories.includes("Accessories")
              ? "1"
              : "2";
          })["2"],
        ].slice(random, random+numOfHomeProducts)
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
      case "/WomenAccessories":
        original =
        Object.groupBy(allProducts, ({ categories,menOrWomen }) => {
          return categories.includes("Accessories") && menOrWomen === "Women"
            ? "accessories"
            : "non-accessories";
        }).accessories
      

        setWomenAccessories(
          original.filter((prod) => {
            return prod.name.toLowerCase().includes(searchText.toLowerCase());
          })
        );
        break;

        case "/MenAccessories":
        original =
        Object.groupBy(allProducts, ({ categories,menOrWomen }) => {
          return categories.includes("Accessories") && menOrWomen === "Men"
            ? "accessories"
            : "non-accessories";
        }).accessories
      

        setMenAccessories(
          original.filter((prod) => {
            return prod.name.toLowerCase().includes(searchText.toLowerCase());
          })
        );
        break;
    }
  }

  const { postAuth } = useFetch(`/addToLikes`);
  function handleLikeProduct(product) {
    const { name, price, imagePath,_id } = product;
    postAuth(
      {
        customerId: userDetails._id,
        productId: _id,
        name,
        price,
        imagePath,
      },
      () => {
        setLikedProducts([...likedProducts, {
          customerId: userDetails._id,
          productId: _id,
          name,
          price,
          imagePath,
        }]);
      }
    );
  }

  const {deleteApi} = useFetch("/removeLikedItem");
  function handleRemoveLikedItem(product){
    deleteApi(()=>{
      likedProducts.splice(likedProducts.findIndex((liked)=>{return liked.productId === product._id}),1)
   
      setLikedProducts(likedProducts)
    },
    {productId: product._id}
  );

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
          womenAccessories,
          menAccessories,
          orders,
          handleLikeProduct,
          likedProducts,
          handleRemoveLikedItem,
          setNumOfHomeProducts,
          numOfHomeProducts
        }}
      >
        {children}
      </products.Provider>
    </div>
  );
}

export default ProductsContext;

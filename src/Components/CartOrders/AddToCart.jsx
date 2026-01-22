import React, { useContext, useEffect, useRef, useState } from "react";
import Navbar from "../Navbar";
import "./cartOrders.modules.css";
import Rating from "@mui/material/Rating";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import LinearProgress from "@mui/material/LinearProgress";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import Footer from "../Footer";
import Cart from "./Cart";
import { appContext } from "../../Context/AppContext";
import { products } from "../../Context/ProductsContext";
import { useParams } from "react-router-dom";
import { Authentication } from "../../App";
import useFetch from "../../useFetch";
import { cartContext } from "../../Context/CartContext";
import Button from "@mui/material/Button";
import SentimentVeryDissatisfiedIcon from "@mui/icons-material/SentimentVeryDissatisfied";
import { Skeleton } from "@mui/material";
import { themeContext } from "../../Context/ThemeContext";
import {
  Container,
  Grid,
  Box,
  Card,
  CardMedia,
  CardContent,
  Typography,
  Chip,
  TextField,
  IconButton,
  Paper,
  Divider,
  Stack,
  Alert,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

function AddToCart() {
  const [progress, setProgress] = React.useState(90);
  const { handleOpenCart } = useContext(appContext);
  const cartPopUp = useRef();
  const { productDetails, handleGoToAddToCart, allProducts, reviews } =
    useContext(products);
  const [size, setSize] = useState("XS");
  const [quantity, setQuantity] = useState(1);
  const { userDetails } = useContext(Authentication);
  const productId = useParams().productId;
  const { setFetch, setCartItems, cartItems } = useContext(cartContext);
  const [rating, setRating] = useState();
  const { theme } = useContext(themeContext);

  const increase = () => setQuantity((q) => (q < 10 ? q + 1 : 10));
  const decrease = () => setQuantity((q) => (q > 1 ? q - 1 : 1));
  const { postAuth, loading, error } = useFetch("/addToCart");

  function handleAddToCart(e) {
    e.preventDefault();
    const cartItem = {
      customerId: userDetails["_id"],
      productId,
      productName: productDetails.name,
      price: productDetails.price,
      size,
      quantity,
      imgPath: productDetails.imagePath[0],
      productProvider: "stockProduct",
    };
    postAuth(cartItem, (d) => {
      setFetch(true);

      setTimeout(() => {
        handleOpenCart(cartPopUp.current);
      }, 100);
    });
  }

  const heading = useRef();
  useEffect(() => {
    heading.current.scrollIntoView({ behavior: "smooth" });
  });
  useEffect(() => {
    handleGoToAddToCart(productId);
    if (productDetails.productId === productId)
      setRating(
        productDetails.rating.length === 0
          ? "0"
          : productDetails.rating.reduce((acc, i) => {
              return acc + i;
            }, 0) / productDetails.rating.length
      );
  }, [allProducts]);

  function getMeasurements() {
    const arr = [];
    for (let [x, y] of Object.entries(productDetails.measurementDescription)) {
      arr.push(x + ": " + y);
    }
    return arr;
  }

  return (
    <>
      <div className="AddToCart">
        <div className="navbar">
          <Navbar
            handleOpenCart={() => {
              handleOpenCart(cartPopUp.current);
            }}
          />
        </div>

        <div className="cart-popup" ref={cartPopUp}>
          <Cart />
        </div>

        <Container maxWidth="lg" sx={{ py: 6 }}>
          {/* Page Title */}
          <Typography
            ref={heading}
            id="AddToCart"
            variant="h3"
            component="h1"
            gutterBottom
            sx={{
              fontWeight: 700,
              color: "var(--dark-purple)",
              mb: 4,
              textAlign: { xs: "center", md: "left" },
            }}
          >
            Add To Cart
          </Typography>

          {productDetails.rating && (
            <>
              {/* Product Details Section */}
              <Grid
                container
                spacing={4}
                sx={{
                  mb: 6,
                  display: "flex",
                  alignItems: "flex-start",
                }}
              >
                {/* Product Image */}
                <Grid item xs={12} sm={12} md={6}>
                  <Card
                    sx={{
                      borderRadius: 2,
                      overflow: "hidden",
                      boxShadow: "0 8px 24px rgba(0,0,0,0.12)",
                    }}
                  >
                    <Box
                      component="img"
                      src={productDetails.imagePath[0]}
                      alt={productDetails.name}
                      sx={{
                        width: "100%",
                        // height: { xs: 260, sm: 300, md: 420 },
                        maxHeight: 520,
                        objectFit: "cover",
                        display: "block",
                      }}
                    />
                  </Card>
                </Grid>

                {/* Product Details */}
                <Grid item xs={12} sm={12} md={6}>
                  <Paper
                    elevation={0}
                    sx={{
                      p: { xs: 3, md: 4 },
                      backgroundColor: "transparent",
                    }}
                  >
                    {/* Product Name */}
                    <Typography
                      variant="h4"
                      component="h2"
                      sx={{
                        fontWeight: 700,
                        color: "var(--dark-purple)",
                        mb: 2,
                      }}
                    >
                      {productDetails.name}
                    </Typography>

                    {/* Rating */}
                    {reviews && productDetails && (
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          gap: 1,
                          mb: 3,
                        }}
                      >
                        <Rating
                          value={
                            productDetails.rating.length === 0
                              ? 0
                              : productDetails.rating.reduce((acc, i) => {
                                  return acc + i;
                                }, 0) / productDetails.rating.length
                          }
                          precision={0.5}
                          readOnly
                          sx={{
                            "& .MuiRating-iconFilled": {
                              color: "orange",
                            },
                            "& .MuiRating-iconEmpty": {
                              color: "lightgray",
                            },
                          }}
                        />
                        <Typography
                          variant="body2"
                          sx={{ color: "var(--text-color2)" }}
                        >
                          (
                          {productDetails.rating.length === 0
                            ? "0"
                            : (
                                productDetails.rating.reduce((acc, i) => {
                                  return acc + i;
                                }, 0) / productDetails.rating.length
                              ).toFixed(1)}
                          ) - {productDetails.rating.length} reviews
                        </Typography>
                      </Box>
                    )}

                    {/* Price */}
                    <Typography
                      variant="h5"
                      sx={{
                        fontWeight: 700,
                        color: "var(--dark-purple)",
                        mb: 3,
                        fontSize: { xs: "1.8rem", md: "2rem" },
                      }}
                    >
                      R{productDetails.price}.00
                    </Typography>

                    <Divider sx={{ my: 3 }} />

                    {/* Measurements */}
                    {productDetails && (
                      <Box sx={{ mb: 3 }}>
                        <Typography
                          variant="subtitle1"
                          sx={{
                            fontWeight: 600,
                            color: "var(--dark-purple)",
                            mb: 2,
                          }}
                        >
                          Standard Measurements
                        </Typography>
                        <Stack
                          direction="row"
                          spacing={2}
                          sx={{
                            flexWrap: "wrap",
                            gap: 2,
                          }}
                        >
                          {getMeasurements().map((measurement, idx) => (
                            <Chip
                              key={idx}
                              label={measurement}
                              variant="outlined"
                              sx={{
                                borderColor: "var(--dark-purple)",
                                color: "var(--text-color2)",
                                fontWeight: 500,
                              }}
                            />
                          ))}
                        </Stack>
                      </Box>
                    )}

                    {/* Form */}
                    <Box
                      component="form"
                      onSubmit={handleAddToCart}
                      id="add-to-cart-form"
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        gap: 3,
                        mt: 4,
                      }}
                    >
                      {/* Quantity Selector */}
                      <Box>
                        <Typography
                          variant="subtitle1"
                          sx={{
                            fontWeight: 600,
                            color: "var(--dark-purple)",
                            mb: 2,
                          }}
                        >
                          Quantity
                        </Typography>
                        <Stack
                          direction="row"
                          alignItems="center"
                          spacing={1}
                          sx={{
                            border: "1px solid #ddd",
                            borderRadius: 1,
                            width: "fit-content",
                            p: 1,
                          }}
                        >
                          <IconButton
                            size="small"
                            onClick={decrease}
                            sx={{
                              color: "var(--dark-purple)",
                              "&:hover": {
                                backgroundColor:
                                  "rgba(128, 0, 128, 0.1)",
                              },
                            }}
                          >
                            <RemoveIcon />
                          </IconButton>
                          <TextField
                            value={quantity}
                            disabled
                            variant="standard"
                            inputProps={{ style: { textAlign: "center" } }}
                            sx={{
                              width: 60,
                              "& input": {
                                fontSize: "1.1rem",
                                fontWeight: 600,
                              },
                            }}
                          />
                          <IconButton
                            size="small"
                            onClick={increase}
                            sx={{
                              color: "var(--dark-purple)",
                              "&:hover": {
                                backgroundColor:
                                  "rgba(128, 0, 128, 0.1)",
                              },
                            }}
                          >
                            <AddIcon />
                          </IconButton>
                        </Stack>
                      </Box>

                      {/* Size Selector */}
                      <Box>
                        <Typography
                          variant="subtitle1"
                          sx={{
                            fontWeight: 600,
                            color: "var(--dark-purple)",
                            mb: 2,
                          }}
                        >
                          Size
                        </Typography>
                        <Stack
                          direction="row"
                          spacing={2}
                          sx={{
                            flexWrap: "wrap",
                            gap: 2,
                          }}
                        >
                          {productDetails &&
                            Object.entries(productDetails.itemsInStock)
                              .filter(([x, y]) => {
                                return y > 0;
                              })
                              .map(([x, y]) => (
                                <Chip
                                  key={x}
                                  label={x}
                                  onClick={(e) => {
                                    setSize(x);
                                  }}
                                  variant={size === x ? "filled" : "outlined"}
                                  sx={{
                                    borderColor: "var(--dark-purple)",
                                    color:
                                      size === x
                                        ? "white"
                                        : "var(--text-color2)",
                                    backgroundColor:
                                      size === x
                                        ? "var(--dark-purple)"
                                        : "transparent",
                                    fontWeight: 600,
                                    cursor: "pointer",
                                    transition:
                                      "all 0.3s ease",
                                    "&:hover": {
                                      borderColor:
                                        "var(--dark-purple)",
                                      backgroundColor:
                                        size === x
                                          ? "var(--dark-purple)"
                                          : "rgba(128, 0, 128, 0.1)",
                                    },
                                  }}
                                />
                              ))}
                        </Stack>
                      </Box>

                      {/* Error Alert */}
                      {error && (
                        <Alert severity="error" sx={{ mt: 2 }}>
                          Network Error. Please Refresh Or Try Again
                          Later
                        </Alert>
                      )}

                      {/* Add to Cart Button */}
                      <Button
                        id="add-to-cart-btn"
                        type="submit"
                        disabled={loading}
                        variant="contained"
                        size="large"
                        startIcon={
                          !loading && (
                            <ShoppingCartOutlinedIcon />
                          )
                        }
                        sx={{
                          backgroundColor: "var(--med-purple)",
                          color: "white",
                          fontWeight: 600,
                          fontSize: "1rem",
                          py: 2,
                          mt: 2,
                          textTransform: "none",
                          "&:hover": {
                            backgroundColor: "var(--dark-purple)",
                            boxShadow: "0 4px 12px rgba(128, 0, 128, 0.3)",
                          },
                          "&:disabled": {
                            opacity: 0.7,
                          },
                        }}
                      >
                        {loading ? "Adding to Cart..." : "Add To Cart"}
                      </Button>
                    </Box>
                  </Paper>
                </Grid>
              </Grid>
            </>
          )}

          {/* Reviews Section */}
          <Box sx={{ mt: 8 }}>
            <Typography
              variant="h4"
              sx={{
                fontWeight: 700,
                color: "var(--text-color2)",
                mb: 4,
              }}
              id="review-heading"
            >
              Customer Reviews
            </Typography>

            {typeof reviews === "string" ? (
              <Paper
                elevation={0}
                sx={{
                  p: 4,
                  textAlign: "center",
                  backgroundColor: "rgba(128, 0, 128, 0.05)",
                  borderRadius: 2,
                }}
              >
                <Stack
                  direction="row"
                  justifyContent="center"
                  alignItems="center"
                  spacing={2}
                >
                  <SentimentVeryDissatisfiedIcon
                    sx={{
                      fontSize: "2.5rem",
                      color: "var(--text-color2)",
                    }}
                  />
                  <Typography
                    variant="h6"
                    sx={{ color: "var(--text-color2)" }}
                  >
                    No Reviews Yet
                  </Typography>
                </Stack>
              </Paper>
            ) : (
              <Grid container spacing={3}>
                {reviews.map((review, idx) => (
                  <Grid item xs={12} key={idx}>
                    <Paper
                      elevation={0}
                      sx={{
                        p: 3,
                        borderLeft: "4px solid var(--dark-purple)",
                        backgroundColor: "rgba(128, 0, 128, 0.02)",
                        borderRadius: 1,
                      }}
                    >
                      {/* Review Header */}
                      <Stack
                        direction={{ xs: "column", sm: "row" }}
                        justifyContent="space-between"
                        alignItems={{ xs: "flex-start", sm: "center" }}
                        spacing={2}
                        sx={{ mb: 2 }}
                      >
                        <Typography
                          variant="h6"
                          sx={{
                            fontWeight: 700,
                            color: "var(--dark-purple)",
                          }}
                        >
                          {review.name} {review.surname}
                        </Typography>
                        <Typography
                          variant="caption"
                          sx={{
                            color: "var(--text-color2)",
                            opacity: 0.7,
                          }}
                        >
                          {new Date(
                            review.dateOfUpload
                          ).toLocaleDateString()}
                        </Typography>
                      </Stack>

                      {/* Rating */}
                      <Rating
                        value={review.rating}
                        precision={0.5}
                        readOnly
                        sx={{
                          mb: 2,
                          "& .MuiRating-iconFilled": {
                            color: "orange",
                          },
                          "& .MuiRating-iconEmpty": {
                            color: "lightgray",
                          },
                        }}
                      />

                      {/* Review Text */}
                      <Typography
                        variant="body1"
                        sx={{
                          color: "var(--text-color2)",
                          lineHeight: 1.6,
                        }}
                      >
                        {review.review}
                      </Typography>
                    </Paper>
                  </Grid>
                ))}
              </Grid>
            )}
          </Box>
        </Container>
      </div>
      <div id="footer">
        <Footer />
      </div>
    </>
  );
}

export default AddToCart;

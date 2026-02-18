import React, { useContext, useEffect, useRef, useState } from "react";
import Navbar from "../Navbar";
import Rating from "@mui/material/Rating";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import Footer from "../Footer";
import Cart from "./Cart";
import { appContext } from "../../Context/AppContext";
import { products } from "../../Context/ProductsContext";
import { useParams } from "react-router-dom";
import { Authentication } from "../../App";
import useFetch from "../../useFetch";
import { cartContext } from "../../Context/CartContext";
import {
  Container,
  Grid,
  Box,
  Card,
  CardMedia,
  Typography,
  Chip,
  TextField,
  IconButton,
  Paper,
  Divider,
  Stack,
  Alert,
  Button,
  ToggleButton,
  ToggleButtonGroup,
  Tooltip,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import SentimentVeryDissatisfiedIcon from "@mui/icons-material/SentimentVeryDissatisfied";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";

function AddToCart() {
  const [quantity, setQuantity] = useState(1);
  const [size, setSize] = useState("XS");
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [stockForSelectedSize, setStockForSelectedSize] = useState(null);

  const { handleOpenCart } = useContext(appContext);
  const cartPopUp = useRef(null);
  const { productDetails, handleGoToAddToCart, allProducts, reviews } =
    useContext(products);
  const { userDetails } = useContext(Authentication);
  const { productId } = useParams();
  const { setFetch } = useContext(cartContext);
  const { postAuth, loading, error } = useFetch("/addToCart");

  const increase = () => setQuantity((q) => (q < 10 ? q + 1 : 10));
  const decrease = () => setQuantity((q) => (q > 1 ? q - 1 : 1));

  const headingRef = useRef(null);

  useEffect(() => {
    headingRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  useEffect(() => {
    handleGoToAddToCart(productId);
    setSelectedImageIndex(0);
  }, [productId, allProducts]);

  // Update stock info when size changes
  useEffect(() => {
    if (productDetails?.itemsInStock && size) {
      const stock = productDetails.itemsInStock[size] || 0;
      setStockForSelectedSize(stock);
    } else {
      setStockForSelectedSize(null);
    }
  }, [size, productDetails]);

  function handleAddToCart(e) {
    e.preventDefault();
    if (stockForSelectedSize === 0) return; // prevent add if out of stock

    const cartItem = {
      customerId: userDetails?._id,
      productId,
      productName: productDetails.name,
      price: productDetails.price,
      size,
      quantity,
      imgPath: productDetails.imagePath?.[0],
      productProvider: "stockProduct",
    };

    postAuth(cartItem, () => {
      setFetch(true);
      setTimeout(() => {
        handleOpenCart(cartPopUp.current);
      }, 100);
    });
  }

  function getMeasurements() {
    if (!productDetails?.measurementDescription) return [];
    return Object.entries(productDetails.measurementDescription).map(
      ([key, value]) => `${key}: ${value}`
    );
  }

  const images = productDetails?.imagePath || [];
  const hasMultipleImages = images.length > 1;
  const currentImage = images[selectedImageIndex] || "";

  const averageRating =
    productDetails?.rating?.length > 0
      ? productDetails.rating.reduce((a, b) => a + b, 0) / productDetails.rating.length
      : 0;

  // Stock status helpers
  const isOutOfStock = stockForSelectedSize === 0;
  const isLowStock = stockForSelectedSize > 0 && stockForSelectedSize <= 5;
  const isCriticalStock = stockForSelectedSize > 0 && stockForSelectedSize <= 2;

  return (
    <Box sx={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <Navbar handleOpenCart={() => handleOpenCart(cartPopUp.current)} />

      <Box className="cart-popup" ref={cartPopUp}>
        <Cart />
      </Box>

      <Container maxWidth="lg" sx={{ py: { xs: 4, md: 8 }, flex: 1 }}>
        <Typography
          ref={headingRef}
          variant="h3"
          component="h1"
          fontWeight={700}
          color="var(--dark-purple)"
          gutterBottom
          sx={{ mb: 5, textAlign: { xs: "center", md: "left" } }}
        >
          Add to Cart
        </Typography>

        {productDetails && (
          <Grid container spacing={5}>
            {/* Images Column */}
            <Grid item xs={12} md={6}>
              <Card
                elevation={4}
                sx={{
                  borderRadius: 3,
                  overflow: "hidden",
                  position: "relative",
                  transition: "all 0.4s ease",
                  "&:hover": {
                    boxShadow: "0 12px 40px rgba(0,0,0,0.18)",
                  },
                }}
              >
                <Box
                  sx={{
                    overflow: "hidden",
                    position: "relative",
                    width: "100%",
                    height: { xs: 360, sm: 480, md: 520 },
                  }}
                >
                  <CardMedia
                    component="img"
                    image={currentImage}
                    alt={productDetails.name}
                    sx={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      transition: "transform 0.5s ease",
                      transform: "scale(1)",
                      "&:hover": {
                        transform: "scale(1.08)",
                      },
                    }}
                  />
                </Box>
              </Card>

              {hasMultipleImages && (
                <Stack
                  direction="row"
                  spacing={1.5}
                  sx={{ mt: 3, justifyContent: "center", flexWrap: "wrap" }}
                >
                  {images.map((img, idx) => (
                    <Box
                      key={idx}
                      onClick={() => setSelectedImageIndex(idx)}
                      sx={{
                        width: 80,
                        height: 80,
                        borderRadius: 2,
                        overflow: "hidden",
                        border: 3,
                        borderColor:
                          idx === selectedImageIndex ? "primary.main" : "grey.300",
                        cursor: "pointer",
                        transition: "all 0.25s",
                        "&:hover": {
                          borderColor: "primary.light",
                          transform: "scale(1.08)",
                        },
                      }}
                    >
                      <Box
                        component="img"
                        src={img}
                        alt={`Thumbnail ${idx + 1}`}
                        sx={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                        }}
                      />
                    </Box>
                  ))}
                </Stack>
              )}
            </Grid>

            {/* Details Column */}
            <Grid item xs={12} md={6}>
              <Box sx={{ px: { md: 2 } }}>
                <Typography variant="h4" fontWeight={700} color="var(--dark-purple)" gutterBottom>
                  {productDetails.name}
                </Typography>

                <Stack direction="row" alignItems="center" spacing={1.5} sx={{ mb: 3 }}>
                  <Rating
                    value={averageRating}
                    precision={0.5}
                    readOnly
                    sx={{ "& .MuiRating-iconFilled": { color: "orange" } }}
                  />
                  <Typography variant="body2" color="text.secondary">
                    {averageRating.toFixed(1)} ({productDetails.rating?.length || 0} reviews)
                  </Typography>
                </Stack>

                <Typography variant="h5" fontWeight={700} color="var(--dark-purple)" sx={{ mb: 4 }}>
                  R{productDetails.price}.00
                </Typography>

                <Divider sx={{ my: 4 }} />

                <Box sx={{ mb: 4 }}>
                  <Typography variant="subtitle1" fontWeight={600} gutterBottom>
                    Standard Measurements
                  </Typography>
                  <Stack direction="row" spacing={1.5} sx={{ flexWrap: "wrap" }}>
                    {getMeasurements().map((m, i) => (
                      <Chip key={i} label={m} variant="outlined" color="var(--dark-purple)" size="small" />
                    ))}
                  </Stack>
                </Box>

                <Box component="form" onSubmit={handleAddToCart} sx={{ mt: 4 }}>
                  {/* Quantity */}
                  <Box sx={{ mb: 4 }}>
                    <Typography variant="subtitle1" fontWeight={600} gutterBottom>
                      Quantity
                    </Typography>
                    <Stack direction="row" alignItems="center" spacing={1}>
                      <IconButton
                        disabled={quantity === 1}
                        onClick={decrease}
                        color="var(--dark-purple)"
                        size="small"
                        sx={{ border: 1, borderColor: "divider",color:"var(--dark-purple)" }}
                      >
                        <RemoveIcon />
                      </IconButton>
                      <TextField
                        value={quantity}
                        size="small"
                        sx={{ width: 80, mx: 1 }}
                        inputProps={{ style: { textAlign: "center" } }}
                        disabled

                      />
                      <IconButton
                        disabled={quantity === 10}
                        onClick={increase}
                        size="small"
                        sx={{ border: 1, borderColor: "divider",color:"var(--dark-purple)" }}
                      >
                        <AddIcon />
                      </IconButton>
                    </Stack>
                  </Box>

                  {/* Size + Stock Warning */}
                  <Box sx={{ mb: 5 }}>
                    <Typography variant="subtitle1" fontWeight={600} gutterBottom>
                      Size
                    </Typography>

                    <ToggleButtonGroup
                      value={size}
                      exclusive
                      onChange={(_, newSize) => newSize && setSize(newSize)}
                      aria-label="product size"
                    >
                      {productDetails?.itemsInStock &&
                        Object.entries(productDetails.itemsInStock)
                          .filter(([, stock]) => stock > 0)
                          .map(([sz]) => (
                            <ToggleButton key={sz} value={sz} sx={{ px: 4, py: 1 }}>
                              {sz}
                            </ToggleButton>
                          ))}
                    </ToggleButtonGroup>

                    {/* Stock Status */}
                    {stockForSelectedSize !== null && (
                      <Box sx={{ mt: 2 }}>
                        {isOutOfStock ? (
                          <Alert severity="error" icon={<WarningAmberIcon />}>
                            Out of stock in size {size}
                          </Alert>
                        ) : isCriticalStock ? (
                          <Alert severity="warning" icon={<WarningAmberIcon />}>
                            Only {stockForSelectedSize} left in size {size} — order soon!
                          </Alert>
                        ) : isLowStock ? (
                          <Alert severity="info" icon={<WarningAmberIcon />}>
                            Low stock: {stockForSelectedSize} remaining in size {size}
                          </Alert>
                        ) : (
                          <Typography variant="body2" color="success.main" sx={{ mt: 1 }}>
                            In stock: {stockForSelectedSize} available
                          </Typography>
                        )}
                      </Box>
                    )}
                  </Box>

                  {error && (
                    <Alert severity="error" sx={{ mb: 3 }}>
                      Network Error. Please try again later.
                    </Alert>
                  )}

                  <Tooltip
                    title={isOutOfStock ? "Cannot add — out of stock" : ""}
                    arrow
                  >
                    <span>
                      <Button
                        type="submit"
                        variant="contained"
                        // color="primary"
                        size="large"
                        disabled={loading || isOutOfStock}
                        startIcon={!loading && <ShoppingCartOutlinedIcon />}
                        fullWidth
                        sx={{ py: 1.8, fontSize: "1.1rem",backgroundColor:"var(--dark-purple)" }}
                      >
                        {loading
                          ? "Adding..."
                          : isOutOfStock
                          ? "Out of Stock"
                          : "Add to Cart"}
                      </Button>
                    </span>
                  </Tooltip>
                </Box>
              </Box>
            </Grid>
          </Grid>
        )}

        {/* Reviews Section */}
        <Box sx={{ mt: 10 }}>
          <Typography variant="h4" fontWeight={700} color="text.primary" gutterBottom>
            Customer Reviews
          </Typography>

          {typeof reviews === "string" || !reviews?.length ? (
            <Paper
              sx={{
                p: 5,
                textAlign: "center",
                bgcolor: "action.hover",
                borderRadius: 3,
              }}
            >
              <Stack alignItems="center" spacing={2}>
                <SentimentVeryDissatisfiedIcon sx={{ fontSize: 60, color: "text.disabled" }} />
                <Typography variant="h6" color="text.secondary">
                  No Reviews Yet
                </Typography>
              </Stack>
            </Paper>
          ) : (
            <Stack spacing={3}>
              {reviews.map((review, idx) => (
                <Paper
                  key={idx}
                  variant="outlined"
                  sx={{
                    p: 3,
                    borderLeft: 5,
                    borderColor: "var(--dark-purple)",
                    bgcolor: "background.paper",
                  }}
                >
                  <Stack
                    direction={{ xs: "column", sm: "row" }}
                    justifyContent="space-between"
                    mb={1.5}
                  >
                    <Typography variant="h6" fontWeight={600} color="var(--dark-purple)">
                      {review.name} {review.surname}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      {new Date(review.dateOfUpload).toLocaleDateString()}
                    </Typography>
                  </Stack>

                  <Rating
                    value={review.rating}
                    precision={0.5}
                    readOnly
                    sx={{ mb: 1.5, "& .MuiRating-iconFilled": { color: "orange" } }}
                  />

                  <Typography variant="body1" color="text.primary" lineHeight={1.7}>
                    {review.review}
                  </Typography>
                </Paper>
              ))}
            </Stack>
          )}
        </Box>
      </Container>

      <Footer />
    </Box>
  );
}

export default AddToCart;
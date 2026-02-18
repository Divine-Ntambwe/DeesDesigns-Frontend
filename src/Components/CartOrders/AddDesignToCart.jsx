import React, { useContext, useEffect, useRef, useState } from "react";
import Navbar from "../Navbar";
import Rating from "@mui/material/Rating";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import Footer from "../Footer";
import Cart from "./Cart";
import { appContext } from "../../Context/AppContext";
import { products } from "../../Context/ProductsContext";
import { Link, useNavigate, useParams } from "react-router-dom";
import useFetch from "../../useFetch";
import { cartContext } from "../../Context/CartContext";
import { Authentication } from "../../App";
import SentimentVeryDissatisfiedIcon from "@mui/icons-material/SentimentVeryDissatisfied";
import "./cartOrders.modules.css";
import {
  Container,
  Grid,
  Box,
  Card,
  CardMedia,
  Typography,
  Paper,
  Divider,
  Alert,
  Button,
  Stack,
} from "@mui/material";

function AddDesignToCart() {
  const [progress, setProgress] = useState(90);
  const { handleOpenCart, url } = useContext(appContext);
  const cartPopUp = useRef();
  const {
    productDetails,
    handleGoToAddDesignToCart,
    designerProducts,
    reviews,
  } = useContext(products);
  const productId = useParams().productId;
  const { setFetch } = useContext(cartContext);
  const { userDetails } = useContext(Authentication);
  const nav = useNavigate();

  useEffect(() => {
    designerProducts && handleGoToAddDesignToCart(productId);
    if (productDetails && productDetails.productProvider === "designer")
      nav("/ProductNotFound");
  }, [designerProducts]);

  const heading = useRef();
  useEffect(() => {
    heading.current.scrollIntoView({});
  }, []);
  const { postAuth, loading, error } = useFetch("/addToCart");

  function handleAddToCart(e) {
    e.preventDefault();
    const cartItem = {
      customerId: userDetails["_id"],
      productId,
      designerId:productDetails.designerId,
      productName: productDetails.name,
      price: productDetails.price,
      size: "M",
      quantity: 1,
      imgPath: productDetails.imagePath,
      productProvider: "designerProduct",
    };
    postAuth(cartItem, (d) => {
      setFetch(true);
      handleOpenCart(cartPopUp.current);
    });
  }

  return (
    <Box sx={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <Navbar handleOpenCart={() => handleOpenCart(cartPopUp.current)} />

      <Box className="cart-popup" ref={cartPopUp}>
        <Cart />
      </Box>

      <Container maxWidth="lg" sx={{ py: { xs: 4, md: 8 }, flex: 1 }}>
        <Typography
          ref={heading}
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
            {/* Image Column */}
            <Grid item xs={12} md={6}>
              <Card
                elevation={4}
                sx={{
                  borderRadius: 3,
                  overflow: "hidden",
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
                    image={productDetails.imagePath}
                    alt={productDetails.name}
                    sx={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      transition: "transform 0.5s ease",
                      "&:hover": {
                        transform: "scale(1.08)",
                      },
                    }}
                  />
                </Box>
              </Card>
            </Grid>

            {/* Details Column */}
            <Grid item xs={12} md={6}>
              <Box sx={{ px: { md: 2 } }}>
                <Typography variant="h4" fontWeight={700} color="var(--dark-purple)" gutterBottom>
                  {productDetails.name}
                </Typography>

                <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
                  Uploaded by:{" "}
                  <Link
                    to={`/DesignerProfile/${productDetails.designerId}`}
                    style={{
                      color: "var(--med-purple)",
                      textDecoration: "underline",
                      fontWeight: 600,
                    }}
                  >
                    {productDetails.uploadedBy}
                  </Link>
                </Typography>

                <Typography
                  variant="h5"
                  fontWeight={700}
                  color="var(--dark-purple)"
                  sx={{ mb: 4 }}
                >
                  R{productDetails.price}.00
                </Typography>

                <Divider sx={{ my: 4 }} />

                <Box sx={{ mb: 5 }}>
                  <Typography variant="subtitle1" fontWeight={600} gutterBottom>
                    Product Description
                  </Typography>
                  <Paper
                    variant="outlined"
                    sx={{
                      p: 3,
                      bgcolor: "grey.50",
                      borderRadius: 2,
                      whiteSpace: "pre-wrap",
                      maxHeight: 320,
                      overflowY: "auto",
                    }}
                  >
                    <Typography variant="body1" color="text.primary" lineHeight={1.7}>
                      {productDetails.productDescription || "No description available."}
                    </Typography>
                  </Paper>
                </Box>

                {error && (
                  <Alert severity="error" sx={{ mb: 3 }}>
                    Network Error. Please try again later.
                  </Alert>
                )}

                <Button
                  onClick={handleAddToCart}
                  disabled={loading}
                  variant="contained"
                  color="primary"
                  size="large"
                  fullWidth
                  startIcon={<ShoppingCartOutlinedIcon />}
                  sx={{
                    py: 1.8,
                    fontSize: "1.1rem",
                    textTransform: "none",
                    backgroundColor: "var(--dark-purple)"
                  }}
                >
                  {loading ? "Adding..." : "Add to Cart"}
                </Button>
              </Box>
            </Grid>
          </Grid>
        )}

        {/* ────────────────────────────────────────────────
            Reviews Section (uncomment when ready to use)
        ──────────────────────────────────────────────── */}
        {/* <Box sx={{ mt: 10 }}>
          <Typography variant="h4" fontWeight={700} gutterBottom>
            Reviews for Designer
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
                    borderColor: "primary.main",
                  }}
                >
                  <Stack
                    direction={{ xs: "column", sm: "row" }}
                    justifyContent="space-between"
                    mb={1.5}
                  >
                    <Typography variant="h6" fontWeight={600} color="primary.dark">
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

                  <Typography variant="body1" lineHeight={1.7}>
                    {review.review}
                  </Typography>
                </Paper>
              ))}
            </Stack>
          )}
        </Box> */}
      </Container>

      <Footer />
    </Box>
  );
}

export default AddDesignToCart;
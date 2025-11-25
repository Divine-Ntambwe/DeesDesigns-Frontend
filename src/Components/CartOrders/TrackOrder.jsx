import React, { useContext, useState, useRef, useEffect } from "react";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import StepContent from "@mui/material/StepContent";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import FilterListIcon from "@mui/icons-material/FilterList";
import { Select, StepConnector } from "@mui/material";
import { styled } from "@mui/material/styles";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Navbar from "../Navbar";
import Footer from "../Footer";
import Cart from "./Cart";
import { appContext } from "../../Context/AppContext";
import { themeContext } from "../../Context/ThemeContext";
import { designerContext } from "../../Context/DesignerContext";
import useFetch from "../../useFetch";
import { Authentication } from "../../App";
import { useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Rating from "@mui/material/Rating";
import Snackbar from "@mui/material/Snackbar";
import Tooltip from "@mui/material/Tooltip";
import { Skeleton } from "@mui/material";
import { products } from "../../Context/ProductsContext";

const LongConnector = styled(StepConnector)(({ theme }) => ({
  [`& .MuiStepConnector-line`]: {
    minHeight: 50, // line thickness
    flex: 2, // makes lines longer
  },
}));

function TrackOrder() {
  const { handleOpenCart, url } = useContext(appContext);
  const { colorBW, theme } = useContext(themeContext);
  const cartPopUp = useRef();
  const orderStatus = [
    "placed",
    "confirmed",
    "is being processed",
    "in transit",
    "has hit the road!",
    "delivered",
  ];
  
  const {orders,setFetchProducts} = useContext(products);
  const {setFetch} = useContext(designerContext)
  const { userDetails } = useContext(Authentication);
  const heading = useRef()
  useEffect(()=>{
    const params = new URLSearchParams(window.location.search)
    if (params.has("orderId")){
      console.log(params.get("orderId"))
      setTimeout(()=>{

        console.log(params.get("orderId"))
        document.getElementById(params.get("orderId")).scrollIntoView({behavior:"smooth",block: 'start'})

      },500)
    }else{
      heading.current.scrollIntoView({})
    }
  },[orders])

 

  const nav = useNavigate();
  function handleViewPurchasedProduct(id) {
    nav(`/AddToCart/${id}`);
  }

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const formJson = Object.fromEntries(formData.entries());
    const email = formJson.email;
    console.log(email);
    handleClose();
  };

  const [state, setState] = React.useState({
    openSnackBar: false,
    vertical: "top",
    horizontal: "center",
    m: "Please Rate",
  });
  const { vertical, horizontal, openSnackBar, m } = state;

  const handleClick = (newState) => () => {
    setState({ ...newState, openSnackBar: true });

    setTimeout(() => {
      handleCloseSnackBar();
    }, 2000);
  };

  const handleCloseSnackBar = () => {
    setState({ ...state, openSnackBar: false });
  };

  const [rating, setRating] = useState(0);
  const [review, setReview] = useState("");
  const { postAuth:postProductReview, loading:reviewLoading } = useFetch(
    `/uploadReview/:${userDetails._id}`
  );
  const { postAuth:postDesignerReview, loading:designerReviewLoading} = useFetch(
    `/uploadReviewForDesigner`
  );
  const [product, setProduct] = useState("");
  function handleWriteReview() {
    if (rating === 0)
      return handleClick({
        vertical: "top",
        horizontal: "center",
        m: "Please rate",
      })();
    product.provider === "stockProduct"? 
    postProductReview(
      {
        productId:product.id,
        name: userDetails.name,
        surname: userDetails.surname,
        review,
        rating,
      },
      (d) => {
        handleClick({
          vertical: "top",
          horizontal: "center",
          m: "Thanks for the review!",
        })();
        handleClose();
        setRating(0);
        setFetchProducts(true)
        setReview("")

      }
    ): postDesignerReview(
      {
        productId:product.id,
        name: userDetails.name,
        surname: userDetails.surname,
        review,
        rating,
      },
      (d) => {
        handleClick({
          vertical: "top",
          horizontal: "center",
          m: "Thanks for the review!",
        })();
        handleClose();
        setRating(0);
        setFetch(true)
        setReview("")
      }
    )
  }

  return (
    <div id="track-order-page">
      <Snackbar
        anchorOrigin={{ vertical, horizontal, m }}
        open={openSnackBar}
        onClose={handleCloseSnackBar}
        message={m}
        key={vertical + horizontal}
      />
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Write A Review</DialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmit} id="subscription-form">
            <p style={{ width: "550px", fontSize: "1.3em" }}>
              Rate the {product.provider === "designerProduct"?"designer":"product"}
            </p>
            <Rating
              required
              size="large"
              name="half-rating"
              value={rating}
              onChange={(event, newValue) => {
                setRating(newValue);
              }}
              precision={0.5}
            />
            <TextField
              margin="dense"
              id="reviewInput"
              name="reviewInput"
              label="Write Review"
              value={review}
              onChange={(e) => {
                setReview(e.target.value);
              }}
              fullWidth
              multiline
              rows={2}
            />
          </form>
        </DialogContent>
        <DialogActions>
          <Button sx={{ color: "var(--dark-purple)" }} onClick={handleClose}>
            Cancel
          </Button>
          <Button
            sx={{ color: "var(--med-purple)" }}
            onClick={handleWriteReview}
            form="subscription-form"
            loading={reviewLoading || designerReviewLoading}
          >
            Submit
          </Button>
        </DialogActions>
      </Dialog>
      <div className="track-order-page">
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

        <div className="order-content">
          <h1 ref={heading}  id="orders-heading">Orders</h1>
          <br />
          {/* <Box sx={{ minWidth: 120 }}>
            <FormControl>
              <InputLabel
                sx={{
                  color: colorBW,
                  "&.Mui-focused": {
                    color: colorBW, // when focused
                  },
                }}
                id="demo-simple-select-label"
              >
                <FilterListIcon />
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={""}
                sx={{
                  width: 100,
                  color: colorBW,
                  "& .MuiSvgIcon-root": {
                    color: colorBW, // arrow
                  },
                  "& .MuiOutlinedInput-notchedOutline": {
                    borderColor: "darkviolet", // outline color
                  },
                  "&:hover .MuiOutlinedInput-notchedOutline": {
                    borderColor: colorBW, // on hover
                  },
                  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                    borderColor: "darkviolet", // on focus
                  },
                }}
              >
                <MenuItem value={10}>Ten</MenuItem>
                <MenuItem value={20}>Twenty</MenuItem>
                <MenuItem value={30}>Thirty</MenuItem>
              </Select>
            </FormControl>
          </Box> */}
          {(orders !== null && !orders.length) && <h2 style={{fontSize:"1.5em"}}>No Orders Yet</h2>}
          {orders === null && [1,2].map(()=>(
            <>
            <div className="order">
              <Skeleton
                animation="wave"
                sx={{ bgcolor: theme === "light" ? "grey.400" : "grey.900" }}
                variant="rectangular"
                width="350px"
                height={30}
              ></Skeleton>
              <Skeleton
                animation="wave"
                sx={{ bgcolor: theme === "light" ? "grey.400" : "grey.900" }}
                variant="rectangular"
                width="200px"
                height={500}
              ></Skeleton>

              <div style={{display:"flex",gap:"20px",flexDirection:"column"}}>
                 <Skeleton
                animation="wave"
                sx={{ bgcolor: theme === "light" ? "grey.400" : "grey.900" }}
                variant="rectangular"
                width={350}
                height={30}
              ></Skeleton>
               <Skeleton
                animation="wave"
                sx={{ bgcolor: theme === "light" ? "grey.400" : "grey.900" }}
                variant="rectangular"
                width={350}
                height={30}
              ></Skeleton>
               <Skeleton
                animation="wave"
                sx={{ bgcolor: theme === "light" ? "grey.400" : "grey.900" }}
                variant="rectangular"
                width={250}
                height={100}
              ></Skeleton>
               <Skeleton
                animation="wave"
                sx={{ bgcolor: theme === "light" ? "grey.400" : "grey.900" }}
                variant="rectangular"
                width={350}
                height={100}
              ></Skeleton>
              </div>
             
              </div>
            </>
          ))}

          {orders &&
            orders.map((order) => (
              <>
              <hr style={{scrollMarginTop: "80px"}}id={order._id}/>

                <div className="order">
                  <h2 className="order-id-text">Order ID: <br/>{order._id}</h2>
                  <Stepper
                    connector={<LongConnector />}
                    activeStep={orderStatus.indexOf(order.statusOfExchange)}
                    orientation="vertical"
                    sx={{
                      "& .MuiStepLabel-label.Mui-completed": {
                        color: "var(--dark-purple)", // Completed step label color
                      },
                      "& .MuiStepLabel-label.Mui-active": {
                        color: "var(--med-purple)", // active step text color
                        fontWeight: "bold",
                      },
                      "& .MuiStepLabel-label": { color: "var(--text-color2)" },
                      "& .MuiStepIcon-root": { color: "var(--dark-purple)" },
                      "& .MuiStepIcon-root.Mui-active": {
                        color: "var(--med-purple)",
                      },
                      "& .MuiStepIcon-root.Mui-completed": {
                        color: "var(--dark-purple)",
                      },
                    }}
                  >
                    <Step>
                      <StepLabel>Order Placed</StepLabel>
                    </Step>

                    <Step>
                      <StepLabel>Order Confirmed</StepLabel>
                    </Step>

                    <Step>
                      <StepLabel>Order is being processed</StepLabel>
                    </Step>

                    <Step>
                      <StepLabel>Order in transit</StepLabel>
                    </Step>

                    <Step>
                      <StepLabel>Order has hit the road!</StepLabel>
                    </Step>

                    <Step>
                      <StepLabel>Delivered</StepLabel>
                    </Step>
                  </Stepper>
                  <div className="order-details">
                    <div>
                      <p>
                        <b>Order Date:</b>{" "}
                        {new Date(order.dateOfPurchase).toDateString()}
                      </p>
                      <br />
                      <p>
                        <b>Estimated Time Of Delivery:</b>
                        {new Date(order.dateOfDelivery).toDateString()}
                      </p>
                      <br />
                      <p>
                        <b>Delivery Address:</b>
                        <address>
                          {order.address.streetAddress}
                          <br />
                          {order.address.suburb}, {order.address.postalCode}
                          <br />
                          {order.address.city}, South Africa
                        </address>
                      </p>
                    </div>

                    <div className="ordered-items">
                      {order.purchasedProducts.map((prod) => (
                        <>
                          <div>
                            {prod.productProvider === "stockProduct" && (
                              <img
                               style={{cursor:"pointer"}}
                                src={
                                  prod.imgPath
                                   
                                }
                                onClick={(e) => {
                                  if (prod.productProvider === "stockProduct")
                                    handleViewPurchasedProduct(prod.productId);
                                }}
                              />
                            )}

                            {prod.productProvider !== "stockProduct" && (
                              <img
                                style={{cursor:"pointer"}}
                                src={`${prod.imgPath}`}
                                onClick={()=>{
                                  nav(`/DesignerProfile/${prod.designerId}`)
                                }}
                              />
                            )}

                            <p>
                              <p>{prod.productName}</p>
                              <p>R{prod.price}.00</p>
                              <p>Size: {prod.size}</p>
                              <p>qty: {prod.quantity}</p>
                            </p>
                            {order.statusOfExchange === "delivered" && (
                              <p
                                className="leave-review"
                                onClick={() => {
                                  handleClickOpen();
                                  setProduct({id:prod.productId,provider:prod.productProvider});
                                }}
                                style={{
                                  gridColumn: "1/3",
                                  color: "var(--med-purple)",
                                  fontWeight: "500",
                                  cursor: "pointer",
                                }}
                              >
                                Leave A Review
                              </p>
                            )}
                          </div>
                        </>
                      ))}
                    </div>
                  </div>
                </div>
                
              </>
            ))}
        </div>
      </div>

      <div id="footer">
        <Footer />
      </div>
    </div>
  );
}

export default TrackOrder;

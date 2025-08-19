import React, { useContext, useEffect, useRef, useState } from "react";
import Navbar from "../Navbar";
import Footer from "../Footer";
import Cart from "./Cart";
import { appContext } from "../../Context/AppContext";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Box from "@mui/material/Box";
import { Apartment } from "@mui/icons-material";
import { cartContext } from "../../Context/CartContext";
import TextFieldComp from "../TextField";
import { Authentication } from "../../App";
import useFetch from "../../useFetch";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { useNavigate } from "react-router-dom";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});


function Checkout() {
  const { handleOpenCart } = useContext(appContext);
  const cartPopUp = useRef();
  const { cartItems,cartTotal,setFetch } = useContext(cartContext);
  const { userDetails } = useContext(Authentication);
  const { get} = useFetch(
    `/getAddressAndBankDetails/${userDetails["_id"]}`
  );
  const [addressDetails, setAddressDetails] = useState({}),
    [bankDetails, setBankDetails] = useState({}),
    [orderDetails, setOrderDetails] = useState({}),
    [savedDetails, setSavedDetails] = useState({}),
    [total,setTotal] = useState(),
    [subtotal,setSubtotal] = useState(),
    [shippingAmount,setShippingAmount] = useState();

  useEffect(() => {
    get((d) => {
      setSavedDetails(d);
      const {streetAddress,suburb,city,postalCode,buildingType,unitNo,cardNumber,cvv,expiryDate} = d
      setAddressDetails({streetAddress,suburb,city,postalCode,buildingType,unitNo})
      setBankDetails({cardNumber,cvv,expiryDate})
    });
    
   if (cartTotal) 
    { setSubtotal(cartTotal.toFixed(2));
    setShippingAmount((cartTotal*0.12).toFixed(2));
    setTotal((cartTotal*0.12 + cartTotal).toFixed(2))}
  

  }, [cartTotal]);

  function handleBankDetails(e) {
    setBankDetails({ ...bankDetails, [e.target.name]: e.target.value });
  }
  function handleAddressDetails(e) {
    setAddressDetails({ ...addressDetails, [e.target.name]: e.target.value });
  }

  function handleOrderDetails(e) {
    setSavedDetails({ ...savedDetails, [e.target.name]: e.target.value });
  }
  

  const {postAuth,loading,error} = useFetch(`/orders/${userDetails["_id"]}`) 
  function handleCheckOut(e) {
    e.preventDefault();
    const orderDetails = {
      customerId: userDetails["_id"],
      address: { ...addressDetails },
      bankDetails: { ...bankDetails },
      paymentMethod: savedDetails.paymentMethod,
      purchasedProducts: [...cartItems],
      totalAmount:total,
      
    }
    postAuth(orderDetails,(d)=>{
      setFetch(true);
      handleClickOpen()
    });
  }
   const [open, setOpen] = React.useState(true);

  const handleClickOpen = () => {
    setOpen(true);
  };
  
  const nav = useNavigate()
  const handleClose = () => {
    setOpen(false);
    nav("/Home")
  };

  return (
    <>
    <Dialog
        open={open}
        slots={{
          transition: Transition,
        }}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{"Dees Designs"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
           <b>Thank You For Your Purchase!</b> you'll recieve your package with in 2-3 days
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} sx={{color:"var(--text-color1)"}}>Ok</Button>
        </DialogActions>
      </Dialog>
      <div className="checkout-page">
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

        <Box
          id="checkout-form"
          component="form"
          //   sx={{ '& .MuiTextField-root': { m: 1, width: '25ch' } }}
          validate
          autoComplete="off"
          onSubmit={handleCheckOut}
        >
          <h1>Checkout</h1>
          <div className="checkout">
            <div className="checkout-forms-cont" id="delivery-info">
              <h2>Delivery Information</h2>

              <div className="checkout-forms">
                <div>
                  <TextFieldComp
                    id="checkout-name"
                    label="Name"
                    name="name"
                    value={userDetails.name}
                  />
                </div>

                <div>
                  <TextFieldComp
                    id="checkout-number"
                    label="Mobile Number"
                    name="number"
                    value={savedDetails.number}
                    pattern={/0{1}\d/}
                    onChange={handleOrderDetails}
                  />
                </div>

                <div>
                  <TextFieldComp
                    id="city"
                    label="City"
                    value={savedDetails.city}
                    name="city"
                    onChange={(e) => {
                      handleAddressDetails(e);
                      handleOrderDetails(e);
                    }}
                  />
                </div>

                <div>
                  <TextFieldComp
                    id="suburb"
                    label="Suburb"
                    value={savedDetails.suburb}
                    name="suburb"
                    onChange={(e) => {
                      handleAddressDetails(e);
                      handleOrderDetails(e);
                    }}
                  />
                </div>

                <div>
                  <TextFieldComp
                    id="address"
                    label="Address"
                    value={savedDetails.streetAddress}
                    name="streetAddress"
                    onChange={(e) => {
                      handleAddressDetails(e);
                      handleOrderDetails(e);
                    }}
                  />
                </div>

                <div>
                  <TextFieldComp
                    id="postal-code"
                    label="Postal Code"
                    value={savedDetails.postalCode}
                    name="postalCode"
                    onChange={(e) => {
                      handleAddressDetails(e);
                      handleOrderDetails(e);
                    }}
                  />
                </div>

                <div>
                  <FormControl>
                    <InputLabel
                      id="demo-simple-select-label"
                      sx={{
                        color: "gray",
                        "&.Mui-focused": {
                          color: "var(--dark-purple)", // when focused
                        },
                      }}
                    >
                      Buliding Type
                    </InputLabel>
                    <Select
                      onChange={(e) => {
                        handleAddressDetails(e);
                        handleOrderDetails(e);
                      }}
                      labelId="demo-simple-select-label"
                      id="buildingType"
                      value={savedDetails.buildingType}
                      name="buildingType"
                      sx={{
                        "& .MuiSvgIcon-root": {
                          color: "var(--text-color2)", // arrow
                        },
                        "& .MuiOutlinedInput-notchedOutline": {
                          borderColor: "gray", // outline color
                        },
                        "&:hover .MuiOutlinedInput-notchedOutline": {
                          borderColor: "var(--text-color2)", // on hover
                        },
                        "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                          borderColor: "darkviolet", // on focus
                        },
                      }}
                    >
                      <MenuItem value="apartment">Apartment</MenuItem>
                      <MenuItem value="officeBuliding">
                        Office Buliding
                      </MenuItem>
                      <MenuItem value="school">School</MenuItem>
                    </Select>
                  </FormControl>
                </div>

                <div>
                  <TextFieldComp
                    label="Unit No"
                    pattern={/\d/}
                    id="unit-no"
                    placeholder="e.g) 1"
                    value={savedDetails.unitNo || " "}
                    name="unitNo"
                    onChange={(e) => {
                      handleAddressDetails(e);
                      handleOrderDetails(e);
                    }}
                  />
                </div>
              </div>
            </div>

            <div className="checkout-forms-cont" id="order-summary">
              <h2>Order Summary</h2>
              <div id="all-cart-items">
                {cartItems &&
                  cartItems.map((item) => (
                    <div key={item["_id"]} className="cart-items">
                      <img
                        src={item.imgPath}
                        alt={`A picture of ${item.productName}`}
                      />

                      <div>
                        <h4 className="cart-item-name">{item.productName}</h4>
                        <p>R{item.price}.00</p>
                        <p>Size: {item.size}</p>
                        <p>Qty: {item.quantity}</p>
                      </div>
                    </div>
                  ))}
              </div>
              <hr />
              <div>
                <p className="summary-details">
                  Subtotal:<span>R{subtotal}</span>
                </p>
                <p className="summary-details">
                  Shipping:<span>R{shippingAmount}</span>
                </p>
                <p className="summary-details">
                  Total:<span>R{total}</span>
                </p>
              </div>
              <Button
                type="submit"
          
                loading={loading}
                sx={{
                  backgroundColor: "#6a04a5", // button color
                  color: "white", // text color
                  width: "100%", // custom width
                  height: "45px", // custom height
                  "&:hover": {
                    backgroundColor: "gray", // hover color
                  },
                  marginBottom: "10px",
                }}
              >
                Checkout
              </Button>
              {error && <p className="cred-error">{error}</p>}
            </div>

            <div className="checkout-forms-cont" id="payment">
              <h2>Payment Method</h2>
              <div>
                <label>
                  <input
                    required
                    className="pay-method"
                    name="paymentMethod"
                    id="cash-on-delivery"
                    value="Cash On Delivery"
                    type="radio"
                    onChange={(e) => {
                    
                      handleOrderDetails(e);
                    }}
                  />{" "}
                  Cash On Delievery
                </label>
                <label>
                  <input
                    required
                    className="pay-method"
                    name="paymentMethod"
                    id="card-on-delivery"
                    value="Card On Delivery"
                    type="radio"
                    onChange={(e) => {
                    
                      handleOrderDetails(e);
                    }}
                  />{" "}
                  Card On Delievery
                </label>
                <label>
                  <input
                    required
                    className="pay-method"
                    name="paymentMethod"
                    id="eft"
                    value="EFT"
                    type="radio"
                    onChange={(e) => {
                    
                      handleOrderDetails(e);
                    }}
                  />{" "}
                  EFT
                </label>
              </div>
            </div>

            <div className="checkout-forms-cont" id="bank-details">
              <h2>Bank Details</h2>
              <div className="checkout-forms">
                <div id="card-number-cont">
                  <TextFieldComp
                    className="card-number-cont"
                    label="Card Number"
                    id="card-number"
                    name="cardNumber"
                    pattern={/(\d{4}\s){4}/}
                    placeholder="XXXX XXXX XXXX XXXX"
                    value={savedDetails.cardNumber}
                    onChange={(e) => {
                      handleOrderDetails(e);
                      handleBankDetails(e);
                    }}
                  />
                </div>
                <div>
                  <TextFieldComp
                    type="date"
                    id="exp-date"
                    label="Expiry Date"
                    placeholder="MM-YY"
                    name="expiryDate"
                    value={savedDetails.expiryDate}
                    onChange={(e) => {
                      handleOrderDetails(e);
                      handleBankDetails(e);
                    }}
                  />
                </div>

                <div>
                  <TextFieldComp
                    label="CVV"
                    id="cvv"
                    value={savedDetails.cvv}
                    onChange={(e) => {
                      handleOrderDetails(e), handleBankDetails(e);
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </Box>
      </div>
      <div id="footer">
        <Footer />
      </div>
    </>
  );
}

export default Checkout;

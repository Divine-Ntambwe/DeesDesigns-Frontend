import "./DesHome.modular.css";
import React, { useState, useRef, useContext, useEffect } from "react";
import DesNavbar from "../DesNavbar";
import Footer from "../Footer";
import { Authentication } from "../../App";
import Button from "@mui/material/Button";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import Tooltip from "@mui/material/Tooltip";
import { designerContext } from "../../Context/DesignerContext";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import TextFieldComp from "../TextField";
import TextField from "@mui/material/TextField";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import Checkbox from "@mui/material/Checkbox";
import { styled } from "@mui/material/styles";
import { appContext } from "../../Context/AppContext";
import useFetch from "../../useFetch";

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function DesHome() {
  const [openUD, setOpenUD] = React.useState(false);
  const [openUDC, setOpenUDC] = useState(false);
  const [openEditProfile, setOpenEditProfile] = useState(false);
  const uploadFile = useRef();
  const { url } = useContext(appContext);
  const UDForm = useRef();
  const UDCForm = useRef();
  const editProfileForm = useRef();
  const { userDetails, authCred, setUserDetails } = useContext(Authentication);
  console.log(userDetails);
  const { allDesignersDesigns, setFetch } = useContext(designerContext);
  const [productImgFile, setProductImgFile] = useState(),
    [productImg, setProductImg] = useState("emptyPfp.jpeg"),
    [UD, setUD] = useState({}),
    [UDC, setUDC] = useState({}),
    [categories, setCategories] = useState([]),
    [editing, setEditing] = useState(false),
    [custProductImgFile, setCustProductImgFile] = useState(),
    [custProductImg, setCustProductImg] = useState("emptyPfp.jpeg"),
    [desPfpImg, setDesPfpImg] = useState(`${userDetails.pfpPath}`),
    [desPfpFile, setDesPfpFile] = useState(),
    [newProfileDetails, setNewProfileDetails] = useState({
      phoneNumber: userDetails.phoneNumber,
      email: userDetails.email,
    });

  useEffect(() => {
    setFetch(true);
  }, []);

  const handleClickOpenUD = () => {
    setOpenUD(true);
  };

  const handleClickOpenUDC = () => {
    setOpenUDC(true);
  };

  const handleOpenEditProfile = () => {
    setOpenEditProfile(true);
  };

  const handleCloseUD = () => {
    setOpenUD(false);
    setUD({});
    setProductImg("emptyPfp.jpeg");
    setFetch(true);
    UDForm.current.reset();
    setError("");
    setEditing(false);
    setData({});
  };

  const handleCloseUDC = () => {
    setOpenUDC(false);
    setUDC({});
    setCustProductImg("emptyPfp.jpeg");
    UDCForm.current.reset();
    setError("");
    setData({});
  };

  const handleCloseEditProfile = () => {
    setOpenEditProfile(false);
    setError("");
  };

  const {
    put: updateDesignerDetails,
    data: PostEditedData,
    loading: postEditedProfileLoading,
  } = useFetch(`/editDesignerInfo/${userDetails._id}`);
  async function handlePostEditedDetails(e) {
    e.preventDefault();
    const res = await fetch(`${url}/s3Url`);
    const { url: secureUrl } = await res.json();

    try {
      await fetch(secureUrl, {
        method: "PUT",
        headers: {
          "Content-Type": "multipart/form-data",
        },
        body: desPfpFile,
      });
    } catch (e) {
      console.log(e);
      return;
    }
    const pfpPath = secureUrl.split("?")[0];

    updateDesignerDetails({ ...newProfileDetails, pfpPath }, (d) => {
      localStorage.setItem(
        "userDetails",
        JSON.stringify({
          ...userDetails,
          phoneNumber: newProfileDetails.phoneNumber,
        })
      );
      desPfpFile &&
        localStorage.setItem(
          "userDetails",
          JSON.stringify({ ...userDetails, pfpPath })
        );
      setUserDetails({
        ...userDetails,
        phoneNumber: newProfileDetails.phoneNumber,
      });
      desPfpFile && setDesPfpImg(`${d.pfpPath}`);
      desPfpFile && setUserDetails({ ...userDetails, pfpPath: d.pfpPath });
      handleCloseEditProfile();
    });
  }

  const { postAuth, error, setError, setData, data, loading } = useFetch(
    `/uploadDesignersProduct/${userDetails._id}`
  );

  //upload a design/product
  async function handlePostUD(e) {
    e.preventDefault();
    if (!categories.length) return alert("Please select atleast one category");
    if (/[A-Za-z]/.test(UD.price))
      return alert("Your price should only include numbers");
    if (!productImgFile) return alert("Please select an image");

    const res = await fetch(`${url}/s3Url`);
    const { url: secureUrl } = await res.json();

    try {
      await fetch(secureUrl, {
        method: "PUT",
        headers: {
          "Content-Type": "multipart/form-data",
        },
        body: productImgFile,
      });
    } catch (e) {
      console.log(e);
      return;
    }
    const imagePath = secureUrl.split("?")[0];
    const details = {
      ...UD,
      itemsInStock: { M: 1 },
      categories,
      onSale: true,
      uploadedBy: userDetails.name?`${userDetails.name} ${userDetails.surname}`: userDetails.fullname,
      designerEmail: userDetails.email,
      designerId: userDetails._id,
      imagePath,
    };

    postAuth(details, () => {
      setFetch(true);
      setTimeout(() => {
        handleCloseUD();
        setUD({});
        multiline.current.value = "";
        setProductImg("emptyPfp.jpeg");
        e.target.reset();
      }, 1000);
    });
  }

  const [editedProductId, setEditedProductId] = useState();
  function handleOpenEditProduct(id) {
    setEditedProductId(id);
    setEditing(true);
    const { name, price, productDescription, imagePath } = {
      ...allDesignersDesigns.find((i) => {
        return i._id === id;
      }),
    };
    setUD({ name, price, productDescription });
    setProductImg(`${imagePath}`);
    handleClickOpenUD()();
  }

  async function handleEditProduct(e) {
    e.preventDefault();
    if (/[A-Za-z]/.test(UD.price))
      return alert("Your price should only include numbers");

    const res = await fetch(`${url}/s3Url`);
    const { url: secureUrl } = await res.json();

    try {
      await fetch(secureUrl, {
        method: "PUT",
        headers: {
          "Content-Type": "multipart/form-data",
        },
        body: productImgFile,
      });
    } catch (e) {
      console.log(e);
      return;
    }
    const imagePath = secureUrl.split("?")[0];

    const details = { ...UD, imagePath };
    try {
      const res = await fetch(
        url + `/editDesignerProductDetails/${editedProductId}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Basic ${authCred}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(details),
        }
      );

      const result = await res.json();

      if (res.status === 200) {
        handleCloseUD();
        setEditing(false);
        e.target.reset();
      } else {
        setError(res.error);
      }
    } catch (e) {
      console.log(e);
    }
  }

  async function handleRemoveProduct(id) {
    try {
      const res = await fetch(url + `/removeDesignersProducts/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Basic ${authCred}` },
      });

      const result = await res.json();

      if (res.status === 200) {
        setFetch(true);
      } else {
        setError(res.error);
      }
    } catch (e) {
      console.log(e);
    }
  }

  const {
    postAuth: postUploadDesignCustomer,
    data: PostUDCData,
    loading: postForCustLoading,
  } = useFetch(`/SendDesignToCustomer/${userDetails._id}`);

  async function handlePostUDC(e) {
    e.preventDefault();
    if (/[A-Za-z]/.test(UDC.price))
      return alert("Your price should only include numbers");
    if (!custProductImgFile) return alert("Please select an image");

    const res = await fetch(`${url}/s3Url`);
    const { url: secureUrl } = await res.json();

    try {
      await fetch(secureUrl, {
        method: "PUT",
        headers: {
          "Content-Type": "multipart/form-data",
        },
        body: custProductImgFile,
      });
    } catch (e) {
      console.log(e);
      return;
    }
    const imagePath = secureUrl.split("?")[0];

    const details = {
      ...UDC,
      imagePath,
      uploadedBy:userDetails.name?`${userDetails.name} ${userDetails.surname}`: userDetails.fullname,
      productProvider: "designer",
    };

    postUploadDesignCustomer(details, () => {
      alert("successfully uploaded");
      handleCloseUDC();
      setUDC({});
      setCustProductImg("emptyPfp.jpeg");
      e.target.reset();
    });
  }

  return (
    <>
      <Dialog
        open={openUD}
        slots={{
          transition: Transition,
        }}
        keepMounted
        onClose={handleCloseUD}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle sx={{ backgroundColor: "var(--background-color1)" }}>
          {"Upload A Design"}
        </DialogTitle>
        {/* {error && (
          <p className="display-error">Network Error, Please try again later</p>
        )}
        {data.error && <p className="display-error">{data.error}</p>} */}
        <form
          id="upload-a-design-form"
          style={{ width: "550px", height: "780px" }}
          onSubmit={(e) => {
            editing ? handleEditProduct(e) : handlePostUD(e);
          }}
          ref={UDForm}
        >
          <DialogContent
            id="upload-a-design-content"
            sx={{
              width: "550px",
              height: "800px",
              backgroundColor: "var(--background-color1)",
            }}
          >
            <div id="upload-file-cont">
              <img className="des-pfp" src={productImg} />

              <Button
                component="label"
                role={undefined}
                variant="contained"
                tabIndex={-1}
                sx={{
                  backgroundColor: "transparent",
                  color: "var(--med-purple)",
                }}
                // style={{color:"var(--med-purple)",fontSize:"2.5em"}
              >
                Upload files
                <VisuallyHiddenInput
                  ref={uploadFile}
                  name="productImage"
                  id="upload-product-image"
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    setProductImgFile(e.target.files[0]);
                    if (e.target.files[0].type.startsWith("image")) {
                      setProductImg(URL.createObjectURL(e.target.files[0]));
                    } else {
                      alert("Please select an image file");
                      setProductImg("emptyPfp.jpeg");
                    }
                  }}
                />
              </Button>
            </div>
            <TextFieldComp
              id="UD-product-name"
              name="UDProductName"
              label="Product Name"
              onChange={(e) => {
                setUD({ ...UD, name: e.target.value });
              }}
              value={UD.name}
            />
            <TextFieldComp
              label="Product Price"
              id="UD-product-price"
              name="UDProductPrice"
              onChange={(e) => {
                setUD({ ...UD, price: e.target.value });
              }}
              value={UD.price}
              pattern={/\d/}
            />

            <TextField
              required
              label="Product Description *"
              id="UD-product-desc"
              name="UDProductDesc"
              onChange={(e) => {
                setUD({ ...UD, productDescription: e.target.value });
              }}
              value={UD.productDescription}
              multiline
              rows={4}
              placeholder="e.g length:180cm, shoulder:80cm, waist: 39cm hips:43cm"
              sx={{
                "& input:-webkit-autofill": {
                  WebkitBoxShadow: "0 0 0 100px #f1f1f1f1 inset", // background color
                  WebkitTextFillColor: "var(--text-color2)",
                },
                width: "100%",
                // label
                "& label": {
                  color: "gray",
                },
                "& label.Mui-focused": {
                  color: "var(--dark-purple)",
                },

                // input text + background
                "& .MuiInputBase-input": {
                  color: "var(--text-color2)",
                  backgroundColor: "transparent",
                  fontSize: "1.3em",
                },

                // outline colors
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: "gray",
                  },
                  "&:hover fieldset": {
                    borderColor: "var(--text-color2)",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "var(--dark-purple)",
                  },
                },
                "& .MuiInputBase-input::placeholder": {
                  color: "gray", // placeholder color
                  opacity: 1,
                  // keep it fully visible
                },
              }}
            />
            {!editing && (
              <fieldset
                className="select-categories"
                style={{ display: "grid", gridTemplateColumns: "50% 50%" }}
              >
                <legend style={{ fontFamily: "Roboto" }}>
                  Product Categories *
                </legend>

                <FormControlLabel
                sx={{color:"var(--text-color2)"}}
                  control={
                    <Checkbox
                      sx={{
                        color: "var(--dark-purple)",
                        "&.Mui-checked": {
                          color: "var(--dark-purple)",
                        },
                      }}
                    />
                  }
                  label="Women"
                  value="Women"
                  onChange={(e) => {
                    if (categories.includes(e.target.value)) {
                      categories.splice(categories.indexOf(e.target.value), 1);
                    } else {
                      categories.push(e.target.value);
                    }

                    setCategories(categories);
                  }}
                />
                <FormControlLabel
                sx={{color:"var(--text-color2)"}}
                  control={
                    <Checkbox
                      sx={{
                        color: "var(--dark-purple)",
                        "&.Mui-checked": {
                          color: "var(--dark-purple)",
                        },
                      }}
                      value="Men"
                      onChange={(e) => {
                        categories.includes(e.target.value)
                          ? categories.splice(
                              categories.indexOf(e.target.value),
                              1
                            )
                          : categories.push(e.target.value);
                        setCategories(categories);
                      }}
                    />
                  }
                  label="Men"
                />
                <FormControlLabel
                sx={{color:"var(--text-color2)"}}
                  control={
                    <Checkbox
                      sx={{
                        color: "var(--dark-purple)",
                        "&.Mui-checked": {
                          color: "var(--dark-purple)",
                        },
                      }}
                    />
                  }
                  label="Matric Dance"
                  value="Matric Dance"
                  onChange={(e) => {
                    categories.includes(e.target.value)
                      ? categories.splice(categories.indexOf(e.target.value), 1)
                      : categories.push(e.target.value);
                    setCategories(categories);
                  }}
                />
                <FormControlLabel
                  sx={{ color: "var(--text-color2)" }}
                  control={
                    <Checkbox
                      sx={{
                        color: "var(--dark-purple)",
                        "&.Mui-checked": {
                          color: "var(--dark-purple)",
                        },
                      }}
                    />
                  }
                  label="Graduation"
                  value="Graduation"
                  onChange={(e) => {
                    categories.includes(e.target.value)
                      ? categories.splice(categories.indexOf(e.target.value), 1)
                      : categories.push(e.target.value);
                    setCategories(categories);
                  }}
                />
                <FormControlLabel
                 sx={{color:"var(--text-color2)"}}
                  control={
                    <Checkbox
                      sx={{
                        color: "var(--dark-purple)",
                        "&.Mui-checked": {
                          color: "var(--dark-purple)",
                        },
                      }}
                    />
                  }
                  label="Wedding"
                  value="Wedding"
                  onChange={(e) => {
                    categories.includes(e.target.value)
                      ? categories.splice(categories.indexOf(e.target.value), 1)
                      : categories.push(e.target.value);
                    setCategories(categories);
                  }}
                />
              </fieldset>
            )}
          </DialogContent>
          <DialogActions sx={{ backgroundColor:"var(--background-color1)" }}>
            <Button
              sx={{ color: "var(--dark-purple)" }}
              onClick={(e) => {
                handleCloseUD();
              }}
            >
              Cancel
            </Button>
            <Button
              sx={{ color: "var(--med-purple)" }}
              type="submit"
              loading={loading}
            >
              Upload
            </Button>
          </DialogActions>
        </form>
      </Dialog>
      <Dialog
        open={openUDC}
        slots={{
          transition: Transition,
        }}
        keepMounted
        onClose={handleCloseUDC}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle sx={{ backgroundColor: "var(--background-color1)" }}>
          {"Upload A Design For Customer"}
        </DialogTitle>
        <form
          id="upload-a-design-customer-form"
          style={{ width: "550px", height: "650px",backgroundColor:"var(--background-color1)" }}
          onSubmit={handlePostUDC}
          ref={UDCForm}
          >
            {error && (
              <p className="display-error">Network Error, Please try again later</p>
            )}
            {PostUDCData.error && (
              <p className="display-error">{PostUDCData.error}</p>
            )}
          <DialogContent
            id="upload-a-design-content"
            sx={{
              width: "550px",
              height: "550px",
              backgroundColor: "var(--background-color1)",
            }}
          >
            <div id="upload-file-cont">
              <img className="des-pfp" src={custProductImg} />

              <Button
                component="label"
                role={undefined}
                variant="contained"
                tabIndex={-1}
                sx={{
                  backgroundColor: "transparent",
                  color: "var(--med-purple)",
                }}
                // style={{color:"var(--med-purple)",fontSize:"2.5em"}
              >
                Upload files
                <VisuallyHiddenInput
                  ref={uploadFile}
                  name="custProductImage"
                  id="upload-cust-product-image"
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    setCustProductImgFile(e.target.files[0]);
                    if (e.target.files[0].type.startsWith("image")) {
                      setCustProductImg(URL.createObjectURL(e.target.files[0]));
                    } else {
                      alert("Please select an image file");
                      setCustProductImg("emptyPfp.jpeg");
                    }
                  }}
                />
              </Button>
            </div>
            <TextFieldComp
              id="UDC-product-name"
              name="UDCProductName"
              label="Product Name"
              onChange={(e) => {
                setUDC({ ...UDC, name: e.target.value });
              }}
              value={UDC.name}
            />
            <TextFieldComp
              label="Product Price"
              id="UDC-product-price"
              name="UDCProductPrice"
              onChange={(e) => {
                setUDC({ ...UDC, price: e.target.value });
              }}
              value={UDC.price}
            />
            <TextFieldComp
              type="email"
              label="Customer Email"
              id="UDC-customer-email"
              name="UDCCustomerEmail"
              onChange={(e) => {
                setUDC({ ...UDC, customerEmail: e.target.value });
              }}
              value={UDC.customerEmail}
            />
          </DialogContent>
          <DialogActions sx={{ backgroundColor: "var(--background-color1)" }}>
            <Button
              sx={{ color: "var(--dark-purple)" }}
              onClick={(e) => {
                handleCloseUDC();
              }}
            >
              Cancel
            </Button>
            <Button
              sx={{ color: "var(--med-purple)" }}
              type="submit"
              loading={postForCustLoading}
            >
              Upload
            </Button>
          </DialogActions>
        </form>
      </Dialog>

      <Dialog
        open={openEditProfile}
        slots={{
          transition: Transition,
        }}
        keepMounted
        onClose={handleCloseEditProfile}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle sx={{ backgroundColor: "var(--background-color1)" }}>
          {"Edit your profile details"}
        </DialogTitle>
        {error && (
          <p className="display-error">Network Error, Please try again later</p>
        )}
        {PostEditedData.error && (
          <p className="display-error">{PostEditedData.error}</p>
        )}
        <form
          id="edit-profile-details-form"
          style={{ overflow: "hidden", width: "550px", height: "600px" }}
          onSubmit={handlePostEditedDetails}
          ref={editProfileForm}
        >
          <DialogContent
            id="edit-profile-details"
            // sx={{backgroundColor:"var(--background-color1)"}}
            sx={{
              overflowX: "hidden",
              width: "550px",
              height: "550px",
              backgroundColor: "var(--background-color1)",
            }}
          >
            <div id="upload-file-cont">
              <img className="des-pfp" src={desPfpImg} />

              <Button
                component="label"
                role={undefined}
                variant="contained"
                tabIndex={-1}
                sx={{
                  backgroundColor: "transparent",
                  color: "var(--med-purple)",
                }}
                // style={{color:"var(--med-purple)",fontSize:"2.5em"}
              >
                Upload files
                <VisuallyHiddenInput
                  ref={uploadFile}
                  name="desNewPfp"
                  id="upload-des-new-pfp"
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    setDesPfpFile(e.target.files[0]);
                    if (e.target.files[0].type.startsWith("image")) {
                      setDesPfpImg(URL.createObjectURL(e.target.files[0]));
                    } else {
                      alert("Please select an image file");
                      setDesPfpImg("emptyPfp.jpeg");
                    }
                  }}
                />
              </Button>
            </div>
            <TextFieldComp
              id="edit-email"
              name="editEmail"
              label="Email"
              type="email"
              onChange={(e) => {}}
              value={newProfileDetails.email}
            />
            <TextFieldComp
              label="Phone Number"
              id="edit-phone-number"
              name="editPhoneNumber"
              onChange={(e) => {
                setNewProfileDetails({
                  ...newProfileDetails,
                  phoneNumber: e.target.value,
                });
              }}
              value={newProfileDetails.phoneNumber}
            />
          </DialogContent>
          <DialogActions sx={{ backgroundColor: "var(--background-color1)" }}>
            <Button
              sx={{ color: "var(--dark-purple)" }}
              onClick={(e) => {
                handleCloseEditProfile();
              }}
            >
              Cancel
            </Button>
            <Button
              sx={{ color: "var(--med-purple)" }}
              type="submit"
              // loading={postEditedProfileLoading}
            >
              Upload
            </Button>
          </DialogActions>
        </form>
      </Dialog>
      <div className="des-home">
        <div className="navbar">
          <DesNavbar />
        </div>

        <div className="des-home-content">
          <div className="designers-details">
            <img src={`${userDetails.pfpPath}`} />

            <div className="contact-info">
              <h1 style={{ color: "var(--med-purple)", fontSize: "2.5em" }}>
                {userDetails.name} {userDetails.surname}
              </h1>
              <p style={{ color: "var(--med-purple)" }}>
                {userDetails.rating.length === 0
                  ? "0"
                  : (
                      userDetails.rating.reduce((acc, i) => {
                        return acc + i;
                      }, 0) / userDetails.rating.length
                    ).toFixed(1)}{" "}
                <StarBorderIcon size="large" sx={{}} />{" "}
                <span> ({userDetails.rating.length} reviews)</span>
              </p>

              <p id="designer-home-email">{userDetails.email}</p>
              <p>{userDetails.phoneNumber}</p>
            </div>
            <span id="edit-designer-profile">
              <EditOutlinedIcon
                onClick={handleOpenEditProfile}
                sx={{ fontSize: "48px", cursor: "pointer" }}
              />
            </span>
          </div>

          <div className="upload-buttons">
            <Button
              onClick={handleClickOpenUD}
              sx={{
                backgroundColor: "var(--med-purple)", // button color
                color: "white", // text color
                width: "350px", // custom width
                height: "45px", // custom height
                "&:hover": {
                  backgroundColor: "gray", // hover color
                },
                marginBottom: "10px",
                textAlign: "left",
              }}
            >
              <FileUploadIcon /> Upload A Design
            </Button>

            <Button
              sx={{
                backgroundColor: "var(--med-purple)", // button color
                color: "white", // text color
                width: "350px", // custom width
                height: "45px", // custom height
                "&:hover": {
                  backgroundColor: "gray", // hover color
                },
                marginBottom: "10px",
                textAlign: "left",
              }}
              onClick={handleClickOpenUDC}
            >
              <FileUploadIcon /> Upload A Design For A Customer
            </Button>
          </div>

          <h2>Your Designs</h2>
          <br />

          <div className="designers-uploads">
            {allDesignersDesigns &&
              allDesignersDesigns.map((design) => (
                <div key={design._id} className="design">
                  <img src={`${design.imagePath}`} />
                  <div className="product-details">
                    <div>
                      <p id="designer-home-name" className="product-name">
                        {design.name}
                      </p>
                      <p className="price">R{design.price}.00</p>
                      <p style={{ fontSize: "1.2em" }}>
                        {design.onSale ? "On Sale" : "Sold"}
                      </p>
                    </div>
                    <p className="remove-edit">
                      <Tooltip title="Remove Design">
                        <RemoveCircleOutlineIcon
                          sx={{ cursor: "pointer", fontSize: "1.5em" }}
                          onClick={(e) => {
                            handleRemoveProduct(design._id);
                          }}
                        />
                      </Tooltip>
                      {design.onSale && (
                        <Tooltip title="Edit Design">
                          <EditOutlinedIcon
                            sx={{ cursor: "pointer", fontSize: "1.5em" }}
                            onClick={() => {
                              handleOpenEditProduct(design._id);
                            }}
                          />
                        </Tooltip>
                      )}
                    </p>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default DesHome;

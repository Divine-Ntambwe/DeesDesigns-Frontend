import React, { useState, useRef, useContext, useEffect } from "react";
import DesNavbar from "../DesNavbar";
import "./DesHome.modular.css";
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
  const uploadFile = useRef();
  const { url } = useContext(appContext);

  useEffect(() => {
    setFetch(true);
  }, []);

  const handleClickOpenUD = () => {
    setOpenUD(true);
  };

  const handleCloseUD = () => {
    setOpenUD(false);
  };
  const { userDetails } = useContext(Authentication);
  const { allDesignersDesigns, setFetch } = useContext(designerContext);
  const [productImgFile, setProductImgFile] = useState(),
    [productImg, setProductImg] = useState("emptyPfp.jpeg"),
    [UD, setUD] = useState({}),
    [UDC, setUDC] = useState({}),
    [categories, setCategories] = useState([]),
    [editing, setEditing] = useState(false);

  const { postMediaAuth, error,setError, data, loading } = useFetch(
    `/uploadDesignersProduct/${userDetails._id}`
  );

  function handlePostUD(e) {
    e.preventDefault();
    if (!categories.length) return alert("Please select atleast one category");
    if (/[A-Za-z]/.test(UD.price))
      return alert("Your price should only include numbers");

    const details = {
      ...UD,
      itemsInStock: { M: 1 },
      categories,
      onSale: true,
      uploadedBy: `${userDetails.name} ${userDetails.surname}`,
      designerEmail: userDetails.email,
      designerId: userDetails._id,
    };

    const formData = new FormData();
    formData.append("productImage", productImgFile);
    formData.append("details", JSON.stringify(details));

    postMediaAuth(formData, () => {
      handleCloseUD();
      setFetch(true);
      setUD({});
    });
  }

  
  const [editedProductId,setEditedProductId] = useState();
  function handleOpenEditProduct(id){
    setEditedProductId(id);
    setEditing(true);
    const {name,price,productDescription,imagePath,categories} = {...allDesignersDesigns.find((i)=>{return i._id === id})}
    setUD({name,price,productDescription})
    setProductImg(`${url}/${imagePath}`)
    setCategories(categories)
    handleClickOpenUD()()
   
  }
   
  async function handleEditProduct(e) {
    console.log(UD)
    //  e.preventDefault();
    // if (!categories.length) return alert("Please select atleast one category");
    // if (/[A-Za-z]/.test(UD.price))
    //   return alert("Your price should only include numbers");

    // const details = {
    //   ...UD,
    //   itemsInStock: { M: 1 },
    //   categories,
    //   onSale: true,
    //   uploadedBy: `${userDetails.name} ${userDetails.surname}`,
    //   designerEmail: userDetails.email,
    //   designerId: userDetails._id,
    // };

    // const formData = new FormData();
    // formData.append("productImage", productImgFile);
    // formData.append("details", JSON.stringify(details));
    // try {

    //   const res = await fetch(url +`/editDesignerProductDetails/${editedProductId}`, {
    //     method: "PUT",
    //     headers: { Authorization: `Basic ${authCred}` },
    //     body: formData,
    //   });

    //   const result = await res.json();
    
    //   if (res.status === 200) {
    //    handleCloseUD();
    //   setFetch(true);
    //   setUD({});
    //   }
    // } catch (e) {
    //   setError(e)
    // }
    setEditing(false)
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
        <DialogTitle>{"Upload A Design"}</DialogTitle>
        {error && (
          <p className="display-error">Network Error, Please try again later</p>
        )}
        {data.error && <p className="display-error">{data.error}</p>}
        <form
          id="upload-a-design-form"
          style={{ width: "550px", height: "780px" }}
          onSubmit={(e)=>{
            editing?handleEditProduct():handlePostUD()
          }}
        >
          <DialogContent
            id="upload-a-design-content"
            sx={{ width: "550px", height: "700px" }}
          >
            <div id="upload-file-cont">
              <img className="des-pfp" src={productImg}></img>

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
                  required
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
              label="Product Description *"
              id="UD-product-desc"
              name="UDProductDesc"
              onChange={(e) => {
                setUD({ ...UD, productDescription: e.target.value });
              }}
              value={UD.productDescription}
              multiline
              rows={4}
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
            <fieldset
              className="select-categories"
              style={{ display: "grid", gridTemplateColumns: "50% 50%" }}
            >
              <legend style={{ fontFamily: "Roboto" }}>
                Product Categories *
              </legend>

              <FormControlLabel
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
                checked = {categories && categories.includes("Women")}
                onChange={(e) => {
                  categories.includes(e.target.value)
                    ? categories.splice(categories.indexOf(e.target.value), 1)
                    : categories.push(e.target.value);
                  setCategories(categories);
                }}
              />
              <FormControlLabel
                control={
                  <Checkbox
                    sx={{
                      color: "var(--dark-purple)",
                      "&.Mui-checked": {
                        color: "var(--dark-purple)",
                      },
                    }}
                    checked = {categories && categories.includes("Men")}
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
                checked = {categories && categories.includes("Matric Dance")}
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
                checked = {categories && categories.includes("Graduation")}
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
          </DialogContent>
          <DialogActions>
            <Button
              sx={{ color: "var(--dark-purple)" }}
              onClick={handleCloseUD}
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
      <div className="des-home">
        <div className="navbar">
          <DesNavbar />
        </div>

        <div className="des-home-content">
          <h1 style={{ color: "var(--med-purple)", fontSize: "2.5em" }}>
            {userDetails.name} {userDetails.surname}
          </h1>
          <div className="upload-buttons">
            <Button
              onClick={handleClickOpenUD}
              sx={{
                backgroundColor: "var(--med-purple)", // button color
                color: "white", // text color
                width: "400px", // custom width
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
                width: "400px", // custom width
                height: "45px", // custom height
                "&:hover": {
                  backgroundColor: "gray", // hover color
                },
                marginBottom: "10px",
                textAlign: "left",
              }}
            >
              <FileUploadIcon /> Upload A Design For A Customer
            </Button>
            <p></p>
            <p></p>
            <p></p>
          </div>

          <h2>Your Designs</h2>

          <div className="designers-uploads">
            {allDesignersDesigns &&
              allDesignersDesigns.map((design) => (
                <div key={design._id} className="design">
                  <img src={`${url}/${design.imagePath}`} />
                  <div className="product-details">
                    <div>
                      <p className="product-name">{design.name}</p>
                      <p className="price">R{design.price}.00</p>
                    </div>
                    <p className="remove-edit">
                      <Tooltip title="Remove Design">
                        <RemoveCircleOutlineIcon
                          sx={{ cursor: "pointer", fontSize: "1.5em" }}
                        />
                      </Tooltip>
                      <Tooltip title="Edit Design">
                        <EditOutlinedIcon
                          sx={{ cursor: "pointer", fontSize: "1.5em" }}
                          onClick={()=>{handleOpenEditProduct(design._id);}}
                        />
                      </Tooltip>
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

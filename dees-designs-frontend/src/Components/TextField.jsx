import React from "react";
import TextField from '@mui/material/TextField';

function TextFieldComp({type, label, pattern, id, placeholder,onChange,name,value }) {
  return (
    <>
      <TextField
        type={type}
        label={label}
        required
        pattern ={pattern?pattern:null}
        id={id}
        name={name?name:id}
        placeholder={placeholder}
        onChange={onChange}
        value = {value?value:""}
        sx={{
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
    </>
  );
}

export default TextFieldComp;

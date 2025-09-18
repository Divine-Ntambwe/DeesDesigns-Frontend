
import React, { useEffect, useState } from "react";
import useFetch from "../useFetch";
import { useParams } from "react-router-dom";

export default function ConfirmPage() {
  const [status, setStatus] = useState("loading"); // loading, success, error
  const token = useParams().token;
  const {get,data,error} = useFetch(`/confirmCartRequest/${token}`)
  useEffect(() => {
    
    const confirmEmail = async () => {
     get(()=>{
        setStatus("success")
     })
     if (data.error || error) setStatus("error")
    };
    if (token) confirmEmail();
    else setStatus("error");
  }, [token]);
  console.log(token);
  console.log()

  const getMessage = () => {
    switch (status) {
      case "loading":
        return "Confirming your email...";
      case "success":
        return "✅ Email Confirmed!";
      case "error":
        return "❌ Invalid or expired token.";
      default:
        return "";
    }
  };

  const getColor = () => {
    switch (status) {
      case "success":
        return "#e54848";
      case "error":
        return "#d07a7a";
      default:
        return "white";
    }
  };

  return (
    <div style={{
      backgroundColor: "black",
      color: getColor(),
      height: "100vh",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      fontFamily: "Arial, sans-serif",
      textAlign: "center",
      padding: "20px"
    }}>
      <h1 style={{ fontSize: "2.5rem" }}>{getMessage()}</h1>
      {status === "success" && (
        <a href="/login" style={{
          marginTop: "20px",
          padding: "10px 20px",
          backgroundColor: "#e54848",
          color: "white",
          textDecoration: "none",
          borderRadius: "5px",
          fontWeight: "bold"
        }}>Go to Login</a>
      )}
    </div>
  );
}

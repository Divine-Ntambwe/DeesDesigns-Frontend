// ContactUs.jsx
import React from "react";

export default function ContactUs() {
  return (
    <div
      style={{
        backgroundColor: "black",
        color: "white",
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        fontFamily: "'Raleway', sans-serif",
        textAlign: "center",
        padding: "20px",
      }}
    >
      <div>
        <h1
          style={{
            color: "#e54848",
            fontFamily: "'Playfair Display', serif",
            marginBottom: "20px",
          }}
        >
          Contact Us
        </h1>
        <p style={{ marginBottom: "10px" }}>
          We'd love to hear from you. Reach us at:
        </p>
        <a  
          style={{
            color: "#d07a7a",
            fontSize: "1.2rem",
            fontWeight: "bold",
            textDecoration: "none",
          }}
        >
          deesdesigns465@gmail.com
        </a>
      </div>
    </div>
  );
}

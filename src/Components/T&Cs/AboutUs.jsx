// AboutUs.jsx
import React from "react";
import Navbar from "../Navbar";
import Footer from "../Footer";

export default function AboutUs() {
  return (
    <>
    <div className="navbar">
<Navbar/>
    </div>
    
    <div style={{
      backgroundColor: "var(--background-color1)",
      color: "var(--text-color2)",
      minHeight: "100vh",
      padding: "50px",
      fontFamily: "'Raleway', sans-serif",
      lineHeight: "1.8",
      fontSize:"1.5rem"
    }}>
      <h1 style={{
        color: "#e54848",
        fontFamily:  '"Playfair Display", cursive',
        marginBottom: "20px",
        fontSize: "3.5rem"
      }}>
        About Us
      </h1>

      <section style={{ marginBottom: "40px" }}>
        <p>
          At <span style={{ color: "#e54848", fontWeight: "bold" }}>Dee's Designs</span>, we believe fashion
          is more than clothing — it’s a statement of identity, creativity, and culture.  
          Our mission is to bring <span style={{ color: "#d07a7a" }}>designer fashion</span> closer to you,  
          from international brands to talented local creators who redefine style every day.  
        </p>
        <p>
          We carefully curate collections that celebrate elegance, uniqueness, and craftsmanship.  
          Whether you’re looking for timeless classics or bold modern looks, Dee's Designs is your destination.
        </p>
      </section>

      <section style={{ marginBottom: "40px" }}>
        <h2 style={{ color: "#d07a7a", fontFamily: '"Playfair Display", cursive' }}>
          Supporting Local Designers
        </h2>
        <p>
          We proudly open our platform to <span style={{ color: "#e54848" }}> local fashion designers </span>  
          who want to showcase their creations.  
        </p>
        <p>
          Designers can easily upload their collections on our site, gaining exposure to a wider audience.  
          Each design is displayed with the creator’s details, giving them recognition and connecting them  
          directly with fashion enthusiasts who value originality.  
        </p>
      </section>

      <section>
        <h2 style={{ color: "#d07a7a", fontFamily: '"Playfair Display", cursive' }}>
          How to Upload Your Designs
        </h2>
        <ol>
          <li>Create a designer account on Dees Designs.</li>
          <li>Upload high-quality images of your designs.</li>
          <li>Provide product details (name, category, price, and description).</li>

        </ol>
        <p style={{ marginTop: "10px" }}>
         Your designs will appear on the platform alongside global fashion brands,  
          giving you the opportunity to reach new customers and grow your brand.
        </p>
      </section>
    </div>
    <div id="footer">
<Footer/>
    </div>
    </>
  );
}

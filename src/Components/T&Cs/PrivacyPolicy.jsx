// PrivacyPolicy.jsx
import React from "react";
import Navbar from "../Navbar";
import Footer from "../Footer";

export default function PrivacyPolicy() {
  return (
    <>
    <div className="navbar">
      <Navbar/>
    </div>
    <div
      style={{
        backgroundColor: "var(--background-color1)",
        color: "var(--text-color2)",
        minHeight: "100vh",
        padding: "40px 20px",
        fontFamily: "'Raleway', sans-serif",
        lineHeight: "1.6",
      }}
    >
      <div style={{ maxWidth: "800px", margin: "0 auto" }}>
        <h1
          style={{
            color: "#e54848",
            fontFamily: "'Playfair Display', serif",
            marginBottom: "20px",
          }}
        >
          Privacy Policy
        </h1>

        <p>
          Dee’s Designs values your privacy. This Privacy Policy explains how
          we collect, use, and protect your information when you visit or make
          a purchase on our website.
        </p>

        <h2 style={{ color: "#d07a7a", marginTop: "30px" }}>1. Information We Collect</h2>
        <p>
          We may collect personal information such as your name, email address,
          shipping address, and payment details when you make a purchase or
          create an account. We also collect non-personal information, like
          website usage data, cookies, and analytics.
        </p>

        <h2 style={{ color: "#d07a7a", marginTop: "30px" }}>2. How We Use Your Information</h2>
        <ul>
          <li>To process and fulfill your orders</li>
          <li>To communicate with you about your account or orders</li>
          <li>To improve our website, products, and services</li>
        </ul>

        <h2 style={{ color: "#d07a7a", marginTop: "30px" }}>3. Sharing Your Information</h2>
        <p>
          We do not sell your personal information. We may share it with trusted
          service providers who help us operate the website, ship products, or
          process payments. All third parties are obligated to keep your
          information secure.
        </p>

        <h2 style={{ color: "#d07a7a", marginTop: "30px" }}>4. Cookies & Analytics</h2>
        <p>
          Dee’s Designs uses cookies and analytics tools to understand website
          traffic and improve user experience. You can manage your cookie
          preferences through your browser settings.
        </p>

        <h2 style={{ color: "#d07a7a", marginTop: "30px" }}>5. Security</h2>
        <p>
          We take appropriate measures to protect your personal information from
          unauthorized access, alteration, or disclosure.
        </p>

        <h2 style={{ color: "#d07a7a", marginTop: "30px" }}>6. Changes to Privacy Policy</h2>
        <p>
          We may update this policy occasionally. We encourage you to review it
          regularly for any changes.
        </p>

        <p style={{ marginTop: "40px" }}>
          If you have any questions about our Privacy Policy, please contact us
          at{" "}
          <a
            
            style={{ color: "#e54848", textDecoration: "none" }}
          >
            deesdesigns465@gmail.com
          </a>
          .
        </p>
      </div>
    </div>
     <div id="footer">
        <Footer/>
      </div>
    </>
  );
}

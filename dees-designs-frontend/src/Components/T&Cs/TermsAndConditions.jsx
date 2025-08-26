// TermsAndConditions.jsx
import React from "react";

export default function TermsAndConditions() {
  return (
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
          Terms and Conditions
        </h1>

        <p>
          Welcome to <strong>Dee’s Designs</strong>. By accessing and using our
          website, you agree to the following terms and conditions. Please read
          them carefully before making any purchases or uploading your designs.
        </p>

        <h2 style={{ color: "#d07a7a", marginTop: "30px" }}>
          1. Use of the Website
        </h2>
        <p>
          You must be at least 18 years old or have parental/guardian permission
          to use our site. All information provided must be accurate and up to
          date.
        </p>

        <h2 style={{ color: "#d07a7a", marginTop: "30px" }}>
          2. Designer Uploads
        </h2>
        <p>
          Local fashion designers may upload their products to Dee’s Designs.
          Designers are responsible for the originality, quality, and legality
          of the items they showcase. Dee’s Designs reserves the right to remove
          any content that violates our policies.
        </p>

        <h2 style={{ color: "#d07a7a", marginTop: "30px" }}>
          3. Purchases
        </h2>
        <p>
          All sales are final. Please note that we do not offer refunds.
          Shipping and return policies can be found on our dedicated page.
        </p>

        <h2 style={{ color: "#d07a7a", marginTop: "30px" }}>
          4. Intellectual Property
        </h2>
        <p>
          All content on this site, including logos, images, and text, is the
          property of Dee’s Designs or the respective designers and may not be
          copied without permission.
        </p>

        <h2 style={{ color: "#d07a7a", marginTop: "30px" }}>
          5. Limitation of Liability
        </h2>
        <p>
          Dee’s Designs is not responsible for any damages resulting from the
          use of this website, delays in shipping, or issues with third-party
          services.
        </p>

        <h2 style={{ color: "#d07a7a", marginTop: "30px" }}>
          6. Changes to Terms
        </h2>
        <p>
          We may update these Terms and Conditions from time to time. It is your
          responsibility to review them regularly.
        </p>

        <p style={{ marginTop: "40px" }}>
          If you have any questions about these terms, please contact us at{" "}
          <a
           
            style={{ color: "#e54848", textDecoration: "none" }}
          >
            deesdesigns465@gmail.com
          </a>
          .
        </p>
      </div>
    </div>
  );
}

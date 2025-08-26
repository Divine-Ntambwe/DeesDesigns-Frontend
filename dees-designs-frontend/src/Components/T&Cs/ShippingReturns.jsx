// ShippingReturns.jsx
import React from "react";

export default function ShippingReturns() {
  return (
    <div style={{
      backgroundColor: "var(--background-color1)",
      color: "var(--text-color2)",
      minHeight: "100vh",
      padding: "50px",
      fontFamily: "'Raleway', sans-serif",
      lineHeight: "1.8"
    }}>
      <h1 style={{ color: "#e54848", fontFamily: "'Playfair Display', serif", marginBottom: "20px" }}>
        Shipping & Returns
      </h1>

      <section style={{ marginBottom: "30px" }}>
        <h2 style={{ color: "#d07a7a", fontFamily: "'Playfair Display', serif" }}>
          Shipping
        </h2>
        <p>
          We only to deliver locally(Gauteng, South Africa). Orders are processed within 1–3 days.
          Delivery times vary depending on your location:
        </p>
        <ul>
          <li>Local (within country): 5–7 days</li>
        </ul>
        <p>
          Once your order has shipped, you will receive a tracking details on the track order page.  
          There will be additional shipping costs according to complexity of your product.
        </p>
      </section>

      <section style={{ marginBottom: "30px" }}>
        <h2 style={{ color: "#d07a7a", fontFamily: "'Playfair Display', serif" }}>
          Returns
        </h2>
        <p>
          We want you to love your purchase. If your item is damaged or defective upon arrival, 
          please contact us within 7 days of delivery.  
          Items must be unused, unworn, and in original packaging.
        </p>
      </section>

      <section>
        <h2 style={{ color: "#d07a7a", fontFamily: "'Playfair Display', serif" }}>
          Refund Policy
        </h2>
        <p style={{ color: "#e54848", fontWeight: "bold" }}>
          Please note: We do not offer refunds.  
        </p>
        <p>
          Instead, eligible items may be exchanged or returned for store credit.  
          Shipping fees are non-refundable and customers are responsible for 
          return shipping costs.
        </p>
      </section>
    </div>
  );
}

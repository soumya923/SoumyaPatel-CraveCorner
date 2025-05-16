import React from "react";

function AboutUs() {
  return (
    <div
      style={{
        maxWidth: "900px",
        margin: "40px auto",
        padding: "30px",
        backgroundColor: "#f9f9f9", // Soft light background
        borderRadius: "12px",
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
        boxShadow: "0 6px 18px rgba(0, 0, 0, 0.1)",
        color: "#333",
      }}
    >
      <h2
        style={{
          color: "#5D3FD3", // Soft purple for heading
          textAlign: "center",
          marginBottom: "30px",
          fontSize: "30px",
          fontWeight: "600",
        }}
      >
        Learn More About Us!
      </h2>

      <p
        style={{
          fontSize: "18px",
          lineHeight: "1.8",
          color: "black",
          textAlign: "center",
          marginBottom: "40px",
          fontWeight: "400",
        }}
      >
        Welcome to <strong>CraveCorner</strong> – your go-to destination for
        delicious, fresh, and high-quality food products. From sweet treats to
        hearty meals, we take pride in offering a wide variety of items to
        satisfy every craving.
      </p>

      <div
        style={{
          marginBottom: "30px",
        }}
      >
        <h3
          style={{
            color: "green", // Soft orange-red for section headings
            fontSize: "24px",
            fontWeight: "500",
            marginBottom: "10px",
          }}
        >
          🍫 Chocolates
        </h3>
        <p
          style={{
            fontSize: "16px",
            lineHeight: "1.6",
            color: "black",
          }}
        >
          Indulge in our premium collection of handcrafted chocolates. Whether
          you love dark, milk, or nut-filled, we’ve got something to delight every
          chocolate lover.
        </p>
      </div>

      <div
        style={{
          marginBottom: "30px",
        }}
      >
        <h3
          style={{
            color: "green", // Soft orange-red for section headings
            fontSize: "24px",
            fontWeight: "500",
            marginBottom: "10px",
          }}
        >
          🍨 Ice Cream
        </h3>
        <p
          style={{
            fontSize: "16px",
            lineHeight: "1.6",
            color: "black",
          }}
        >
          Cool down with our delicious range of ice creams, available in classic
          and creative flavors. Made with rich cream and natural ingredients,
          every scoop is pure joy.
        </p>
      </div>

      <div
        style={{
          marginBottom: "30px",
        }}
      >
        <h3
          style={{
            color: "green", // Soft orange-red for section headings
            fontSize: "24px",
            fontWeight: "500",
            marginBottom: "10px",
          }}
        >
          🍗 Non-Veg Items
        </h3>
        <p
          style={{
            fontSize: "16px",
            lineHeight: "1.6",
            color: "black",
          }}
        >
          Our non-vegetarian section features fresh poultry, meat, and seafood,
          carefully selected for quality and hygiene. Enjoy taste and freshness in
          every bite.
        </p>
      </div>

      <div
        style={{
          marginBottom: "30px",
        }}
      >
        <h3
          style={{
            color: "green", // Soft orange-red for section headings
            fontSize: "24px",
            fontWeight: "500",
            marginBottom: "10px",
          }}
        >
          🥦 Veg Items
        </h3>
        <p
          style={{
            fontSize: "16px",
            lineHeight: "1.6",
            color: "black",
            
          }}
        >
          From organic greens to seasonal vegetables, our veg section is full of
          healthy options. Whether you're cooking traditional dishes or healthy
          recipes, we’ve got the freshest picks.
        </p>
      </div>

      <p
        style={{
          marginTop: "40px",
          fontWeight: "600",
          textAlign: "center",
          fontSize: "18px",
          color: "indigo", // Dark slate gray for footer text
        }}
      >
        At CraveCorner, we believe in quality, trust, and unforgettable taste.
        Thank you for choosing us!
      </p>
    </div>
  );
}

export default AboutUs;

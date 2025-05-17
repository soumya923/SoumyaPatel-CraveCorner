import React from "react";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="home-container">
      {/* Hero Section */}
      <header className="hero-section">
        <h1>Welcome to CraveCorner!</h1>
        <p>Discover your cravings, from chocolates to ice creams, vegetarian & non-veg dishes 🍫🍦🥦🍗</p>
      </header>

      {/* Our Menu Categories */}
      <section className="section-wrapper">
        <h2 className="section-title">🍽️ Our Menu Categories</h2>
        <div className="category-section">
          <div className="category-item">
            <h3>🍫 Chocolates</h3>
            <Link to="/chocolates" className="category-link"></Link>
            <p>Indulge in rich, handcrafted chocolates.</p>
          </div>
          <div className="category-item">
            <h3>🍦 Ice Creams</h3>
            <Link to="/icecreams" className="category-link"></Link>
            <p>Cool down with our delightful range of ice creams.</p>
          </div>
          <div className="category-item">
            <h3>🥦 Veg Items</h3>
            <Link to="/veg" className="category-link"></Link>
            <p>Explore fresh, healthy, and organic vegetables.</p>
          </div>
          <div className="category-item">
            <h3>🍗 Non-Veg Items</h3>
            <Link to="/non-veg" className="category-link"></Link>
            <p>For the meat lovers, enjoy a variety of non-veg options.</p>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="section-wrapper">
        <h2 className="section-title">⭐ Featured Products</h2>
        <div className="featured-products">
          <div className="product-card">
            <img src="/Images/chocolates.jpeg" alt="Chocolate" />
          </div>
          <div className="product-card">
            <img src="/Images/veg.jpeg" alt="Veg Item" />
          </div>
          <div className="product-card">
            <img src="/Images/icecream.jpeg" alt="Icecream" />
          </div>
          <div className="product-card">
            <img src="/Images/nonveg.jpeg" alt="Non-Veg Item" />
          </div>
        </div>
      </section>

      {/* Footer Section */}
      <footer className="footer-section">
        <p>Thank you for visiting CraveCorner! Your cravings are just a click away. 😋</p>
        <div className="footer-links">
          <a href="#">Privacy Policy</a>
          <a href="#">Terms & Conditions</a>
          <a href="#">Help Center</a>
        </div>
      </footer>

      <style>{`
        .home-container {
          font-family: Arial, sans-serif;
          background-color: #f4f4f4;
        }

        .hero-section {
          background-image: url("/Images/crave.jpg");
          background-size: cover;
          background-position: center;
          height: 650px;
          text-align: center;
          color: white;
          display: flex;
          flex-direction: column;
          justify-content: center;
          padding: 0 20px;
        }

        .hero-section h1 {
          font-size: 70px;
          margin: 0;
          color: white;
        }

        .hero-section p {
          font-size: 26px;
          margin: 20px 0;
        }

        .section-wrapper {
          padding: 40px 20px;
          text-align: center;
        }

        .section-title {
          font-size: 32px;
          margin-bottom: 30px;
          color: #232f3e;
        }

        .category-section {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 20px;
          max-width: 1200px;
          margin: 0 auto;
        }

        .category-item {
          background-color: white;
          padding: 20px;
          border-radius: 8px;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
          transition: transform 0.3s ease;
        }

        .category-item:hover {
          transform: translateY(-5px);
        }

        .category-item h3 {
          font-size: 22px;
          margin-bottom: 10px;
          color: #232f3e;
        }

        .category-item p {
          font-size: 16px;
          color: #555;
        }

        .category-link {
          display: inline-block;
          margin: 10px 0;
          font-weight: bold;
          color: #007bff;
          text-decoration: none;
        }

        .category-link:hover {
          text-decoration: underline;
        }

        .featured-products {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 20px;
          max-width: 1200px;
          margin: 0 auto;
        }

        .product-card {
          background-color: white;
          padding: 15px;
          border-radius: 8px;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
          text-align: center;
        }

        .product-card img {
          width: 100%;
          height: 180px;
          object-fit: cover;
          border-radius: 6px;
        }

        .footer-section {
          background-color: #232f3e;
          color: white;
          text-align: center;
          padding: 40px 20px;
          margin-top: 40px;
        }

        .footer-links a {
          color: #f0c14b;
          margin: 0 10px;
          text-decoration: none;
        }

        .footer-links a:hover {
          text-decoration: underline;
        }

        @media (max-width: 768px) {
          .category-section, .featured-products {
            grid-template-columns: repeat(2, 1fr);
          }

          .hero-section h1 {
            font-size: 50px;
          }

          .hero-section p {
            font-size: 18px;
          }

          .section-title {
            font-size: 24px;
          }
        }

        @media (max-width: 480px) {
          .category-section, .featured-products {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
}

export default Home;

import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./Veg.css";
import { Addtocart } from "./store";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Veg() {
  const dispatch = useDispatch();
  const vegProducts = useSelector((state) => state.Products.Veg);

  const prices = vegProducts.map((p) => p.price);
  const maxPrice = Math.max(...prices, 500);

  const [maxFilterPrice, setMaxFilterPrice] = useState(maxPrice);
  const itemsPerPage = 4;
  const [currentPage, setCurrentPage] = useState(1);

  const handleMaxPriceChange = (e) => {
    setMaxFilterPrice(parseInt(e.target.value));
    setCurrentPage(1);
  };

  const clearPriceFilter = () => {
    setMaxFilterPrice(maxPrice);
    setCurrentPage(1);
  };

  const filteredProducts = vegProducts.filter(
    (product) => product.price <= maxFilterPrice
  );

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = filteredProducts.slice(startIndex, startIndex + itemsPerPage);

  const handlePrev = () => setCurrentPage((prev) => Math.max(prev - 1, 1));
  const handleNext = () => setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  const handlePageClick = (page) => setCurrentPage(page);

  const handleAddToCart = (product) => {
    toast.success(`${product.name} added to cart`, {
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
    });

    dispatch(Addtocart(product));
  };

  return (
    <div className="veg-container">
      <h1 className="heading">Nourish your body with our vibrant, wholesome veggies! 🌽</h1>

      <div className="main-content">
        {/* Left Filter Panel with only Max Price Slider */}
        <div className="filters">

          <label>Max Price: ₹{maxFilterPrice}</label>
          <input
            type="range"
            min="0"
            max={maxPrice}
            value={maxFilterPrice}
            onChange={handleMaxPriceChange}
          />

          {maxFilterPrice !== maxPrice && (
            <button className="clear-filters" onClick={clearPriceFilter}>
              Clear Filter
            </button>
          )}
        </div>

        {/* Product Grid */}
        <div className="product-panel">
          <ul className="card-grid">
            {currentItems.length > 0 ? (
              currentItems.map((product, index) => (
                <li className="card" key={index}>
                  <img src={product.image} alt={product.name} />
                  <div className="card-content">
                    <h3>{product.name}</h3>
                    <p>₹{product.price}</p>
                    <button onClick={() => handleAddToCart(product)}>Add to Cart</button>
                  </div>
                </li>
              ))
            ) : (
              <p>No products found under ₹{maxFilterPrice}.</p>
            )}
          </ul>

          {/* Pagination */}
          <div className="pagination-controls">
            <button
              className="btn btn-secondary"
              onClick={handlePrev}
              disabled={currentPage === 1}
            >
              Prev
            </button>
            {[...Array(totalPages)].map((_, idx) => (
              <button
                key={idx}
                className={`btn ${
                  currentPage === idx + 1 ? "btn-primary" : "btn-outline-primary"
                }`}
                onClick={() => handlePageClick(idx + 1)}
              >
                {idx + 1}
              </button>
            ))}
            <button
              className="btn btn-secondary"
              onClick={handleNext}
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </div>
        </div>
      </div>

      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        closeOnClick
        pauseOnHover
        theme="colored"
      />
    </div>
  );
}

export default Veg;

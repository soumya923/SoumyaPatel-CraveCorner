import React, { useState } from "react";
import "./ChocolateStyles.css";
import { useDispatch, useSelector } from "react-redux";
import { Addtocart } from "./Store";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Chocolate() {
  const dispatch = useDispatch();

  // Get chocolate products from Redux store
  const ChocolateProducts = useSelector(state => state.Products?.Chocolates || []);

  // Optional: Capitalize names
  const processedProducts = ChocolateProducts.map(product => ({
    ...product,
    name: product.name.charAt(0).toUpperCase() + product.name.slice(1)
  }));

  const maxPrice = 900;  // Define the maximum price
  const [maxFilterPrice, setMaxFilterPrice] = useState(maxPrice);

  // Filter products by max price
  const filteredProducts = processedProducts.filter(
    (product) => product.price <= maxFilterPrice
  );

  // Pagination setup
  const itemsPerPage = 4;
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = filteredProducts.slice(startIndex, startIndex + itemsPerPage);

  const handlePrev = () => setCurrentPage(prev => Math.max(prev - 1, 1));
  const handleNext = () => setCurrentPage(prev => Math.min(prev + 1, totalPages));
  const handlePageClick = (page) => setCurrentPage(page);

  const handleMaxPriceChange = (e) => {
    setMaxFilterPrice(parseInt(e.target.value));
    setCurrentPage(1);
  };

  const clearPriceFilter = () => {
    setMaxFilterPrice(maxPrice);
    setCurrentPage(1);
  };

  // Handle Add to Cart and show toast message
  const handleAddToCart = (product) => {
    // Show success toast
    toast.success(`${product.name} added to cart`, {
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
    });

    // Dispatch action to add to cart
    dispatch(Addtocart(product));
  };

  return (
    <div className="container">
      <h1>Sweeten your day with the finest chocolate treats!🍫</h1>

      <div className="sidebar">
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
      </div>

      <ol className="card-grid">
        {currentItems.map((product, index) => (
          <li className="card Chocolate-card" key={product.id || index}>
            <img src={product.image} alt={`Image of ${product.name}`} />
            <div className="card-content">
              <h2>{product.name}</h2>
              <p>₹{product.price}</p>
              <button onClick={() => handleAddToCart(product)}>
                Add to Cart
              </button>
            </div>
          </li>
        ))}
      </ol>

      {/* Pagination Controls */}
      <div className="pagination-controls mt-4 d-flex justify-content-center align-items-center gap-2">
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
            className={`btn ${currentPage === idx + 1 ? "btn-primary" : "btn-outline-primary"}`}
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

      {/* Toast container */}
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

export default Chocolate;

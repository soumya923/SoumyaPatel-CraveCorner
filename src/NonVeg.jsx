import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./NonVeg.css";
import { Addtocart } from "./store";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function NonVeg() {
  const dispatch = useDispatch();
  const nonVegProducts = useSelector((globalstate) => globalstate.Products.NonVeg);

  const maxAvailablePrice = Math.max(...nonVegProducts.map(p => p.price), 0);
  const [maxSliderPrice, setMaxSliderPrice] = useState(maxAvailablePrice);

  const processedProducts = nonVegProducts.map(product => ({
    ...product,
    name: product.name.charAt(0).toUpperCase() + product.name.slice(1)
  }));

  // Handle slider change
  const handleSliderChange = (e) => {
    setMaxSliderPrice(Number(e.target.value));
    setCurrentPage(1); // Reset to first page when slider changes
  };

  // Clear slider filter
  const clearFilter = () => {
    setMaxSliderPrice(maxAvailablePrice);
    setCurrentPage(1);
  };

  // Filter products by slider
  const filteredProducts = nonVegProducts.filter(
    (product) => product.price <= maxSliderPrice
  );

  // Pagination setup
  const itemsPerPage = 4;
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = filteredProducts.slice(startIndex, startIndex + itemsPerPage);

  const handlePrev = () => setCurrentPage((prev) => Math.max(prev - 1, 1));
  const handleNext = () => setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  const handlePageClick = (page) => setCurrentPage(page);

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
    <div className="nonveg-container">
      <h1>Craving something hearty? Dive into our non-veg menu! 🍖</h1>

      {/* Slider Filter */}
      <div className="filters">
        <div className="price-slider">
          <label htmlFor="priceRange">Max Price: ₹{maxSliderPrice}</label>
          <input
            type="range"
            id="priceRange"
            min="0"
            max={maxAvailablePrice}
            value={maxSliderPrice}
            onChange={handleSliderChange}
          />
        </div>

        {maxSliderPrice < maxAvailablePrice && (
          <button className="clear-filters" onClick={clearFilter}>
            Clear Filter
          </button>
        )}
      </div>

      {/* Product List */}
      <ul className="card-grid">
        {currentItems.length > 0 ? (
          currentItems.map((product, index) => (
            <li className="card" key={index}>
              <img src={product.image} alt={`Image of ${product.name}`} />
              <div className="card-content">
                <h3>{product.name}</h3>
                <p>₹{product.price}</p>
                <button onClick={() => handleAddToCart(product)}>
                  Add to Cart
                </button>
              </div>
            </li>
          ))
        ) : (
          <p>No products under ₹{maxSliderPrice}.</p>
        )}
      </ul>

      {/* Pagination controls */}
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

export default NonVeg;

// IceCream.jsx
import React, { useState } from "react";
import "./IceCreamStyles.css";
import { useDispatch, useSelector } from "react-redux";
import { Addtocart } from "./Store";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function IceCream() {
  const dispatch = useDispatch();
  const iceCreamProducts = useSelector((state) => state.Products.IceCreams);

  const processedProducts = iceCreamProducts.map((product) => ({
    ...product,
    name: product.name.charAt(0).toUpperCase() + product.name.slice(1),
  }));

  const maxPrice = 450;
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

  const filteredProducts = processedProducts.filter(
    (product) => product.price <= maxFilterPrice
  );

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = filteredProducts.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  const handlePrev = () => setCurrentPage((prev) => Math.max(prev - 1, 1));
  const handleNext = () =>
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
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
    <div className="container">
      <h1>Sweeten Your Day with Our Irresistible Ice Cream Flavors!🍨</h1>

      {/* Filter Panel */}
      <div className="filters mb-4">
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
      {currentItems.length > 0 ? (
        <ol className="card-grid">
          {currentItems.map((product, index) => (
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
          ))}
        </ol>
      ) : (
        <p className="text-center">
          No ice creams found under ₹{maxFilterPrice}.
        </p>
      )}

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="pagination-controls mt-4">
          <button
            className="btn"
            onClick={handlePrev}
            disabled={currentPage === 1}
          >
            Prev
          </button>

          {[...Array(totalPages)].map((_, idx) => (
            <button
              key={idx}
              className={`btn ${
                currentPage === idx + 1
                  ? "btn-primary"
                  : "btn-outline-primary"
              }`}
              onClick={() => handlePageClick(idx + 1)}
            >
              {idx + 1}
            </button>
          ))}

          <button
            className="btn"
            onClick={handleNext}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      )}

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

export default IceCream;

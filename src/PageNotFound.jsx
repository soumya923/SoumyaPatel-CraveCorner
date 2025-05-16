// src/pages/NotFound.js
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './PageNotFoundStyles.css';

const PageNotFound = () => {
  const navigate = useNavigate(); // Hook to navigate programmatically

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/'); // Redirect to the home page after 20 seconds
    }, 5000); // Wait for 2 seconds before redirect

    // Clean up the timeout if the component unmounts before 8 seconds
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="PageNotFound-container">
      <h1>404</h1>
      <p>Oops! The page you’re looking for doesn’t exist.</p>
      <img 
  src="public/images/page.jpg"
  alt="Page Not Found" 
  className="PageNotFound-image" 
/>
      <p>Redirecting to Home...</p> {/* Message indicating redirection */}
    </div>
  );
};

export default PageNotFound;
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from './store';
import { Link, useNavigate } from 'react-router-dom';

function SignIn() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [username, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);

  const error = useSelector(state => state.user.error);
  const isAuthenticated = useSelector(state => state.user.isAuthenticated);

  useEffect(() => {
    if (isAuthenticated) {
      setShowSuccess(true);

      const timer = setTimeout(() => {
        navigate('/cart');
      }, 1500);

      return () => clearTimeout(timer);
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(loginUser({ username, password }));
  };

  return (
    <div className="signin-container">
      <h2>Sign In</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUserName(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Sign In</button>
      </form>

      {error && !isAuthenticated && <p className="error-message">❌ {error}</p>}
      {showSuccess && <p className="success-message">✅ Sign in successful! Redirecting...</p>}

      <p>
        New user? <Link to="/sign-up">Sign Up</Link>
      </p>
    </div>
  );
}

export default SignIn;

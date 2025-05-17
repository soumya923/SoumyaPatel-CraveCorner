import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser } from './store';
 // adjust path as needed

function SignUp() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [username, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [success, setSuccess] = useState(false);

  const error = useSelector(state => state.user.error);

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(registerUser({ username, password, email }));

    if (!error) {
      setSuccess(true);
      setTimeout(() => {
        navigate('/sign-in');
      }, 1500);
    }
  };

  return (
    <div className="signup-container">
      <h2>Sign Up</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUserName(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Sign Up</button>
      </form>

      {success && <p className="success-message">✅ Signup successful! Redirecting to Sign In...</p>}
      {error && <p className="error-message">❌ {error}</p>}

      <p>
        Already registered? <a href="/signIn">Sign In</a>
      </p>
    </div>
  );
}

export default SignUp;

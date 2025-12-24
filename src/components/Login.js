import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/Login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    // Basic validation
    if (!email || !password) {
      setError('Please fill in all fields');
      setIsLoading(false);
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('Please enter a valid email address');
      setIsLoading(false);
      return;
    }

    try {
      // Simulate API call
      setTimeout(() => {
        console.log('Login attempt:', { email, password });
          setIsLoading(false);
          // On successful login navigate to dashboard
          navigate('/dashboard');
      }, 1500);
    } catch (err) {
      setError('Login failed. Please try again.');
      setIsLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="stars"></div>
      <div className="stars2"></div>
      <div className="stars3"></div>

      <div className="container-fluid d-flex align-items-center justify-content-center min-vh-100">
        <div className="row w-100 px-3">
          <div className="col-12 col-sm-10 col-md-8 col-lg-5 mx-auto">
            <div className="login-card">
              {/* Header */}
              <div className="login-header text-center mb-5">
                <div className="login-icon mb-3">
                  <i className="fas fa-lock-open"></i>
                </div>
                <h1 className="login-title">Welcome Back</h1>
                <p className="login-subtitle">Sign in to your account</p>
              </div>

              {/* Error Alert */}
              {error && (
                <div
                  className="alert alert-danger alert-dismissible fade show"
                  role="alert"
                >
                  <i className="fas fa-exclamation-circle me-2"></i>
                  {error}
                  <button
                    type="button"
                    className="btn-close"
                    onClick={() => setError('')}
                  ></button>
                </div>
              )}

              {/* Form */}
              <form onSubmit={handleSubmit}>
                {/* Email Field */}
                <div className="mb-4">
                  <label htmlFor="email" className="form-label fw-bold">
                    Email Address
                  </label>
                  <div className="input-group input-group-lg">
                    <span className="input-group-text border-0 bg-light">
                      <i className="fas fa-envelope text-primary"></i>
                    </span>
                    <input
                      type="email"
                      className="form-control form-control-lg border-0 bg-light"
                      id="email"
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                </div>

                {/* Password Field */}
                <div className="mb-3">
                  <label htmlFor="password" className="form-label fw-bold">
                    Password
                  </label>
                  <div className="input-group input-group-lg">
                    <span className="input-group-text border-0 bg-light">
                      <i className="fas fa-lock text-primary"></i>
                    </span>
                    <input
                      type={showPassword ? 'text' : 'password'}
                      className="form-control form-control-lg border-0 bg-light"
                      id="password"
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    <button
                      type="button"
                      className="btn btn-light border-0 bg-light"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      <i
                        className={`fas fa-eye${!showPassword ? '-slash' : ''} text-primary`}
                      ></i>
                    </button>
                  </div>
                </div>

                {/* Remember & Forgot */}
                <div className="d-flex justify-content-between align-items-center mb-4">
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="rememberMe"
                    />
                    <label className="form-check-label" htmlFor="rememberMe">
                      Remember me
                    </label>
                  </div>
                  <a href="#forgot" className="text-decoration-none forgot-link">
                    Forgot password?
                  </a>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="btn btn-primary btn-lg w-100 fw-bold mb-3"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <span
                        className="spinner-border spinner-border-sm me-2"
                        role="status"
                        aria-hidden="true"
                      ></span>
                      Signing in...
                    </>
                  ) : (
                    <>
                      <i className="fas fa-sign-in-alt me-2"></i>
                      Sign In
                    </>
                  )}
                </button>
              </form>

              {/* Footer */}
              <p className="text-center text-muted">
                Don't have an account?{' '}
                <a href="#signup" className="text-decoration-none signup-link fw-bold">
                  Sign up here
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;

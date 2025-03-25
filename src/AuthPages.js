import React, { useState } from 'react';
import './AuthPages.css';
import UserRoleSelection from './UserRoleSelection';
import UserInputForm from './UserInputForm';
import App from './App';

const AuthPages = ({ initialPage = 'signup', onClose }) => {
  const [currentPage, setCurrentPage] = useState(initialPage === 'signup' ? 'role-selection' : 'login');
  const [selectedRole, setSelectedRole] = useState(null);
  const [userInputData, setUserInputData] = useState(null);
  const [userCredentials, setUserCredentials] = useState(null);
  
  const switchPage = () => {
    if (currentPage === 'signup') {
      setCurrentPage('login');
    } else if (currentPage === 'login') {
      setCurrentPage('role-selection');
    }
  };

  const handleRoleSelectionComplete = (role) => {
    setSelectedRole(role);
    setCurrentPage('signup');
  };

  const handleUserInputComplete = (data) => {
    setUserInputData(data);
    onClose();
  };

  const handleBackFromRoleSelection = () => {
    if (onClose) {
      onClose();
    }
  };

  const handleBackFromUserInput = () => {
    setCurrentPage('signup');
  };

  const handleSignupComplete = (credentials) => {
    setUserCredentials(credentials);
    setCurrentPage('user-input');
  };

  const renderContent = () => {
    switch (currentPage) {
      case 'role-selection':
        return (
          <UserRoleSelection
            onComplete={handleRoleSelectionComplete}
            onBack={handleBackFromRoleSelection}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
        );
      case 'signup':
        return (
          <SignupForm 
            onSwitchPage={switchPage} 
            onComplete={handleSignupComplete}
            selectedRole={selectedRole}
          />
        );
      case 'login':
        return <LoginForm onSwitchPage={switchPage} />;
      case 'user-input':
        return (
          <UserInputForm
            onComplete={handleUserInputComplete}
            onBack={handleBackFromUserInput}
          />
        );
      default:
        return null;
    }
  };

  // Only show header with tabs when we're in login or signup pages
  const showHeader = currentPage === 'login' || currentPage === 'signup';
  
  return (
    <div className="auth-container">
      {showHeader && (
        <div className="header-container-auth">
          <div className="logo">YAIIA</div>
          <div className="auth-buttons">
            <button 
              className={currentPage === 'login' ? "login-btn active" : "login-btn"} 
              onClick={() => setCurrentPage('login')}
            >
              Login
            </button>
            <button 
              className={currentPage === 'signup' ? "signup-btn active" : "signup-btn"} 
              onClick={() => setCurrentPage('role-selection')}
            >
              Signup
            </button>
          </div>
        </div>
      )}
      
      {renderContent()}
    </div>
  );
};

// Updated SignupForm to include selected role and handle form submission
const SignupForm = ({ onSwitchPage, onComplete, selectedRole }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [otp, setOtp] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically validate inputs and make an API call
    // For now, we'll just pass the credentials to the parent component
    onComplete({ email, password });
  };

  return (
    <div className="forms-container">
      <div className="auth-form">
        <h2 className="form-title">Signup</h2>
        
       
        <button className="google-button">
          <svg height="18" width="18" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <path d="M21.8,10.4h-0.75v0h-9v3.6h5.85c-0.55,2.39-2.64,3.6-5.05,3.6c-2.94,0-5.65-2.4-5.65-6.35 c0-3.88,2.5-6.35,5.65-6.35c1.32,0,2.8,0.5,3.84,1.34l2.56-2.56C17.13,2.4,14.93,1.55,12,1.55C6.82,1.55,2.63,5.8,2.63,11.25 c0,5.45,4.18,9.7,9.37,9.7c4.07,0,8.63-2.95,8.63-9.7C20.63,10.95,21.8,10.4,21.8,10.4z" fill="#3E82F1"></path>
            <path d="M3.88,7.35L6.9,9.6c0.92-2.24,2.94-3.1,5.1-3.1c1.32,0,2.8,0.5,3.84,1.34l2.56-2.56 C17.13,2.4,14.93,1.55,12,1.55C8.4,1.55,5.29,3.95,3.88,7.35z" fill="#CB3927"></path>
            <path d="M12,21.45c2.95,0,5.9-1,7.59-2.85l-2.72-2.4c-0.9,0.8-2.39,1.44-4.88,1.44c-2.39,0-4.5-1.2-5.05-3.6L3.95,16.7 C5.5,19.75,8.5,21.45,12,21.45z" fill="#32A753"></path>
            <path d="M21.8,10.4h-0.75v0h-9v3.6h5.85c-0.25,1.19-0.98,2.2-1.9,2.8l2.72,2.4c-0.4-0.4,2.13-1.6,2.13-4.85 C20.63,10.95,21.8,10.4,21.8,10.4z" fill="#FCB900"></path>
          </svg>
          <span>Continue with Google</span>
        </button>
        
        <div className="divider">
          <div className="divider-line"></div>
          <span>or</span>
          <div className="divider-line"></div>
        </div>
        
        <form onSubmit={handleSubmit}>
          <input 
            type="email" 
            placeholder="Email" 
            className="input-field"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          
          <input 
            type="password" 
            placeholder="Password" 
            className="input-field"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          
          <div className="otp-container">
            <button className="otp-button" type="button">
              Get OTP
            </button>
            <input 
              type="text" 
              placeholder="Enter OTP" 
              className="otp-input"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
            />
          </div>
          
          <button className="submit-button" type="submit">
            Signup
          </button>
        </form>
        
        <div className="switch-option">
          <span>Already have an account? </span>
          <button 
            className="switch-button"
            onClick={onSwitchPage}
            type="button"
          >
            Login
          </button>
        </div>
        
        <div className="terms-text">
          By signing up, you agree to YAIIA's <a href="#">Terms & Conditions</a> & <a href="#">Privacy Policy</a>
        </div>
      </div>
    </div>
  );
};

const LoginForm = ({ onSwitchPage }) => {
  return (
    <div className="forms-container">
      <div className="auth-form">
        <h2 className="form-title">Login</h2>
        
        <button className="google-button">
          <svg height="18" width="18" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <path d="M21.8,10.4h-0.75v0h-9v3.6h5.85c-0.55,2.39-2.64,3.6-5.05,3.6c-2.94,0-5.65-2.4-5.65-6.35 c0-3.88,2.5-6.35,5.65-6.35c1.32,0,2.8,0.5,3.84,1.34l2.56-2.56C17.13,2.4,14.93,1.55,12,1.55C6.82,1.55,2.63,5.8,2.63,11.25 c0,5.45,4.18,9.7,9.37,9.7c4.07,0,8.63-2.95,8.63-9.7C20.63,10.95,21.8,10.4,21.8,10.4z" fill="#3E82F1"></path>
            <path d="M3.88,7.35L6.9,9.6c0.92-2.24,2.94-3.1,5.1-3.1c1.32,0,2.8,0.5,3.84,1.34l2.56-2.56 C17.13,2.4,14.93,1.55,12,1.55C8.4,1.55,5.29,3.95,3.88,7.35z" fill="#CB3927"></path>
            <path d="M12,21.45c2.95,0,5.9-1,7.59-2.85l-2.72-2.4c-0.9,0.8-2.39,1.44-4.88,1.44c-2.39,0-4.5-1.2-5.05-3.6L3.95,16.7 C5.5,19.75,8.5,21.45,12,21.45z" fill="#32A753"></path>
            <path d="M21.8,10.4h-0.75v0h-9v3.6h5.85c-0.25,1.19-0.98,2.2-1.9,2.8l2.72,2.4c-0.4-0.4,2.13-1.6,2.13-4.85 C20.63,10.95,21.8,10.4,21.8,10.4z" fill="#FCB900"></path>
          </svg>
          <span>Continue with Google</span>
        </button>
        
        <div className="divider">
          <div className="divider-line"></div>
          <span>or</span>
          <div className="divider-line"></div>
        </div>
        
        <input 
          type="email" 
          placeholder="Email" 
          className="input-field"
        />
        
        <input 
          type="password" 
          placeholder="Password" 
          className="input-field"
        />
        
        <button className="submit-button">
          Login
        </button>
        
        <div className="forgot-password">
          <button>
            Forgot Password?
          </button>
        </div>
        
        <div className="switch-option">
          <span>Don't have an account? </span>
          <button 
            className="switch-button"
            onClick={onSwitchPage}
          >
            Signup
          </button>
        </div>
        
        <div className="terms-text">
          By signing in, you agree to YAIIA's <a href="#">Terms & Conditions</a> & <a href="#">Privacy Policy</a>
        </div>
      </div>
    </div>
  );
};

export default AuthPages;
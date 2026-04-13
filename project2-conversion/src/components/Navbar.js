import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
 
function Navbar({ isLoggedIn, onLogout }) {
  const [navOpen, setNavOpen] = useState(false);
  const navigate = useNavigate();
 
  const handleLogout = () => {
    onLogout();
    setNavOpen(false);
    navigate('/');
  };
 
  const closeNav = () => {
    setNavOpen(false);
  };
 
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <Link className="navbar-brand d-flex align-items-center gap-2" to="/" onClick={closeNav}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="36"
            height="36"
            viewBox="0 0 24 24"
            fill="#ffc107"
            aria-hidden="true"
          >
            <path d="M12 21.593c-5.63-5.539-11-10.297-11-14.402 0-3.791 3.068-5.191 5.281-5.191 1.312 0 4.151.501 5.719 4.457 1.59-3.968 4.464-4.447 5.726-4.447 2.54 0 5.274 1.621 5.274 5.181 0 4.069-5.136 8.625-11 14.402z" />
          </svg>
          My Passion Project
        </Link>
 
        <button
          className="navbar-toggler"
          type="button"
          aria-controls="navbarNav"
          aria-expanded={navOpen}
          aria-label="Toggle navigation"
          onClick={() => setNavOpen(!navOpen)}
        >
          <span className="navbar-toggler-icon"></span>
        </button>
 
        <div className={`collapse navbar-collapse ${navOpen ? 'show' : ''}`} id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/" onClick={closeNav}>Home</Link>
            </li>
 
            {!isLoggedIn && (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/registration" onClick={closeNav}>Registration</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/login" onClick={closeNav}>Login</Link>
                </li>
              </>
            )}
 
            {isLoggedIn && (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/account" onClick={closeNav}>Account</Link>
                </li>
                <li className="nav-item">
                  <button
                    className="nav-link btn btn-link"
                    style={{ background: 'none', border: 'none' }}
                    onClick={handleLogout}
                  >
                    Logout
                  </button>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}
 
export default Navbar;
 
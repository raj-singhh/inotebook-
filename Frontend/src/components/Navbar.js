import React, { useState ,useEffect } from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [username, setUsername] = useState(null);
  useEffect(() => {
    setUsername(localStorage.getItem('username'));
    // eslint-disable-next-line 
  }, [localStorage.getItem('username')])

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');

    navigate("/login");
    setIsOpen(false); // Close the navbar after logout
  };

  // Toggle navbar on mobile
  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };

  // Close navbar when a link is clicked
  const closeNavbar = () => {
    setIsOpen(false);
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow-sm fixed-top">
        <div className="container-fluid">
          <NavLink className="navbar-brand fw-bold text-light" to="/">📒 iNoteBook</NavLink>

          {/* Navbar Toggler Button */}
          <button 
            className="navbar-toggler" 
            type="button" 
            onClick={toggleNavbar}
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          {/* Navbar Links */}
          <div className={`collapse navbar-collapse ${isOpen ? "show" : ""}`}>
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <NavLink className="nav-link text-light " to="/" onClick={closeNavbar}>Home</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link text-light" to="/about" onClick={closeNavbar}>About</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link text-light" to="/contact" onClick={closeNavbar}>Contact Us</NavLink>
              </li>
            </ul>

            {/* Authentication Buttons */}
            {!localStorage.getItem('token') ? (
              <div className="d-flex">
                <Link className="btn btn-outline-light mx-1" to="/login" onClick={closeNavbar}>
                  <i className="fas fa-sign-in-alt me-1"></i> Login
                </Link>
                <Link className="btn btn-outline-light mx-1" to="/signup" onClick={closeNavbar}>
                  <i className="fas fa-user-plus me-1"></i> Signup
                </Link>
              </div>
            ) : (
              
              <div className="d-flex align-items-center">
              <span className="text-light me-3"><i className="fa-solid fa-user"></i> {username}</span>
              <button className="btn btn-danger" onClick={handleLogout}>
                <i className="fas fa-sign-out-alt me-1"></i> Logout
              </button>
            </div>
            )}
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;

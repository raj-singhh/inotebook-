import React from 'react'
import { NavLink } from 'react-router-dom'
const Footer = () => {
  return (
    <footer className="bg-dark text-light py-4 mt-5">
    <div className="container text-center">
      <div className="row">
        {/* Brand Name */}
        <div className="col-md-4 mb-3">
          <h5 className="fw-bold">📒 iNotebook</h5>
          <p className="small">Your secure and smart note-taking app.</p>
        </div>

        {/* Navigation Links */}
        <div className="col-md-4 mb-3">
          <h5 className="fw-bold">Quick Links</h5>
          <ul className="list-unstyled">
            <li><NavLink className="text-light text-decoration-none" to="/">Home</NavLink></li>
            <li><NavLink className="text-light text-decoration-none" to="/about">About</NavLink></li>
            <li><NavLink className="text-light text-decoration-none" to="/contact">Contact Us</NavLink></li>
          </ul>
        </div>

        {/* Social Media Icons */}
        <div className="col-md-4 mb-3">
          <h5 className="fw-bold">Follow Us</h5>
          <div>
          <a href="https://www.facebook.com/anjay.rajpaliwal" className="text-primary mx-2" target="_blank" rel="noopener noreferrer">
                  <i className="fab fa-facebook fa-lg"></i>
                </a>
                <a href="https://github.com/raj-singhh" className="text-light mx-2" target="_blank" rel="noopener noreferrer">
                  <i className="fab fa-github fa-lg"></i>
                </a>
                <a href="https://www.linkedin.com/in/rajsingh-/" className="text-primary mx-2" target="_blank" rel="noopener noreferrer">
                  <i className="fab fa-linkedin fa-lg"></i>
                </a>
                <a href="https://instagram.com" className="text-danger mx-2" target="_blank" rel="noopener noreferrer">
                  <i className="fab fa-instagram fa-lg"></i>
                </a>
          </div>
        </div>
      </div>

      {/* Copyright Section */}
      <hr className="border-light" />
      <p className="small mb-0">© {new Date().getFullYear()} iNoteBook. All rights reserved.</p>
    </div>
  </footer>

  )
}

export default Footer

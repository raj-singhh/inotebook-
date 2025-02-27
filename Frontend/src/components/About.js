import React, { useEffect } from "react";
import {Link} from 'react-router-dom'
import noteTaking from "./noteTaking.jpg"
const About = () => {
  useEffect(() => {
    window.scrollTo(0, 0); // Scroll to the top when component mounts
  }, []);
  return (
    <div className="container " style={{marginTop:"80px"}}>
      <h1 className="text-center mb-4">About iNotebook</h1>
      <p className="lead text-center text-muted">
        A secure, fast, and reliable note-taking app for your daily needs.
      </p>

      <div className="row mt-5">
        <div className="col-md-6">
          <img
            src={noteTaking}
            className="img-fluid rounded shadow-lg"
            alt="Note Taking"
          />
        </div>
        <div className="col-md-6">
          <h3>🚀 Why Choose iNotebook?</h3>
          <ul className="list-group list-group-flush">
            <li className="list-group-item">
              <strong>🔒 Secure:</strong> Your notes are encrypted and safe.
            </li>
            <li className="list-group-item">
              <strong>📂 Organized:</strong> Tag and categorize notes easily.
            </li>
            <li className="list-group-item">
              <strong>🌍 Cloud Storage:</strong> Access notes from anywhere.
            </li>
            <li className="list-group-item">
              <strong>🎨 Simple UI:</strong> Clean, distraction-free design.
            </li>
            <li className="list-group-item">
              <strong>⚡ Fast & Lightweight:</strong> No lag, no unnecessary features.
            </li>
          </ul>
        </div>
      </div>

      <div className="mt-5 text-center">
        <h4>Ready to start? ✍️</h4>
        <p className="text-muted">Create, edit, and manage your notes easily with iNotebook.</p>
        <Link to="/signup" className="btn btn-primary btn-lg mt-2">
          Get Started
        </Link>
      </div>
    </div>
  );
};

export default About;

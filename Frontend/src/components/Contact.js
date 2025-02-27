import React, { useState, useEffect } from "react";

const Contact = (props) => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        message: "",
    });

    useEffect(() => {
        window.scrollTo(0, 0); // Scroll to the top when component mounts
    }, []);

    // Handle input change
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent default form submission

        const formUrl = process.env.REACT_APP_FEEDBACK_URL;

        const formDataToSubmit = new FormData();
        formDataToSubmit.append("entry.1469291478", formData.name); // Name field
        formDataToSubmit.append("entry.669431968", formData.email); // Email field
        formDataToSubmit.append("entry.1473918074", formData.message); // Message field

        try {
            await fetch(formUrl, {
                method: "POST",
                mode: "no-cors",
                body: formDataToSubmit,
            });

            // Show success alert
            props.showAlert("success", "Your response has been submitted successfully!");

            // Clear the form
            setFormData({ name: "", email: "", message: "" });
        } catch (error) {
            props.showAlert("danger","Error submitting form. Please try again!");
        }
    };

    return (
        <div className="container " style={{marginTop:"122px"}}>
            <div className="row justify-content-center">
                <div className="col-md-8">
                    <div className="card shadow-lg border-0 rounded-3">
                        <div className="card-body p-4">
                            {/* Contact Heading */}
                            <h2 className="text-center fw-bold mb-4">📞 Contact Us</h2>
                            <p className="text-center text-muted">
                                Have questions or feedback? Fill out the form below and we'll get back to you as soon as possible!
                            </p>

                            {/* Contact Form */}
                            <form onSubmit={handleSubmit}>
                                {/* Name Field */}
                                <div className="mb-3">
                                    <label className="form-label fw-bold">Your Name</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="name"
                                        placeholder="Enter your name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>

                                {/* Email Field */}
                                <div className="mb-3">
                                    <label className="form-label fw-bold">Email Address</label>
                                    <input
                                        type="email"
                                        className="form-control"
                                        name="email"
                                        placeholder="Enter your email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>

                                {/* Message Field */}
                                <div className="mb-3">
                                    <label className="form-label fw-bold">Message</label>
                                    <textarea
                                        className="form-control"
                                        name="message"
                                        rows="4"
                                        placeholder="Write your message..."
                                        value={formData.message}
                                        onChange={handleChange}
                                        required
                                    ></textarea>
                                </div>

                                {/* Submit Button */}
                                <div className="d-grid">
                                    <button type="submit" className="btn btn-primary btn-lg shadow-sm">
                                        <i className="fas fa-paper-plane"></i> Send Message
                                    </button>
                                </div>
                            </form>

                            {/* Social Media Links */}
                            <div className="text-center mt-4">
                                <h5 className="fw-bold">Follow Us</h5>
                                <a href="https://www.facebook.com/anjay.rajpaliwal" className="text-primary mx-2" target="_blank" rel="noopener noreferrer">
                                    <i className="fab fa-facebook fa-lg"></i>
                                </a>
                                <a href="https://github.com/raj-singhh" className="text-dark mx-2" target="_blank" rel="noopener noreferrer">
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
                </div>
            </div>
        </div>
    );
};

export default Contact;

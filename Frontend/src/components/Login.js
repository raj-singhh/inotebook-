import React, { useState,useEffect  } from 'react'
import { useNavigate ,Link } from 'react-router-dom';

const Login = (props) => {
    useEffect(() => {
        window.scrollTo(0, 0); // Scroll to the top when component mounts
    }, [])
    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    let navigate = useNavigate()
    const [credentials, setCredentials] = useState({ email: "", password: "" });
    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
    }
    const handleSumbit = async (e) => {
        e.preventDefault();
        const response = await fetch("https://inotebook-backend-5non.onrender.com/api/auth/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email: credentials.email, password: credentials.password }),
        });
        const json = await response.json();

        if (json.success) {
            //redirect
            localStorage.setItem('token', json.authToken);
            localStorage.setItem('username', json.username);

            props.showAlert("success", "Logged in Successfully")
            navigate("/")
        }
        else {
            props.showAlert("danger", "Invalid Credentials")
        }
    }
    return (
        <div className="container  d-flex justify-content-center" style={{marginTop:"100px"}}>
            <div className="card shadow-lg p-4 w-100" style={{ maxWidth: "400px", borderRadius: "10px" }}>
                <h2 className="text-center mb-4">Login</h2>
                <form onSubmit={handleSumbit}>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label fw-bold">Email Address</label>
                        <input type="email" className="form-control" id="email" name="email" value={credentials.email} aria-describedby="emailHelp" onChange={onChange} placeholder="Enter your email" required />
                        <div id="emailHelp" className="form-text text-muted">
                            We'll never share your email with anyone else.
                        </div>
                    </div>

                    <div className="mb-3">
                        <label htmlFor="password" className="form-label fw-bold">Password</label>
                        <div className="input-group">
                            <input type={showPassword ? "text" : "password"} className="form-control" id="password" name="password" value={credentials.password} onChange={onChange} placeholder="Enter your password" required/>
                            <button type="button" className="btn btn-outline-secondary" onClick={togglePasswordVisibility}>
                                {showPassword ? <i className="fa-solid fa-eye-slash"></i> : <i className="fa-solid fa-eye"></i>}
                            </button>
                        </div>
                    </div>

                    <div className="d-grid">
                        <button type="submit" className="btn btn-primary btn-lg" disabled={credentials.email==="" || credentials.password===""}>
                            Submit
                        </button>
                    </div>
                    <div className="text-center mt-3">
                <p className="mb-0">Don't have an account? <Link to="/signup" className="text-primary fw-bold">Register</Link></p>
            </div>
                </form>
            </div>
        </div>


    )
}

export default Login

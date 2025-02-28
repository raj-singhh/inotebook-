import React , {useState ,useEffect} from 'react'
import { useNavigate } from 'react-router-dom';

const Signup = (props) => {
  useEffect(() => {
    window.scrollTo(0, 0); // Scroll to the top when component mounts
  }, [])
  const [showPassword, setShowPassword] = useState(false);
  
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  let navigate =useNavigate(); 
  const [credentials, setCredentials] = useState({name:"" ,email:"" , password:"" , cpassword:""} );
  const [error, setError] = useState("");
  const [touched, setTouched] = useState(false);
  const handleSubmit=async(e)=>{
    const {name , email , password } = credentials;
    e.preventDefault();
    const response = await fetch("https://inotebook-backend-5non.onrender.com/api/auth/createuser", {

        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({name , email, password }),
      });
      const  json = await response.json();
      console.log(json);
      if(json.success){
        //redirect
        localStorage.setItem('token' , json.authToken);
        localStorage.setItem('username' , json.username);
        
        navigate("/")
        props.showAlert("success" , "Account Created Successfully")
      }
      else{
        props.showAlert("danger" , json.error)
      }
}
  const onChange=(e)=>{
    setCredentials({...credentials, [e.target.name ]:e.target.value})
     // Live validation for confirm password
     
     if (e.target.name === "cpassword") {
       setTouched(true);
      setError(e.target.value !== credentials.password ? "Passwords do not match!" : "");
  }
}
  return (
    <div className="container  d-flex justify-content-center" style={{marginTop:"100px"}}>
    <div className="card shadow-lg p-4 w-100" style={{ maxWidth: "400px", borderRadius: "10px" }}>
        <h2 className="text-center mb-4">Sign Up</h2>
        <form onSubmit={handleSubmit}>
            <div className="mb-3">
                <label htmlFor="name" className="form-label fw-bold">Name</label>
                <input 
                    type="text" 
                    className="form-control" 
                    id="name" 
                    name="name"  
                    onChange={onChange} 
                    placeholder="Enter your name"
                    required
                />
            </div>

            <div className="mb-3">
                <label htmlFor="email" className="form-label fw-bold">Email Address</label>
                <input 
                    type="email" 
                    className="form-control" 
                    id="email" 
                    name="email"  
                    onChange={onChange} 
                    placeholder="Enter your email"
                    required
                />
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

            <div className="mb-3 ">
                        <label htmlFor="cpassword" className="form-label fw-bold">Confirm Password</label>
                        <input type="password" className={`form-control ${touched && (error ? "is-invalid" : "is-valid")}`} id="cpassword" name="cpassword" onChange={onChange} minLength={5} placeholder="Re-enter your password" required />
                        {touched && error && <div className="invalid-feedback">{error}</div>}
                    </div>

            <div className="d-grid">
                <button type="submit" className="btn btn-primary btn-lg" disabled={!credentials.password || credentials.password !== credentials.cpassword}>Sign Up</button>
            </div>
            {/* Login Link */}
            <div className="text-center mt-3">
                <p className="mb-0">Already have an account? <a href="/login" className="text-primary fw-bold">Login</a></p>
            </div>
        </form>
    </div>
</div>

  )
}

export default Signup

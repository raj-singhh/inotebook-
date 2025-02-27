import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import About from "./components/About";
import NoteState from "./context/notes/NoteState";
import Alert from "./components/Alert";
import { useState } from "react";
import Signup from "./components/Signup";
import Login from "./components/Login";
import Footer from "./components/Footer";
import Contact from "./components/Contact";

function App() {
  const [alert, setAlert] = useState(null)
  const showAlert=(type , message)=>{
    setAlert({
      type : type,
      message:message
    })
    setTimeout(() => {
      setAlert(null);
    }, 1500);
  }
  return (
    <>
    <NoteState>
      <BrowserRouter>
      <Navbar />
      
      <Alert alert={alert}/>
      <div className="container">
      <Routes>
        <Route exact path="/" element={<Home  showAlert={showAlert}/> } />
        <Route exact path="/about" element={<About />}/>
        <Route exact path="/contact" element={<Contact showAlert={showAlert}/> }/>
        <Route exact path="/login" element={<Login  showAlert={showAlert}/>}/>
        <Route exact path="/signup" element={<Signup showAlert={showAlert}/>}/>
      </Routes>
      </div>
      <Footer/>
      </BrowserRouter>
      </NoteState>
    </>
  );
}

export default App;

import React from "react";

const Alert = (props) => {
    const capitalizeWord = (word)=>{
      if(word==="danger"){word="error"}
        let lower=word.toLowerCase();
        return lower.charAt(0).toUpperCase() +lower.slice(1);
    }
  return (
    <div className="fixed-top" style={{height:"20px" , marginTop:"60px" , zIndex:"1100" }}>
    { props.alert && <div className="container">
        <div className={`alert alert-${props.alert.type}`}  style={{ zIndex: 1100}} role="alert">
          <strong>{capitalizeWord(props.alert.type)}:</strong> {props.alert.message}
        </div>
      </div>
    }
    
    </div>
  );
};

export default Alert;

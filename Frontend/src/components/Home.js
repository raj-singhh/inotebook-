import React ,{  useEffect } from "react";
import Notes from "./Notes";
const Home = (props) => {
  useEffect(() => {
            window.scrollTo(0, 0); // Scroll to the top when component mounts
  // eslint-disable-next-line 
  }, []);

  return (
    <div >
      
     <Notes showAlert={props.showAlert}/>
    </div>
  );
};

export default Home;

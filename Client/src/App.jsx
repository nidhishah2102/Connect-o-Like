import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";
import "./App.css";
import Signup from "./Pages/Signup";
import { Toaster } from "react-hot-toast";
import Loader from "./components/Loader"; // Update the path
import Main from './Pages/Main'
import AnimatedCursor from "react-animated-cursor"
<<<<<<< HEAD
import Particle from "./Particle";
import Login from "./Pages/Login";
=======

>>>>>>> e6307b4d1c9193e0b9e73719e0cbbb18ffeba5ea
const App = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    AOS.init({
      duration: 600,
      once: true,
    });
    setTimeout(() => {
      setLoading(false);
    }, 1500);
  }, []);

  return (
   

    <div className="relative main-div">
    
        <AnimatedCursor
      innerSize={8}
      outerSize={8}
      color='255,255,255'
      outerAlpha={0.2}
      innerScale={0.7}
      outerScale={5}
      clickables={[
        'a',
        'input[type="text"]',
        'input[type="email"]',
        'input[type="number"]',
        'input[type="submit"]',
        'input[type="image"]',
        'label[for]',
        'select',
        'textarea',
        'button',
        '.link'
      ]}
    />
   
      <div className="absolute top-0 z-[-2] h-screen w-screen bg-neutral-950 bg-radial-gradient"></div>

      {loading ? (
        <Loader />
      ) : (
        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Main />} />
          {/* Other routes go here */}
        </Routes>
      )}
      <Particle id="tsparticles" />
      <Toaster position="top-center" reverseOrder={false} />
    </div>
  );
};

export default App;
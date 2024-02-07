import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";
import "./App.css";
import Signup from "./Pages/Signup";
import { Toaster } from "react-hot-toast";
import Loader from "./components/Loader";
import { Navigate, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Main from "./Pages/Main";
import AnimatedCursor from "react-animated-cursor";
import Particle from "./Particle";
import Login from "./Pages/Login";
import Dashboard from "./Pages/Dashboard";
import Navbar from "./components/Navbar";
import MyAccount from "./Pages/MyAccount";
import Connections from "./Pages/Connections";
import PublicProfile from "./Pages/publicProfile";
const App = () => {
  // const [loading, setLoading] = useState(true);
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const navigate = useNavigate();
  // console.log(isLoggedIn);
  useEffect(() => {
    AOS.init({
      duration: 600,
      once: true,
    });
    // setTimeout(() => {
    //   setLoading(false);
    // }, 800);
  }, []);
  useEffect(() => {
    if (isLoggedIn) {
      const forbiddenRoutes = ["/login", "/signup"];
      const currentPath = window.location.pathname;

      if (forbiddenRoutes.includes(currentPath)) {
        navigate("/dashboard", { replace: true });
      }
    }
  }, [isLoggedIn, navigate]);
  return (
    <>
      <div className="relative main-div z-50">
        <AnimatedCursor
          innerSize={8}
          outerSize={8}
          color="255,255,255"
          outerAlpha={0.2}
          innerScale={0.7}
          outerScale={5}
          clickables={[
            "a",
            'input[type="text"]',
            'input[type="email"]',
            'input[type="number"]',
            'input[type="submit"]',
            'input[type="image"]',
            "label[for]",
            "select",
            "textarea",
            "button",
            ".link",
          ]}
        />

        <div className="absolute top-0 z-[-2] h-full w-screen bg-neutral-950 bg-radial-gradient"></div>

        {/* {loading ? (
          <Loader />
        ) : ( */}
        <>
          {isLoggedIn && <Navbar />}
          <Routes>
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<Main />} />
            <Route
              path="/dashboard"
              element={
                isLoggedIn ? <Dashboard /> : <Navigate to="/login" replace />
              }
            ></Route>
            <Route
              path="/myaccount"
              element={
                isLoggedIn ? <MyAccount /> : <Navigate to="/login" replace />
              }
            ></Route>
            <Route
              path="/connections"
              element={
                isLoggedIn ? <Connections /> : <Navigate to="/login" replace />
              }
            ></Route>
            <Route
              path="/user/:userId"
              element={
                isLoggedIn ? (
                  <PublicProfile />
                ) : (
                  <Navigate to="/login" replace />
                )
              }
            ></Route>
          </Routes>
        </>
        {/* )} */}

        <Toaster position="top-center" reverseOrder={false} />
        {!isLoggedIn && <Particle id="tsparticles" />}
      </div>
    </>
  );
};

export default App;

import React, { useState } from "react";
import Header from "./Header";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import Aboutus from "./Aboutus";
import Testimonials from "./Testimonials";
const Main = () => {
  return (
    <div className=" max-w-screen h-full  z-99">
      <Navbar />
      <Header />
      <Aboutus />
      <Testimonials />
      <Footer />
    </div>
  );
};

export default Main;

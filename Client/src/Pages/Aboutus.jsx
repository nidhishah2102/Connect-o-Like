import React from "react";
import About from "../assets/about.png";

const Aboutus = () => {
  return (
    <div
      className="max-w-screen max-w-[84rem] rounded-[36px] mx-auto   font-primary bg-white/[.1] hover:bg-white/[.1] border border-white/[.05]"
      data-aos="fade-in-out"
      id="aboutus"
    >
       <div className="flex flex-col sm:flex-row py-6 justify-around flex-wrap">
        <div className="flex w-full sm:w-1/2 flex-col text-gray-300 text-center sm:text-center justify-center items-center gap-2 p-4">
           <h2 className="text-center font-secondary text-3xl font-semibold tracking-tight text-gray-200 sm:text-5xl">
            What we do ?
          </h2>
          <p className="text-medium font-secondary text-center ">
            At Connect-o-like, we've crafted a vibrant community where
            developers from all walks of life and skill levels come together to
            turn solo endeavors into collaborative masterpieces. Whether you're
            a seasoned coding veteran or just starting your programming journey,
            our platform is designed to foster a sense of connection and
            collaboration that transcends individual projects.
          </p>
        </div>
        <div className="w-full lg:w-2/6 sm:w-1/2 flex items-center justify-center text-center mt-6 sm:mt-0">
          <img src={About} alt="About Us" className="max-w-full h-auto" />
        </div>
      </div>
    </div>
  );
};

export default Aboutus;

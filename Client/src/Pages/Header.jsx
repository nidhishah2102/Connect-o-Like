import React from "react";
import { GlowCapture, Glow } from "@codaworks/react-glow";
import "./Header.css";
const Header = () => {
  return (
    <div>
      <div className="max-w-screen mx-auto px-4 sm:px-6 lg:px-8 py-24 space-y-8 font-primary">
        <div className="flex justify-center items-center">
          <a
            className="glow:text-glow/50 glow:bg-primary' group inline-block bg-white/[.05] hover:bg-white/[.1] border border-white/[.05] p-1 ps-4 rounded-full shadow-md"
            href="/signup"
          >
            <p className="me-2 inline-block text-white text-sm ">
              Connect with fellow devs
            </p>
            <span className="group-hover:bg-white/[.1] py-1.5 px-2.5 inline-flex justify-center items-center gap-x-2 rounded-full bg-white/[.075] font-semibold text-white text-sm">
              <svg
                className="flex-shrink-0 w-4 h-4"
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
              >
                <path
                  d="M5.27921 2L10.9257 7.64645C11.1209 7.84171 11.1209 8.15829 10.9257 8.35355L5.27921 14"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                />
              </svg>
            </span>
          </a>
        </div>

        <div
          className="max-w-5xl text-center mx-auto "
          data-aos="fade-up"
          data-aos-anchor-placement="center-center"
          data-aos-duration="600"
        >
          <GlowCapture>
            <Glow>
              <h1 className="block font-medium text-gray-300 text-4xl sm:text-5xl md:text-6xl lg:text-7xl glow:text-glow/50 glow:text-white ">
                Code, Connect, Collaborate on ConX
              </h1>
            </Glow>
          </GlowCapture>
        </div>

        <div className="max-w-3xl text-center mx-auto">
          <p className="text-md text-gray-400 font-secondary">
            Tired of solo projects? Longing for the synergy of a brilliant team?
            Welcome to ConX, where developers of all skill levels connect,
            collaborate, and ignite their coding dreams.
          </p>
        </div>

        <div className="text-center ">
          <GlowCapture>
            <Glow>
              <a
                className=" inline-flex justify-center items-center gap-x-3 text-center  shadow-md shadow-transparent  text-white text-sm font-medium rounded-full focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 focus:ring-offset-white py-3 px-6 dark:focus:ring-offset-gray-800 bg-white/[.05] hover:bg-white/[.1] border border-white/[.05] glow:text-white glow:bg-[#675db2]"
                href="#"
              >
                Get started
                <svg
                  className="flex-shrink-0 w-4 h-4"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <path d="m9 18 6-6-6-6" />
                </svg>
              </a>
            </Glow>
          </GlowCapture>
        </div>
      </div>
    </div>
    // </div>
  );
};

export default Header;

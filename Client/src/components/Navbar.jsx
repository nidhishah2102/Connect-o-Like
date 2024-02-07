import React, { Fragment, useState } from "react";
import { Transition, Menu } from "@headlessui/react";
import { useNavigate } from "react-router-dom";
import { FiMenu } from "react-icons/fi";
import { useSelector, useDispatch } from "react-redux";
import { RxCross2 } from "react-icons/rx";
import { Link } from "react-scroll";
import { logoutUser } from "../store/action";
import toast from "react-hot-toast";
const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  const userData = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logoutUser());
    navigate("/");
    toast.success("Logout successful!");
  };
  const handleAccount = () => {
    navigate("/myaccount");
  };

  return (
    <header className="flex font-primary flex-wrap md:justify-start md:flex-nowrap z-50 text-sm">
      <nav
        className="mt-6 relative w-screen max-w-[84rem] border-gray-200 rounded-[36px] mx-2 py-3 px-4 md:flex md:items-center md:justify-between md:py-0 md:px-6 lg:px-8 xl:mx-auto bg-white/[.05] hover:bg-white/[.1] border border-white/[.05]"
        aria-label="Global"
      >
        <div className="flex items-center justify-between">
          <div className="flex justify-center items-center cursor-pointer">
            <svg
              fill="#fff"
              version="1.1"
              id="Capa_1"
              xmlns="http://www.w3.org/2000/svg"
              xmlns:xlink="http://www.w3.org/1999/xlink"
              width="22px"
              height="22px"
              viewBox="0 0 122.3 122.3"
              xml:space="preserve"
            >
              <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
              <g
                id="SVGRepo_tracerCarrier"
                stroke-linecap="round"
                stroke-linejoin="round"
              ></g>
              <g id="SVGRepo_iconCarrier">
                {" "}
                <g>
                  {" "}
                  <path d="M116.3,15.15H6c-3.3,0-6,2.7-6,6v80c0,3.3,2.7,6,6,6h110.3c3.3,0,6-2.7,6-6v-80C122.3,17.85,119.6,15.15,116.3,15.15z M42.6,57.75l-19.7,19.7c-1.7,1.7-4.2,2.3-6.3,1.4c-4.3-1.8-5-7-2.1-9.9l11.2-11.2c2.3-2.3,2.3-6.1,0-8.5l-11.3-11.2 c-2.9-2.9-2.2-8.1,2.1-9.9c2.2-0.9,4.7-0.3,6.3,1.4l19.7,19.7c1.2,1.2,1.8,2.7,1.8,4.2S43.8,56.55,42.6,57.75z M86.5,79.15h-36 c-3.3,0-6-2.7-6-6s2.7-6,6-6h36c3.3,0,6,2.7,6,6S89.8,79.15,86.5,79.15z"></path>{" "}
                </g>{" "}
              </g>
            </svg>
            <a
              className="text-white flex-none text-xl font-semibold mx-2  cursor-pointer"
              aria-label="Brand"
              href="/dashboard"
            >
              ConX
            </a>
          </div>
          <div className="md:hidden">
            {/* Mobile Menu Button */}
            <Menu>
              <Menu.Button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="hs-collapse-toggle w-8 h-8 flex justify-center items-center text-sm font-semibold rounded-full border border-gray-200 text-gray-200 disabled:opacity-50 disabled:pointer-events-none"
                data-hs-collapse="#navbar-collapse-with-animation"
                aria-controls="navbar-collapse-with-animation"
                aria-label="Toggle navigation"
              >
                {isMobileMenuOpen ? (
                  <RxCross2 className="flex-shrink-0 w-4 h-4 text-white" />
                ) : (
                  <FiMenu className="flex-shrink-0 w-4 h-4 text-white" />
                )}
              </Menu.Button>
            </Menu>
          </div>
        </div>
        <div
          id="navbar-collapse-with-animation"
          className="hs-collapse hidden overflow-hidden transition-all duration-300 basis-full grow md:block"
        >
          <div className="flex flex-col gap-y-4 gap-x-0 mt-5 md:flex-row md:items-center md:justify-end md:gap-y-0 md:gap-x-7 md:mt-0 md:ps-7">
            {/* Your main menu items for desktop screens */}
            <a
              className={`font-medium  hover:text-gray-200 text-gray-400`}
              aria-current="page"
              href={isLoggedIn ? "/connections" : "/aboutus"}
            >
              {isLoggedIn ? (
                <>Connections</>
              ) : (
                <Link
                  to="aboutus"
                  smooth={true}
                  duration={500}
                  spy={true}
                  exact="true"
                  offset={-70}
                >
                  About us
                </Link>
              )}
            </a>

            <a
              className={`font-medium hover:text-white md:py-6 text-gray-400 dark:hover:text-gray-200 cursor-pointer`}
              href={isLoggedIn ? "/myaccount" : "/"}
            >
              {isLoggedIn ? (
                <>My Account</>
              ) : (
                <Link
                  to="test"
                  smooth={true}
                  duration={500}
                  spy={true}
                  exact="true"
                  offset={-70}
                >
                  Testimonials
                </Link>
              )}
            </a>

            {/* Log in button */}
            {isLoggedIn ? (
              <div className="font-primary">
                <div className="flex-shrink-0 group block ">
                  {/* User Image */}
                  <Menu>
                    <Menu.Button>
                      <div className="flex items-center rounded-[16px]">
                        <img
                          className="inline-block flex-shrink-0 h-[2.3rem] w-[2.3rem] object-cover rounded-full transition-opacity cursor-pointer"
                          src={
                            userData.profile
                              ? `data:image/png;base64,${userData.profile}`
                              : "https://img.freepik.com/free-vector/illustration-businessman_53876-5856.jpg?w=740&t=st=1707217366~exp=1707217966~hmac=c69010fa42c07b6119e668deeb5566763c01553ae42e29782d155d406d0b6575"
                          }
                          alt="User Avatar"
                        />
                      </div>
                    </Menu.Button>
                    {/* User Dropdown */}
                    <Transition
                      as={Fragment}
                      enter="transition ease-out duration-100"
                      enterFrom="transform opacity-0 scale-95"
                      enterTo="transform opacity-100 scale-100"
                      leave="transition ease-in duration-75"
                      leaveFrom="transform opacity-100 scale-100"
                      leaveTo="transform opacity-0 scale-95"
                    >
                      <Menu.Items className="origin-top-right absolute right-8 mt-4 w-48  shadow-lg bg-white rounded-lg text-black ring-1 ring-black ring-opacity-5 focus:outline-none z-99">
                        <div className="py-1">
                          <Menu.Item>
                            {({ active }) => (
                              <div
                                onClick={handleAccount}
                                className={`text-gray-800  px-4 py-2 hover:bg-white cursor-pointer ${
                                  active ? "bg-gray-200" : ""
                                }`}
                              >
                                <p className="text-sm font-medium">
                                  {userData.name}
                                </p>
                                <p className="text-xs text-gray-700">
                                  {userData.email}
                                </p>
                              </div>
                            )}
                          </Menu.Item>
                          <Menu.Item>
                            {({ active }) => (
                              <div
                                className={`text-gray-800 hover:bg-white flex items-center gap-x-1 hover:text-red-500 cursor-pointer px-4 py-2 ${
                                  active ? "bg-gray-200" : ""
                                }`}
                                onClick={handleLogout}
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  strokeWidth={1.5}
                                  stroke="currentColor"
                                  className="w-4 h-4"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15m-3 0-3-3m0 0 3-3m-3 3H15"
                                  />
                                </svg>
                                Logout
                              </div>
                            )}
                          </Menu.Item>
                        </div>
                      </Menu.Items>
                    </Transition>
                  </Menu>
                </div>
              </div>
            ) : (
              <a
                className="flex items-center gap-x-2 font-medium cursor-pointer text-gray-200  md:border-s md:border-gray-300 md:my-6 md:ps-6 dark:border-gray-700 dark:text-gray-400 hover:text-[#a296ff]"
                onClick={() => navigate("/login")}
              >
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
                  <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
                  <circle cx="12" cy="7" r="4" />
                </svg>
                Log in
              </a>
            )}
          </div>
        </div>
        {/* Mobile Menu */}
        <Transition show={isMobileMenuOpen} as={Fragment}>
          <div>
            <Menu>
              <Menu.Button>
                {/* The button that triggers the menu */}
              </Menu.Button>
              <Transition.Child as={Fragment}>
                <Menu.Items>
                  <div className="flex flex-col gap-y-4 py-2 px-4">
                    {/* Your mobile menu items */}
                    <a
                      className="font-medium text-gray-400 py-2 hover:text-white"
                      aria-current="page"
                    >
                      <Link
                        to="aboutus"
                        smooth={true}
                        duration={500}
                        spy={true}
                        exact="true"
                        offset={-70}
                      >
                        About us
                      </Link>
                    </a>
                    <a
                      className="font-medium text-gray-400 py-2 hover:text-white"
                      aria-current="page"
                    >
                      <Link
                        to="test"
                        smooth={true}
                        duration={500}
                        spy={true}
                        exact="true"
                        offset={-70}
                      >
                        Testimonials
                      </Link>
                    </a>
                  </div>
                </Menu.Items>
              </Transition.Child>
            </Menu>
          </div>
        </Transition>
      </nav>
    </header>
  );
};

export default Navbar;

import React, { useState } from "react";
import Header from "./Header";
import Whatwedo from "./Whatwedo";
import Navbar from "../components/Navbar";

const Main = () => {
  const [selectedMenuItem, setSelectedMenuItem] = useState("home");

  const handleMenuItemClick = (menuItem) => {
    setSelectedMenuItem(menuItem);
  };

  return (
    <div className="bg-gradient-to-b from-violet-600/[.15] via-transparent w-screen h-screen">
      <Navbar onMenuItemClick={handleMenuItemClick} />
      {selectedMenuItem === "home" && <Header />}
      {selectedMenuItem === "whatwedo" && <Whatwedo />}
    </div>
  );
};

export default Main;

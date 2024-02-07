import React, { useState, useEffect } from "react";
import UserProfileCard from "./UserProfile";
import Loader from "./Loader";
import { Transition } from "@headlessui/react";
const SearchUser = ({ userData }) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Set isLoading based on the presence of userData
    setIsLoading(userData && userData.length === 0);
  }, [userData]); // Watch for changes in userData

  return (
    <div className="flex flex-wrap justify-center bg-secondary h-full max-w-screen py-6 items-center z-40">
      {userData && userData.length > 0 ? (
        isLoading ? (
          <Loader /> // Render loader if isLoading is true
        ) : (
          userData.map((profile) => (
            <UserProfileCard key={profile._id} profile={profile} />
          ))
        )
      ) : (
        <Transition
          show={userData && userData.length === 0}
          enter="transition-opacity duration-500"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="transition-opacity duration-500"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="text-center text-xl  p-2  text-gray-200 font-primary">
            No users found
          </div>
        </Transition>
      )}
    </div>
  );
};

export default SearchUser;

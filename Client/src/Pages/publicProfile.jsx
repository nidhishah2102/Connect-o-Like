import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchSingleUserProfile, sendConnectionRequest } from "../store/action";
import Loader from "../components/Loader";
import toast from "react-hot-toast";
const PublicProfile = () => {
  const { userId } = useParams();
  const dispatch = useDispatch();
  const [userData, setUserData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [isConnection, setIsconnection] = useState(null);
  const [connectionRequested, setConnectionRequested] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await dispatch(fetchSingleUserProfile(userId));
        setUserData(response.payload.profile);
        setIsconnection(response.payload.isConnection);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching user profile:", error);
        setIsError(true);
        setIsLoading(false);
      }
    };
    fetchData();
  }, [dispatch, userId]);

  const handleConnect = () => {
    dispatch(sendConnectionRequest({ receiverId: userId }))
      .then(() => {
        setConnectionRequested(true);
        toast.success("Connection request sent successfully!");
      })
      .catch((error) => {
        toast.error("Failed to send connection request");
        console.error("Error sending connection request:", error);
      });
  };

  if (isLoading) {
    return <Loader />;
  }

  if (isError) {
    return <div>Error: Failed to fetch user profile</div>;
  }

  return (
    <>
      <div className=" lg:h-full h-full flex justify-center p-2">
        <div className="flex flex-col gap-4 p-4 lg:flex-row  lg:w-3/4 h-full ">
          <div
            className=" bg-white/[.07] hover:bg-white/[.1] border border-white/[.09] lg:w-2/6 rounded-md"
            data-aos="fade-right"
          >
            <div className="flex flex-col items-center justify-center py-6 gap-y-6">
              <div className="flex items-center justify-center flex-col gap-y-3">
                <div className="relative">
                  <img
                    src={
                      userData.profile
                        ? `data:image/png;base64,${userData.profile}`
                        : "https://img.freepik.com/free-vector/illustration-businessman_53876-5856.jpg?w=740&t=st=1707217366~exp=1707217966~hmac=c69010fa42c07b6119e668deeb5566763c01553ae42e29782d155d406d0b6575"
                    }
                    alt=""
                    className="h-36 w-36 object-cover rounded-full transition-opacity hover:opacity-75"
                  />
                </div>
                <div className="flex flex-col text-white text-center font-third">
                  <h1 className="font-primary text-2xl flex items-center gap-x-1">
                    {userData.name}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-6 h-6 text-green-600"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M9 12.75 11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 0 1-1.043 3.296 3.745 3.745 0 0 1-3.296 1.043A3.745 3.745 0 0 1 12 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 0 1-3.296-1.043 3.745 3.745 0 0 1-1.043-3.296A3.745 3.745 0 0 1 3 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 0 1 1.043-3.296 3.746 3.746 0 0 1 3.296-1.043A3.746 3.746 0 0 1 12 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 0 1 3.296 1.043 3.746 3.746 0 0 1 1.043 3.296A3.745 3.745 0 0 1 21 12Z"
                      />
                    </svg>
                  </h1>
                  <p>
                    {userData.headline ? userData.headline : "Add Headline"}{" "}
                  </p>
                  <p className="text-sm">
                    {userData.location ? userData.location : "Add location"}{" "}
                  </p>
                </div>
              </div>
              <div className="flex flex-col  text-white w-full px-6 mt-6">
                {!isConnection && (
                  <div className="absolute inset-0 flex justify-center items-center mt-40">
                    <p className="text-center text-gray-200 font-primary">
                      Connect with the user to see details
                    </p>
                  </div>
                )}
                <div
                  className={`${
                    isConnection
                      ? " flex  flex-col gap-y-5"
                      : " flex  flex-col filter blur-sm gap-y-5 cursor-not-allowed"
                  } `}
                >
                  <div className="flex items-center justify-between ">
                    <i className="ci ci-x-light ci-2x"></i>
                    <p>
                      <a
                        href="#"
                        className="hover:underline hover:text-blue-400"
                      >
                        {userData.social?.twitter
                          ? userData.social.twitter
                          : " Twitter Not Available"}
                      </a>
                    </p>
                  </div>
                  <div className="flex items-center justify-between">
                    <i className="ci ci-instagram ci-2x"></i>
                    <p>
                      <a
                        href="#"
                        className="hover:underline hover:text-blue-400"
                      >
                        {userData.social?.instagram
                          ? userData.social.instagram
                          : " Instagram Not Available"}
                      </a>
                    </p>
                  </div>
                  <div className="flex items-center justify-between">
                    <i className="ci ci-leetcode-light ci-2x"></i>
                    <p>
                      <a
                        href="#"
                        className="hover:underline hover:text-blue-400"
                      >
                        {userData.social?.leetcode
                          ? userData.social.leetcode
                          : " Leetcode Not Available"}
                      </a>
                    </p>
                  </div>
                  <div className="flex items-center justify-between">
                    <i className="ci ci-github-light ci-2x"></i>
                    <p>
                      <a
                        href="#"
                        className="hover:underline hover:text-blue-400"
                      >
                        {userData.social?.github
                          ? userData.social.github
                          : " Github Not Available"}
                      </a>
                    </p>
                  </div>
                  <div className="flex items-center justify-between">
                    <i className="ci ci-discord ci-2x"></i>
                    <p>
                      <a
                        href="#"
                        className="hover:underline hover:text-blue-400"
                      >
                        {userData.social?.discord
                          ? userData.social.discord
                          : "Discord Not Available"}
                      </a>
                    </p>
                  </div>
                  <div className="flex items-center justify-between">
                    <i className="ci ci-gmail ci-2x"></i>
                    <p>
                      <a
                        href="#"
                        className="hover:underline hover:text-blue-400"
                      >
                        {userData.social?.gmail
                          ? userData.social.gmail
                          : "Gmail Not Available"}
                      </a>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div
            className="flex-1 bg-white/[.07] hover:bg-white/[.1] border border-white/[.09] rounded-md"
            data-aos="fade-left"
          >
            <div className=" flex flex-col text-white p-6 gap-y-5">
              <div className="flex items-center justify-between border-b border-b-white/[.5] p-2  rounded-md">
                <h3 className="font-semibold">Name</h3>
                <p>{userData.name}</p>
              </div>
              <div className="flex items-center justify-between border-b border-b-white/[.5] p-2 rounded-md">
                <h3 className="font-semibold">Email</h3>
                <p>{userData.email}</p>
              </div>
              <div className="flex items-center justify-between border-b border-b-white/[.5] p-2 rounded-md">
                <h3 className="font-semibold">Number</h3>
                <p>
                  {userData.number ? userData.number : " Number not updated"}
                </p>
              </div>
              <div className="flex items-center justify-between border-b border-b-white/[.5] p-2 rounded-md">
                <h3 className="font-semibold">Location</h3>
                <p>
                  {userData.location
                    ? userData.location
                    : " Location not updated"}
                </p>
              </div>
              <div className="flex items-center justify-between border-b border-b-white/[.5] p-2 rounded-md">
                <h3 className="font-semibold">Experience</h3>
                <p>
                  {userData.experience
                    ? userData.experience
                    : "Experience not updated"}
                </p>
              </div>
              <div className="flex items-center justify-between border-b border-b-white/[.5] py-2 rounded-xl">
                <h3 className="font-semibold">Bio</h3>
                <p className="w-2/4">
                  {userData.bio ? userData.bio : " Bio not updated"}
                </p>
              </div>
            </div>
            <div className="font-primary text-white p-6">
              <h1 className="text-xl">Skills</h1>
              <div className="my-4 flex flex-wrap gap-1 justify-start font-third font-normal">
                {userData.skills.map((skill, index) => (
                  <span
                    key={index}
                    className="bg-gray-100 text-gray-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-full dark:bg-gray-700 dark:text-gray-300"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
            <div className="flex px-6 py-2 space-x-4">
              {isConnection ? null : connectionRequested ? ( // If already connected, show nothing // If not connected, show the Connect button
                <button className="bg-gray-300 text-gray-800 py-3 px-4 rounded-xl text-sm">
                  Request Sent
                </button>
              ) : (
                <button
                  onClick={handleConnect}
                  className="bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 hover:bg-gradient-to-br focus:ring-4 text-white py-3 px-4 rounded-xl hover:bg-purple-700 text-sm"
                >
                  Connect
                </button>
              )}
              <button className="bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 hover:bg-gradient-to-br focus:ring-4 focus:ring-purple-300 text-white px-6 py-2 rounded-md hover:bg-purple-600">
                Share
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PublicProfile;

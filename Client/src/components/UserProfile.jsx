import React, { useState } from "react";
import { CiLinkedin } from "react-icons/ci";
import { FaLink } from "react-icons/fa";
import { LuGithub } from "react-icons/lu";
import { FaXTwitter } from "react-icons/fa6";
import { FaLinkedinIn } from "react-icons/fa";
import { sendConnectionRequest } from "../store/action";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
const UserProfileCard = ({ profile }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [connectionRequested, setConnectionRequested] = useState(false);

  const handleConnect = () => {
    dispatch(sendConnectionRequest({ receiverId: profile._id }))
      .then(() => {
        // Update UI to show connection requested
        setConnectionRequested(true);
        // Show success toast message
        toast.success("Connection request sent successfully!");
      })
      .catch((error) => {
        // Handle error, show error toast message
        toast.error("Failed to send connection request");
        console.error("Error sending connection request:", error);
      });
  };
  const handleProfile = (userId) => {
    navigate(`/user/${userId}`);
  };
  return (
    <div className="bg-white w-72 mx-4 my-4 rounded-md shadow-md flex flex-col items-center cursor-pointer gap-y-2 py-4">
      <div className="mb-3">
        <img
          src={
            profile.profile
              ? `data:image/png;base64,${profile.profile}`
              : "https://img.freepik.com/free-vector/illustration-businessman_53876-5856.jpg?w=740&t=st=1707217366~exp=1707217966~hmac=c69010fa42c07b6119e668deeb5566763c01553ae42e29782d155d406d0b6575"
          }
          alt={profile.name}
          className="h-32 w-32 rounded-full object-cover border-2"
        />
      </div>
      <h1 className="text-lg font-semibold mb-1 text-primary">
        {profile.name}
      </h1>
      <p className="text-gray-600">
        {profile.headline ? profile.headline : ""}
      </p>
      <h3 className="text-gray-500 mb-2 text-sm">{profile.role}</h3>
      <div className="mb-2 flex flex-wrap gap-2 justify-center">
        {profile.skills.slice(0, 5).map((skill, index) => (
          <span
            key={index}
            className="px-2 py-1 bg-gray-200 text-gray-800 rounded-md text-xs"
          >
            {skill}
          </span>
        ))}
      </div>
      <div className="flex space-x-2 mb-2">
        <a
          href={profile.linkedin}
          className="text-gray-800 text-lg hover:text-black hover:underline"
        >
          <FaLinkedinIn />
        </a>
        <a
          href={profile.website}
          className="text-gray-800 text-lg hover:text-black  hover:underline"
        >
          <FaLink />
        </a>
        <a
          href={profile.github}
          className="text-gray-800 text-lg hover:text-black hover:underline "
        >
          <LuGithub />
        </a>
        <a
          href={profile.twitter}
          className="text-gray-800 text-lg hover:text-black  hover:underline"
        >
          <FaXTwitter />
        </a>
      </div>
      <div className="flex space-x-2">
        {!profile.isConnection &&
          (connectionRequested ? (
            <button className="bg-gray-300 text-gray-800 py-3 px-4 rounded-xl text-sm">
              Request Sent
            </button>
          ) : (
            <button
              onClick={handleConnect}
              className="bg-primary text-white py-3 px-4 rounded-xl hover:bg-purple-700 text-sm"
            >
              Connect
            </button>
          ))}

        <button
          className="bg-gray-300 text-gray-800 py-3 px-4 rounded-xl hover:bg-gray-400 text-sm"
          onClick={() => handleProfile(profile._id)}
        >
          View more
        </button>
      </div>
    </div>
  );
};

export default UserProfileCard;

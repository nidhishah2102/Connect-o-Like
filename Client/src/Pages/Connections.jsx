import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import {
  fetchConnectionReq,
  fetchConnections,
  acceptConnectionRequests,
  rejectConnectionRequests,
} from "../store/action";

const Connections = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [request, setRequest] = useState([]);
  const [connections, setConnections] = useState([]);
  const fetchRequests = async () => {
    try {
      const response = await dispatch(fetchConnectionReq());
      setRequest(response.payload.senderDetail);
    } catch (error) {
      console.error("Error fetching user profile:", error);
    }
  };
  const fetchConnection = async () => {
    try {
      const response = await dispatch(fetchConnections());

      setConnections(response.payload.connections);
    } catch (error) {
      console.error("Error fetching user profile:", error);
    }
  };
  useEffect(() => {
    fetchRequests();
    fetchConnection();
  }, [dispatch]);
  const handleAccept = async (userId) => {
    await dispatch(acceptConnectionRequests(userId)).then(() => {
      setConnections((prev) => prev.filter((item) => item._id !== userId));
      fetchRequests();
      fetchConnection();
      toast.success("Connection request accepted");
    });
  };
  const rejectRequest = async (userId) => {
    await dispatch(rejectConnectionRequests(userId)).then(() => {
      setConnections((prev) => prev.filter((item) => item._id !== userId));
      fetchRequests();
      fetchConnection();
      toast.success("Connection request rejected");
    });
  };
  return (
    <div className="h-full min-h-screen  flex flex-col items-center py-4 gap-y-4">
      {request.length === 0 ? (
        <div className=" w-10/12 bg-white/[.07] border border-white/[.09] rounded-md py-2 px-4">
          <p className="text-white opacity-50">No Connection Requests</p>
        </div>
      ) : (
        <div className="w-10/12 bg-white/[.07] hover:bg-white/[.1] border border-white/[.09] rounded-md py-2 px-4">
          <div className="flex items-center justify-between">
            <h2
              className="text-white text-xl font-primary my-4"
              data-aos="zoom-out"
            >
              Connection Request
            </h2>
            <p className="text-white opacity-50">({request?.length})</p>
          </div>
          <div className="flex flex-col gap-y-4 my-2 rounded-md h-[50vh] overflow-x-auto">
            {request.map((request) => (
              <div
                key={request.SenderId}
                className="flex text-white gap-4 bg-white/[.07] hover:bg-white/[.1] border border-white/[.09] p-4 rounded-md"
              >
                <img
                  src={
                    request.img
                      ? `data:image/png;base64,${request.img}`
                      : "https://img.freepik.com/free-vector/illustration-businessman_53876-5856.jpg?w=740&t=st=1707217366~exp=1707217966~hmac=c69010fa42c07b6119e668deeb5566763c01553ae42e29782d155d406d0b6575"
                  }
                  alt="Profile"
                  className="h-12 w-12 rounded-full bg-auto"
                />
                <div className="flex flex-col gap-y-1">
                  <p className="text-md font-primary">{request.name}</p>
                  <p className="text-sm">{request.bio}</p>
                  <div className="flex gap-x-2 my-2">
                    <button
                      gradientMonochrome="purple"
                      size="sm"
                      className="text-white bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 hover:bg-gradient-to-br focus:ring-4 focus:ring-purple-300 dark:focus:ring-purple-800 font-medium rounded-lg text-sm px-4 py-2.5 text-center mr-2 mb-2"
                      onClick={() => handleAccept(request._id)}
                    >
                      Accept
                    </button>
                    <button
                      gradientMonochrome="failure"
                      size="sm"
                      className="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm px-4 py-2.5 text-center mr-2 mb-2"
                      onClick={() => rejectRequest(request._id)}
                    >
                      Reject
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      <div className="w-10/12 bg-white/[.07] hover:bg-white/[.1] border border-white/[.09] rounded-md py-2 px-4">
        <div className="flex items-center justify-between">
          <h2
            className="text-white text-xl font-primary my-2"
            data-aos="zoom-out"
          >
            My Connections
          </h2>
          <p className="text-white opacity-50">({connections?.length})</p>
        </div>
        <div className="flex flex-col gap-y-4 my-2 rounded-md h-[50vh] overflow-x-auto">
          {connections.length === 0 ? (
            <div className="text-white opacity-50 h-full w-full flex items-center justify-center font-primary">
              No Connections
            </div>
          ) : (
            connections.map((connection) => (
              <div
                key={connection._id}
                className="flex text-white gap-4 bg-white/[.07] hover:bg-white/[.1] border border-white/[.09] p-4 rounded-md"
              >
                <img
                  src={
                    connection.profile
                      ? `data:image/png;base64,${connection.profile}`
                      : "https://img.freepik.com/free-vector/illustration-businessman_53876-5856.jpg?w=740&t=st=1707217366~exp=1707217966~hmac=c69010fa42c07b6119e668deeb5566763c01553ae42e29782d155d406d0b6575"
                  }
                  alt="Profile"
                  className="h-12 w-12 rounded-full object-cover rounded-full transition-opacity bg-auto"
                />
                <div className="flex flex-row  w-full justify-between">
                  <div>
                    <p className="text-md font-primary">{connection.name}</p>
                    <p className="text-sm">{connection.headline}</p>
                  </div>
                  <div className="flex gap-x-2 my-2">
                    <button
                      gradientMonochrome="purple"
                      size="sm"
                      className="bg-gray-300 text-gray-800  hover:bg-gray-400 font-medium rounded-lg text-sm px-4 py-2.5 text-center mr-2 mb-2"
                      onClick={() => {
                        navigate("/user/" + connection._id);
                      }}
                    >
                      View Profile
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
      ;
    </div>
  );
};

export default Connections;

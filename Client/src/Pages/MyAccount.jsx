import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import {
  getUser,
  updateUserProfile,
  uploadProfilePicture,
} from "../store/action";
import toast from "react-hot-toast";
import avatar from "../assets/avatar.jpg";
import Select from "react-select";
import makeAnimated from "react-select/animated";
const MyAccount = () => {
  const animatedComponents = makeAnimated();
  const [openModal, setOpenModal] = useState(false);
  const [openModalProfile, setOpenModalProfile] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [email, setEmail] = useState("");
  const [selectedImageFile, setSelectedImageFile] = useState(null);
  const userId = localStorage.getItem("userId");
  console.log(userId);
  const options = [
    // Programming Languages
    { value: "C++", label: "C++" },
    { value: "Java", label: "Java" },
    { value: "Python", label: "Python" },
    { value: "JavaScript", label: "JavaScript" },
    { value: "TypeScript", label: "TypeScript" },
    { value: "Ruby", label: "Ruby" },
    { value: "Swift", label: "Swift" },
    { value: "Kotlin", label: "Kotlin" },
    { value: "C#", label: "C#" },
    { value: "Go", label: "Go" },
    { value: "PHP", label: "PHP" },
    { value: "HTML", label: "HTML" },
    { value: "CSS", label: "CSS" },
    // Frontend Frameworks/Libraries
    { value: "React", label: "React" },
    { value: "Angular", label: "Angular" },
    { value: "Vue.js", label: "Vue.js" },
    { value: "Svelte", label: "Svelte" },
    { value: "Bootstrap", label: "Bootstrap" },
    { value: "Tailwind CSS", label: "Tailwind CSS" },
    // Backend Frameworks
    { value: "Node.js", label: "Node.js" },
    { value: "Express.js", label: "Express.js" },
    { value: "Django", label: "Django" },
    { value: "Flask", label: "Flask" },
    { value: "Spring Boot", label: "Spring Boot" },
    { value: "Ruby on Rails", label: "Ruby on Rails" },
    { value: "Laravel", label: "Laravel" },
    { value: ".NET", label: ".NET" },
    // Database
    { value: "MySQL", label: "MySQL" },
    { value: "PostgreSQL", label: "PostgreSQL" },
    { value: "MongoDB", label: "MongoDB" },
    { value: "SQLite", label: "SQLite" },
    // DevOps
    { value: "Docker", label: "Docker" },
    { value: "Kubernetes", label: "Kubernetes" },
    { value: "Jenkins", label: "Jenkins" },
    { value: "AWS", label: "AWS" },
    { value: "Azure", label: "Azure" },
    { value: "Google Cloud", label: "Google Cloud" },
    // Mobile Development
    { value: "Android", label: "Android" },
    { value: "iOS", label: "iOS" },
    { value: "React Native", label: "React Native" },
    // Other
    { value: "Blockchain", label: "Blockchain" },
    { value: "Machine Learning", label: "Machine Learning" },
    { value: "Cybersecurity", label: "Cybersecurity" },
    { value: "Data Science", label: "Data Science" },
    { value: "UI/UX Design", label: "UI/UX Design" },
    { value: "Game Development", label: "Game Development" },
  ];

  const [userData, setUserData] = useState({
    profile: "",
    name: "",
    email: "",
    number: "",
    headline: "",
    bio: "",
    social: {
      twitter: "",
      instagram: "",
      leetcode: "",
      github: "",
      discord: "",
    },
    location: "",
    skills: [],
  });

  const [isComplete, setIsComplete] = useState(false);
  const [editedData, setEditedData] = useState({
    name: "",
    number: "",
    headline: "",
    bio: "",
    social: {
      twitter: "",
      instagram: "",
      leetcode: "",
      github: "",
      discord: "",
    },
    location: "",
    skills: [],
  });

  const dispatch = useDispatch();

  const fetchData = async () => {
    try {
      const res = await dispatch(getUser({ userId }));
      setUserData(res.payload.data);

      setEditedData({
        name: res.payload.data.name,
        number: res.payload.data.number,
        bio: res.payload.data.bio,
        social: res.payload.data.social,
        skills: res.payload.data.skills,
        headline: res.payload.data.headline,
        location: res.payload.data.location,
      });
      const userDataComplete =
        res.payload.data.name &&
        res.payload.data.number &&
        res.payload.data.location &&
        res.payload.data.bio;

      setIsComplete(!userDataComplete);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [dispatch]);

  const handleSkillChange = (selectedSkills) => {
    // Extracting skill values from the selected options
    const newSkills = selectedSkills.map((skill) => skill.value);

    // Update the editedData state with the new skills
    setEditedData({
      ...editedData,
      skills: newSkills,
    });
  };
  const handleEdit = async () => {
    try {
      await dispatch(updateUserProfile({ userId, updatedData: editedData }));
      toast.success("Profile updated successfully!");
      fetchData();
      onCloseModal();
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error("Failed to update profile. Please try again.");
    }
  };
  const handleEditProfile = () => {
    setOpenModalProfile(true);
  };
  function onCloseModal() {
    setOpenModal(false);
    setEmail("");
  }
  const onCloseModalProfile = () => {
    setOpenModalProfile(false);
    setSelectedImage(null);
  };

  const handleUpload = () => {
    if (!selectedImageFile) {
      console.error("No image selected");
      return;
    }
    const formData = new FormData();
    formData.append("profile", selectedImageFile);

    dispatch(uploadProfilePicture({ userId, file: formData }))
      .unwrap()
      .then((response) => {
        toast.success("Profile uploaded successfully");
        fetchData();
        onCloseModalProfile();
      })
      .catch((error) => {
        console.error("Error uploading profile picture:", error);
      });

    onCloseModal();
  };
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(URL.createObjectURL(file));
      setSelectedImageFile(file);
    }
  };

  function Copy() {
    const el = document.createElement("input");
    el.value = window.location.href;
    document.body.appendChild(el);
    el.select();
    document.execCommand("copy");
    document.body.removeChild(el);
    alert("Link Copied Successfully");
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
                  <label
                    htmlFor="profile-image-upload"
                    className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity"
                    onClick={handleEditProfile}
                  >
                    <div className="bg-gray-200 p-2 rounded-full cursor-pointer">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-6 h-6"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                        />
                      </svg>
                    </div>
                  </label>
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
              <div className="flex flex-col gap-y-5 text-white w-full px-6 mt-6">
                <div className="flex items-center justify-between">
                  <i className="ci ci-x-light ci-2x"></i>
                  <p>
                    <a href="#" className="hover:underline hover:text-blue-400">
                      {userData.social?.twitter
                        ? userData.social.twitter
                        : "Add Twitter"}
                    </a>
                  </p>
                </div>
                <div className="flex items-center justify-between">
                  <i className="ci ci-instagram ci-2x"></i>
                  <p>
                    <a href="#" className="hover:underline hover:text-blue-400">
                      {userData.social?.instagram
                        ? userData.social.instagram
                        : "Add Instagram"}
                    </a>
                  </p>
                </div>
                <div className="flex items-center justify-between">
                  <i className="ci ci-leetcode-light ci-2x"></i>
                  <p>
                    <a href="#" className="hover:underline hover:text-blue-400">
                      {userData.social?.leetcode
                        ? userData.social.leetcode
                        : "Add Leetcode"}
                    </a>
                  </p>
                </div>
                <div className="flex items-center justify-between">
                  <i className="ci ci-github-light ci-2x"></i>
                  <p>
                    <a href="#" className="hover:underline hover:text-blue-400">
                      {userData.social?.github
                        ? userData.social.github
                        : "Add Github"}
                    </a>
                  </p>
                </div>
                <div className="flex items-center justify-between">
                  <i className="ci ci-discord ci-2x"></i>
                  <p>
                    <a href="#" className="hover:underline hover:text-blue-400">
                      {userData.social?.discord
                        ? userData.social.discord
                        : "Add Discord"}
                    </a>
                  </p>
                </div>
                <div className="flex items-center justify-between">
                  <i className="ci ci-gmail ci-2x"></i>
                  <p>
                    <a href="#" className="hover:underline hover:text-blue-400">
                      {userData.social?.gmail
                        ? userData.social.gmail
                        : "Add Gmail"}
                    </a>
                  </p>
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
                <p>{userData.number ? userData.number : "Update number"}</p>
              </div>
              <div className="flex items-center justify-between border-b border-b-white/[.5] p-2 rounded-md">
                <h3 className="font-semibold">Location</h3>
                <p>
                  {userData.location ? userData.location : "Update location"}
                </p>
              </div>
              <div className="flex items-center justify-between border-b border-b-white/[.5] p-2 rounded-md">
                <h3 className="font-semibold">Experience</h3>
                <p>
                  {userData.experience
                    ? userData.experience
                    : "Update Experience"}
                </p>
              </div>
              <div className="flex items-center justify-between border-b border-b-white/[.5] py-2 rounded-xl">
                <h3 className="font-semibold">Bio</h3>
                <p className="w-2/4">
                  {userData.bio ? userData.bio : "Update bio"}
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
              <button
                className="bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 hover:bg-gradient-to-br focus:ring-4 focus:ring-purple-300 text-white px-6 py-2 rounded-md hover:bg-purple-600 "
                onClick={() => setOpenModal(true)}
              >
                Edit
              </button>
              <button
                className="bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 hover:bg-gradient-to-br focus:ring-4 focus:ring-purple-300 text-white px-6 py-2 rounded-md hover:bg-purple-600"
                onClick={Copy}
              >
                Share
              </button>
            </div>
          </div>
          {/* Edit Modal */}
          {openModal && (
            <div
              id="authentication-modal"
              tabIndex="-1"
              aria-hidden="true"
              className="fixed inset-0 overflow-y-auto overflow-x-hidden z-50 flex items-center justify-center cursor-pointer"
              data-aos="fade-down"
            >
              <div className="relative p-4 w-full max-w-[600px] md:max-w-[800px]  h-[90vh] mx-auto">
                <div className="relative bg-white rounded-lg shadow dark:bg-gray-700 h-full overflow-y-auto">
                  <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                      Edit your profile
                    </h3>
                    <button
                      type="button"
                      className="end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                      onClick={onCloseModal}
                    >
                      <svg
                        className="w-3 h-3"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 14 14"
                      >
                        <path
                          stroke="currentColor"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                        />
                      </svg>
                      <span className="sr-only">Close modal</span>
                    </button>
                  </div>

                  <div className="p-4 md:p-5">
                    <form className="space-y-4 cursor-default">
                      <div>
                        <label htmlFor="name" className="block mb-2">
                          Name
                        </label>
                        <input
                          type="text"
                          id="name"
                          placeholder="Your Name"
                          value={editedData.name}
                          onChange={(e) =>
                            setEditedData({
                              ...editedData,
                              name: e.target.value,
                            })
                          }
                          className="w-full p-2 border border-gray-300 rounded-md"
                        />
                      </div>

                      <div>
                        <label htmlFor="number" className="block mb-2">
                          Number
                        </label>
                        <input
                          type="text"
                          id="number"
                          placeholder="+91 234324324"
                          value={editedData.number}
                          onChange={(e) =>
                            setEditedData({
                              ...editedData,
                              number: e.target.value,
                            })
                          }
                          className="w-full p-2 border border-gray-300 rounded-md"
                        />
                      </div>
                      <div>
                        <label htmlFor="address" className="block mb-2">
                          Headline
                        </label>
                        <input
                          type="text"
                          id="address"
                          placeholder="I am Full Stack Developer"
                          value={editedData.headline}
                          onChange={(e) =>
                            setEditedData({
                              ...editedData,
                              headline: e.target.value,
                            })
                          }
                          className="w-full p-2 border border-gray-300 rounded-md"
                        />
                      </div>
                      <div>
                        <label htmlFor="address" className="block mb-2">
                          Location
                        </label>
                        <input
                          type="text"
                          id="address"
                          placeholder="Mumbai, India"
                          value={editedData.location}
                          onChange={(e) =>
                            setEditedData({
                              ...editedData,
                              location: e.target.value,
                            })
                          }
                          className="w-full p-2 border border-gray-300 rounded-md"
                        />
                      </div>

                      <div>
                        <label htmlFor="bio" className="block mb-2">
                          Bio
                        </label>
                        <textarea
                          id="bio"
                          placeholder="I am First year computer science student "
                          value={editedData.bio}
                          onChange={(e) =>
                            setEditedData({
                              ...editedData,
                              bio: e.target.value,
                            })
                          }
                          className="w-full p-2 border border-gray-300 rounded-md"
                        />
                      </div>
                      <div>
                        <label htmlFor="skills" className="block mb-2">
                          Skills
                        </label>
                        <Select
                          closeMenuOnSelect={false}
                          components={animatedComponents}
                          defaultValue={userData.skills.map((skill) => ({
                            value: skill,
                            label: skill,
                          }))}
                          isMulti
                          options={options}
                          className="w-full"
                          onChange={handleSkillChange}
                        />
                      </div>

                      <div>
                        <label htmlFor="twitter" className="block mb-2">
                          Twitter
                        </label>
                        <input
                          type="text"
                          id="twitter"
                          placeholder="twitter.com/your_username"
                          value={editedData?.social?.twitter || ""}
                          onChange={(e) =>
                            setEditedData({
                              ...editedData,
                              social: {
                                ...editedData.social,
                                twitter: e.target.value,
                              },
                            })
                          }
                          className="w-full p-2 border border-gray-300 rounded-md"
                        />
                      </div>
                      <div>
                        <label htmlFor="instagram" className="block mb-2">
                          Instagram
                        </label>
                        <input
                          type="text"
                          id="instagram"
                          placeholder="instagram.com/your_username"
                          value={editedData?.social?.instagram || ""}
                          onChange={(e) =>
                            setEditedData({
                              ...editedData,
                              social: {
                                ...editedData.social,
                                instagram: e.target.value,
                              },
                            })
                          }
                          className="w-full p-2 border border-gray-300 rounded-md"
                        />
                      </div>
                      <div>
                        <label htmlFor="leetcode" className="block mb-2">
                          LeetCode
                        </label>
                        <input
                          type="text"
                          id="leetcode"
                          placeholder="leetcode.com/your_username"
                          value={editedData?.social?.leetcode || ""}
                          onChange={(e) =>
                            setEditedData({
                              ...editedData,
                              social: {
                                ...editedData.social,
                                leetcode: e.target.value,
                              },
                            })
                          }
                          className="w-full p-2 border border-gray-300 rounded-md"
                        />
                      </div>
                      <div>
                        <label htmlFor="github" className="block mb-2">
                          GitHub
                        </label>
                        <input
                          type="text"
                          id="github"
                          placeholder="github.com/your_username"
                          value={editedData?.social?.github || ""}
                          onChange={(e) =>
                            setEditedData({
                              ...editedData,
                              social: {
                                ...editedData.social,
                                github: e.target.value,
                              },
                            })
                          }
                          className="w-full p-2 border border-gray-300 rounded-md"
                        />
                      </div>
                      <div>
                        <label htmlFor="discord" className="block mb-2">
                          Discord
                        </label>
                        <input
                          type="text"
                          id="discord"
                          placeholder="discord.com/your_username"
                          value={editedData?.social?.discord || ""}
                          onChange={(e) =>
                            setEditedData({
                              ...editedData,
                              social: {
                                ...editedData.social,
                                discord: e.target.value,
                              },
                            })
                          }
                          className="w-full p-2 border border-gray-300 rounded-md"
                        />
                      </div>
                    </form>
                    <div className="flex justify-between mt-4">
                      <button
                        className="bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 hover:bg-gradient-to-br focus:ring-4 focus:ring-purple-300 text-white px-4 py-2 rounded-md"
                        onClick={handleEdit}
                      >
                        Update
                      </button>
                      <button
                        className="bg-gray-300 text-gray-800 px-4 py-2 rounded-md"
                        onClick={onCloseModal}
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {openModalProfile && (
            <div
              id="authentication-modal"
              tabIndex="-1"
              aria-hidden="true"
              className="fixed inset-0 z-50 flex items-center justify-center cursor-pointer"
              data-aos="fade-down"
            >
              <div className="modal-content bg-white p-8 rounded-md shadow-md">
                <span
                  className="close absolute top-2 right-2 cursor-pointer text-black"
                  onClick={onCloseModal}
                >
                  &times;
                </span>
                <h2 className="text-2xl font-semibold font-primary mb-6">
                  Upload Profile Image
                </h2>
                <div className="mb-4 flex items-center justify-center">
                  {selectedImage ? (
                    <img
                      src={selectedImage}
                      alt="Preview"
                      className="w-40 h-40 object-cover rounded-full mb-2 border-2 shadow-sm"
                    />
                  ) : (
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                    />
                  )}
                </div>
                <div className="flex justify-center space-x-4">
                  {selectedImage && (
                    <button
                      className="bg-green-500 text-white px-4 py-2 rounded-md cursor-pointer"
                      onClick={handleUpload}
                    >
                      Upload
                    </button>
                  )}
                  <button
                    className="bg-gray-300 text-gray-800 px-4 py-2 rounded-md cursor-pointer"
                    onClick={onCloseModalProfile}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default MyAccount;

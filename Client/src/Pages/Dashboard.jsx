import React, { useState, useRef } from "react";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import Img from "../assets/new.webp";
import "./Dashboard.css";
import SearchUser from "../components/SearchUser";
import { searchUsers } from "../store/action";
import { useDispatch } from "react-redux";
const Dashboard = () => {
  const [userData, setUserData] = useState(false);
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [selectedExperience, setSelectedExperience] = useState("");
  const [selectedDomain, setSelectedDomain] = useState("");
  const ref = useRef(null);
  const dispatch = useDispatch();
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
  const handleSearch = () => {
    const selectedSkillsValues = selectedSkills.map((skill) => skill.value);

    dispatch(
      searchUsers({
        skills: selectedSkillsValues,
        experience: selectedExperience,
        domain: selectedDomain,
      })
    )
      .then((response) => {
        setUserData(response.payload);
        setTimeout(() => {
          window.scrollTo({
            top: window.scrollY + 650,
            behavior: "smooth",
          });
        }, 500);
      })
      .catch((error) => {
        console.error("Error searching users:", error);
        // Handle error, such as displaying an error message to the user
      });
  };

  const animatedComponents = makeAnimated();
  return (
    <>
      <div className="min-h-[90vh]  min-w-screen   lg:mx-auto  md:px-10 xl:px-4 w-full lg:px-4 px-6 flex flex-col items-center ">
        <div className="flex flex-col lg:flex-row justify-center items-center w-full">
          <div className="px-5 py-6 lg:px-10 font-primary text-center lg:text-left">
            <h1
              className="text-gray-300 text-3xl lg:text-5xl flex flex-1 flex-col"
              data-aos="zoom-in"
            >
              The Only Platform To <br />
              <span className="text-4xl lg:text-6xl text-white font-primary font-medium">
                Code, Connect<span className="font-fourth"> & </span>
                Collaborate
              </span>
              <br />
            </h1>
          </div>
          <div className="flex flex-1 justify-center items-center">
            <img
              src={Img}
              alt="dsa"
              className="h-[50vh] lg:h-[60vh] xl:h-[60vh] max-w-full bounce2"
            />
          </div>
        </div>

        <div
          className="bg-white/[.07] hover:bg-white/[.1] border border-white/[.09] flex flex-col gap-4 px-2 py-4 xl:flex-row w-full xl:px-4 xl:py-4 rounded-xl justify-between items-center xl:gap-2 shadow-2xl font-third z-20 xl:w-2/3"
          data-aos="fade-up"
        >
          <div className="relative w-full">
            <select
              value={selectedDomain}
              onChange={(e) => setSelectedDomain(e.target.value)}
              className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5"
            >
              <option value="">Select Domain</option>
              <option value="full stack">Full Stack</option>
              <option value="android">Android</option>
              <option value="ios">iOS</option>
              <option value="frontend">Frontend</option>
              <option value="backend">Backend</option>
              <option value="devops">DevOps</option>
              <option value="data science">Data Science</option>
              <option value="machine learning">Machine Learning</option>
              <option value="artificial intelligence">
                Artificial Intelligence
              </option>
              <option value="blockchain">Blockchain</option>
              <option value="cybersecurity">Cybersecurity</option>
              <option value="cloud computing">Cloud Computing</option>
              <option value="web development">Web Development</option>
              <option value="mobile development">Mobile Development</option>
              <option value="game development">Game Development</option>
              <option value="ui/ux design">UI/UX Design</option>
              <option value="testing">Testing</option>
              <option value="database management">Database Management</option>
              <option value="other">Other</option>
            </select>
          </div>

          <Select
            closeMenuOnSelect={false}
            components={animatedComponents}
            value={selectedSkills}
            onChange={setSelectedSkills}
            isMulti
            options={options}
            className="w-full bg-transparent"
          />

          <div className="relative w-full">
            <select
              value={selectedExperience}
              onChange={(e) => setSelectedExperience(e.target.value)}
              className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5"
            >
              {" "}
              <option value="">Select Experience</option>
              <option value="0">0</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
            </select>
          </div>

          <span
            onClick={handleSearch}
            className="bg-primary h-full p-[.60rem] mx-1 rounded-xl text-xl text-white hover:shadow-[-10px_-10px_30px_4px_rgba(255,255,255,.2),_10px_10px_30px_4px_rgba(255,255,255,0.2)] hover:cursor-pointer"
          >
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
                d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
              />
            </svg>
          </span>
        </div>

        <div>
          <div className="Marquees">
            <div className="Marquee FirstRow">
              <div className="marquee Item">
                <i className="ci ci-js ci-2x"></i>
              </div>
              <div className="marquee Item">
                <i className="ci ci-angular ci-2x"></i>
              </div>
              <div className="marquee Item">
                <i className="ci ci-reactjs ci-2x"></i>
              </div>
              <div className="marquee Item">
                <i className="ci ci-nuxtjs-horizontal-light ci-3x md:ci-5x"></i>
              </div>
              <div className="marquee Item">
                <i className="ci ci-nextjs-horizontal-light ci-3x md:ci-5x"></i>
              </div>
              <div className="marquee Item">
                <i className="ci ci-mysql-vertical ci-2x md:ci-3x"></i>
              </div>
              <div className="marquee Item">
                <i className="ci ci-nodejs-horizontal-light ci-3x md:ci-5x"></i>
              </div>
              <div className="marquee Item">
                <i className="ci ci-docker-horizontal ci-3x md:ci-5x"></i>
              </div>
              <div className="marquee Item">
                <i className="ci ci-redux ci-2x"></i>
              </div>
              <div className="marquee Item">
                <i className="ci ci-mongodb-horizontal ci-3x md:ci-5x"></i>
              </div>
              <div className="marquee Item">
                <i className="ci ci-csharp ci-2x"></i>
              </div>
              <div className="marquee Item">
                <i className="ci ci-java-vertical ci-2x md:ci-3x"></i>
              </div>
              <div className="marquee Item">
                <i className="ci ci-cpp ci-2x"></i>
              </div>
              <div className="marquee Item">
                <i className="ci ci-aws-light ci-2x"></i>
              </div>
              <div className="marquee Item">
                <i className="ci ci-ruby ci-2x"></i>
              </div>
              <div className="marquee Item">
                <i className="ci ci-graphql-horizontal ci-3x md:ci-5x"></i>
              </div>
              <div className="marquee Item">
                <i className="ci ci-flutter ci-2x"></i>
              </div>
              <div className="marquee Item">
                <i className="ci ci-go-wordmark ci-3x md:ci-5x"></i>
              </div>
              <div className="marquee Item">
                <i className="ci ci-kubernetes ci-2x"></i>
              </div>
              <div className="marquee Item">
                <i className="ci ci-redis-horizontal-light ci-3x md:ci-5x"></i>
              </div>
              <div className="marquee Item">
                <i className="ci ci-ts ci-2x"></i>
              </div>
              <div className="marquee Item">
                <i className="ci ci-django ci-2x"></i>
              </div>
              <div className="marquee Item">
                <i className="ci ci-html ci-2x"></i>
              </div>
              <div className="marquee Item">
                <i className="ci ci-php-wordmark-light ci-3x md:ci-5x"></i>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div ref={ref} id="scrollTarget">
        {userData && <SearchUser userData={userData} />}
      </div>
    </>
  );
};

export default Dashboard;

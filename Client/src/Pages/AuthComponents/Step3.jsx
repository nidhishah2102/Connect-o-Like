import React from "react";
import { useFormContext } from "react-hook-form";
import Select from "react-select";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { registerUser } from "../../store/action";
const Step3 = ({ previousStep }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useFormContext();

  const onSubmit = async (data) => {
    try {
      const response = await dispatch(registerUser(data));
      if (response.payload.status == 201 || response.payload.data) {
        toast.success("User created successfully");
        navigate("/login");
      }
      console.log(data);
    } catch (error) {
      toast.error("Registration failed", error);
    }
  };
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
  return (
    <div
      className="flex h-full items-center justify-center"
      data-aos="zoom-in"
      data-aos-duration="500"
    >
      <div className="w-full max-w-md flex flex-col gap-6">
        <div className="text-start flex justify-between items-center">
          <div className="flex gap-4 items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6 hover:text-primary cursor-pointer"
              onClick={previousStep}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3"
              />
            </svg>

            <h1 className="block text-2xl font-bold text-gray-800 ">
              Enter Tech details
            </h1>
          </div>
          <span className="font-secondary text-sm opacity-40">3/3 Step</span>
        </div>

        <div className="mt-5">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-6"
          >
            <div>
              <label htmlFor="expertise" className="block text-sm mb-2 ">
                Choose Your Domain/Expertise:
              </label>
              <select
                {...register("domain", {
                  required: "Domain/Expertise is required",
                })}
                className="py-3 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none "
              >
                <option value="">Select an option</option>
                <option value="full stack">Full stack developer</option>
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
                <option value="networking">Networking</option>
                <option value="other">Other</option>
                {/* Add more options as needed */}
              </select>
              {errors.expertise && (
                <p className="text-xs text-red-600 mt-2">
                  {errors.expertise.message}
                </p>
              )}
            </div>

            <div>
              <label htmlFor="experience" className="block text-sm mb-2 ">
                Your Years of Experience:
              </label>
              <input
                type="number"
                {...register("experience", {
                  required: "Experience is required",
                })}
                placeholder="0-1"
                className="py-3 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none "
              />
              {errors.experience && (
                <p className="text-xs text-red-600 mt-2">
                  {errors.experience.message}
                </p>
              )}
            </div>

            <div>
              <label htmlFor="skills" className="block text-sm mb-2 ">
                Select Skills:
              </label>
              <div>
                <Select
                  isMulti
                  name="skills"
                  options={options}
                  className=""
                  classNamePrefix="skills"
                  {...register("skills", {
                    required: "Skills is required",
                  })}
                  onChange={(selectedOptions) => {
                    const selectedValues = selectedOptions.map(
                      (option) => option.value
                    );
                    setValue("skills", selectedValues);
                  }}
                  theme={(theme) => ({
                    ...theme,
                    borderRadius: 0,
                    colors: {
                      ...theme.colors,
                      primary: "#dfdfdf",
                      primary25: "#dedede",
                      primary50: "#F3F8FF",
                    },
                  })}
                />
              </div>
              {errors.skills && (
                <p className="text-xs text-red-600 mt-2">
                  {errors.skills.message}
                </p>
              )}
            </div>

            <button
              type="submit"
              className="bg-primary hover:bg-hprimary w-full py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-primary-200 text-white shadow-sm disabled:opacity-50 disabled:pointer-events-none"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Step3;

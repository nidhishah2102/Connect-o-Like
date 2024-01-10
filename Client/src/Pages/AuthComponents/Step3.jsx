import React from "react";
import { useFormContext } from "react-hook-form";
import Select from "react-select";
import {toast} from 'react-hot-toast'
import {useNavigate} from "react-router-dom"
const Step3 = ({ nextStep }) => {
  const navigate=useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useFormContext();

  const onSubmit = (data) => {
    console.log(data);
    toast.success("Registered Successfully")
    setTimeout(()=>{
    navigate('/login')
    },2000)
    nextStep();
  };
  const programmingLanguages = [
    { value: "javascript", label: "JavaScript" },
    { value: "python", label: "Python" },
    { value: "java", label: "Java" },
    { value: "csharp", label: "C#" },
    { value: "php", label: "PHP" },
    { value: "typescript", label: "TypeScript" },
    { value: "ruby", label: "Ruby" },
    { value: "go", label: "Go" },
    { value: "swift", label: "Swift" },
    { value: "kotlin", label: "Kotlin" },
    { value: "html", label: "HTML" },
    { value: "css", label: "CSS" },
    // Add more programming languages as needed
  ];

  return (
    <div
      className="flex h-full items-center justify-center"
      data-aos="zoom-in"
      data-aos-duration="500"
    >
      <div className="w-full max-w-md flex flex-col">
        <div className="text-start flex justify-between">
          <h1 className="block text-2xl font-bold text-gray-800 ">
            Enter Tech details
          </h1>
          <span className="font-secondary text-sm opacity-40">3/3 Step</span>
        </div>

        <div className="mt-5">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-6"
          >
            <div>
              <label
                htmlFor="expertise"
                className="block text-sm mb-2 "
              >
                Choose Your Domain/Expertise:
              </label>
              <select
                {...register("expertise", {
                  required: "Domain/Expertise is required",
                })}
                className="py-3 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none "
              >
                <option value="">Select an option</option>
                <option value="android">Android</option>
                <option value="web">Web</option>
                <option value="frontend">Frontend</option>
                <option value="backend">Backend</option>
                {/* Add more options as needed */}
              </select>
              {errors.expertise && (
                <p className="text-xs text-red-600 mt-2">
                  {errors.expertise.message}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="experience"
                className="block text-sm mb-2 "
              >
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
          <label
            htmlFor="skills"
            className="block text-sm mb-2 "
          >
            Select Skills:
          </label>
          <div>
            <Select
              isMulti
              name="colors"
              options={programmingLanguages}
              className="" // Add a class for custom styling
              classNamePrefix="select"
              theme={(theme) => ({
                ...theme,
                borderRadius: 0, 
                colors: {
                  ...theme.colors,
                  primary: '#dfdfdf', 
                  primary25: '#dedede', 
                  primary50: '#F3F8FF', 
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
              type="button"
              onClick={handleSubmit(onSubmit)}
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

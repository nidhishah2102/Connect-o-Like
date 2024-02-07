// Login.js
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { FormProvider } from "react-hook-form";
import { loginUser } from "../store/action";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  useEffect(() => {}, []);
  const onSubmit = async (data) => {
    try {
      const response = await dispatch(loginUser(data));
      if (response.payload.data.token || response.payload.data.user) {
        localStorage.setItem("userToken", response.payload.data.token);
        localStorage.setItem("userId", response.payload.data.user._id);
        toast.success("Login successful");
        navigate("/dashboard");
      }
    } catch (error) {
      toast.error("Login failed");
    }
  };
  const methods = useForm({ mode: "onBlur" });
  return (
    <FormProvider {...methods}>
      <div
        className="font-primary flex h-screen items-center justify-center"
        data-aos="zoom-in"
        data-aos-duration="500"
      >
        <main className="w-full max-w-md mx-auto p-6">
          <div className="mt-7 bg-Secondary border border-gray-200 rounded-lg shadow-sm ">
            <div className="p-4 sm:p-7 ">
              <div className="flex h-full items-center justify-center">
                <div className="w-full max-w-md flex flex-col">
                  <div className="text-start flex justify-between">
                    <h1 className="block text-2xl font-bold text-gray-800 ">
                      Login
                    </h1>
                  </div>

                  <div className="mt-5">
                    <form
                      onSubmit={handleSubmit(onSubmit)}
                      className="flex flex-col gap-6"
                    >
                      <div>
                        <label htmlFor="email" className="block text-sm mb-2 ">
                          Enter Email address
                        </label>
                        <div className="relative">
                          <input
                            type="email"
                            id="email"
                            name="email"
                            placeholder="Enter your email"
                            {...register("email", { required: true })}
                            className="py-3 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none "
                            aria-describedby="email-error"
                          />
                          <div className="hidden absolute inset-y-0 end-0 flex items-center pointer-events-none pe-3">
                            <svg
                              className="h-5 w-5 text-red-500"
                              width="16"
                              height="16"
                              fill="currentColor"
                              viewBox="0 0 16 16"
                              aria-hidden="true"
                            >
                              <path
                                d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8 4a.905.905 0 0 0-.9.995l.35 3.507a.552.552 0 0 0 1.1 0l.35-3.507A.905.905 0 0 0 8 4zm.002 6a1 1 0 1 0 0 2 1 1 0 0 0 0-2z"
                                fill="#EB4335"
                              />
                            </svg>
                          </div>
                        </div>
                        {errors.email && (
                          <p
                            className="text-xs text-red-600 mt-2"
                            id="email-error"
                          >
                            Please include a valid email address{" "}
                          </p>
                        )}
                      </div>

                      <div>
                        <label
                          htmlFor="password"
                          className="block text-sm mb-2 "
                        >
                          Enter Password
                        </label>
                        <div className="relative">
                          <input
                            type="password"
                            id="password"
                            name="password"
                            placeholder="Enter your password"
                            {...register("password", { required: true })}
                            className="py-3 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none "
                            aria-describedby="password-error"
                          />
                          <div className="hidden absolute inset-y-0 end-0 flex items-center pointer-events-none pe-3">
                            <svg
                              className="h-5 w-5 text-red-500"
                              width="16"
                              height="16"
                              fill="currentColor"
                              viewBox="0 0 16 16"
                              aria-hidden="true"
                            >
                              <path
                                d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8 4a.905.905 0 0 0-.9.995l.35 3.507a.552.552 0 0 0 1.1 0l.35-3.507A.905.905 0 0 0 8 4zm.002 6a1 1 0 1 0 0 2 1 1 0 0 0 0-2z"
                                fill="#EB4335"
                              />
                            </svg>
                          </div>
                        </div>
                        {errors.password && (
                          <p
                            className="text-xs text-red-600 mt-2"
                            id="password-error"
                          >
                            Password is required
                          </p>
                        )}
                      </div>

                      <button
                        type="submit"
                        className="bg-primary hover:bg-hprimary w-full py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-primary-200 text-white shadow-sm disabled:opacity-50 disabled:pointer-events-none"
                      >
                        Login
                      </button>

                      <span className="text-sm text-gray-600 dark:text-gray-400 ">
                        Don't have an account?{" "}
                        <a
                          href="/signup"
                          className="text-primary hover:underline"
                        >
                          Sign up here
                        </a>
                      </span>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </FormProvider>
  );
};

export default Login;

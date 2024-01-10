// Step1.js
import React from 'react';
import { useFormContext } from 'react-hook-form';

const Step1 = ({ nextStep }) => {
  const { register, handleSubmit, formState: { errors } } = useFormContext();

  const onSubmit = (data) => {
    console.log(data);
    nextStep();
  };

  return (
    <div className="flex h-full items-center justify-center" >
      <div className="w-full max-w-md flex flex-col">
<<<<<<< HEAD
        <div className="text-start flex justify-between">
          <h1 className="block text-2xl font-bold text-gray-800 ">Sign up</h1>
          <span className='font-secondary text-sm opacity-40'>1/3 Step</span>
=======
        <div className="text-start">
          <h1 className="block text-2xl font-bold text-gray-800 dark:text-white">Join our community</h1>
>>>>>>> e6307b4d1c9193e0b9e73719e0cbbb18ffeba5ea
        </div>

        <div className="mt-5">
          <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-6'>
            <div>
              <label htmlFor="email" className="block text-sm mb-2 ">
               Enter Email address
              </label>
              <div className="relative">
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder='Enter your email'
                  {...register("email", { required: true })}
                  className="py-3 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none "
                  aria-describedby="email-error"
                />
                <div className="hidden absolute inset-y-0 end-0 flex items-center pointer-events-none pe-3">
                  <svg className="h-5 w-5 text-red-500" width="16" height="16" fill="currentColor" viewBox="0 0 16 16" aria-hidden="true">
                    <path
                      d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8 4a.905.905 0 0 0-.9.995l.35 3.507a.552.552 0 0 0 1.1 0l.35-3.507A.905.905 0 0 0 8 4zm.002 6a1 1 0 1 0 0 2 1 1 0 0 0 0-2z"
                      fill="#EB4335"
                    />
                  </svg>
                </div>
              </div>
              {errors.email && <p className="text-xs text-red-600 mt-2" id="email-error">Please include a valid email address </p>}
            </div>

            <button
              type="submit"
              className="bg-primary hover:bg-hprimary w-full py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-primary-200 text-white shadow-sm disabled:opacity-50 disabled:pointer-events-none"
            >
              Next 
            </button>
            <span className="text-sm text-gray-600 ">
              Already have an account? <a href="/login" className="text-primary hover:underline">Login here</a>
            </span>
          </form>
        </div>
      </div>
     
       
      
 
    </div>
  );
};

export default Step1;

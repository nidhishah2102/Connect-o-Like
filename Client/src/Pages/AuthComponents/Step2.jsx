import React, { useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { FaUpload, FaTimes } from 'react-icons/fa';

const Step2 = ({ step, totalSteps, nextStep }) => {
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useFormContext();
  const [password, setPassword] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [uploadedImage, setUploadedImage] = useState(null);

  const onSubmit = (data) => {
    console.log(data);
    nextStep();
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleFileChange = async (e) => {
    setIsUploading(true);

    // Simulate file upload delay (replace with actual upload logic)
    setTimeout(() => {
      setUploadedImage(e.target.files[0]);
      setIsUploading(false);
    }, 1500);

    // Continue with registering the file
    register('profilePhoto')(e);
  };

  const handleRemoveImage = () => {
    setUploadedImage(null);
    // Optionally, you may want to reset the file input
    document.getElementById('profilePhoto').value = '';
  };

  return (
    <div className="flex h-full items-center justify-center" data-aos="zoom-in"
    data-aos-duration="500"
   >
      <div className="w-full max-w-md flex flex-col">
      <div className="text-start flex justify-between">
          <h1 className="block text-2xl font-bold text-gray-800 ">Enter your details</h1>
          <span className='font-secondary text-sm opacity-40'>2/3 Step</span>
        </div>

        <div className="my-4">
          <label className="block text-sm mb-2 ">Name:</label>
          <input
            {...register('name', { required: 'Name is required' })}
            placeholder="Enter your name"
            className="py-3 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none "
          />
          {errors.name && <p className="text-xs text-red-600 mt-2">{errors.name.message}</p>}
        </div>

        <div className="mb-4">
          <label className="block text-sm mb-2 ">Email:</label>
          <input
            {...register('email', { required: 'Email is required' })}
            placeholder="Enter your email"
            className="py-3 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none "
          />
          {errors.email && <p className="text-xs text-red-600 mt-2">{errors.email.message}</p>}
        </div>

        <div className="mb-4">
          <label className="block text-sm mb-2 ">Password:</label>
          <input
            type="password"
            {...register('password', {
              required: 'Password is required',
              minLength: {
                value: 8,
                message: 'Password must be at least 8 characters long',
              },
            })}
            onChange={handlePasswordChange}
            placeholder="Enter your password"
            className="py-3 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none "
          />
          {errors.password && <p className="text-xs text-red-600 mt-2">{errors.password.message}</p>}
        </div>

        <div className="mb-4">
          <label className="block text-sm mb-2 ">Confirm Password:</label>
          <input
            type="password"
            {...register('confirmPassword', {
              required: 'Confirm Password is required',
              validate: (value) => value === password || 'Passwords do not match',
            })}
            placeholder="Confirm your password"
            className="py-3 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none "
          />
          {errors.confirmPassword && <p className="text-xs text-red-600 mt-2">{errors.confirmPassword.message}</p>}
        </div>

        <div className="mb-4">
        <label className="block text-sm mb-2 ">Profile Picture:</label>
   
          {uploadedImage ? (
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-900 ">
                {uploadedImage.name}
              </span>
              <button
                type="button"
                onClick={handleRemoveImage}
                className="text-red-500 cursor-pointer"
              >
                <FaTimes />
              </button>
            </div>
          ) : (
            <div className="mb-2">
            
              <input
                type="file"
                id="profilePhoto"
                onChange={(e) => handleFileChange(e)}
                className="block w-full outline-none  mb-5 text-xs text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50  focus:outline-none "
                disabled={isUploading}
                
              />
            </div>
          )}
        </div>

        {isUploading && (
          <div className="mb-4">
            <div className="bg-blue-200 h-2 rounded-lg overflow-hidden">
              <div
                className="bg-blue-500 h-full transition-all duration-1500"
                style={{ width: '50%' }} // You can adjust the width based on the upload progress
              ></div>
            </div>
          </div>
        )}

        <button
          type="button"
          onClick={handleSubmit(onSubmit)}
          disabled={isSubmitting || isUploading}
          className="bg-primary hover:bg-hprimary w-full py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-lg   bg-primary-200 text-white shadow-sm disabled:opacity-50 disabled:pointer-events-none"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Step2;
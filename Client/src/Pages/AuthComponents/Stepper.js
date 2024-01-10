// Stepper.js
import React from 'react';

const Stepper = ({ steps, currentStep }) => {
  
  return (
    <div className="flex items-center w-full mb-4 sm:mb-5">
      {steps.map((step, index) => (
        <div
          key={index}
          className={`flex items-center ${
            index < currentStep
              ? 'text-blue-600 dark:text-blue-500 after:border-blue-100 dark:after:border-blue-800'
              : 'after:border-gray-100 dark:after:border-gray-700'
          }`}
        >
          <div
            className={`flex items-center justify-center w-10 h-10 bg-${
              index < currentStep ? 'blue' : 'gray'
            }-100 rounded-full lg:h-12 lg:w-12 dark:bg-${index < currentStep ? 'blue' : 'gray'}-800 shrink-0`}
          >
            {index < currentStep ? (
              <div className="w-6 h-6 bg-blue-600 dark:bg-blue-300 rounded-full"></div>
            ) : (
              <span className="text-sm lg:text-lg font-bold text-gray-600 dark:text-gray-500">
                {index + 1}
              </span>
            )}
          </div>
          {index < steps.length - 1 && (
            <div
              className={`flex-1 h-1 ${
                index < currentStep - 1
                  ? 'bg-blue-600 dark:bg-blue-300'
                  : 'bg-gray-200 dark:bg-gray-700'
              }`}
            ></div>
          )}
        </div>
      ))}
    </div>
  );
};

export default Stepper;

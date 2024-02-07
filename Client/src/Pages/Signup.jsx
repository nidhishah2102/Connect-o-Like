// SignUp.js
import React, { useState } from "react";
import { useForm, FormProvider } from "react-hook-form";

import Step1 from "./AuthComponents/Step1";
import Step2 from "./AuthComponents/Step2";
import Step3 from "./AuthComponents/Step3";

const SignUp = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const methods = useForm({ mode: "onBlur" });

  const nextStep = () => {
    setCurrentStep((prevStep) => prevStep + 1);
  };

  const previousStep = () => {
    setCurrentStep((prevStep) => prevStep - 1);
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <Step1 {...methods} nextStep={nextStep} />;
      case 2:
        return (
          <Step2 {...methods} nextStep={nextStep} previousStep={previousStep} />
        );
      case 3:
        return <Step3 {...methods} previousStep={previousStep} />;
      default:
        return null;
    }
  };

  return (
    <FormProvider {...methods}>
      <div
        className="font-primary flex h-screen items-center justify-center"
        data-aos="zoom-in"
        data-aos-duration="500"
      >
        <main className="w-full max-w-md mx-auto p-6">
          <div className="mt-7 bg-Secondary border border-gray-200 rounded-lg shadow-sm">
            <div className="p-4 sm:p-7">{renderStep()}</div>
          </div>
        </main>
      </div>
    </FormProvider>
  );
};

export default SignUp;

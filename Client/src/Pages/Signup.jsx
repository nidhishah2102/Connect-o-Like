// RegistrationForm.js
import React, { useState } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import Step1 from './AuthComponents/Step1';
import Step2 from './AuthComponents/Step2';
import Step3 from './AuthComponents/Step3';

const SignUp = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const methods = useForm({ mode: 'onBlur' });

  const nextStep = () => {
    setCurrentStep((prevStep) => prevStep + 1);
  };

  const previousStep = () => {
    setCurrentStep((prevStep) => prevStep - 1);
  };

  const onSubmit = (data) => {
    console.log(data);
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <Step1 nextStep={nextStep} />;
      case 2:
        return <Step2 nextStep={nextStep} previousStep={previousStep} />;
      case 3:
        return <Step3 onSubmit={onSubmit} previousStep={previousStep} />;
      default:
        return null;
    }
  };

  return (
    <FormProvider {...methods}>
      <div className="font-primary flex h-screen items-center justify-center" data-aos="zoom-in"  data-aos-duration="500">
        <main className="w-full max-w-md mx-auto p-6">
          <div className="mt-7 bg-Secondary border border-gray-200 rounded-lg shadow-sm ">
            <div className="p-4 sm:p-7 ">
              {renderStep()}
            </div>
          </div>
        </main>
      </div>
    </FormProvider>
  );
};

export default SignUp;

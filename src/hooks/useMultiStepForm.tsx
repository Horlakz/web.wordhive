import { ReactElement, useState } from "react";

const useMultiStepForm = (steps: ReactElement[]) => {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);

  const firstStep = () => {
    setCurrentStepIndex(0);
  };

  const nextStep = () => {
    if (currentStepIndex < steps.length - 1) {
      setCurrentStepIndex(currentStepIndex + 1);
    }
  };

  const previousStep = () => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex(currentStepIndex - 1);
    }
  };

  const currentStep = steps[currentStepIndex];
  const isLastStep = currentStepIndex === steps.length - 1;

  return {
    currentStep,
    currentStepIndex,
    nextStep,
    previousStep,
    isLastStep,
    firstStep,
  };
};

export default useMultiStepForm;

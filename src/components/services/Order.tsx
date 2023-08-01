import { useState } from "react";
import { toast } from "react-hot-toast";

import Button from "@/components/common/Button";
import useMultiStepForm from "@/hooks/useMultiStepForm";
import { CardProps } from "./Card";
import Details from "./Details";
import Review from "./Review";

interface Props extends CardProps {}

interface FormData extends Props {
  price: number;
  selectedQuality: string;
}

const Order = ({ title, image, body, volumes }: Props) => {
  const INITIAL_DATA: FormData = {
    title,
    image,
    body,
    volumes,
    price: volumes[0].qualities[0].price,
    selectedQuality: volumes[0].name,
  };

  const [formData, setFormData] = useState<FormData>(INITIAL_DATA);

  const qualityType = volumes
    .find((vol) => vol.name === formData.selectedQuality)
    ?.qualities.find((qual) => qual.price === formData.price)?.type;

  const updateFields = (fields: Partial<FormData>) => {
    setFormData((prev) => ({ ...prev, ...fields }));
  };

  /* eslint-disable react/jsx-key */
  const steps = [
    <Details {...formData} updateFields={updateFields} />,
    <Review {...formData} />,
  ];

  const { currentStep, currentStepIndex, nextStep, firstStep, isLastStep } =
    useMultiStepForm(steps);

  const firstStepDone = currentStepIndex >= 1;
  const isFirstStep = currentStepIndex === 0;

  const handleSubmit = async () => {
    toast(qualityType || "undefined");
  };

  return (
    <div className="mt-6">
      <div className="sm:mx-16 mx-4">{currentStep}</div>

      <div className="w-full flex justify-center gap-12 px-20 pb-6">
        {isLastStep && (
          <Button
            variant="outline"
            className="w-full flex-center"
            onClick={() => firstStep()}
          >
            Edit Order
          </Button>
        )}

        {isFirstStep && (
          <div className="flex justify-between items-center bg-[#f5f5f5] text-lg font-semibold px-3 py-2 w-full rounded-lg">
            <span>Price</span>
            <span className="text-secondary">₦{formData.price}000</span>
          </div>
        )}

        <Button
          colorScheme="secondary"
          className="w-full flex-center"
          onClick={() => (isLastStep ? handleSubmit() : nextStep())}
          //   disabled={isLoading || uploadToAWS.isLoading}
          //   isLoading={isLoading || uploadToAWS.isLoading}
        >
          {isLastStep ? "Pay Now" : "Review Order"}
        </Button>
      </div>
    </div>
  );
};

export default Order;

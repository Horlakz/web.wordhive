import { useState } from "react";
import { toast } from "react-hot-toast";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

import Button from "@/components/common/Button";
import useMultiStepForm from "@/hooks/useMultiStepForm";
import { CardProps } from "./Card";
import Details from "./Details";
import Review from "./Review";
import { OrderService } from "@/services/order";

interface Props extends CardProps {}

interface FormData extends Omit<Props, "id"> {
  price: number;
  selectedVolume: string;
}

const Order = ({ id, title, image, body, volumes }: Props) => {
  const router = useRouter();
  const orderService = new OrderService();
  const isAuth = orderService.checkCookie("access");
  const INITIAL_DATA: FormData = {
    title,
    image,
    body,
    volumes,
    price: volumes[0].qualities[0].price,
    selectedVolume: volumes[0].name,
  };

  const [formData, setFormData] = useState<FormData>(INITIAL_DATA);

  const qualityType = volumes
    .find((vol) => vol.name === formData.selectedVolume)
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

  const apiData = {
    serviceId: id,
    serviceQuality: qualityType || volumes[0].qualities[0].type,
    serviceVolume: formData.selectedVolume,
  };

  const handleSubmit = async () => {
    if (!isAuth) {
      toast.error("You need to be logged in to order a service");
      return;
    }

    mutate();
  };

  const { mutate, isLoading } = useMutation(
    async () => await orderService.createOrder(apiData),
    {
      onSuccess: (res) => {
        router.push(res.data?.payment_link);
      },
      onError: (error: any) => {
        toast.error(error?.response?.data?.message);
      },
    }
  );

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
          isLoading={isLoading}
          onClick={() => (isLastStep ? handleSubmit() : nextStep())}
        >
          {isLastStep ? "Pay Now" : "Review Order"}
        </Button>
      </div>
    </div>
  );
};

export default Order;

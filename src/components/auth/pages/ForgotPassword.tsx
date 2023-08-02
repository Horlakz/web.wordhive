import { FC, useContext } from "react";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-hot-toast";

import InputGroup from "@/components/common/InputGroup";
import { AuthContext, VerificationType } from "@/store/context/auth";
import Button from "@/components/common/Button";
import { PageT } from "../types";
import { AuthService } from "@/services/auth";

const authService = new AuthService();

interface ForgotPasswordProps {
  goTo: (page: PageT) => void;
}

const ForgotPassword: FC<ForgotPasswordProps> = ({ goTo }) => {
  const { email, setEmail, setPassword, setVerificationType } =
    useContext(AuthContext);

  const handleSubmit = () => {
    switch (true) {
      case email === "":
        toast.error("Email is required");
        break;
      case !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email):
        toast.error("Email is invalid");
        break;
      default:
        mutate();
    }
  };

  const { mutate, isLoading } = useMutation(
    async () => await authService.forgotPassword(email),
    {
      onSuccess: () => {
        goTo("verification");
        setVerificationType(VerificationType.ForgotPassword);
        setPassword("");
      },
      onError: (err: any) => toast.error(err?.response?.data?.message),
    }
  );

  return (
    <div className="grid center gap-6 py-16">
      <h2 className="text-primary text-2xl font-medium">
        Forgot your password?
      </h2>

      <p className="text-center w-80">
        Enter your registered email address and you will be sent an OTP will be
        sent to reset your password if such email exists on our platform
      </p>

      <form className="flex flex-col gap-3">
        <InputGroup.Input
          className="sm:w-80"
          label="Enter your Email Address"
          placeholder="emailaddress@mail.com"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <Button
          className="flex-center"
          isLoading={isLoading}
          onClick={handleSubmit}
        >
          Send OTP
        </Button>
      </form>
    </div>
  );
};

export default ForgotPassword;

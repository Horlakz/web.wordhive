import { FC, useContext } from "react";

import InputGroup from "@/components/InputGroup";
import { AuthContext, VerificationType } from "@/store/context/auth";
import Button from "../../Button";
import { PageT } from "../types";

interface ForgotPasswordProps {
  goTo: (page: PageT) => void;
}

const ForgotPassword: FC<ForgotPasswordProps> = ({ goTo }) => {
  const { email, setEmail, setVerificationType } = useContext(AuthContext);

  const handleSubmit = () => {
    // TODO: Implement submit logic
    console.log("OTP submitted:", email);
  };

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
          onClick={() => {
            setVerificationType(VerificationType.ForgotPassword);
            goTo("verification");
          }}
        >
          Send OTP
        </Button>
      </form>
    </div>
  );
};

export default ForgotPassword;

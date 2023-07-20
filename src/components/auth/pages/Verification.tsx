import { FC, useContext, useMemo, useRef, useState } from "react";

import { AuthContext, VerificationType } from "@/store/context/auth";
import Button from "../../Button";
import { PageT } from "../types";
import OtpInput from "@/components/OtpInput";

interface LoginProps {
  goTo: (page: PageT) => void;
}

const Verification: FC<LoginProps> = ({ goTo }) => {
  const { otp, verificationType, setMessage, setOtp } = useContext(AuthContext);

  const handleSubmit = () => {
    if (VerificationType.ConfirmEmail === verificationType) {
      goTo("success");
      setMessage("Email Verification Complete! You can now proceed to login");
    } else {
      goTo("resetPassword");
    }
  };

  return (
    <div className="grid center gap-6 py-16">
      <h2 className="text-primary text-2xl font-medium">Enter OTP</h2>

      <p className="text-center w-80">
        A 6-digit code has been sent to your registered email. Enter the code
        below to complete your verification.
      </p>

      <form className="flex flex-col gap-3">
        <OtpInput value={otp} onChange={setOtp} valueLength={6} />

        <Button
          variant="outline"
          colorScheme="secondary"
          className="border-none flex justify-center p-0"
          onClick={() => goTo("forgotPassword")}
        >
          Resend Otp
        </Button>

        <Button className="flex-center" onClick={handleSubmit}>
          Complete Verification
        </Button>
      </form>
    </div>
  );
};

export default Verification;

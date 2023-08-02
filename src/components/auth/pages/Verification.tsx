import { FC, useContext, useEffect, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-hot-toast";

import Button from "@/components/common/Button";
import OtpInput from "@/components/common/OtpInput";
import { AuthContext, VerificationType } from "@/store/context/auth";
import { PageT } from "../types";
import { AuthService } from "@/services/auth";

const authService = new AuthService();

interface LoginProps {
  goTo: (page: PageT) => void;
}

const Verification: FC<LoginProps> = ({ goTo }) => {
  const { email, otp, verificationType, setMessage, setOtp } =
    useContext(AuthContext);

  const [seconds, setSeconds] = useState(59);
  const [minutes, setMinutes] = useState(4);

  useEffect(() => {
    const interval = setInterval(() => {
      if (seconds > 0) {
        setSeconds(seconds - 1);
      }
      if (seconds === 0) {
        if (minutes === 0) {
          clearInterval(interval);
        } else {
          setMinutes(minutes - 1);
          setSeconds(59);
        }
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [seconds, minutes]);
  const active = minutes == 0 && seconds == 0;

  const handleSubmit = () => {
    if (VerificationType.ConfirmEmail === verificationType) {
      verifyEmailMutation.mutate();
    } else {
      goTo("resetPassword");
    }
  };

  const errorFunction = (err: any) => toast.error(err?.response?.data?.message);

  const verifyEmailMutation = useMutation(
    async () => await authService.verifyEmail({ email, code: otp }),
    {
      onSuccess: () => {
        goTo("success");
        setMessage("Email Verification Complete! You can now proceed to login");
      },
      onError: errorFunction,
    }
  );

  const resendCodeMutation = useMutation(
    async () => await authService.resendCode(email),
    {
      onSuccess: () => {
        setMinutes(4);
        setSeconds(59);
        toast.success("Code resent successfully");
      },
      onError: errorFunction,
    }
  );

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
          className="border-none flex justify-center p-0 disabled:bg-transparent disabled:text-gray-700"
          onClick={() => resendCodeMutation.mutate()}
          disabled={!active}
        >
          {active ? "Resend Otp" : "Resend Otp in " + minutes + ":" + seconds}
        </Button>

        <Button
          className="flex-center"
          isLoading={verifyEmailMutation.isLoading}
          onClick={handleSubmit}
        >
          Complete Verification
        </Button>
      </form>
    </div>
  );
};

export default Verification;

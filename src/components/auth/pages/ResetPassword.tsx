import { FC, useContext, useState } from "react";
import { toast } from "react-hot-toast";
import { useMutation } from "@tanstack/react-query";

import Button from "@/components/common/Button";
import InputGroup from "@/components/common/InputGroup";
import { AuthContext } from "@/store/context/auth";
import { PageT } from "../types";
import { AuthService } from "@/services/auth";

const authService = new AuthService();

interface ForgotPasswordProps {
  goTo: (page: PageT) => void;
}

const ResetPassword: FC<ForgotPasswordProps> = ({ goTo }) => {
  const { email, password, otp, setPassword, setMessage } =
    useContext(AuthContext);
  const [newPassword, setNewPassword] = useState("");

  const handleSubmit = () => {
    if (password !== newPassword) {
      toast.error("Passwords do not match");
      return;
    }

    mutate();
  };

  const { mutate, isLoading } = useMutation(
    async () => await authService.resetPassword({ email, code: otp, password }),
    {
      onSuccess: () => {
        goTo("success");
        setMessage(
          "Password Reset Successful! You can now sign in to your account using your newly created password"
        );
      },
      onError: (err: any) => toast.error(err?.response?.data?.message),
    }
  );

  return (
    <div className="grid center gap-6 py-16">
      <h2 className="text-primary text-2xl font-medium">Create New Password</h2>

      <p className="text-center w-80">
        Create a new password to sign in on your registered account
      </p>

      <form className="flex flex-col gap-3">
        <InputGroup.Input
          className="sm:w-80"
          label="Enter new Password"
          placeholder="********"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <InputGroup.Input
          className="sm:w-80"
          label="Re-Enter new Password"
          placeholder="********"
          type="password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />

        <Button
          className="flex-center"
          isLoading={isLoading}
          onClick={handleSubmit}
        >
          Create New Password
        </Button>
      </form>
    </div>
  );
};

export default ResetPassword;

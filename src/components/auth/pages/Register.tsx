import { useContext, FC, useState } from "react";
import { useMutation } from "@tanstack/react-query";

import { PageT } from "../types";
import Button from "@/components/common/Button";
import { AuthContext, VerificationType } from "@/store/context/auth";
import InputGroup from "@/components/common/InputGroup";
import { AuthService } from "@/services/auth";
import { toast } from "react-hot-toast";

const authService = new AuthService();

interface RegisterProps {
  goTo: (page: PageT) => void;
}

const Register: FC<RegisterProps> = ({ goTo }) => {
  const { email, password, setEmail, setPassword, setVerificationType } =
    useContext(AuthContext);
  const [fullName, setFullName] = useState("");

  const handleSubmit = () => {
    switch (true) {
      case !fullName:
        toast.error("Full Name is required");
        break;
      case !email:
        toast.error("Email is required");
        break;
      case !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email):
        toast.error("Email is invalid");
        break;
      case !password:
        toast.error("Password is required");
        break;
      default:
        setVerificationType(VerificationType.ConfirmEmail);
        mutate();
    }
  };

  const { mutate, isLoading } = useMutation(
    async () =>
      await authService.register({ fullname: fullName, email, password }),
    {
      onSuccess: () => {
        toast.success(
          "Registration Successful, Check your email for verification code"
        );
        setPassword("");
        setFullName("");
        goTo("verification");
      },
      onError: (err: any) => {
        toast.error(err.response.data.message);
      },
    }
  );

  return (
    <div className="grid center gap-8 py-16">
      <h2 className="text-primary text-2xl font-medium">Create an account</h2>

      <form className="flex flex-col gap-3">
        <InputGroup.Input
          className="sm:w-80"
          label="Full Name"
          placeholder="E.g John Doe"
          type="email"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
        />

        <InputGroup.Input
          className="sm:w-80"
          label="Email Address"
          placeholder="emailaddress@mail.com"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <InputGroup.Input
          className="sm:w-80"
          label="Password"
          placeholder="********"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <Button
          className="flex-center"
          isLoading={isLoading}
          onClick={handleSubmit}
        >
          Register
        </Button>

        <p className="flex center">
          <span>Already have an account?</span>
          <Button
            variant="outline"
            colorScheme="secondary"
            className="border-none w-fit"
            onClick={() => goTo("verifyEmail")}
          >
            Login
          </Button>
        </p>
      </form>
    </div>
  );
};

export default Register;

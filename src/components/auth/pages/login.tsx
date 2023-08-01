import { useRouter } from "next/navigation";
import { FC, useContext } from "react";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-hot-toast";

import Button from "@/components/common/Button";
import InputGroup from "@/components/common/InputGroup";
import { AuthContext } from "@/store/context/auth";
import { PageT } from "../types";
import { AuthService } from "@/services/auth";
import { VerificationType } from "@/store/context/auth";

const authService = new AuthService();

interface Props {
  goTo: (page: PageT) => void;
}

const VerifyPassword: FC<Props> = ({ goTo }) => {
  const {
    email,
    password,
    setEmail,
    setPassword,
    setVerificationType,
    setModal,
  } = useContext(AuthContext);
  const router = useRouter();

  const handleSubmit = () => {
    switch (true) {
      case !password:
        toast.error("Password is required");
        break;
      default:
        mutate();
    }
  };

  const { mutate, isLoading } = useMutation(
    async () => await authService.login({ email, password }),
    {
      onSuccess: (res) => {
        toast.success("Login Successful");
        router.push("/account");
        setEmail("");
        setPassword("");
        setModal(false);
        authService.setCookie("access", res.data.access_token);
      },
      onError: (err: any) => {
        if (err.response.data.message == "Email is not verified") {
          setVerificationType(VerificationType.ConfirmEmail);
          goTo("verification");
        }

        toast.error(err.response.data.message);
      },
    }
  );

  return (
    <div className="grid center gap-4 py-16">
      <h2 className="text-primary text-2xl font-medium">
        Verify Your Password
      </h2>

      <div className="flex rounded-3xl bg-[#E5E5E5]">
        <span className="bg-[#F5F5F5] py-2 px-4 shadow-md shadow-[#1018281a] rounded-3xl">
          {email}
        </span>
        <Button
          variant="outline"
          colorScheme="secondary"
          className="border-none px-3"
          onClick={() => goTo("verifyEmail")}
        >
          change
        </Button>
      </div>

      <form className="flex flex-col gap-3">
        <InputGroup.Input
          className="sm:w-80"
          label="Password"
          placeholder="********"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <Button
          variant="outline"
          colorScheme="secondary"
          className="border-none flex justify-end p-0"
          onClick={() => goTo("forgotPassword")}
        >
          Forgot Password?
        </Button>

        <Button
          className="flex-center"
          isLoading={isLoading}
          onClick={handleSubmit}
        >
          Login
        </Button>

        <p className="flex center">
          <span>Don&apos;t have an Account?</span>
          <Button
            variant="outline"
            colorScheme="secondary"
            className="border-none w-fit"
            onClick={() => goTo("register")}
          >
            Register
          </Button>
        </p>
      </form>
    </div>
  );
};

export default VerifyPassword;

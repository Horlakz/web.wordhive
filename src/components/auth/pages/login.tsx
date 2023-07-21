import { FC, useContext } from "react";
import { toast } from "react-hot-toast";

import InputGroup from "@/components/common/InputGroup";
import { AuthContext } from "@/store/context/auth";
import Button from "@/components/common/Button";
import { PageT } from "../types";

interface Props {
  goTo: (page: PageT) => void;
}

const VerifyPassword: FC<Props> = ({ goTo }) => {
  const { email, password, setPassword } = useContext(AuthContext);

  const handleSubmit = () => {
    toast.success("Login Successful");
  };

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

        <Button className="flex-center" onClick={handleSubmit}>
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

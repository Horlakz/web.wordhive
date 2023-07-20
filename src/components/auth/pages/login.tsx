import { FC, useContext } from "react";
import { toast } from "react-hot-toast";

import InputGroup from "@/components/InputGroup";
import { AuthContext } from "@/store/context/auth";
import Button from "../../Button";
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
    <div className="grid center gap-10 py-16">
      <h2 className="text-primary text-2xl font-medium">
        Verify Your Password
      </h2>

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
          <span>Change Email Address</span>
          <Button
            variant="outline"
            colorScheme="secondary"
            className="border-none w-fit"
            onClick={() => goTo("verifyEmail")}
          >
            Update
          </Button>
        </p>
      </form>
    </div>
  );
};

export default VerifyPassword;

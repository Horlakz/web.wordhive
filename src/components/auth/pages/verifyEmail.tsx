import { FC, useContext } from "react";
import { toast } from "react-hot-toast";

import Button from "@/components/common/Button";
import InputGroup from "@/components/common/InputGroup";
import { AuthContext } from "@/store/context/auth";
import { PageT } from "../types";

interface LoginProps {
  goTo: (page: PageT) => void;
}

const Login: FC<LoginProps> = ({ goTo }) => {
  const { email, setEmail } = useContext(AuthContext);

  const handleSubmit = () => {
    toast.success("Login Successful");
  };

  return (
    <div className="grid center gap-10 py-16">
      <h2 className="text-primary text-2xl font-medium">
        Login into your account
      </h2>

      <form className="flex flex-col gap-3">
        <InputGroup.Input
          className="sm:w-80"
          label="Email Address"
          placeholder="emailaddress@mail.com"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <Button
          variant="outline"
          colorScheme="secondary"
          className="border-none flex justify-end p-0"
          onClick={() => goTo("forgotPassword")}
        >
          Forgot Password?
        </Button>

        <Button className="flex-center" onClick={() => goTo("login")}>
          Proceed
        </Button>

        <p className="flex center">
          <span>Don&apos;t have an account?</span>
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

export default Login;

import { useContext, FC, useState } from "react";

import { PageT } from "../types";
import Button from "../../Button";
import { AuthContext, VerificationType } from "@/store/context/auth";
import InputGroup from "@/components/InputGroup";

interface RegisterProps {
  goTo: (page: PageT) => void;
}

const Register: FC<RegisterProps> = ({ goTo }) => {
  const { email, password, setEmail, setPassword, setVerificationType } =
    useContext(AuthContext);
  const [fullName, setFullName] = useState("");

  const handleSubmit = () => {
    setVerificationType(VerificationType.ConfirmEmail);
    goTo("verification");
  };

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

        <Button className="flex-center" onClick={handleSubmit}>
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

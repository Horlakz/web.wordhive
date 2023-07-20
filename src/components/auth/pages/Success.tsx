import { useContext } from "react";
import Image from "next/image";

import { AuthContext } from "@/store/context/auth";
import Verified from "@/assets/icons/success.svg";
import Button from "@/components/Button";
import { PageT } from "../types";

interface SuccessProps {
  goTo: (page: PageT) => void;
}

function Success({ goTo }: SuccessProps) {
  const { message } = useContext(AuthContext);

  return (
    <div className="flex-col-center gap-6 py-10 w-80 text-center">
      <Image src={Verified} alt="Success" />
      <p className="text-dark-900">{message}</p>
      <Button colorScheme="secondary" onClick={() => goTo("verifyEmail")}>
        Go To Login
      </Button>
    </div>
  );
}

export default Success;

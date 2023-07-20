import { AnimatePresence, motion } from "framer-motion";
import { FC, useState } from "react";

import { AuthProvider } from "@/store/context/auth";
import Modal from "../Modal";
import ForgotPassword from "./pages/ForgotPassword";
import VerifyEmail from "./pages/verifyEmail";
import Register from "./pages/Register";
import Verification from "./pages/Verification";
import Success from "./pages/Success";
import ResetPassword from "./pages/ResetPassword";
import Login from "./pages/login";
import { PageT } from "./types";

interface AuthModalProps {
  visibility: boolean;
  setVisibility: () => void;
}

const ModalContent = () => {
  const [currentPage, setCurrentPage] = useState<PageT>("verifyEmail");

  const handlePageChange = (page: PageT) => {
    setCurrentPage(page);
  };

  const page: Record<PageT, React.ReactNode> = {
    verifyEmail: <VerifyEmail goTo={handlePageChange} />,
    login: <Login goTo={handlePageChange} />,
    register: <Register goTo={handlePageChange} />,
    forgotPassword: <ForgotPassword goTo={handlePageChange} />,
    resetPassword: <ResetPassword goTo={handlePageChange} />,
    success: <Success goTo={handlePageChange} />,
    verification: <Verification goTo={handlePageChange} />,
  };

  return (
    <AnimatePresence mode="wait">
      <motion.main
        className="sm:px-28 px-10 flex-center normal-case"
        key={currentPage}
        style={{
          opacity: 1,
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
      >
        {page[currentPage]}
      </motion.main>
    </AnimatePresence>
  );
};

const AuthModal: FC<AuthModalProps> = ({ visibility, setVisibility }) => {
  return (
    <Modal visibility={visibility} setVisibility={setVisibility}>
      <AuthProvider>
        <ModalContent />
      </AuthProvider>
    </Modal>
  );
};

export default AuthModal;

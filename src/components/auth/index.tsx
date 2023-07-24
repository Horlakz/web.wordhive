import { AnimatePresence, motion } from "framer-motion";
import { useContext, useState } from "react";

import Modal from "@/components/common/Modal";
import { AuthContext } from "@/store/context/auth";
import ForgotPassword from "./pages/ForgotPassword";
import Register from "./pages/Register";
import ResetPassword from "./pages/ResetPassword";
import Success from "./pages/Success";
import Verification from "./pages/Verification";
import Login from "./pages/login";
import VerifyEmail from "./pages/verifyEmail";
import { PageT } from "./types";

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

const AuthModal = () => {
  const { modal, setModal } = useContext(AuthContext);

  return (
    <Modal visibility={modal} setVisibility={() => setModal(false)}>
      <ModalContent />
    </Modal>
  );
};

export default AuthModal;

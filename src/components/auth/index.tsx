import { FC, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

import { PageT } from "./types";
import Login from "./Login";
import Register from "./Register";
import ForgotPassword from "./ForgotPassword";
import Modal from "../Modal";

interface AuthModalProps {
  visibility: boolean;
  setVisibility: () => void;
}

const ModalContent = () => {
  const [currentPage, setCurrentPage] = useState<PageT>("login");

  const handlePageChange = (page: PageT) => {
    setCurrentPage(page);
  };

  const page: Record<PageT, React.ReactNode> = {
    login: <Login goTo={handlePageChange} />,
    register: <Register goTo={handlePageChange} />,
    forgotPassword: <ForgotPassword goTo={handlePageChange} />,
  };

  return (
    <AnimatePresence mode="wait">
      <motion.div
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
      </motion.div>
    </AnimatePresence>
  );
};

const AuthModal: FC<AuthModalProps> = ({ visibility, setVisibility }) => {
  return (
    <Modal visibility={visibility} setVisibility={setVisibility}>
      <main className="p-40 flex-center">
        <ModalContent />
      </main>
    </Modal>
  );
};

export default AuthModal;

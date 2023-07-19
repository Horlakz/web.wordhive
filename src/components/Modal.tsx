import { FC, useRef } from "react";
import { toast } from "react-hot-toast";
import { motion, AnimatePresence } from "framer-motion";

interface Props {
  children: React.ReactNode;
  visibility: boolean;
  showCloseButton?: boolean;
  setVisibility?: () => void;
}

const Modal: FC<Props> = ({
  children,
  visibility,
  setVisibility,
  showCloseButton = true,
}) => {
  const modalRef = useRef<HTMLDivElement>(null);

  const handleClose = () => {
    if (setVisibility) {
      setVisibility();
    } else {
      toast.error("Function not implemented");
    }
  };

  const handleOutsideClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target === modalRef.current) {
      handleClose();
    }
  };

  const modalVariants = {
    hidden: {
      opacity: 0,
      scale: 0.8,
    },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.2,
        ease: "easeInOut",
      },
    },
    exit: {
      opacity: 0,
      scale: 0.8,
      transition: {
        duration: 0.2,
        ease: "easeInOut",
      },
    },
  };

  return (
    <AnimatePresence>
      {visibility && (
        <motion.div
          className="fixed z-20 w-full h-full left-0 top-0 py-4 px-3 md:px-6 bg-[rgba(0,0,0,0.1)] grid place-content-center"
          variants={modalVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          onClick={handleOutsideClick}
          ref={modalRef}
        >
          <motion.div
            className="shadow-lg w-fit mx-auto relative bg-white rounded-lg"
            variants={modalVariants}
          >
            {children}

            {showCloseButton && (
              <button
                className="absolute top-1.5 right-1.5 p-2 border-none rounded-full"
                onClick={handleClose}
              >
                <span className="text-[#60CD99] text-2xl font-semibold">X</span>
              </button>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Modal;

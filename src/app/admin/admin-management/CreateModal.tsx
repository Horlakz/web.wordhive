import { AnimatePresence, motion } from "framer-motion";
import React, { useContext } from "react";

import Modal from "@/components/common/Modal";
import CreateAdmin from "./CreateAdmin";
import CreateSuccess from "./CreateSuccess";
import { AdminManagementContext, ViewsT } from "./context";
import { INITIAL_FORM } from "./hook";

function CreateModal() {
  const { modal, setModal, setForm, currentView, setCurrentView } = useContext(
    AdminManagementContext
  );

  const views: Record<ViewsT, React.ReactNode> = {
    create: <CreateAdmin />,
    success: <CreateSuccess />,
  };

  return (
    <Modal
      visibility={modal}
      setVisibility={() => {
        setForm(INITIAL_FORM);
        setCurrentView("create");
        setModal(false);
      }}
    >
      <AnimatePresence mode="wait">
        <motion.main
          key={currentView}
          className="grid center text-center w-96 gap-6 p-12"
          style={{
            opacity: 1,
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          {views[currentView]}
        </motion.main>
      </AnimatePresence>
    </Modal>
  );
}

export default CreateModal;

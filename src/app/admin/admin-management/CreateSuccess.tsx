import { useContext } from "react";
import { toast } from "react-hot-toast";

import ClipboardIcon from "@/components/icons/Clipboard";
import { AdminManagementContext } from "./context";

function CreateSuccess() {
  const { formData } = useContext(AdminManagementContext);

  function handleCopy() {
    navigator.clipboard.writeText(formData.password);
    toast.success("Password copied to clipboard");
  }

  return (
    <div className="grid center space-y-4">
      <h1 className="text-2xl font-semibold text-success mb-2">
        Congratulations
      </h1>
      <p className="text-lg text-dark-600 font-medium">
        Admin&nbsp;
        <span className="font-semibold text-dark-900">{formData.fullname}</span>
        &nbsp;has been created and verification email has been sent to&nbsp;
        <span className="font-semibold text-dark-900">{formData.email}</span>
      </p>
      <p className="text-danger text-sm">
        You can only view this password once, please copy and keep it safe
      </p>
      <button
        onClick={handleCopy}
        className="bg-dark-600 text-gray-200 p-2 gap-3 rounded-lg flex items-center"
      >
        <span className="text-lg">{formData.password}</span>
        <ClipboardIcon />
      </button>
    </div>
  );
}

export default CreateSuccess;

import { useContext } from "react";
import Button from "@/components/common/Button";
import InputGroup from "@/components/common/InputGroup";
import { randomString } from "@/utilities/random-string";
import { AdminManagementContext, ViewsT } from "./context";
import { useAdminManagement } from "./hook";

function CreateAdmin() {
  const { formData, setForm, setModal } = useContext(AdminManagementContext);
  const { create } = useAdminManagement();

  function handleCreateAdmin() {
    setForm({ ...formData, password: randomString() });
    create.mutate();
  }

  return (
    <div className="space-y-4">
      <p className="my-2 text-admin-primary text-center w-80">
        Please note that admin will be required to verify email address after
        creation to allow full access
      </p>

      <InputGroup.Input
        label="Full name"
        showLabel={false}
        placeholder="Enter full name of admin"
        value={formData.fullname}
        onChange={(e) => setForm({ ...formData, fullname: e.target.value })}
      />
      <InputGroup.Input
        label="Email Address"
        showLabel={false}
        placeholder="Enter email address of admin"
        value={formData.email}
        onChange={(e) => setForm({ ...formData, email: e.target.value })}
      />

      <div className="flex center gap-2">
        <Button
          variant="outline"
          colorScheme="danger"
          onClick={() => setModal(false)}
        >
          Cancel
        </Button>
        <Button isLoading={create.isLoading} onClick={handleCreateAdmin}>
          Add Admin
        </Button>
      </div>
    </div>
  );
}

export default CreateAdmin;

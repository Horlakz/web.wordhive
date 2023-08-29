import React from "react";

interface PreLoaderProps {
  status: "loading" | "error" | "success";
  children: React.ReactNode;
}

function PreLoader({ status, children }: PreLoaderProps) {
  if (status == "loading") return <div>Loading...</div>;
  if (status == "error")
    return (
      <p className="text-red-600 text-lg">
        Any Error Occured while loading your data
      </p>
    );

  return <>{children}</>;
}

export default PreLoader;

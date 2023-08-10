import React from "react";

import Spinner from "@/components/common/Spinner";

const LoadingPage = () => {
  return (
    <div className="h-96 w-full flex-center bg-black bg-opacity-10">
      <Spinner width={50} height={50} />
    </div>
  );
};

export default LoadingPage;

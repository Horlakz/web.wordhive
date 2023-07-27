import React from "react";
import Image from "next/image";

import rotateRightIcon from "@/assets/icons/rotate-right.svg";

function Spinner({
  width = 20,
  height = 20,
}: {
  width?: number;
  height?: number;
}) {
  return (
    <div className="animate-spin">
      <Image
        src={rotateRightIcon}
        alt="spinner"
        width={width}
        height={height}
      />
    </div>
  );
}

export default Spinner;

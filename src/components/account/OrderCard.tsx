import React from "react";

function OrderCard() {
  return (
    <div className="w-80 flex flex-col justify-start">
      <h6 className="text-lg font-semibold text-dark-900">Service Title</h6>
      <div className="text-dark-600 w-full flex justify-between items-center">
        <span>Volume: </span>
        <span>ServiceQuality</span>
      </div>
      <div className="text-dark-600 w-full flex justify-between items-center">
        <span>Quality: </span>
        <span>ServiceQuality</span>
      </div>
      <div className="text-dark-600 w-full flex justify-between items-center">
        <span>Price: </span>
        <span className="text-secondary">₦ 123</span>
      </div>
    </div>
  );
}

export default OrderCard;

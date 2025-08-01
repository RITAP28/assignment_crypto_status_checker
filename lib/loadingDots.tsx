import React from "react";

const LoadingDots = () => {
  return (
    <span className="flex">
      <span className="dot animate-dot delay-0">.</span>
      <span className="dot animate-dot delay-1">.</span>
      <span className="dot animate-dot delay-2">.</span>
    </span>
  );
};

export default LoadingDots;

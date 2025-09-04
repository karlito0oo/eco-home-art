import { useState, useRef } from "react";

const LoadingOverlay = () => (
  <div className="absolute inset-0 bg-white/50 flex items-center justify-center">
    <div className="h-8 w-8 animate-spin rounded-full border-4 border-green-800 border-t-transparent"></div>
  </div>
);

export default LoadingOverlay;

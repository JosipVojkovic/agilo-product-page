"use client";

import React from "react";

const Loader: React.FC = () => {
  return (
    <div className="flex items-center justify-center py-20 h-[100vh]">
      <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-foreground"></div>
    </div>
  );
};

export default Loader;

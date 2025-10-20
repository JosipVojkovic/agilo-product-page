"use client";

import React from "react";

const Loader: React.FC = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-background z-50">
      <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-foreground"></div>
    </div>
  );
};

export default Loader;

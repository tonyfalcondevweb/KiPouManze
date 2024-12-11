import React from "react";

const BadgeKPM = ({ children }) => {
  return (
    <span className="inline-flex items-center justify-center rounded-lg m-1 p-2 text-sm font-medium text-white shadow-md bg-slate-500 duration-300 ease-in-out active:scale-75 hover:cursor-pointer">
      {children}
    </span>
  );
};

export default BadgeKPM;

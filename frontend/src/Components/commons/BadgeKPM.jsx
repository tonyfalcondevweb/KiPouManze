import React from "react";

const BadgeKPM = ({ children }) => {
  return (
   <span className="inline-flex items-center justify-center rounded-lg m-1 p-2 text-sm font-medium text-texte-kipoumanze shadow-md bg-tertiary-kipoumanze hover:cursor-pointer">
      {children}
    </span>
  );
};

export default BadgeKPM;

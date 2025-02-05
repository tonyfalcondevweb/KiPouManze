import React from 'react';

const BadgeKPMActive = ({ children, classAdd }) => {
  return (
    <span className={`${classAdd} inline-flex items-center justify-center rounded-lg m-1 p-2 text-sm font-medium text-main-kipoumanze shadow-md duration-300 ease-in-out active:scale-75 hover:cursor-pointer`}>
      {children}
    </span>
  );
};

export default BadgeKPMActive;

import React, { useState } from "react";

const ButtonKPM = ({ id, adresse, horaire }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = () => {
    setIsOpen(!isOpen); // Inverse l'état à chaque clic
  };

  return (
    <button
      onClick={handleClick}
      className="flex flex-col items-start gap-2 bg-highlight-kipoumanze text-black px-4 py-2 rounded-xl w-full"
    >
      <div className="flex items-center justify-between w-full">
        <span>{id}</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="w-5 h-5"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d={
              isOpen
                ? "M19.5 8.25l-7.5 7.5-7.5-7.5" // Flèche vers le bas
                : "M8.25 4.5l7.5 7.5-7.5 7.5" // Flèche vers la droite
            }
          />
        </svg>
      </div>
      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out w-full ${
          isOpen ? " opacity-100 mt-2" : "max-h-0 opacity-0"
        }`}
      >
        <p className="p-4 bg-gray-100 rounded-t-lg w-full">
          {Object.values(horaire).map((value, index) => (
            <p key={index}>{value}</p>
          ))}
        </p>
        <p className="p-4 bg-gray-100 rounded-b-lg w-full">{adresse}</p>
      </div>
    </button>
  );
};

export default ButtonKPM;

import React, { useState, useEffect, useRef } from "react";
import BadgeKPMActive from "./commons/BadgeKPMActive";
import PropTypes from "prop-types";

const Navbar = ({
  onSearch,
  categories,
  onCategoryChange,
  selectedCategories,
  tableauRandom,
  RemoveElementTableauRandom,
  getRandomElement,
  handleRandomClick, // Ajouter handleRandomClick
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isKPMMenuOpen, setIsKPMMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const menuRef = useRef(null);

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  const toggleKPMMenu = () => {
    setIsKPMMenuOpen((prev) => !prev);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    onSearch(event.target.value);
  };

  const handleCategoryClick = (category) => {
    onCategoryChange(category);
  };

  const handleClickOutside = (event) => {
    if (menuRef.current && !menuRef.current.contains(event.target)) {
      setIsMenuOpen(false);
      setIsKPMMenuOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <nav
      ref={menuRef}
      className="z-10 fixed bottom-0 left-0 right-0 bg-stroke-kipoumanze bg-opacity-90 rounded-t-lg text-white shadow-lg"
    >
      <div
        className={`${
          isMenuOpen ? "opacity-100 p-4" : "max-h-0 opacity-0"
        } overflow-hidden transition-all duration-300 ease-out bg-highlight-kipoumanze text-center text-black`}
      >
        <ul className="flex flex-wrap justify-center">
          {categories.map((category) => (
            <li key={category} onClick={() => handleCategoryClick(category)}>
              {selectedCategories.includes(category) ? (
                <BadgeKPMActive classAdd={"bg-slate-900 "}>
                  {category}
                </BadgeKPMActive>
              ) : (
                <BadgeKPMActive classAdd={"bg-tertiary-kipoumanze "}>
                  {category}
                </BadgeKPMActive>
              )}
            </li>
          ))}
        </ul>
      </div>

      <div
        className={`${
          isKPMMenuOpen ? "opacity-100 p-4" : "max-h-0 opacity-0"
        } overflow-hidden transition-all duration-300 ease-out bg-highlight-kipoumanze text-center text-black relative`}
      >
        <ul className="flex flex-wrap justify-center">
          {tableauRandom.length === 0 ? (
            <li className="py-2">Aucun restaurant n'a été selectionné.</li>
          ) : (
            tableauRandom.map((restaurant, index) => (
              <li
                key={index}
                className="py-2"
                onClick={() => RemoveElementTableauRandom(index)}
              >
                <BadgeKPMActive classAdd={"bg-slate-900 gap-1 "}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="2.5"
                    stroke="currentColor"
                    className="size-6 text-red-600"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15 12H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                    />
                  </svg>
                  {restaurant.nom}
                </BadgeKPMActive>
              </li>
            ))
          )}
        </ul>
        {tableauRandom.length >= 2 && (
          <button
            onClick={handleRandomClick}
            className="border-4 border-r-cyan-300 bg-cyan-800 gap-1 text-xl inline-flex items-center justify-center rounded-lg m-1 p-2 font-medium text-main-kipoumanze shadow-md duration-300 ease-in-out active:scale-75 hover:cursor-pointer`"
          >
            KiPouManze
          </button>
        )}
      </div>

      <div className="py-6 flex flex-row gap-2 justify-center">
        <div className="flex">
          <input
            className="p-2 rounded-s-full text-center text-black -outline-offset-2 w-40"
            type="text"
            placeholder="nom de restaurant"
            value={searchTerm}
            onChange={handleSearchChange}
          />
          <button
            onClick={toggleMenu}
            className="duration-300 ease-in-out active:scale-75 bg-highlight-kipoumanze-kipoumanze px-3 border-white border-2 rounded-e-full"
          >
            Catégorie
          </button>
        </div>
        <button
          onClick={toggleKPMMenu}
          className="flex items-center duration-300 ease-in-out active:scale-75 bg-highlight-kipoumanze-kipoumanze px-3 border-white border-2 rounded-full gap-1"
        >
          KPM
          {tableauRandom.length > 0 && (
            <span className="bg-red-600 text-red-100 px-2 py-1 text-xs font-bold rounded-full">
              {tableauRandom.length}
            </span>
          )}
        </button>
      </div>
    </nav>
  );
};

Navbar.propTypes = {
  onSearch: PropTypes.func.isRequired,
  categories: PropTypes.array.isRequired,
  onCategoryChange: PropTypes.func.isRequired,
  selectedCategories: PropTypes.array.isRequired,
  tableauRandom: PropTypes.array.isRequired,
  setTableauRandom: PropTypes.func.isRequired,
  RemoveElementTableauRandom: PropTypes.func.isRequired,
  getRandomElement: PropTypes.func.isRequired,
  handleRandomClick: PropTypes.func.isRequired, // Ajouter PropTypes pour handleRandomClick
};

export default Navbar;

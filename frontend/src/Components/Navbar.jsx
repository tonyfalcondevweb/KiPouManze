import React, { useState } from "react";
import BadgeKPM from "./commons/BadgeKPM";
import BadgeKPMActive from "./commons/BadgeKPMActive";

const Navbar = ({ onSearch, categories, onCategoryChange, selectedCategories}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    onSearch(event.target.value);
  };

  const handleCategoryClick = (category) => {
    onCategoryChange(category);
  };

  console.log(selectedCategories);
  

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-stroke-kipoumanze bg-opacity-90 rounded-t-lg text-white shadow-lg">
      <div
        className={`${
          isMenuOpen ? "opacity-100 p-4" : "max-h-0 opacity-0"
        } overflow-hidden transition-all duration-300 ease-out bg-neutral-300 text-center text-black`}
      >
        <ul className="flex flex-wrap justify-center">
          {categories.map((category) => (
            <li key={category} onClick={() => handleCategoryClick(category)}>
              {selectedCategories.includes(category) ? (
                <BadgeKPMActive>{category}</BadgeKPMActive>
              ) : (
                <BadgeKPM>{category}</BadgeKPM>
              )}
            </li>
          ))}
        </ul>
      </div>

      <div className="flex flex-row justify-center py-6">
        <input
          className="p-2 rounded-s-full text-center text-black -outline-offset-2"
          type="text"
          placeholder="nom de restaurant"
          value={searchTerm}
          onChange={handleSearchChange}
        />

        <button
          onClick={toggleMenu}
          className="duration-300 ease-in-out active:scale-75 bg-neutral-600 px-3 border-white border-2 rounded-e-full"
        >
          Catégorie
        </button>
      </div>
    </nav>
  );
};

export default Navbar;

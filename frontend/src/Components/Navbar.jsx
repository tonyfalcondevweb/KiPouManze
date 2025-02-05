import React, { useState, useEffect, useRef } from "react";
import BadgeKPM from "./commons/BadgeKPM";
import BadgeKPMActive from "./commons/BadgeKPMActive";

const Navbar = ({
  onSearch,
  categories,
  onCategoryChange,
  selectedCategories,
  tableauRandom,
  setTableauRandom,
}) => {
  // État pour gérer l'ouverture/fermeture du menu des catégories
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // État pour gérer l'ouverture/fermeture du menu des restaurants (KPM)
  const [isKPMMenuOpen, setIsKPMMenuOpen] = useState(false);

  // État pour gérer la valeur de la barre de recherche
  const [searchTerm, setSearchTerm] = useState("");

  // Référence pour détecter les clics en dehors des menus
  const menuRef = useRef(null);

  // Fonction pour basculer l'état du menu des catégories (ouvrir/fermer)
  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  // Fonction pour basculer l'état du menu des restaurants (KPM) (ouvrir/fermer)
  const toggleKPMMenu = () => {
    setIsKPMMenuOpen((prev) => !prev);
  };

  // Fonction pour mettre à jour la barre de recherche et appeler onSearch pour filtrer les restaurants
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    onSearch(event.target.value);
  };

  // Fonction pour gérer les clics sur les catégories
  const handleCategoryClick = (category) => {
    onCategoryChange(category);
  };

  // Fonction pour détecter les clics en dehors des menus et les fermer si on clique ailleurs
  const handleClickOutside = (event) => {
    if (menuRef.current && !menuRef.current.contains(event.target)) {
      setIsMenuOpen(false); // Fermer le menu des catégories
      setIsKPMMenuOpen(false); // Fermer le menu des restaurants (KPM)
    }
  };

  // useEffect pour ajouter l'événement de clic en dehors et le nettoyer lorsque le composant est démonté
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <nav
      ref={menuRef} // Référence pour détecter les clics en dehors
      className="z-10 fixed bottom-0 left-0 right-0 bg-stroke-kipoumanze bg-opacity-90 rounded-t-lg text-white shadow-lg"
    >
      {/* Menu des catégories */}
      <div
        className={`${
          isMenuOpen ? "opacity-100 p-4" : "max-h-0 opacity-0"
        } overflow-hidden transition-all duration-300 ease-out bg-highlight-kipoumanze text-center text-black`}
      >
        <ul className="flex flex-wrap justify-center">
          {/* Parcours des catégories et création d'un badge pour chaque catégorie */}
          {categories.map((category) => (
            <li key={category} onClick={() => handleCategoryClick(category)}>
              {/* Si la catégorie est sélectionnée, afficher BadgeKPMActive */}
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
      {/* Menu des catégories */}

      {/* Menu des restaurants (KPM) */}
      <div
        className={`${
          isKPMMenuOpen ? "opacity-100 p-4" : "max-h-0 opacity-0"
        } overflow-hidden transition-all duration-300 ease-out bg-highlight-kipoumanze text-center text-black`}
      >
        <ul className="flex flex-wrap justify-center">
          {/* Vérifie si tableauRandom est vide */}
          {tableauRandom.length === 0 ? (
            <li className="py-2">Aucun restaurant n'a été selectionné.</li> // Affiche ce message si le tableau est vide
          ) : (
            tableauRandom.map((restaurant) => (
              <li key={restaurant.nom} className="py-2">
                <BadgeKPMActive classAdd={"bg-slate-900 gap-1 "}>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor" className="size-6 text-red-600">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 12H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                </svg>
                  {restaurant.nom}
                </BadgeKPMActive>
              </li>
            ))
          )}
        </ul>
      </div>
      {/* Menu des restaurants (KPM) */}

      {/* Menu de navigation */}
      <div className="py-6 flex flex-row gap-2 justify-center">
        <div className="flex">
          {/* Barre de recherche */}
          <input
            className="p-2 rounded-s-full text-center text-black -outline-offset-2 w-40"
            type="text"
            placeholder="nom de restaurant"
            value={searchTerm}
            onChange={handleSearchChange}
          />
          {/* Barre de recherche */}

          {/* Bouton pour ouvrir/fermer le menu des catégories */}
          <button
            onClick={toggleMenu}
            className="duration-300 ease-in-out active:scale-75 bg-highlight-kipoumanze-kipoumanze px-3 border-white border-2 rounded-e-full"
          >
            Catégorie
          </button>
          {/* Bouton pour ouvrir/fermer le menu des catégories */}
        </div>

        {/* Bouton pour ouvrir/fermer le menu des restaurants (KPM) */}
        <button
          onClick={toggleKPMMenu} // Gère l'ouverture/fermeture du menu KPM
          className="flex items-center duration-300 ease-in-out active:scale-75 bg-highlight-kipoumanze-kipoumanze px-3 border-white border-2 rounded-full gap-1"
        >
          KPM
          {tableauRandom.length > 0 && (
            <span class="bg-red-600 text-red-100 px-2 py-1 text-xs font-bold rounded-full">
              {tableauRandom.length}
            </span>
          )}
        </button>
      </div>
      {/* Menu de navigation */}
    </nav>
  );
};

export default Navbar;

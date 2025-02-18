import React, { useState, useEffect } from "react";
import Container from "./commons/Container";
import Card from "./Card";
import restaurantData from "../Data/Restaurant_updated_corrected.json";
import Navbar from "./Navbar";
import Modal from "./Modal"; // Importer le composant Modal

const Home = () => {
  const [restaurantList, setRestaurantList] = useState(restaurantData);
  const [categories, setCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [tableauRandom, setTableauRandom] = useState([]);
  const [selectedRestaurant, setSelectedRestaurant] = useState(null); // État pour le restaurant sélectionné

  const getRandomElement = () => {
    if (tableauRandom.length < 2) {
      throw new Error("Vous devez choisir au moins 2 restaurants.");
    }
    const randomIndex = Math.floor(Math.random() * tableauRandom.length);

    return tableauRandom[randomIndex];
  };

  useEffect(() => {
    const uniqueCategories = [
      ...new Set(restaurantData.flatMap((restaurant) => restaurant.categorie)),
    ];
    setCategories(uniqueCategories);
  }, []);

  const handleSearch = (searchTerm) => {
    setSearchTerm(searchTerm);
  };

  const handleRemoveElement = (index) => {
    const newTableauRandom = tableauRandom.filter((_, i) => i !== index);
    setTableauRandom(newTableauRandom);
  };

  const handleCategoryChange = (category) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((cat) => cat !== category)
        : [...prev, category]
    );
  };

  useEffect(() => {
    const filteredRestaurants = restaurantData.filter((restaurant) => {
      const matchesCategory =
        selectedCategories.length === 0 ||
        selectedCategories.every((cat) => restaurant.categorie.includes(cat));
      const matchesSearchTerm = restaurant.nom
        .toLowerCase()
        .includes(searchTerm.toLowerCase());

      return matchesCategory && matchesSearchTerm;
    });
    setRestaurantList(filteredRestaurants);
  }, [selectedCategories, searchTerm]);

  const handleRandomClick = () => {
    try {
      const randomElement = getRandomElement();
      setSelectedRestaurant(randomElement); // Définir le restaurant sélectionné
    } catch (error) {
      console.error(error.message);
    }
  };

  const closeModal = () => {
    setSelectedRestaurant(null); // Réinitialiser le restaurant sélectionné pour fermer le modal
  };

  return (
    <Container>
      <Navbar
        onSearch={handleSearch}
        categories={categories}
        onCategoryChange={handleCategoryChange}
        selectedCategories={selectedCategories}
        tableauRandom={tableauRandom}
        setTableauRandom={setTableauRandom}
        RemoveElementTableauRandom={handleRemoveElement}
        getRandomElement={getRandomElement}
        handleRandomClick={handleRandomClick} // Passer la fonction handleRandomClick
      />
      <div className="py-2 px-6 space-y-5">
        <Card
          data={restaurantList}
          tableauRandom={tableauRandom}
          setTableauRandom={setTableauRandom}
        />
      </div>
      {selectedRestaurant && (
        <Modal restaurant={selectedRestaurant} onClose={closeModal} /> // Afficher le modal si un restaurant est sélectionné
      )}
    </Container>
  );
};

export default Home;

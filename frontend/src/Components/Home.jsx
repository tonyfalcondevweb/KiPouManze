import React, { useState, useEffect } from "react";
import Container from "./commons/Container";
import Card from "./Card";
import restaurantData from "../Data/Restaurant_updated_corrected.json";
import Navbar from "./Navbar";

const Home = () => {
  const [restaurantList, setRestaurantList] = useState(restaurantData);
  const [categories, setCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [tableauRandom, setTableauRandom] = useState([]);

  console.log(tableauRandom);
  

  useEffect(() => {
    const uniqueCategories = [...new Set(restaurantData.flatMap(restaurant => restaurant.categorie))];
    setCategories(uniqueCategories);
  }, []);

  const handleSearch = (searchTerm) => {
    setSearchTerm(searchTerm);
  };

  const handleCategoryChange = (category) => {
    setSelectedCategories(prev => 
      prev.includes(category) ? prev.filter(cat => cat !== category) : [...prev, category]
    );
  };

  useEffect(() => {
    const filteredRestaurants = restaurantData.filter(restaurant => {
      const matchesCategory = selectedCategories.length === 0 || 
        selectedCategories.every(cat => restaurant.categorie.includes(cat));
      const matchesSearchTerm = restaurant.nom.toLowerCase().includes(searchTerm.toLowerCase());

      return matchesCategory && matchesSearchTerm;
    });
    setRestaurantList(filteredRestaurants);
  }, [selectedCategories, searchTerm]);
 

  return (
    <Container>
      <Navbar onSearch={handleSearch} categories={categories} onCategoryChange={handleCategoryChange} selectedCategories={selectedCategories} tableauRandom={tableauRandom} setTableauRandom={setTableauRandom} />
      <div className="py-2 px-6 space-y-5">
        <Card data={restaurantList} tableauRandom={tableauRandom} setTableauRandom={setTableauRandom} />
      </div>
    </Container>
  );
};

export default Home;
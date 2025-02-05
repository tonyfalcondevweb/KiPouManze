import React from "react";
import BadgeKPM from "./commons/BadgeKPM";
import ButtonKPM from "./commons/ButtonKPM";

const Card = ({ data, tableauRandom, setTableauRandom }) => {

  const handleRandomButton = (restaurant) => {
    setTableauRandom((prev) => {
      const isAlreadyIn = prev.some((r) => r.nom === restaurant.nom);
      return isAlreadyIn ? prev.filter((r) => r.nom !== restaurant.nom) : [...prev, restaurant];
    });
  };

  return (
    <>
      {data.map((restaurant) => (
        <div
          key={restaurant.nom}
          className="z-10 rounded-2xl overflow-hidden shadow-lg p-4 bg-button-kipoumanze space-y-5 text-button-texte-kipoumanze"
        >
          <div className="flex flex-row justify-between">
            <h2 className="font-bold text-xl text-center">{restaurant.nom}</h2>

            <button
              onClick={() => handleRandomButton(restaurant)}
              className="flex gap-1 p-1 text-white rounded-lg bg-stroke-kipoumanze duration-300 ease-in-out active:scale-75 hover:cursor-pointer"
            >
              KPM
              {tableauRandom.some((r) => r.nom === restaurant.nom) ? (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor" className="size-6 text-red-600">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 12H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor" className="size-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                </svg>
              )}
            </button>
          </div>

          <div className="space-y-2">
            {restaurant.emplacements.map((element) => (
              <ButtonKPM
                key={element.nom}
                id={element.nom}
                adresse={element.adresse}
                horaire={element.horaire}
              />
            ))}
          </div>

          <div className="text-center">
            {restaurant.categorie.map((cat, index) => (
              <BadgeKPM key={index}>{cat}</BadgeKPM>
            ))}
          </div>
        </div>
      ))}
    </>
  );
};

export default Card;

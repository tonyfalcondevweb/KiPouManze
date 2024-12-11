import React from "react";
import BadgeKPM from "./commons/BadgeKPM";

const Card = ({ data }) => {
  return (
    <>
      {data.map((restaurant) => (
        <div
          key={restaurant.nom}
          className="rounded-2xl overflow-hidden shadow-lg p-4 bg-neutral-700 space-y-5 text-white"
        >
          <h2 className="font-bold text-xl text-center">{restaurant.nom}</h2>
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

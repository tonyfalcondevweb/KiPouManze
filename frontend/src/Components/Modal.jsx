import React, { useEffect, useRef } from "react";
import PropTypes from "prop-types";
import ButtonKPM from "./commons/ButtonKPM";

const Modal = ({ restaurant, onClose }) => {
  const modalRef = useRef(null);

  const handleClickOutside = (event) => {
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      onClose();
    }
  };

  console.log(restaurant);

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div
        ref={modalRef}
        className="bg-button-kipoumanze p-4 rounded-lg shadow-lg relative"
      >
        <h2 className="text-2xl font-bold mb-4 text-button-texte-kipoumanze">{restaurant.nom}</h2>
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
      </div>
    </div>
  );
};

Modal.propTypes = {
  restaurant: PropTypes.object.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default Modal;

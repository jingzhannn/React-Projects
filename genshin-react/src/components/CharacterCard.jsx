import { useState } from "react";

function CharacterCard({ char, icon, isSelected, onClick }) {
  const { name, vision, nation } = char;

  const visionColors = {
    Pyro: "#FF5733",
    Hydro: "#0077b6",
    Electro: "#9d4edd",
    Cryo: "#00b4d8",
    Anemo: "#2a9d8f",
    Geo: "#f4a261",
    Dendro: "#52b788",
  };


  return (
    <div className={`character-card ${isSelected ? "selected" : ""}` } onClick={onClick}>
      <h2>{name}</h2>
      <h3 style={{color: visionColors[vision]}}>{vision}</h3>
      <p>Nation: {nation}</p>
      <img src={icon} alt={`${name} card`}></img>
    </div>
  );
}

export default CharacterCard;

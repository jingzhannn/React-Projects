import { useState, useEffect } from "react";
import CharacterCard from "./CharacterCard";
import VisionSpinner from "./VisionSpinner";
import "../style.css";

function CharacterGrid() {
  const [details, setDetails] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isSelected, setSelected] = useState(null);

  const visionColors = {
    Pyro: "#FF5733",
    Hydro: "#0077b6",
    Electro: "#9d4edd",
    Cryo: "#00b4d8",
    Anemo: "#2a9d8f",
    Geo: "#f4a261",
    Dendro: "#52b788",
  };

  useEffect(() => {
    async function loadCharacters() {
      setLoading(true);

      try {
        const res = await fetch("https://genshin.jmp.blue/characters");
        const names = await res.json();

        const details = await Promise.all(
          names.map(async (name) => {
            const res = await fetch(
              `https://genshin.jmp.blue/characters/${name}`
            );
            return await res.json();
          })
        );

        setDetails(details);

        setLoading(false);
      } catch (err) {
        console.error(err);
      } finally {
        console.log("Attempt Fetch Completed");
      }
    }

    loadCharacters();
  }, []);

  const handleClick = (id) => {
    scrollTo(top);
    setSelected(id);
    setTitleCharacter(false);
  };

  if (loading) {
    return <VisionSpinner />;
  }

  const findCharacterById = (id) => {
    details.forEach((char) => {
      if (char.id === id) {
        return char;
      }
    });
  };

  return (
    <>
      {isSelected && (
        <>
          <h2 className="selected-character-title">
            Selected Character:{" "}
            <span style={{ color: visionColors[isSelected?.vision] }}>
              {isSelected ? isSelected.name : ""}
            </span>
          </h2>
          <img
            src={`https://genshin.jmp.blue/characters/${isSelected.id.toLowerCase()}/icon`}
            alt={isSelected.name}
          />
        </>
      )}
      <div className="character-grid">
        {details.map((char, index) => (
          <CharacterCard
            key={index}
            char={char}
            icon={`https://genshin.jmp.blue/characters/${char.id.toLowerCase()}/icon`}
            isSelected={isSelected === char}
            onClick={() => handleClick(char)}
          />
        ))}
      </div>
    </>
  );
}

export default CharacterGrid;

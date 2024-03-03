import { Link } from "react-router-dom";
import "./characterListButton.scss";

const CharacterListButton = ({ getMoreCharacters }) => {
  return (
    <button
      onClick={() => {
        getMoreCharacters();
      }}
      className="button character-list-button"
    >
      Show More
    </button>
  );
};

export default CharacterListButton;

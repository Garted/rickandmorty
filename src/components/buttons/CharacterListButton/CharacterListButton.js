import "./characterListButton.scss";

const CharacterListButton = ({ getMoreCharacters }) => {
  return (
    <button
      onClick={() => {
        getMoreCharacters();
      }}
      className="character-list-button"
    >
      Show More
    </button>
  );
};

export default CharacterListButton;

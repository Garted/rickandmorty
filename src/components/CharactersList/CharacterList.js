import { useState, useEffect } from "react";
import "./charactersList.scss";
import useRickAndMortyService from "../../service/RickAddMortyService";
import Loading from "../Loading";

import CharacterListButton from "../buttons/CharacterListButton/CharacterListButton";

const CharacterList = ({ setSingleChar }) => {
  const { getSomeCharacters } = useRickAndMortyService();

  const [characters, setCharacters] = useState(null);

  useEffect(() => {
    getCharacters();
  }, []);

  const onCharactersLoaded = (chars) => {
    if (characters === null) {
      setCharacters(() => chars);
    } else {
      setCharacters(() => [...characters, ...chars]);
    }
  };

  const getCharacters = () => {
    const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    getSomeCharacters(arr).then(onCharactersLoaded);
  };

  const getMoreCharacters = () => {
    let arr = [];
    for (let i = 1; i <= 9; i++) {
      arr.push(characters.length + i);
    }
    getSomeCharacters(arr).then(onCharactersLoaded);
  };

  const [hover, sethoverEffect] = useState(null);

  const hoverEffectAdd = (i) => {
    sethoverEffect(i);
  };
  const hoverEffectFade = () => {
    sethoverEffect(null);
  };

  const passChar = (id) => {
    setSingleChar(characters.filter((item) => item.id === id));
  };

  const Characters = ({ characters }) => {
    return characters.map((item) => (
      <div
        key={item.id}
        onMouseEnter={() => {
          hoverEffectAdd(item.id);
        }}
        onMouseLeave={() => {
          hoverEffectFade();
        }}
        onClick={() => {
          passChar(item.id);
        }}
        className="character-card"
      >
        <img className="character-img" src={item.img} alt={item.name} />
        <div className="character-name name">{item.name}</div>
        <button
          className={
            hover === item.id
              ? "character-button topage show"
              : "character-button topage"
          }
        >
          TO PAGE
        </button>
      </div>
    ));
  };

  return (
    <div className="characters-block">
      {characters === null ? (
        <Loading />
      ) : (
        <Characters characters={characters} />
      )}
      <CharacterListButton getMoreCharacters={getMoreCharacters} />
    </div>
  );
};

export default CharacterList;

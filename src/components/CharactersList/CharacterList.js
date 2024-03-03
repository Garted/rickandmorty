import { useState, useEffect } from "react";
import "./charactersList.scss";
import useRickAndMortyService from "../../service/RickAddMortyService";
import Loading from "../Loading";
import { Link } from "react-router-dom";

import CharacterListButton from "../buttons/CharacterListButton/CharacterListButton";

const CharacterList = ({ chars, setChars, setIdChar }) => {
  const { getSomeCharacters } = useRickAndMortyService();

  useEffect(() => {
    getCharacters();
  }, []);

  const onCharactersLoaded = (characters) => {
    if (chars === null) {
      setChars(() => characters);
    } else {
      setChars(() => [...chars, ...characters]);
    }
  };
  const getCharacters = () => {
    const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    getSomeCharacters(arr).then(onCharactersLoaded);
  };

  const getMoreCharacters = () => {
    let arr = [];
    for (let i = 1; i <= 9; i++) {
      arr.push(chars.length + i);
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
  const passId = (i) => {
    setIdChar(i - 1);
  };
  const Characters = ({ chars }) => {
    return chars.map((item) => (
      <div
        key={item.id}
        onMouseEnter={() => {
          hoverEffectAdd(item.id);
        }}
        onMouseLeave={() => {
          hoverEffectFade();
        }}
        onClick={() => passId(item.id)}
        className="character-card"
      >
        <img className="character-img" src={item.img} alt={item.name} />
        <div className="character-name name">{item.name}</div>
        <Link className="linkto" to={"single"}>
          <button
            className={
              hover === item.id ? "button topage show" : "button topage"
            }
          >
            TO PAGE
          </button>
        </Link>
      </div>
    ));
  };

  return (
    <div className="characters-block">
      {chars === null ? <Loading /> : <Characters chars={chars} />}
      <CharacterListButton getMoreCharacters={getMoreCharacters} />
    </div>
  );
};

export default CharacterList;

import { useEffect, useState } from "react";
import useRickAndMortyService from "..//..//service/RickAddMortyService";
import "./randomChar.scss";
import Loading from "..//Loading";

const RandomChar = () => {
  const { getCharacter } = useRickAndMortyService();
  const [char, setChar] = useState(null);
  const [change, setChange] = useState(false);

  useEffect(() => {
    updateChar();
  }, [change]);

  const clickChange = () => {
    setChange(!change);
  };

  const onCharLoaded = (char) => {
    setChar(char);
  };
  const updateChar = () => {
    const id = Math.floor(Math.random() * 826) + 1;
    getCharacter(id).then(onCharLoaded);
  };

  const CharBlock = ({ char }) => {
    return (
      <div className="char-block">
        <img className="char-img" src={char.img} alt="" />
        <div className="description-block">
          <div className="char-name name">{char.name}</div>
          <div
            className={`char-status ${
              char.status === "Dead"
                ? "dead"
                : char.status === "Alive"
                ? "alive"
                : "unknown"
            }`}
          >
            Статус персонажа: {char.status}
          </div>
          <div
            className={`char-gender ${
              char.gender === "Male"
                ? "male"
                : char.gender === "Female"
                ? "female"
                : "diffrent"
            }`}
          >
            Гендер персонажа: {char.gender}
          </div>
          <div className="char-species">Вид персонажа: {char.species}</div>
          <div className="char-location">Место обитания: {char.location}</div>
        </div>
      </div>
    );
  };

  console.log("render");
  return (
    <div className="random-char">
      {char === null ? <Loading /> : <CharBlock char={char} />}
      <div className="renew_block">
        <div className="renew-text">Random character for today!</div>
        <div className="renew-text">Or choose another one</div>
        <button className="renew-button" onClick={() => clickChange()}>
          CHANGE
        </button>
      </div>
    </div>
  );
};

export default RandomChar;

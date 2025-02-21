import { useEffect, useState } from 'react';
import './randomChar.scss';
import Loading from '../Loading';

const RandomChar = () => {
  const [randomCharacter, setRandomCharacter] = useState(null);

  const fetchRandomChar = async (id) => {
    try {
      const res = await fetch(
        `https://rickandmortyapi.com/api/character/${id}`
      );
      const data = await res.json();
      return {
        id: data.id,
        name: data.name,
        img: data.image,
        status: data.status,
        species: data.species,
        gender: data.gender,
        location: data.location.name,
      };
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    updateChar();
  }, []);

  const updateChar = () => {
    const id = Math.floor(Math.random() * 826) + 1;
    fetchRandomChar(id).then((data) => setRandomCharacter(data));
  };

  const clickChange = () => {
    updateChar();
    document.getElementById('disableButton').disabled = true;
    document.getElementById('disableButton').classList.add('disable');
    setTimeout(() => {
      document.getElementById('disableButton').disabled = false;
      document.getElementById('disableButton').classList.remove('disable');
    }, 1500);
  };

  console.log('RandomChar render');
  return (
    <div className="random-char">
      {randomCharacter === null ? (
        <Loading />
      ) : (
        <div className="char-block">
          <img
            className="char-img"
            src={randomCharacter.img}
            alt={randomCharacter.name}
          />
          <div className="description-block">
            <div className="char-name name">{randomCharacter.name}</div>
            <div
              className={`char-status ${
                randomCharacter.status === 'Dead'
                  ? 'dead'
                  : randomCharacter.status === 'Alive'
                  ? 'alive'
                  : 'unknown'
              }`}
            >
              Character status : {randomCharacter.status}
            </div>
            <div
              className={`char-gender ${
                randomCharacter.gender === 'Male'
                  ? 'male'
                  : randomCharacter.gender === 'Female'
                  ? 'female'
                  : 'diffrent'
              }`}
            >
              Character gender: {randomCharacter.gender}
            </div>
            <div
              className={`char-spicies ${
                randomCharacter.species === 'Human'
                  ? 'human'
                  : randomCharacter.species === 'Alien'
                  ? 'alien'
                  : 'other'
              }`}
            >
              Character type: {randomCharacter.species}
            </div>
            <div
              className={`char-location ${
                randomCharacter.location === 'Citadel of Ricks'
                  ? 'citadel'
                  : 'other'
              }`}
            >
              Character habitat: {randomCharacter.location}
            </div>
          </div>
        </div>
      )}

      <div className="renew_block">
        <div className="renew-text">
          Random character for today! <br />
          Or choose another one
        </div>

        <button
          id="disableButton"
          className="button random-char-button"
          onClick={() => clickChange()}
        >
          CHANGE
        </button>
      </div>
    </div>
  );
};

export default RandomChar;

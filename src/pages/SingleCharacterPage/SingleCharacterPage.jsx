import { useEffect, useState } from 'react';
import './singleCharacterPage.scss';

import { useParams } from 'react-router';
import Loading from '../../components/Loading';

const SingleCharacterPage = () => {
  const { id } = useParams();

  const num = id;

  const [singleCharacter, setSingleCharacter] = useState(null);

  const getSingleCharacter = async (num) => {
    try {
      const res = await fetch(
        `https://rickandmortyapi.com/api/character/${num}`
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
      console.log(e.name);
    }
  };

  useEffect(() => {
    getCharacter(num);
  }, []);

  const getCharacter = (num) => {
    getSingleCharacter(num).then((data) => setSingleCharacter(data));
  };

  console.log('SingleCharacter render');
  return (
    <div className="single-page">
      {singleCharacter === null ? (
        <Loading />
      ) : (
        <div className="single-page-wrap">
          <img
            className="single-img"
            src={singleCharacter.img}
            alt={singleCharacter.name}
          />

          <div className="single-block">
            <div className="single-name">Name: {singleCharacter.name}</div>
            <div
              className={`single-status ${
                singleCharacter.status === 'Dead'
                  ? 'dead'
                  : singleCharacter.status === 'Alive'
                  ? 'alive'
                  : 'unknown'
              }`}
            >
              Character status: {singleCharacter.status}
            </div>
            <div
              className={`single-gender ${
                singleCharacter.gender === 'Male'
                  ? 'male'
                  : singleCharacter.gender === 'Female'
                  ? 'female'
                  : 'diffrent'
              }`}
            >
              Character gender: {singleCharacter.gender}
            </div>
            <div
              className={`single-species ${
                singleCharacter.species === 'Human'
                  ? 'human'
                  : singleCharacter.species === 'Alien'
                  ? 'alien'
                  : 'other'
              }`}
            >
              Character type: {singleCharacter.species}
            </div>
            <div
              className={`single-location ${
                singleCharacter.location === 'Citadel of Ricks'
                  ? 'citadel'
                  : 'other'
              }`}
            >
              Character's habitat: {singleCharacter.location}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SingleCharacterPage;

import './charactersList.scss';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Loading from '../Loading';
import { Link } from 'react-router';

import {
  fetchHeroes,
  getMorefetchHeroes,
  setId,
} from '../../APISlice/heroesSlice';

const CharacterList = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchHeroes([1, 2, 3, 4, 5, 6, 7, 8, 9]));
  }, []);

  const heroes = useSelector((state) => state.heroes);
  const { data, status } = heroes;

  const getMore = () => {
    let arr = [];
    for (let i = 1; i <= 9; i++) {
      arr.push(data.length + i);
    }
    dispatch(getMorefetchHeroes(arr));
  };

  const handleSetId = (i) => {
    dispatch(setId(i));
  };

  const [fade, setFade] = useState(null);
  const [activeCard, setActiveCard] = useState(null);

  return (
    <div className="wrap">
      <div className="characters-block">
        {status === 'loading' || data === null ? (
          <Loading />
        ) : (
          data.map((item) => (
            <div
              onMouseEnter={() => {
                setFade(item.id);
              }}
              onMouseLeave={() => {
                setFade(null);
              }}
              key={item.id}
              onClick={() => {
                handleSetId(item.id);
                setActiveCard(item.id);
              }}
              className={
                item.id === activeCard
                  ? 'character-card active'
                  : 'character-card'
              }
            >
              <img className="character-img" src={item.img} alt={item.name} />
              <div className="character-name name">{item.name}</div>
              {item.id === activeCard ? (
                <div className="char-descr">
                  <div
                    className={`char-status ${
                      item.status === 'Dead'
                        ? 'dead'
                        : item.status === 'Alive'
                        ? 'alive'
                        : 'unknown'
                    }`}
                  >
                    Статус персонажа: {item.status}
                  </div>
                  <div
                    className={`char-gender ${
                      item.gender === 'Male'
                        ? 'male'
                        : item.gender === 'Female'
                        ? 'female'
                        : 'diffrent'
                    }`}
                  >
                    Гендер персонажа: {item.gender}
                  </div>
                  <div
                    className={`char-spicies ${
                      item.species === 'Human'
                        ? 'human'
                        : item.species === 'Alien'
                        ? 'alien'
                        : 'other'
                    }`}
                  >
                    Вид персонажа: {item.species}
                  </div>
                  <div
                    className={`char-location ${
                      item.location === 'Citadel of Ricks' ? 'citadel' : 'other'
                    }`}
                  >
                    Место обитания: {item.location}
                  </div>
                </div>
              ) : null}

              <Link
                className="linkto"
                to={`/single/${item.id}/${item.name.replace(/\s/g, '')}`}
              >
                {fade === item.id ? (
                  <button className="button topage">TO PAGE</button>
                ) : activeCard !== null && activeCard === item.id ? (
                  <button className="button topage">TO PAGE</button>
                ) : null}
              </Link>
            </div>
          ))
        )}
      </div>
      <button
        onClick={(e) => {
          getMore();
          e.preventDefault();
        }}
        className="button character-list-button"
      >
        Show More
      </button>
    </div>
  );
};
export default CharacterList;

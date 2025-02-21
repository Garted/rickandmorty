import { useEffect, useState } from 'react';
import './episodesPage.scss';
import Loading from '../../components/Loading';

import { fetchEpisodes } from '../../APISlice/heroesSlice';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router';

const Episodes = () => {
  const episodes = useSelector((state) => state.heroes.episodes);
  const dispatch = useDispatch();

  useEffect(() => {
    if (episodes === null) {
      dispatch(fetchEpisodes());
    }
  }, [dispatch]);

  const [chars, setChars] = useState({});

  const [show, setShow] = useState(false);

  async function fetchData(item) {
    try {
      let fet = await fetch(item);
      let data = await fet.json();
      return { id: data.id, name: data.name, img: data.image };
    } catch (e) {
      console.log(e);
    }
  }
  const getPers = async (id, data) => {
    try {
      const newData = await Promise.all(
        data.map(async (item) => {
          return fetchData(item);
        })
      );
      setChars((chars) => ({
        ...chars,
        [id]: { status: 'done', data: newData },
      }));
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      <div className="episodes">
        <div className="container-r">
          <ul className="episodes-list">
            {episodes === null ? (
              <Loading />
            ) : (
              episodes.map((item) => {
                return (
                  <li key={item.id} className="episode-single">
                    <div className="episode-wrap">
                      <div className="box">
                        <div className="episode-episode">{item.episode}</div>
                        <div className="episode-name">{item.name}</div>
                        <div className="episode-drop">{item.air_date}</div>
                      </div>

                      <button
                        onClick={() => {
                          setShow(!show);
                          if (
                            chars[item.id] &&
                            chars[item.id].status === 'done'
                          ) {
                            return;
                          } else {
                            getPers(item.id, item.characters);
                            setChars((chars) => ({
                              ...chars,
                              [item.id]: {
                                status: 'loading',
                              },
                            }));
                          }
                        }}
                        className="button episode-heroes"
                      >
                        Episode characters
                      </button>
                    </div>
                    {show === false ? null : chars[item.id] &&
                      chars[item.id].status !== 'done' ? (
                      <Loading />
                    ) : chars[item.id] && chars[item.id].status === 'done' ? (
                      <div className="person-episode">
                        {chars[item.id].data.map((item) => {
                          return (
                            <Link
                              key={item.id}
                              className="lin"
                              to={`/single/${item.id}/${item.name.replace(
                                /\s/g,
                                ''
                              )}`}
                            >
                              <div className="person-item">
                                <div className="name person-image">
                                  <img src={item.img} alt={item.name} />
                                </div>
                                <div className="person-name">{item.name}</div>
                              </div>
                            </Link>
                          );
                        })}
                      </div>
                    ) : null}
                  </li>
                );
              })
            )}
          </ul>
        </div>
      </div>
    </>
  );
};

export default Episodes;

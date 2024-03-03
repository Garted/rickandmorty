import "./LeftSide.scss";
import Skeleton from "../skeleton/Skeleton";
import { useState } from "react";

import useRickAndMortyService from "../../service/RickAddMortyService";

const LeftSide = ({ idChar, chars }) => {
  const OneCharInfo = ({ idChar, chars }) => {
    const { img, name, species, status, gender, location } = chars[idChar];

    const { getEpisodes } = useRickAndMortyService();

    const [episodes, setEpisodes] = useState(null);

    const setttt = (data) => {
      setEpisodes(data);
    };
    const showEpisodes = (idChar) => {
      getEpisodes(idChar).then(setttt);
    };

    const EpisodesList = () => {
      return (
        <div className="episodes-list">
          <div className="episode-list-title">Эпизоды с персонажем:</div>
          {episodes.map((item) => {
            if (episodes.indexOf(item) < 10) {
              return (
                <div key={item.id} className="episode-item">
                  <div className="episode-item-name">{item.name}</div>
                  <div className="episode-item-queque">{item.num}</div>
                </div>
              );
            }
          })}
        </div>
      );
    };

    return (
      <>
        <div key={idChar} className="single-char-info">
          <div className="single-char-block">
            <img className="single-char-img" src={img} alt={name} />
            <div className="single-char-name name">{name}</div>
          </div>

          <div
            className={`single-char-status ${
              status === "Dead"
                ? "dead"
                : status === "Alive"
                ? "alive"
                : "unknown"
            }`}
          >
            Статус персонажа:{status}
          </div>

          <div
            className={`single-char-gender ${
              gender === "Male"
                ? "male"
                : gender === "Female"
                ? "female"
                : "diffrent"
            }`}
          >
            Гендер персонажа:{gender}
          </div>
          <div className="single-char-class">Вид персонажа: {species}</div>
          <div className="single-char-location">Место обитания: {location}</div>
          {episodes === null ? null : <EpisodesList />}
          <button
            onClick={() => {
              showEpisodes(idChar);
            }}
            className="button leftside-button"
          >
            SHOW EPISODES
          </button>
        </div>
      </>
    );
  };

  return (
    <div className="left-side">
      <div className="left-side-wrap">
        {idChar === null ? (
          <Skeleton />
        ) : (
          <OneCharInfo idChar={idChar} chars={chars} />
        )}
      </div>
    </div>
  );
};

export default LeftSide;

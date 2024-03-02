import "./LeftSide.scss";
import Skeleton from "../skeleton/Skeleton";
import { useState } from "react";

import useRickAndMortyService from "../../service/RickAddMortyService";

const LeftSide = ({ singleChar }) => {
  const OneCharInfo = () => {
    const { id, name, img, status, gender, species, location } = singleChar[0];

    const { getEpisodes } = useRickAndMortyService();

    const [episodes, setEpisodes] = useState(null);

    const setttt = (data) => {
      setEpisodes(data);
    };

    const showEpisodes = (id) => {
      getEpisodes(id).then(setttt);
    };

    const EpisodesList = () => {
      return (
        <div className="episodes-list">
          {episodes.map((item) => (
            <div key={item.id} className="episode-item">
              <div className="episode-item-name">{item.name}</div>
              <div className="episode-item-queque">{item.num}</div>
            </div>
          ))}
        </div>
      );
    };

    return (
      <>
        <div key={id} className="single-char-info">
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
              showEpisodes(id);
            }}
            className="single-char-button-episodes"
          >
            SHOW EPISODES
          </button>
        </div>
      </>
    );
  };

  return (
    <div className="left-side">
      {singleChar === null ? <Skeleton /> : <OneCharInfo />}
    </div>
  );
};

export default LeftSide;

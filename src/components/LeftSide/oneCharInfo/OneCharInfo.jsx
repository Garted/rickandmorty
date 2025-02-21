import { useSelector } from "react-redux";
import EpisodesList from "./episodeList/EpisodeList";
import { useState } from "react";

const OneCharInfo = () => {
    const heroes = useSelector((state) => state.heroes);
    const { id, data } = heroes;
    const { name, img, status, gender, species, location } = data[id - 1];

    const [showEpisodes, setShowEpisodes] = useState(false);

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
                    Character status:{status}
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
                    Character gender:{gender}
                </div>
                <div
                    className={`single-char-class ${
                        species === "Human"
                            ? "human"
                            : species === "Alien"
                            ? "alien"
                            : "other"
                    }`}
                >
                    Character type: {species}
                </div>
                <div
                    className={`single-char-location ${
                        location === "Citadel of Ricks" ? "citadel" : "other"
                    }`}
                >
                    Character's habitat: {location}
                </div>

                {showEpisodes ? <EpisodesList /> : null}

                <button
                    onClick={() => {
                        setShowEpisodes(!showEpisodes);
                    }}
                    className="button leftside-button"
                >
                    SHOW EPISODES
                </button>
            </div>
        </>
    );
};

export default OneCharInfo;

import { useSelector } from 'react-redux';

const EpisodesList = () => {
  const episodes = useSelector((state) => state.heroes.episodes);
  const id = useSelector((state) => state.heroes.id);

  const newEpisodes = episodes.filter((item) =>
    item.characters.includes(`https://rickandmortyapi.com/api/character/${id}`)
  );
  console.log('EpisodeList render');
  return (
    <div className="episode-list">
      <div className="episode-list-title">Эпизоды с персонажем:</div>
      {newEpisodes.map((item) => {
        if (newEpisodes.indexOf(item) < 10) {
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

export default EpisodesList;

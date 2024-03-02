import { useHttp } from "../hooks/http.hook.js";

const useRickAndMortyService = () => {
  const { request } = useHttp();

  const _apiBase = "https://rickandmortyapi.com/api/"; //переменные адреса

  const getCharacter = async (id) => {
    const res = await request(`${_apiBase}character/${id}`);
    return _transformCharacter(res);
  };

  const getSomeCharacters = async (arr) => {
    const respon = await request(`${_apiBase}character/${arr}`);
    return respon.map(_transformCharacter);
  };

  const getEpisodes = async (id) => {
    const response = await request(`${_apiBase}episode`);
    const episodes = await response.results;
    const filteredEpisodes = await episodes.filter((episode) =>
      episode.characters.includes(
        `https://rickandmortyapi.com/api/character/${id}`
      )
    );
    const transformedEpisodes = await filteredEpisodes.map(_transformEpisode);
    return transformedEpisodes;
  };

  const _transformEpisode = (res) => {
    return {
      id: res.id,
      name: res.name,
      date: res.air_date,
      num: res.episode,
    };
  };

  const _transformCharacter = (res) => {
    return {
      id: res.id,
      name: res.name,
      img: res.image,
      status: res.status,
      episode: res.episode.length,
      species: res.species,
      gender: res.gender,
      location: res.location.name,
    };
  };
  return {
    getCharacter,
    getSomeCharacters,
    getEpisodes,
  };
};

export default useRickAndMortyService;

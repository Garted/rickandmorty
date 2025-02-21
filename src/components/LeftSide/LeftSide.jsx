import { useSelector, useDispatch } from 'react-redux';
import './LeftSide.scss';
import Skeleton from '../skeleton/Skeleton';

import OneCharInfo from './oneCharInfo/OneCharInfo';
import { useEffect } from 'react';
import { fetchEpisodes } from '../../APISlice/heroesSlice';

const LeftSide = () => {
  console.log('Right side');
  const dispatch = useDispatch();
  const heroes = useSelector((state) => state.heroes.id);
  useEffect(() => {
    dispatch(fetchEpisodes());
  }, [dispatch]);
  return (
    <div className="left-side">
      <div className="left-side-wrap">
        {heroes === null ? <Skeleton /> : <OneCharInfo />}
      </div>
    </div>
  );
};

export default LeftSide;

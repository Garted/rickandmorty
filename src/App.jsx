import './rickandmorty.scss';
import Episodes from './pages/EpisodesPage/EpisodesPage';
import SingleCharacterPage from './pages/SingleCharacterPage/SingleCharacterPage';
import { Route, Routes } from 'react-router';
import Main from './pages/mainPage/MainPage';
import Header from './components/Header/Header';

function App() {
  return (
    <div className="rickandmorty">
      <div className="container-r">
        <Header />
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/single/:id/:name" element={<SingleCharacterPage />} />
          <Route path="episodes" element={<Episodes />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;

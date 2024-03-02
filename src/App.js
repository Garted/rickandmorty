import "./App.scss";

import Header from "./components/Header/Header";
import Main from "./pages/mainPage/MainPage";
import Episodes from "./pages/EpisodesPage/EpisodesPage";
import { Route, Routes } from "react-router";
import { BrowserRouter } from "react-router-dom";

function App() {
  return (
    <div className="wrapp">
      <div className="App">
        <BrowserRouter>
          <Header />
          <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/" element={<Main />} />

            <Route path="/episodes" element={<Episodes />} />
          </Routes>
        </BrowserRouter>
      </div>
    </div>
  );
}

export default App;

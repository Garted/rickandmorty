import "./mainPage.scss";
import RandomChar from "../../components/RandomChar/RandomChar";

import CharacterList from "../../components/CharactersList/CharacterList";
import LeftSide from "../../components/LeftSide/LeftSide";

const Main = () => {
  console.log("render main page");
  return (
    <section className="main">
      <RandomChar />

      <div className="main-flex">
        <CharacterList />
        <LeftSide />
      </div>
    </section>
  );
};

export default Main;

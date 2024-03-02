import "./mainPage.scss";
import RandomChar from "../../components/RandomChar/RandomChar";

import CharacterList from "../../components/CharactersList/CharacterList";
import LeftSide from "../../components/LeftSide/LeftSide";
import { useState } from "react";

const Main = () => {
  const [singleChar, setSingleChar] = useState(null);

  console.log(singleChar);

  console.log("render main page");
  return (
    <section className="main">
      <RandomChar />

      <div className="main-flex">
        <CharacterList setSingleChar={setSingleChar} />
        <LeftSide singleChar={singleChar} />
      </div>
    </section>
  );
};

export default Main;

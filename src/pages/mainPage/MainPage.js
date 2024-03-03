import "./mainPage.scss";
import RandomChar from "../../components/RandomChar/RandomChar";

import CharacterList from "../../components/CharactersList/CharacterList";
import LeftSide from "../../components/LeftSide/LeftSide";
import { useState } from "react";

const Main = ({ chars, setChars }) => {
  const [idChar, setIdChar] = useState(null);

  console.log(chars);

  console.log("render main page");
  return (
    <section className="main">
      <RandomChar />

      <div className="main-flex">
        <CharacterList
          chars={chars}
          setChars={setChars}
          setIdChar={setIdChar}
        />
        <LeftSide idChar={idChar} chars={chars} />
      </div>
    </section>
  );
};

export default Main;

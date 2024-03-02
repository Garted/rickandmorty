import { Link } from "react-router-dom";
import "./header.scss";

import logo from "..//../images/logo.eab63707.png";

const Header = () => {
  return (
    <header className="App-header">
      <div className="logo">
        <Link className="link" to={`/`}>
          <img className="logo-img" src={logo} alt="logo" />
        </Link>
      </div>
      <nav className="nav-header">
        <div className="nav-item">
          <Link className="link" to={`/`}>
            CHARACTERS
          </Link>
        </div>

        <div className="nav-item">
          <Link className="link" to={`episodes`}>
            {" "}
            EPISODES
          </Link>
        </div>
      </nav>
    </header>
  );
};

export default Header;

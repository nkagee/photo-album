import logo from "../../logo.svg";
import "./Header.scss";
import { Link } from "react-router-dom";

const Header = () => (
  <div className="album-header" role="navigation">
    <div className="logo">
      <Link to="/" role="link">
        <img src={logo} alt="logo" />
      </Link>
    </div>
  </div>
);

export default Header;

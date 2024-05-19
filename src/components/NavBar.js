import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <>
      <nav className="nav-bar">
        <Link to="/">
          <h2 className="nav-bar__logo">MelGen.</h2>
        </Link>
      </nav>
    </>
  );
};

export default NavBar;

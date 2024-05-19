import { Link } from "react-router-dom";

const Home = () => {
  return (
    <>
      <h3>Research Project - IT20613136</h3>
      <Link to={"/melody-generate/welcome"}>
        <button type="button">Click Me!</button>
      </Link>
    </>
  );
};

export default Home;

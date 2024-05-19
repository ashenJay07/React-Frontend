import { Link } from "react-router-dom";
import "styles/Button.css";

const Button = ({ type, path, label, style, id, onClick }) => {
  if (type === "link") {
    return (
      <Link to={path}>
        <button className="btn btn--link" style={style}>
          {label}
        </button>
      </Link>
    );
  }
  return (
    <button className="btn" id={id} style={style} onClick={onClick}>
      {label}
    </button>
  );
};

export default Button;

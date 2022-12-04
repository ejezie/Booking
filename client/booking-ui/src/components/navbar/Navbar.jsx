import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import "./navbar.css";

const Navbar = () => {
  const { user, dispatch } = useContext(AuthContext);

  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
  };

  return (
    <div className="navbar">
      <div className="navContainer">
        <Link to={"/"} style={{ color: "white", textDecoration: "none" }}>
          <span className="logo">BookNow</span>
        </Link>
        {user ? (
          <div style={{ cursor: "pointer" }} onClick={handleLogout}>
            logout {user.others.username}
          </div>
        ) : (
          <div className="navItems">
            <button className="navButton">Register</button>
            <Link to={"/login"}>
              <button className="navButton">Login</button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;

import { useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/auth-context";
import classes from "./NavBar.module.css";

const NavBar = (props) => {
  const auth = useContext(AuthContext);
  const navigate = useNavigate();

  return (
    <nav className={classes["nav-bar"]}>
      <h1 className={classes["nav-bar__logo"]} onClick={() => navigate("/")}>
        SimplePosts
      </h1>
      <div className={classes["nav-bar__elements"]}>
        {!auth.isLoggedIn && (
          <div className={classes["nav-bar__element"]}>
            <i class="fas fa-sign-in-alt"></i>
            <NavLink
              to="login"
              className={({ isActive }) =>
                isActive
                  ? `${classes["active"]} ${classes["nav-bar__link"]}`
                  : `${classes["nav-bar__link"]}`
              }
            >
              Login
            </NavLink>
          </div>
        )}
        {!auth.isLoggedIn && (
          <div className={classes["nav-bar__element"]}>
            <i class="fas fa-user-plus"></i>
            <NavLink
              to="signup"
              className={({ isActive }) =>
                isActive
                  ? `${classes["active"]} ${classes["nav-bar__link"]}`
                  : `${classes["nav-bar__link"]}`
              }
            >
              Signup
            </NavLink>
          </div>
        )}
        {auth.isLoggedIn && (
          <div className={classes["nav-bar__element"]}>
            <i class="fas fa-sign-out-alt"></i>
            <p onClick={auth.logout}>Logout</p>
          </div>
        )}
      </div>
    </nav>
  );
};

export default NavBar;

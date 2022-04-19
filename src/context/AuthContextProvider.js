import { useAuth } from "../hooks/auth-hook";
import { AuthContext } from "./auth-context";

const AuthContextProvider = (props) => {
  const { token, login, logout, userId } = useAuth();

  return (
    <AuthContext.Provider
      value={{ isLoggedIn: !!token, token, login, logout, userId }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;

import { createContext, useContext, useState, useEffect } from "react";
import PropTypes from "prop-types";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState("");

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    const storedUser = localStorage.getItem("user");

    if (storedToken) setToken(storedToken);
    if (storedUser) setUser(JSON.parse(storedUser));
  }, []);
  

  // const login = async ( email, password) => {
  //   try {
  //     const response = await fetch("http://localhost:5050/api/auth/signin", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({
  //         email: email,
  //         password: password,
  //       }),
  //     });
      

  //     const data = await response.json();

  //     if (!response.ok) throw new Error(data.message || "Login failed");

  //     setUser(data.user);
  //     localStorage.setItem("user", JSON.stringify(data.user));
  //     localStorage.setItem("token", data.token);
  //   } catch (error) {
  //     console.error("Login Error:", error);
  //     throw error;
  //   }
  // };
  const login = async (emailOrToken, password) => {
    // Google login: token is passed directly
    if (typeof emailOrToken === "string" && !password) {
      const token = emailOrToken;
      const res = await fetch(
        "https://foodwastereduction-backend.onrender.com/api/auth/google",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ token }),
        }
      );
  
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Google Login Failed");
  
      setUser(data.user);
      setToken(data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      localStorage.setItem("token", data.token);
      return;
    }
  
    // Normal email/password login
    try {
      const response = await fetch(
        "https://foodwastereduction-backend.onrender.com/api/auth/signin",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: emailOrToken,
            password,
          }),
        }
      );
  
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Login failed");
  
      setUser(data.user);
      setToken(data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      localStorage.setItem("token", data.token);
    } catch (error) {
      console.error("Login Error:", error);
      throw error;
    }
  };
  

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider
      key={user?.email || "no-user"}
      value={{ user, login, logout, token, setToken, setUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};
export const useAuth = () => useContext(AuthContext);

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AuthProvider;

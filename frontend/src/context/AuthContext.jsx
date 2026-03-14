// import React, { createContext, useState, useEffect } from "react";

// export const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//   const [token, setToken] = useState(localStorage.getItem("accessToken") || null);

//   const login = (newToken) => {
//     localStorage.setItem("accessToken", newToken);
//     setToken(newToken);
//   };

//   const logout = () => {
//     localStorage.removeItem("accessToken");
//     setToken(null);
//   };

//   return (
//     <AuthContext.Provider value={{ token, login, logout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// }; 




import React, { createContext, useState } from "react";

// Create Auth Context
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  // Token state (matches axiosInstance and API calls)
  const [token, setToken] = useState(localStorage.getItem("token") || null);

  // Login: store token in state + localStorage
  const login = (newToken) => {
    localStorage.setItem("token", newToken);
    setToken(newToken);
  };

  // Logout: remove token from state + localStorage
  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
  };

  return (
    <AuthContext.Provider value={{ token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
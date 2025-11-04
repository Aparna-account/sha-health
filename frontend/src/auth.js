// src/auth.js
import React, { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);       // Stores logged-in user
  const [userRole, setUserRole] = useState(null); // Stores role selection

  const login = (email, password) => {
    // Simple mock login (replace with real API)
    setUser({ email });
  };

  const logout = () => {
    setUser(null);
    setUserRole(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, userRole, setUserRole }}>
      {children}
    </AuthContext.Provider>
  );
}

// Custom hook to use auth context
export const useAuth = () => useContext(AuthContext);

import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

const users = [
  {
    id: 1,
    name: "Carlos Silva",
    email: "carlos@dellut.com",
    password: "123456",
    role: "user",
  },
  {
    id: 2,
    name: "Administrador",
    email: "admin@dellut.com",
    password: "admin123",
    role: "admin",
  },
];

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(() => {
    const stored = localStorage.getItem("currentUser");
    return stored ? JSON.parse(stored) : null;
  });

  function login(email, password) {
    const user = users.find(
      (u) => u.email === email && u.password === password,
    );
    if (!user) {
      return { success: false, message: "E-mail ou senha incorretos." };
    }
    const { password: _, ...safeUser } = user;
    setCurrentUser(safeUser);
    localStorage.setItem("currentUser", JSON.stringify(safeUser));
    return { success: true, role: safeUser.role };
  }

  function logout() {
    setCurrentUser(null);
    localStorage.removeItem("currentUser");
  }

  return (
    <AuthContext.Provider value={{ currentUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}

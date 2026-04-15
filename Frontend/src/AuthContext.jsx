import { createContext, useEffect, useMemo, useState } from "react";

export const AuthContext = createContext({});

const authStorageKey = "ngo-impact-token";
const userStorageKey = "ngo-impact-user";

export function AuthProvider({ children }) {
  const [token, setToken] = useState(
    localStorage.getItem(authStorageKey) || "",
  );
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem(userStorageKey) || "null"),
  );

  useEffect(() => {
    if (token) {
      localStorage.setItem(authStorageKey, token);
    } else {
      localStorage.removeItem(authStorageKey);
    }
  }, [token]);

  useEffect(() => {
    if (user) {
      localStorage.setItem(userStorageKey, JSON.stringify(user));
    } else {
      localStorage.removeItem(userStorageKey);
    }
  }, [user]);

  const value = useMemo(
    () => ({
      token,
      user,
      setToken,
      setUser,
      logout: () => {
        setToken("");
        setUser(null);
      },
    }),
    [token, user],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

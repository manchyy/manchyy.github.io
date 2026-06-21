import { createContext, useContext, useState, useEffect } from "react";

const API_BASE = "https://api.nmant.dev";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(() => localStorage.getItem("admin_token"));
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  // Validate token on mount (in case it expired)
  useEffect(() => {
    if (!token) {
      setLoading(false);
      return;
    }
    // Decode JWT expiry client-side (no secret needed, just checking exp)
    try {
      const payload = JSON.parse(atob(token.split(".")[1]));
      if (payload.exp * 1000 < Date.now()) {
        logout();
      } else {
        setIsAdmin(true);
      }
    } catch {
      logout();
    }
    setLoading(false);
  }, []);

  const login = async (key) => {
    const res = await fetch(`${API_BASE}/api/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ key }),
    });

    if (!res.ok) {
      throw new Error("Invalid password");
    }

    const { token: newToken } = await res.json();
    localStorage.setItem("admin_token", newToken);
    setToken(newToken);
    setIsAdmin(true);
  };

  const logout = () => {
    localStorage.removeItem("admin_token");
    setToken(null);
    setIsAdmin(false);
  };

  return (
    <AuthContext.Provider value={{ isAdmin, token, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};

export { API_BASE };

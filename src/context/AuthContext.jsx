import { createContext, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [cart, setCart] = useState([]);

  const login = (username, password) => {
    if (username === "admin" && password === "admin")
      setUser({ username, role: "admin" });
    else setUser({ username, role: "member" });
  };

  const logout = () => setUser(null);

  const addToCart = (product, qty) => {
    if (qty <= 0) return;
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing)
        return prev.map((item) =>
          item.id === product.id ? { ...item, qty: item.qty + qty } : item,
        );
      return [...prev, { ...product, qty }];
    });
  };

  const clearCart = () => setCart([]);

  return (
    <AuthContext.Provider
      value={{ user, login, logout, cart, addToCart, clearCart }}
    >
      {children}
    </AuthContext.Provider>
  );
};

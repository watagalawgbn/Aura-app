// context/AuthContext.tsx
import React, { createContext, useContext, useState, ReactNode, useEffect } from "react";
import * as SecureStore from "expo-secure-store";
import { jwtDecode } from "jwt-decode";

type User = {
  id: string;
  name: string;
  email: string;
};

type JwtPayload = {
  id: string;
  name: string;
  email: string;
  exp: number;
};

type AuthContextType = {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  login: (token: string) => Promise<void>;
  logout: () => void;
  loading: boolean;
};

export const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const login = async (token: string) => {
    try {
      const decoded: JwtPayload = jwtDecode(token);

      // Check expiration
      if (decoded.exp * 1000 < Date.now()) {
        console.error("Token expired");
        await logout();
        return;
      }

      // Save token securely
      await SecureStore.setItemAsync("authToken", token);
      await SecureStore.setItemAsync("userId", decoded.id);

      // Update user state
      setUser({ id: decoded.id, name: decoded.name, email: decoded.email });
    } catch (error) {
      console.error("Login error", error);
    }
  };

  const logout = async () => {
    await SecureStore.deleteItemAsync("authToken");
    await SecureStore.deleteItemAsync("userId");
    setUser(null);
    console.log("User signed out!");
  };

  const restoreUser = async () => {
    const token = await SecureStore.getItemAsync("authToken");
    if (token) {
      try {
        const decoded: JwtPayload = jwtDecode(token);

        if (decoded.exp * 1000 > Date.now()) {
          await login(token); // restores user session
        } else {
          await logout(); // cleanup expired token
        }
      } catch (err) {
        console.error("Failed to decode token", err);
        await logout();
      }
    }
    setLoading(false);
  };

  // Run restoreUser on app start
  useEffect(() => {
    restoreUser();
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

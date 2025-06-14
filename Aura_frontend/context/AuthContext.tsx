// context/AuthContext.tsx

import React, { createContext, useContext, useState, ReactNode, useEffect } from "react";
import axios from "axios";
import * as SecureStore from "expo-secure-store";
import { BASE_URL } from "@/constants/Api";
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
};

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  
  const login = async (token: string) => {
    try {
      await SecureStore.setItemAsync("authToken", token); // Save token securely
  
      // Decode token locally
      const decoded: JwtPayload = jwtDecode(token);
      setUser({ id: decoded.id, name: decoded.name, email: decoded.email });
  
      // Persist userId for API calls
      await SecureStore.setItemAsync("userId", decoded.id);
    } catch (error) {
      console.error("Login error", error);
    }
  };

  const logout = async () => {
    await SecureStore.deleteItemAsync("authToken"); // Clear token
    setUser(null);
    console.log('User signed out!');
  };

  useEffect(() => {
    const restoreUser = async () => {
      const token = await SecureStore.getItemAsync("authToken");
      if (token) await login(token); // Restore user session
    };
    restoreUser();
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser, login, logout }}>
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

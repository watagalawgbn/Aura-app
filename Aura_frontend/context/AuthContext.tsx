// context/AuthContext.tsx

import React, { createContext, useContext, useState, ReactNode, useEffect } from "react";
import axios from "axios";
import * as SecureStore from "expo-secure-store";
// import { useRouter } from "expo-router"; 

type User = {
  name: string;
  email: string;
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
  // const router = useRouter();
  
  const login = async (token: string) => {
    try {
      await SecureStore.setItemAsync("authToken", token); // Save token securely
      const res = await axios.get("http://192.168.94.44:3000/api/auth/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      

      setUser(res.data); // Set the authenticated user
    } catch (error) {
      console.error("Failed to fetch user data", error);
    }
  };

  const logout = async () => {
    await SecureStore.deleteItemAsync("authToken"); // Clear token
    setUser(null);
    console.log('User signed out!');
  };

  useEffect(() => {
    console.log("Restoring user...");
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

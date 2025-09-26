// context/AuthContext.tsx
import React, { createContext, useContext, useState, ReactNode, useEffect } from "react";
import * as SecureStore from "expo-secure-store";
import { jwtDecode } from "jwt-decode";
import { JwtPayload, User } from "../types/auth";

//Define what auth context provides
type AuthContextType = {
  user: User | null; //current logged-in user
  setUser: React.Dispatch<React.SetStateAction<User | null>>; // function to update user
  login: (token: string) => Promise<void>;
  logout: () => void;
  loading: boolean;
};

// Create the AuthContext
export const AuthContext = createContext<AuthContextType | null>(null);

// AuthProvider wraps the app and provides user/login/logout to children
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
      throw new Error("Failed to log in!");
    }
  };

  const logout = async () => {
    await SecureStore.deleteItemAsync("authToken");
    await SecureStore.deleteItemAsync("userId");
    setUser(null);// clear user state
    console.log("User signed out!");
  };

  const restoreUser = async () => {
    const token = await SecureStore.getItemAsync("authToken");
    if (token) {
      try {
        const decoded: JwtPayload = jwtDecode(token);

        if (decoded.exp * 1000 > Date.now()) {
          await login(token); // if the token valid, restores user session
        } else {
          await logout(); // else cleanup expired token
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

   // Provide auth info/functions to app
  return (
    <AuthContext.Provider value={{ user, setUser, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

//useAuth lets screens access user/login/logout easily.
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

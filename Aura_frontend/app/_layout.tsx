// app/_layout.tsx
import { Slot } from "expo-router";
import { AuthProvider } from "../context/AuthContext";
import React, { useEffect } from "react";
import * as Linking from 'expo-linking';

export default function RootLayout() {
  useEffect(() => {
    // Handle deep links when app is already running
    const subscription = Linking.addEventListener('url', ({ url }) => {
      console.log('Deep link received:', url);
      // Expo Router will automatically handle the navigation
    });

    return () => subscription?.remove();
  }, []);

  return (
    <AuthProvider>
      <Slot />
    </AuthProvider>
  );
}
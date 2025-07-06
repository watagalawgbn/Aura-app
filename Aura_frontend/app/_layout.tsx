import { Slot } from "expo-router";
import { AuthProvider } from "../context/AuthContext";
import { SleepProvider } from "../context/SleepContext";
import React, { useEffect } from "react";
import * as Linking from 'expo-linking';

export default function RootLayout() {
  useEffect(() => {
    const subscription = Linking.addEventListener('url', ({ url }) => {
      console.log('Deep link received:', url);
    });

    return () => subscription?.remove();
  }, []);

  return (
    <AuthProvider>
      <SleepProvider>
        <Slot />  {/* ✅ Make sure there's no stray string here */}
      </SleepProvider>
    </AuthProvider>
  );
}

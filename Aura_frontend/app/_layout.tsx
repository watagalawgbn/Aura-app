// app/_layout.tsx
import { Slot } from "expo-router";
import { AuthProvider } from "../context/AuthContext";
import React, { useEffect } from "react";
import * as Linking from 'expo-linking';
import Toast from 'react-native-toast-message';
import ToastConfig from "@/app/components/ToastConfig";

export default function RootLayout() {
  useEffect(() => {
    const subscription = Linking.addEventListener('url', ({ url }) => {
      console.log('Deep link received:', url);
    });

    return () => subscription?.remove();
  }, []);

  return (
    <AuthProvider>
        <Slot />  
        <Toast config={ToastConfig} />
    </AuthProvider>
  );
}

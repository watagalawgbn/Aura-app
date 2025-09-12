// app/_layout.tsx
import { Slot } from "expo-router";
import { AuthProvider } from "../context/AuthContext";
import React from "react";
import Toast from 'react-native-toast-message';
import ToastConfig from "@/app/components/ToastConfig";

export default function RootLayout() {

  return (
    <AuthProvider>
        <Slot />  
        <Toast config={ToastConfig} />
    </AuthProvider>
  );
}

// app/_layout.tsx
import { Slot } from "expo-router";
import { AuthProvider } from "../context/AuthContext";
import React from "react";

export default function RootLayout() {
  return (
    <AuthProvider>
      <Slot />
    </AuthProvider>
  );
}

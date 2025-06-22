// app/index.tsx
import { useEffect } from "react";
import { router } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Index = () => {
  useEffect(() => {
    const checkAuth = async () => {
      const token = await AsyncStorage.getItem("token");

      if (token) {
        router.replace("/(tabs)/home");
      } else {
        router.replace("/(auth)/SignIn");
      }
    };

    checkAuth();
  }, []);

  return null;
};

export default Index;

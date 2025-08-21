// app/index.tsx
import React, { useEffect } from "react";
import { router } from "expo-router";
import { useAuth } from "@/context/AuthContext";
import { View, ActivityIndicator } from "react-native";

const Index = () => {
  const { user, loading } = useAuth();

  useEffect(() => {
    if (!loading) {
      if (user) {
        router.replace("/(tabs)/SleepScreen/SleepTimerScreen");
      } else {
        router.replace("/(auth)/SignIn/SignIn");
      }
    }
  }, [user, loading]);

  //While loading, show splash
  if(loading){
    return(
      <View style={{flex: 1, justifyContent: "center", alignItems:"center"}}>
        <ActivityIndicator size="large"/>
      </View>
    );
  }

  return null;
};

export default Index;

import { useEffect } from "react";
import { router } from "expo-router";

const Index = () => {
  useEffect(() => {
    const timeout = setTimeout(() => {
      router.push("/screens/home");
    }, 0); 

    return () => clearTimeout(timeout); 
  }, []);

  return null;
};

export default Index;
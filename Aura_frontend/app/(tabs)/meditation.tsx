import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  StatusBar,
} from "react-native";
import { router } from "expo-router";
import BackButton from "../components/BackButton";
import { BASE_URL } from "@/constants/Api";

type Audio = {
  _id: string;
  title: string;
  filename: string;
};

const MeditationScreen = () => {
  const [audios, setAudios] = useState<Audio[]>([]);

  useEffect(() => {
    const fetchMeditations = async () => {
      try {
        const response = await fetch(`${BASE_URL}/api/meditations`);
        console.log(
          "Fetching meditations from:",
          `${BASE_URL}/api/meditations`
        );
        const data = await response.json();
        console.log("Fetched meditations:", data);
        setAudios(data);
      } catch (err) {
        console.error("Failed to fetch meditations", err);
      }
    };

    fetchMeditations();
  }, []);

  const images = [
    require("../../assets/images/audio 1.jpg"),
    require("../../assets/images/audio 2.jpg"),
    require("../../assets/images/audio 3.jpg"),
    require("../../assets/images/audio 4.jpg"),
    require("../../assets/images/audio 5.jpg"),
    require("../../assets/images/audio 6.jpg"),
    require("../../assets/images/audio 7.jpg"),
    require("../../assets/images/audio 8.jpg"),
    require("../../assets/images/audio 9.jpg"),
    require("../../assets/images/audio 10.jpg"),
    require("../../assets/images/audio 11.jpg"),
    require("../../assets/images/audio 12.jpg"),
    require("../../assets/images/audio 13.jpg"),
    require("../../assets/images/audio 14.jpg"),
    require("../../assets/images/audio 15.jpg"),
    require("../../assets/images/audio 16.jpg"),
    require("../../assets/images/audio 17.jpg"),
    require("../../assets/images/audio 18.jpg"),
    require("../../assets/images/audio 19.jpg"),
    require("../../assets/images/audio 20.jpg"),
  ];

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
      <BackButton title={"Beat Stress"} />
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.meditationContainer}>
          {audios.map((audio, index) => {
            const image =
              images[index % images.length] ||
              require("../../assets/images/default.jpg");
            if (index % 2 === 0) {
              return (
                <View key={index} style={styles.meditationRow}>
                  <TouchableOpacity
                    onPress={() =>
                      router.push({
                        pathname: "/(tabs)/PlayMeditation",
                        params: {
                          id: audio._id,
                          title: audio.title,
                          filename: audio.filename,
                        },
                      })
                    }
                    style={styles.audioCard}
                  >
                    <Image source={image} style={styles.imgs} />
                    <Text style={styles.imgTitle}>{audio.title}</Text>
                  </TouchableOpacity>

                  {audios[index + 1] && (
                    <TouchableOpacity
                      onPress={() =>
                        router.push({
                          pathname: "/(tabs)/PlayMeditation",
                          params: {
                            id: audios[index + 1]._id,
                            title: audios[index + 1].title,
                            filename: audios[index + 1].filename,
                          },
                        })
                      }
                      style={styles.audioCard}
                    >
                      <Image
                        source={
                          images[(index + 1) % images.length] ||
                          require("../../assets/images/default.jpg")
                        }
                        style={styles.imgs}
                      />
                      <Text style={styles.imgTitle}>
                        {audios[index + 1].title}
                      </Text>
                    </TouchableOpacity>
                  )}
                </View>
              );
            }
            return null;
          })}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#ffffff" },
  scrollContent: { flexGrow: 1, paddingBottom: 30 },
  meditationContainer: { marginTop: 20, paddingHorizontal: 10 },
  meditationRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 30,
  },
  audioCard: {
    alignItems: "center",
    flex: 1,
    marginHorizontal: 5,
  },
  imgs: {
    width: 160,
    height: 160,
    borderRadius: 15,
    backgroundColor: "#fff",
    elevation: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.5,
    shadowRadius: 15,
  },
  imgTitle: {
    fontSize: 16,
    marginTop: 10,
    fontWeight: "bold",
    color: "#333",
    textAlign: "center",
  },
});

export default MeditationScreen;

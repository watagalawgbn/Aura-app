import React from "react";
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
import { Feather } from "@expo/vector-icons";
import { router } from "expo-router";
import BackButton from "../components/BackButton";

const MeditationScreen = () => {
  const audios = [
    { id: 1, title: "Deep Calm", image: require("../../assets/images/audio 1.jpg") },
    { id: 2, title: "Relaxation", image: require("../../assets/images/audio 2.jpg") },
    { id: 3, title: "Focus Boost", image: require("../../assets/images/audio 3.jpg") },
    { id: 4, title: "Mindfulness", image: require("../../assets/images/audio 4.jpg") },
    { id: 5, title: "Dreamscape", image: require("../../assets/images/audio 5.jpg") },
    { id: 6, title: "Stress Relief", image: require("../../assets/images/audio 6.jpg") },
    { id: 7, title: "Inner Peace", image: require("../../assets/images/audio 7.jpg") },
    { id: 8, title: "Positive Energy", image: require("../../assets/images/audio 8.jpg") },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />

      <BackButton title={"Beat Stress"}/>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.meditationContainer}>
          {audios.map((audio, index) => {
            if (index % 2 === 0) {
              return (
                <View key={index} style={styles.meditationRow}>
                  <TouchableOpacity
                    onPress={() =>
                      router.push({
                        pathname: "/(tabs)/playMeditation",
                        params: { id: audio.id, title: audio.title },
                      })
                    }
                    style={styles.audioCard}
                  >
                    <Image source={audio.image} style={styles.imgs} />
                    <Text style={styles.imgTitle}>{audio.title}</Text>
                  </TouchableOpacity>

                  {audios[index + 1] && (
                    <TouchableOpacity
                      onPress={() =>
                        router.push({
                          pathname: "/(tabs)/playMeditation",
                          params: {
                            id: audios[index + 1].id,
                            title: audios[index + 1].title,
                          },
                        })
                      }
                      style={styles.audioCard}
                    >
                      <Image source={audios[index + 1].image} style={styles.imgs} />
                      <Text style={styles.imgTitle}>{audios[index + 1].title}</Text>
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
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 15,
    paddingVertical: 15,
  },
  circle: {
    width: 40,
    height: 40,
    borderRadius: 50,
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "#52AE77",
    justifyContent: "center",
    alignItems: "center",
  },
  backButton: {
    flexDirection: "row",
    alignItems: "center",
  },
  backText: {
    marginLeft: 5,
    fontSize: 16,
  },
  titleWrapper: {
    marginTop: 65,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: "bold",
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 30,
  },
  meditationContainer: {
    marginTop: 20,
    paddingHorizontal: 10,
  },
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

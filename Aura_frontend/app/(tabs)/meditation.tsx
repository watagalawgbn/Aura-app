//(tabs)/meditation.tsx
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
  ActivityIndicator,
} from "react-native";
import { router } from "expo-router";
import BackButton from "../components/BackButton";
import { BASE_URL } from "@/constants/Api";

type Audio = {
  _id: string;
  title: string;
  filename: string;
  image?: string | { _id: string } | null;
};

const MeditationScreen = () => {
  const [audios, setAudios] = useState<Audio[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMeditations = async () => {
      try {
        const response = await fetch(`${BASE_URL}/api/meditations`);
        if (!response.ok) {
          throw new Error("Failed to fetch meditations");
        }

        const data = await response.json();
        console.log("Raw fetched meditations count:", data.length);

        // Set fetched meditations directly
        setAudios(data);
      } catch (err) {
        console.error("Failed to fetch meditations:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchMeditations();
  }, []);

  const getImageUrl = (imageId?: string | null, meditationTitle?: string) => {
    if (!imageId) return null;
    const url = `${BASE_URL}/api/images/${imageId}`;
    return url;
  };

  const getImageId = (image: string | { _id: string } | null | undefined) => {
    if (!image) return "";
    if (typeof image === "string") return image;
    return image._id;
  };

  // Function to render a single audio card
  const renderAudioCard = (audio: Audio) => {
    const imageUrl = getImageUrl(getImageId(audio.image), audio.title);

    return (
      <TouchableOpacity
        key={audio._id}
        onPress={() =>
          router.push({
            pathname: "/(tabs)/PlayMeditation",
            params: {
              id: audio._id,
              title: audio.title,
              filename: audio.filename,
              imageId: getImageId(audio.image),
            },
          })
        }
        style={styles.audioCard}
      >
        {imageUrl ? (
          <Image
            source={{ uri: imageUrl }}
            style={styles.imgs}
            onError={(error) => {
              console.error(
                `Image load error for "${audio.title}":`,
                error.nativeEvent.error
              );
            }}
            onLoad={() => {
              console.log(`Image loaded for "${audio.title}": ${imageUrl}`);
            }}
          />
        ) : (
          <View
            style={[
              styles.imgs,
              {
                backgroundColor: "#eee",
                justifyContent: "center",
                alignItems: "center",
              },
            ]}
          >
            <Text style={{ color: "#999" }}>No Image</Text>
          </View>
        )}
        <Text style={styles.imgTitle}>{audio.title}</Text>
      </TouchableOpacity>
    );
  };

  // Function to create rows of 2 items each
  const createRows = () => {
    const rows = [];
    for (let i = 0; i < audios.length; i += 2) {
      const leftItem = audios[i];
      const rightItem = audios[i + 1];

      rows.push(
        <View key={`row-${i}`} style={styles.meditationRow}>
          {renderAudioCard(leftItem)}
          {rightItem ? (
            renderAudioCard(rightItem)
          ) : (
            <View style={styles.audioCard} />
          )}
        </View>
      );
    }
    return rows;
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
        <BackButton title={"Beat Stress"} />
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#52AE77" />
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
      <BackButton title={"Beat Stress"} />
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.meditationContainer}>{createRows()}</View>
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
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  debugText: {
    textAlign: "center",
    color: "#666",
    marginBottom: 15,
    fontSize: 12,
    fontStyle: "italic",
  },
});

export default MeditationScreen;

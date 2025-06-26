import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
  ScrollView,
  SafeAreaView,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Audio, AVPlaybackStatus } from "expo-av";
import { BASE_URL } from "@/constants/Api";

const PlayMeditationScreen = () => {
  const router = useRouter();
  const { title = "Deep Calm", filename, imageId } = useLocalSearchParams();

  const titleString = Array.isArray(title) ? title[0] : title;
  const imageIdString = Array.isArray(imageId) ? imageId[0] : imageId;

  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState("0:00");
  const [totalTime, setTotalTime] = useState("10:00");
  const [totalDuration, setTotalDuration] = useState(600000);
  const [isLoaded, setIsLoaded] = useState(false);
  const [imageUrl, setImageUrl] = useState(""); 

  const soundRef = useRef<Audio.Sound | null>(null);

  // Set the image URL directly
  useEffect(() => {
    if (imageIdString && imageIdString.trim() !== "") {
      const url = `${BASE_URL}/api/images/${imageIdString}`;
      console.log("Setting image URL:", url);
      setImageUrl(url);
    } else {
      console.log("No image ID provided");
      setImageUrl("");
    }
  }, [imageIdString]);

  const onPlaybackStatusUpdate = (status: AVPlaybackStatus) => {
    if (!status.isLoaded) return;

    if (
      typeof status.durationMillis === "number" &&
      status.durationMillis > 0
    ) {
      setProgress(status.positionMillis / status.durationMillis);
    } else {
      setProgress(0);
    }
    const minutes = Math.floor(status.positionMillis / 60000);
    const seconds = Math.floor((status.positionMillis % 60000) / 1000);
    setCurrentTime(`${minutes}:${seconds.toString().padStart(2, "0")}`);
    setIsPlaying(status.isPlaying);

    if (status.didJustFinish) {
      setIsPlaying(false);
      setProgress(0);
      setCurrentTime("0:00");
    }
  };

  useEffect(() => {
    const loadAudio = async () => {
      try {
        await Audio.setAudioModeAsync({
          allowsRecordingIOS: false,
          staysActiveInBackground: true,
          playsInSilentModeIOS: true,
          shouldDuckAndroid: true,
          playThroughEarpieceAndroid: false,
        });

        const { sound, status } = await Audio.Sound.createAsync(
          { uri: `${BASE_URL}/api/audio/${filename}` },
          { shouldPlay: false },
          onPlaybackStatusUpdate
        );

        soundRef.current = sound;
        setIsLoaded(true);

        if (status.isLoaded && status.durationMillis) {
          setTotalDuration(status.durationMillis);
          const minutes = Math.floor(status.durationMillis / 60000);
          const seconds = Math.floor((status.durationMillis % 60000) / 1000);
          setTotalTime(`${minutes}:${seconds.toString().padStart(2, "0")}`);
        }
      } catch (error) {
        console.error("Failed to load audio", error);
      }
    };

    if (filename) loadAudio();

    return () => {
      if (soundRef.current) {
        soundRef.current.unloadAsync();
      }
    };
  }, [filename]);

  const handleBack = () => router.back();
  const togglePlayPause = async () => {
    if (!isLoaded || !soundRef.current) return;
    isPlaying
      ? await soundRef.current.pauseAsync()
      : await soundRef.current.playAsync();
  };

  const handleSeek = async (offset: number) => {
    if (!isLoaded || !soundRef.current) return;
    const status = await soundRef.current.getStatusAsync();
    if (!status.isLoaded) return;
    const newPos = Math.max(
      0,
      Math.min(
        status.durationMillis ?? totalDuration,
        status.positionMillis + offset
      )
    );
    await soundRef.current.setPositionAsync(newPos);
  };

  // Fallback content when no image is available
  const renderContent = () => {
    if (imageUrl) {
      return (
        <ImageBackground
          source={{ uri: imageUrl }}
          style={styles.background}
          resizeMode="cover"
          onError={(error) => {
            console.error("Background image load error:", error.nativeEvent.error);
            setImageUrl(""); 
          }}
          onLoad={() => {
            console.log("Background image loaded successfully");
          }}
        >
          {renderPlayerContent()}
        </ImageBackground>
      );
    } else {
      // Fallback to a gradient or solid color background
      return (
        <View style={[styles.background, styles.fallbackBackground]}>
          {renderPlayerContent()}
        </View>
      );
    }
  };

  const renderPlayerContent = () => (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={handleBack}>
            <View style={styles.circle}>
              <Feather name="arrow-left" size={20} color="black" />
            </View>
          </TouchableOpacity>
        </View>

        <View style={styles.content}>
          <View style={styles.meditationInfo}>
            <Text style={styles.meditationTitle}>{titleString}</Text>
            <Text style={styles.meditationSubtitle}>
              Find your inner peace
            </Text>
          </View>

          <View style={styles.playerContainer}>
            <View style={styles.progressContainer}>
              <View style={styles.progressBar}>
                <View
                  style={[styles.progressFill, { width: `${progress * 100}%` }]}
                />
              </View>
              <View style={styles.timeLabels}>
                <Text style={styles.timeText}>{currentTime}</Text>
                <Text style={styles.timeText}>{totalTime}</Text>
              </View>
            </View>

            <View style={styles.controls}>
              <TouchableOpacity
                style={styles.controlButton}
                onPress={() => handleSeek(-30000)}
              >
                <Feather name="rewind" size={24} color="#fff" />
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.playButton, !isLoaded && styles.playButtonDisabled]}
                onPress={togglePlayPause}
                disabled={!isLoaded}
              >
                <Feather name={isPlaying ? "pause" : "play"} size={36} color="#fff" />
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.controlButton}
                onPress={() => handleSeek(30000)}
              >
                <Feather name="fast-forward" size={24} color="#fff" />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );

  return renderContent();
};

const styles = StyleSheet.create({
  background: { flex: 1 },
  fallbackBackground: {
    backgroundColor: "#1a1a2e", 
  },
  safeArea: { flex: 1 },
  container: {
    flexGrow: 1,
    backgroundColor: "rgba(0, 0, 0, 0.4)",
    paddingBottom: 30,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 15,
    paddingTop: 20,
  },
  backButton: { flexDirection: "row", alignItems: "center" },
  circle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "#52AE77",
    justifyContent: "center",
    alignItems: "center",
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 40,
    paddingHorizontal: 20,
    marginTop: 300,
  },
  meditationInfo: { alignItems: "center", marginBottom: 40 },
  meditationTitle: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#fff",
    textAlign: "center",
    marginBottom: 10,
  },
  meditationSubtitle: {
    fontSize: 18,
    color: "#ccc",
    textAlign: "center",
  },
  playerContainer: { width: "100%", padding: 20 },
  progressContainer: { marginBottom: 30 },
  progressBar: {
    height: 8,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    borderRadius: 4,
    overflow: "hidden",
  },
  progressFill: {
    height: "100%",
    backgroundColor: "#52AE77",
  },
  timeLabels: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 8,
  },
  timeText: {
    color: "#ccc",
    fontSize: 14,
  },
  controls: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  controlButton: {
    padding: 15,
  },
  playButton: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "#52AE77",
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 20,
  },
  playButtonDisabled: {
    backgroundColor: "#52AE7799",
  },
});

export default PlayMeditationScreen;
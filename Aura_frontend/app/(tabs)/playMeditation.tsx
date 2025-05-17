import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
  ScrollView,
  SafeAreaView,
  ImageSourcePropType,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Audio, AVPlaybackStatus } from "expo-av";

const PlayMeditationScreen = () => {
  const { id, title = "Deep Calm" } = useLocalSearchParams();
  const router = useRouter();
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState("0:00");
  const [totalTime, setTotalTime] = useState("10:00");

  // Create a ref for the sound object with proper typing
  const soundRef = useRef<Audio.Sound | null>(null);
  // Track if sound is loaded
  const [isLoaded, setIsLoaded] = useState(false);
  // Track total duration in milliseconds
  const [totalDuration, setTotalDuration] = useState(600000); // Default 10 min

  const getAudioById = (id: string | string[] | number): any => {
    const numericId =
      typeof id === "string"
        ? parseInt(id, 10)
        : Array.isArray(id)
        ? parseInt(id[0], 10)
        : id;

    const audioFiles: Record<number, any> = {
      1: require("../../assets/audios/audio 1.mp3"),
      2: require("../../assets/audios/audio 2.mp3"),
      3: require("../../assets/audios/audio 3.mp3"),
      4: require("../../assets/audios/audio 4.mp3"),
      5: require("../../assets/audios/audio 5.mp3"),
      6: require("../../assets/audios/audio 6.mp3"),
      7: require("../../assets/audios/audio 7.mp3"),
      8: require("../../assets/audios/audio 8.mp3"),
    };
    return audioFiles[numericId];
  };

  const getImageById = (
    id: string | string[] | number
  ): ImageSourcePropType => {
    const numericId =
      typeof id === "string"
        ? parseInt(id, 10)
        : Array.isArray(id)
        ? parseInt(id[0], 10)
        : id;

    // Map of audio images - should match audio array from MeditationScreen
    const images: Record<number, ImageSourcePropType> = {
      1: require("../../assets/images/audio 1.jpg"),
      2: require("../../assets/images/audio 2.jpg"),
      3: require("../../assets/images/audio 3.jpg"),
      4: require("../../assets/images/audio 4.jpg"),
      5: require("../../assets/images/audio 5.jpg"),
      6: require("../../assets/images/audio 6.jpg"),
      7: require("../../assets/images/audio 7.jpg"),
      8: require("../../assets/images/audio 8.jpg"),
    };
    return images[numericId];
  };

  const image = id ? getImageById(id) : null;
  const audio = id ? getAudioById(id) : null;

  // Load and initialize audio
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
          audio,
          { shouldPlay: false },
          onPlaybackStatusUpdate
        );

        soundRef.current = sound;
        setIsLoaded(true);

        // Set total duration if available if it's a loaded status
        if (status.isLoaded && status.durationMillis !== undefined) {
          setTotalDuration(status.durationMillis);
          const minutes = Math.floor(status.durationMillis / 60000);
          const seconds = Math.floor((status.durationMillis % 60000) / 1000);
          setTotalTime(`${minutes}:${seconds.toString().padStart(2, "0")}`);
        }
      } catch (error) {
        console.error("Failed to load audio", error);
      }
    };

    if (audio) {
      loadAudio();
    }

    // Cleanup function
    return () => {
      if (soundRef.current) {
        soundRef.current.unloadAsync();
      }
    };
  }, [audio]);

  // Status update callback for audio playback
  const onPlaybackStatusUpdate = (status: AVPlaybackStatus) => {
    if (!status.isLoaded) return;

    if (status.durationMillis !== undefined && status.durationMillis > 0) {
      setProgress(status.positionMillis / status.durationMillis);
    }

    const minutes = Math.floor(status.positionMillis / 60000);
    const seconds = Math.floor((status.positionMillis % 60000) / 1000);
    setCurrentTime(`${minutes}:${seconds.toString().padStart(2, "0")}`);

    // Update playing state
    setIsPlaying(status.isPlaying);

    if (status.didJustFinish) {
      setIsPlaying(false);
      setProgress(0);
      setCurrentTime("0:00");
    }
  };

  const handleBack = () => {
    router.back();
  };

  const togglePlayPause = async () => {
    if (!isLoaded || !soundRef.current) return;

    if (isPlaying) {
      await soundRef.current.pauseAsync();
    } else {
      await soundRef.current.playAsync();
    }
  };

  const handleRewind = async () => {
    if (!isLoaded || !soundRef.current) return;

    const status = await soundRef.current.getStatusAsync();
    if (status.isLoaded) {
      const newPosition = Math.max(0, status.positionMillis - 30000);
      await soundRef.current.setPositionAsync(newPosition);
    }
  };

  const handleForward = async () => {
    if (!isLoaded || !soundRef.current) return;

    const status = await soundRef.current.getStatusAsync();
    if (status.isLoaded) {
      const newPosition = Math.min(
        status.durationMillis !== undefined
          ? status.durationMillis
          : totalDuration,
        status.positionMillis + 30000
      );
      await soundRef.current.setPositionAsync(newPosition);
    }
  };

  if (!image) {
    return (
      <SafeAreaView style={styles.errorContainer}>
        <Text style={styles.errorText}>No image provided</Text>
      </SafeAreaView>
    );
  }

  return (
    <ImageBackground
      source={image}
      style={styles.background}
      resizeMode="cover"
    >
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
              <Text style={styles.meditationTitle}>{title}</Text>
              <Text style={styles.meditationSubtitle}>
                Find your inner peace
              </Text>
            </View>

            <View style={styles.playerContainer}>
              <View style={styles.progressContainer}>
                <View style={styles.progressBar}>
                  <View
                    style={[
                      styles.progressFill,
                      { width: `${progress * 100}%` },
                    ]}
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
                  onPress={handleRewind}
                >
                  <Feather name="rewind" size={24} color="#fff" />
                </TouchableOpacity>

                <TouchableOpacity
                  style={[
                    styles.playButton,
                    !isLoaded && styles.playButtonDisabled,
                  ]}
                  onPress={togglePlayPause}
                  disabled={!isLoaded}
                >
                  <Feather
                    name={isPlaying ? "pause" : "play"}
                    size={36}
                    color="#fff"
                  />
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.controlButton}
                  onPress={handleForward}
                >
                  <Feather name="fast-forward" size={24} color="#fff" />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
  container: {
    flexGrow: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    paddingBottom: 30,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 15,
    paddingTop: 20,
    paddingBottom: 15,
  },
  backButton: {
    flexDirection: "row",
    alignItems: "center",
  },
  circle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "white",
    borderWidth:1,
    borderColor: "#52AE77",
    justifyContent: "center",
    alignItems: "center",
  },  
  backText: {
    marginLeft: 5,
    fontSize: 16,
    color: "#fff",
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#fff",
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 40,
    paddingHorizontal: 20,
    marginTop: 300,
  },
  meditationInfo: {
    alignItems: "center",
    marginBottom: 40,
  },
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
  playerContainer: {
    width: "100%",
    padding: 20,
  },
  progressContainer: {
    marginBottom: 30,
  },
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
    backgroundColor: "#52AE7799", // Semi-transparent to indicate disabled state
  },
  infoSection: {
    padding: 20,
    backgroundColor: "rgba(0, 0, 0, 0.4)",
    borderRadius: 15,
    marginHorizontal: 20,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 10,
  },
  sectionText: {
    fontSize: 16,
    color: "#ddd",
    lineHeight: 24,
    marginBottom: 20,
  },
  tags: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  tag: {
    backgroundColor: "rgba(82, 174, 119, 0.3)",
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 20,
    marginRight: 10,
    marginBottom: 10,
  },
  tagText: {
    color: "#fff",
    fontSize: 14,
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  errorText: {
    fontSize: 18,
    color: "#333",
  },
});

export default PlayMeditationScreen;

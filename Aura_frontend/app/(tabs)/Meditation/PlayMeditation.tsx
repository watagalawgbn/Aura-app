import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
  ScrollView,
  SafeAreaView,
  Alert
} from "react-native";
import styles from "./PlayMeditation.styles";
import { Feather } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Audio, AVPlaybackStatus } from "expo-av";
import { BASE_URL } from "@/constants/Api";

const PlayMeditationScreen = () => {

  const router = useRouter();
  const { title, filename, imageId } = useLocalSearchParams();//extract parameters from route

  //make sure parameters are in string format(not array)
  const titleString = Array.isArray(title) ? title[0] : title;
  const imageIdString = Array.isArray(imageId) ? imageId[0] : imageId;

  //manager audio and UI state
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0); // tplayback progress(0-1)
  const [currentTime, setCurrentTime] = useState("0:00"); // Elapsed playback time 
  const [totalTime, setTotalTime] = useState("10:00"); // Total duration as string
  const [totalDuration, setTotalDuration] = useState(600000); // Total duration in milliseconds
  const [isLoaded, setIsLoaded] = useState(false); //track loading state for API call
  const [imageUrl, setImageUrl] = useState(""); //url for the image 

  const soundRef = useRef<Audio.Sound | null>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // When component mounts, set image URL from imageId
  useEffect(() => {
    if (imageIdString && imageIdString.trim() !== "") {
      const url = `${BASE_URL}/api/images/${imageIdString}`; // set the image url
      setImageUrl(url);
      console.log("Image URL set:", url);
    } else {
      setImageUrl("");
      console.log("No image ID provided");
    }
  }, [imageIdString]);

  // Wait until audio duration is valid
  const waitForValidDuration = async ( sound: Audio.Sound ): Promise<number | null> => {
    for (let i = 0; i < 30; i++) {
      const status = await sound.getStatusAsync();

      if (status.isLoaded) {
        if (status.durationMillis && status.durationMillis > 1000) {
          return status.durationMillis;
        } else {
          console.log(
            `[${i + 1}/30] Duration still invalid:`,
            status.durationMillis
          );
        }
      } else {
        console.log(`⚠️ Status not loaded yet (attempt ${i + 1})`);
      }

      await new Promise((res) => setTimeout(res, 500));
    }

    console.log("Gave up waiting for valid duration.");
    return null;
  };

  // Load and prepare the audio on mount
  useEffect(() => {
    const loadAudio = async () => {
      try {
        console.log("Starting audio load:", filename);

        await Audio.setAudioModeAsync({
          allowsRecordingIOS: false,
          staysActiveInBackground: true,
          playsInSilentModeIOS: true,
          shouldDuckAndroid: true,
          playThroughEarpieceAndroid: false,
        });

        const { sound } = await Audio.Sound.createAsync(
          { uri: `${BASE_URL}/api/audio/${filename}` },
          { shouldPlay: false }
        );

        soundRef.current = sound;
        sound.setOnPlaybackStatusUpdate(onPlaybackStatusUpdate);
        setIsLoaded(true);

         // Set duration and format for UI
        const actualDuration = await waitForValidDuration(sound);
        if (actualDuration) {
          setTotalDuration(actualDuration);

          const totalMinutes = Math.floor(actualDuration / 60000);
          const totalSeconds = Math.floor((actualDuration % 60000) / 1000);
          setTotalTime(
            `${totalMinutes}:${totalSeconds.toString().padStart(2, "0")}`
          );
        }
      } catch (error) {
        console.error("Failed to load audio", error);
        Alert.alert("Error", "Unable to load meditation audio. Please try again.");
      }
    };

    if (filename) loadAudio();

    // Clean up audio and timer on unmount
    return () => {
      if (soundRef.current) {
        soundRef.current.unloadAsync();
      }
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [filename]);

  // Update playback progress every second when audio is playing
  useEffect(() => {
    if (isPlaying && soundRef.current) {
      console.log("Starting interval-based progress updater");
      intervalRef.current = setInterval(async () => {
        const status = await soundRef.current?.getStatusAsync();
        if (
          status?.isLoaded &&
          status?.positionMillis &&
          status?.durationMillis
        ) {
          onPlaybackStatusUpdate(status);
        }
      }, 1000);
    } else if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }

    // Cleanup on unmount
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [isPlaying]);

  // Update UI based on current playback status
  const onPlaybackStatusUpdate = (status: AVPlaybackStatus) => {
    if (!status.isLoaded || !("durationMillis" in status)) {
      return;
    }

    if (status.durationMillis && status.positionMillis != null) {
      setProgress(status.positionMillis / status.durationMillis);

      const currentMinutes = Math.floor(status.positionMillis / 60000);
      const currentSeconds = Math.floor((status.positionMillis % 60000) / 1000);
      setCurrentTime(
        `${currentMinutes}:${currentSeconds.toString().padStart(2, "0")}`
      );

      const totalMinutes = Math.floor(status.durationMillis / 60000);
      const totalSeconds = Math.floor((status.durationMillis % 60000) / 1000);
      setTotalTime(
        `${totalMinutes}:${totalSeconds.toString().padStart(2, "0")}`
      );
    }

    setIsPlaying(status.isPlaying ?? false);

    if (status.didJustFinish) {
      console.log("Playback finished");
      setIsPlaying(false);
      setProgress(0);
      setCurrentTime("0:00");
    }
  };

  const handleBack = () => router.back();

  // Toggle play and pause
  const togglePlayPause = async () => {
    if (!isLoaded || !soundRef.current) return;

    if (isPlaying) {
      console.log("Pausing audio");
      await soundRef.current.pauseAsync();
    } else {
      console.log("Playing audio");
      await soundRef.current.playAsync();
    }
  };

  // Rewind 30 seconds
  const handleRewind = async () => {
    if (!isLoaded || !soundRef.current) return;

    const status = await soundRef.current.getStatusAsync();
    if (status.isLoaded) {
      const newPosition = Math.max(0, status.positionMillis - 30000);
      console.log("Rewinding to:", newPosition);
      await soundRef.current.setPositionAsync(newPosition);
    }
  };

  // Fast-forward 30 seconds
  const handleForward = async () => {
    if (!isLoaded || !soundRef.current) return;

    const status = await soundRef.current.getStatusAsync();
    if (status.isLoaded) {
      const newPosition = Math.min(
        status.durationMillis ?? totalDuration,
        status.positionMillis + 30000
      );
      console.log("Forwarding to:", newPosition);
      await soundRef.current.setPositionAsync(newPosition);
    }
  };

  // Render screen background
  const renderContent = () => {
    if (imageUrl) {
      return (
        <ImageBackground
          source={{ uri: imageUrl }}
          style={styles.background}
          resizeMode="cover"
          onError={(error) => {
            console.error("Background image error:", error.nativeEvent.error);
            setImageUrl("");
          }}
          onLoad={() => {
            console.log("Background image loaded");
          }}
        >
          {renderPlayerContent()}
        </ImageBackground>
      );
    } else {
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
            <Text style={styles.meditationSubtitle}>Find your inner peace</Text>
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
  );

  return renderContent();
};


export default PlayMeditationScreen;

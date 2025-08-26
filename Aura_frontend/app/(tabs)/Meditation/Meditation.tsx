import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  StatusBar,
  ActivityIndicator,
} from "react-native";
import styles from "./Meditation.styles";
import { useRouter } from "expo-router";
import BackButton from "../../components/BackButton";
import {
  fetchMeditations,
  getImageUrl,
  getImageId,
  type MeditationAudio,
} from "@/app/services/meditationService";

const MeditationScreen = () => {
  const router = useRouter();
  const [audios, setAudios] = useState<MeditationAudio[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadMeditations = async () => {
      try {
        const data = await fetchMeditations();
        setAudios(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadMeditations();
  }, []);

  const renderAudioCard = (audio: MeditationAudio) => {
    const imageUrl = getImageUrl(getImageId(audio.image));

    return (
      <TouchableOpacity
        key={audio._id}
        onPress={() =>
          router.push({
            pathname: "/(tabs)/Meditation/PlayMeditation",
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
          <Image source={{ uri: imageUrl }} style={styles.imgs} />
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
        <BackButton title="Beat Stress" />
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#52AE77" />
        </View>
      </SafeAreaView>
    );
  }

  if (audios.length === 0) {
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
        <BackButton title="Beat Stress" />
        <View style={styles.loadingContainer}>
          <Text style={styles.emptyText}>
            No meditations available at the moment.
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
      <BackButton title="Beat Stress" />
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.meditationContainer}>{createRows()}</View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default MeditationScreen;

//(tabs)/meditation.tsx
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
import { BASE_URL } from "@/constants/Api";

//define types for audio item
type Audio = {
  _id: string;
  title: string;
  filename: string;
  image?: string | { _id: string } | null; //optional, image associated with audio
};

const MeditationScreen = () => {
  const router = useRouter();
  const [audios, setAudios] = useState<Audio[]>([]); //hold the list of audios
  const [loading, setLoading] = useState(true); //track loading state for API call

  useEffect(() => {

    //Fetching audio files from the backend API
    const fetchMeditations = async () => {
      try {
        const response = await fetch(`${BASE_URL}/api/meditations`); //API end point
        //handle error if occured
        if (!response.ok) {
          throw new Error("Failed to fetch meditations");
        }

        const data = await response.json();

        // Store retrieved audios in state
        setAudios(data);
      } catch (err) {
        console.error("Failed to fetch meditations:", err);
      } finally {
        setLoading(false); 
      }
    };

    fetchMeditations(); //trigger fetch when component mounts
  }, []);


  //generate image url for a given imageId
  const getImageUrl = (imageId?: string | null) => {
    //if no id is provided returns null(no image)
    if (!imageId) return null;
    const url = `${BASE_URL}/api/images/${imageId}`; 
    return url;
  };


  //extract the imageId from either a string or object
  const getImageId = (image: string | { _id: string } | null | undefined) => {
    if (!image) return "";
    if (typeof image === "string") return image;
    return image._id;
  };

  // render a single audio card with image and title
  const renderAudioCard = (audio: Audio) => {
    const imageUrl = getImageUrl(getImageId(audio.image));

    return (
      // navigate to relavant playMeditation screen by tapping the card
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
          //show image if available
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
          //  show fallback when image is not available
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

  // Function to create group audios into rows of 2 items
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

  // show loading spinner while data is being fetched
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

  // Show fallback message if no meditations are found
  if(audios.length === 0 && !loading){
    return(
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff"/>
      <BackButton title="Beat Stress"/>
      <View style={styles.loadingContainer}>
        <Text style={styles.emptyText}>No meditations available at the moment.</Text>
      </View>
    </SafeAreaView>
    );
  }

  // Main screen after data has loaded
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


export default MeditationScreen;

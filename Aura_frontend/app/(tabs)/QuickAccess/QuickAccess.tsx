import React from "react";
import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  StatusBar,
} from "react-native";
import styles from "./QuickAccess.styles";
import { Feather } from "@expo/vector-icons";
import { router } from "expo-router";
import BackButton from "../../components/BackButton";

const QuickAccessScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />

      <BackButton title={"Self Care"} />

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search"
          placeholderTextColor="#52AE77"
        />
        <TouchableOpacity>
          <Feather name="search" size={20} color="#52AE77" />
        </TouchableOpacity>
      </View>

      {/* Content Grid */}
      <ScrollView style={styles.contentContainer}>
        <View style={styles.fullCard}>
          <Image
            source={require("../../../assets/images/stress.jpg")}
            style={styles.fullCardImage}
          />
          <View style={styles.playButtonContainer}>
            <TouchableOpacity
              onPress={() => router.navigate("/(tabs)/Meditation/Meditation")}
              style={styles.playButton}
            >
              <Feather name="play" size={20} color="#52AE77" />
            </TouchableOpacity>
          </View>
          <Text style={styles.cardTitle}>Beat Stress</Text>
        </View>

        {/* Two Column Cards */}
        <View style={styles.rowContainer}>
          <View style={styles.halfCard}>
            <Image
              source={require("../../../assets/images/anxiety.jpg")}
              style={styles.fullCardImage}
            />
            <View style={styles.playButtonContainer}>
              <TouchableOpacity style={styles.playButton}>
                <Feather name="play" size={16} color="#52AE77" />
              </TouchableOpacity>
            </View>
            <Text style={styles.cardTitleSmall}>Ease{"\n"}Anxiety</Text>
          </View>

          <View style={styles.halfCard}>
            <Image
              source={require("../../../assets/images/calm.jpeg")}
              style={styles.fullCardImage}
            />
            <View style={styles.playButtonContainer}>
              <TouchableOpacity
                onPress={() => router.navigate("/(tabs)/BreathingExercise/BreathingExercise")}
                style={styles.playButton}
              >
                <Feather name="play" size={16} color="#52AE77" />
              </TouchableOpacity>
            </View>
            <Text style={styles.cardTitleSmall}>Calm Your{"\n"}Mind</Text>
          </View>
        </View>

        <View style={styles.rowContainer}>
          <View style={styles.halfCard}>
            <Image
              source={require("../../../assets/images/earning.jpg")}
              style={styles.fullCardImage}
            />
            <View style={styles.playButtonContainer}>
              <TouchableOpacity 
                style={styles.playButton}
                onPress={() => router.navigate("/(tabs)/JobScreen/JobScreen")}>
                <Feather name="play" size={16} color="#52AE77" />
              </TouchableOpacity>
            </View>
            <Text style={styles.cardTitleSmall}>Boost Your{"\n"}Earnings</Text>
          </View>

          <View style={styles.halfCard}>
            <Image
              source={require("../../../assets/images/study.jpg")}
              style={styles.fullCardImage}
            />
            <View style={styles.playButtonContainer}>
              <TouchableOpacity
                style={styles.playButton}
                onPress={() => router.navigate("/(tabs)/PomodoroScreen/PomodoroScreen")}
              >
                <Feather name="play" size={16} color="#52AE77" />
              </TouchableOpacity>
            </View>
            <Text style={styles.cardTitleSmall}>Study{"\n"}Smart</Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};


export default QuickAccessScreen;

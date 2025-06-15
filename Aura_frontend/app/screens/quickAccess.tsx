import React from "react";
import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  StatusBar,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { router } from "expo-router";
import BackButton from "../components/BackButton";

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
            source={require("../../assets/images/stress.jpg")}
            style={styles.fullCardImage}
          />
          <View style={styles.playButtonContainer}>
            <TouchableOpacity
              onPress={() => router.navigate("/screens/meditation")}
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
              source={require("../../assets/images/anxiety.jpg")}
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
              source={require("../../assets/images/calm.jpeg")}
              style={styles.fullCardImage}
            />
            <View style={styles.playButtonContainer}>
              <TouchableOpacity
                onPress={() => router.navigate("/screens/breathingExercise")}
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
              source={require("../../assets/images/earning.jpg")}
              style={styles.fullCardImage}
            />
            <View style={styles.playButtonContainer}>
              <TouchableOpacity style={styles.playButton}>
                <Feather name="play" size={16} color="#52AE77" />
              </TouchableOpacity>
            </View>
            <Text style={styles.cardTitleSmall}>Boost Your{"\n"}Earnings</Text>
          </View>

          <View style={styles.halfCard}>
            <Image
              source={require("../../assets/images/study.jpg")}
              style={styles.fullCardImage}
            />
            <View style={styles.playButtonContainer}>
              <TouchableOpacity style={styles.playButton}
              onPress={() => router.navigate("/screens/PomodoroScreen")}>
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 5,
    marginBottom: 20,
    borderColor: "#52AE77",
    borderWidth: 1,
    // alignSelf: "stretch",
    marginHorizontal: 20,
  },
  searchInput: {
    flex: 1,
    marginLeft: 10,
    fontSize: 16,
    color: "#333",
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
    borderRadius: 20,
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
  headerTitle: {
    fontSize: 22,
    fontWeight: "bold",
  },
  titleWrapper: {
    marginTop: 65,
  },
  searchText: {
    flex: 1,
    marginLeft: 10,
    color: "#52AE77",
  },
  contentContainer: {
    flex: 1,
    paddingHorizontal: 15,
  },
  fullCard: {
    marginBottom: 15,
    borderRadius: 15,
    overflow: "hidden",
  },
  fullCardImage: {
    width: "100%",
    height: 180,
    borderRadius: 15,
  },
  rowContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 15,
  },
  halfCard: {
    width: "48%",
    borderRadius: 15,
    overflow: "hidden",
  },
  halfCardImage: {
    width: "100%",
    height: 120,
    borderRadius: 15,
  },
  playButtonContainer: {
    position: "absolute",
    bottom: 10,
    right: 10,
  },
  playButton: {
    backgroundColor: "rgba(0, 0, 0, 0.4)",
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: "center",
    alignItems: "center",
  },
  cardTitle: {
    position: "absolute",
    bottom: 15,
    left: 15,
    color: "white",
    fontWeight: "bold",
    fontSize: 18,
  },
  cardTitleSmall: {
    position: "absolute",
    bottom: 10,
    left: 10,
    color: "white",
    fontWeight: "bold",
    fontSize: 14,
  },
});

export default QuickAccessScreen;

import React from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  StatusBar,
} from "react-native";
import { Feather, Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";

const QuickAccessScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton}>
          <Feather name="arrow-left" size={24} color="#52AE77" />
          <Text style={styles.backText}>Back</Text>
        </TouchableOpacity>

        <Text style={styles.headerTitle}>Self Care</Text>

        <TouchableOpacity>
          <Feather name="more-vertical" size={24} color="#52AE77" />
        </TouchableOpacity>
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <Feather name="menu" size={20} color="#52AE77" />
        <Text style={styles.searchText}>Search</Text>
        <Feather name="search" size={20} color="#52AE77" />
      </View>

      {/* Content Grid */}
      <ScrollView style={styles.contentContainer}>
        {/* Beat Stress Card - Full Width */}
        <View style={styles.fullCard}>
          <Image
            source={require("../../assets/images/stress.jpg")} 
            style={styles.fullCardImage}
          />
          <View style={styles.playButtonContainer}>
            <TouchableOpacity onPress={() => router.navigate("/screens/meditation")} style={styles.playButton}>
              <Feather name="play" size={20} color="#52AE77" />
            </TouchableOpacity>
          </View>
          <Text style={styles.cardTitle}>Beat Stress</Text>
        </View>

        {/* Two Column Cards */}
        <View style={styles.rowContainer}>
          {/* Ease Anxiety Card */}
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

          {/* Calm Your Mind Card */}
          <View style={styles.halfCard}>
          <Image
            source={require("../../assets/images/calm.jpeg")} 
            style={styles.fullCardImage}
          />
            <View style={styles.playButtonContainer}>
              <TouchableOpacity style={styles.playButton}>
                <Feather name="play" size={16} color="#52AE77" />
              </TouchableOpacity>
            </View>
            <Text style={styles.cardTitleSmall}>Calm Your{"\n"}Mind</Text>
          </View>
        </View>

        {/* Second Row of Two Column Cards */}
        <View style={styles.rowContainer}>
          {/* Boost Your Earnings Card */}
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

          {/* Study Smart Card */}
          <View style={styles.halfCard}>
          <Image
            source={require("../../assets/images/study.jpg")} 
            style={styles.fullCardImage}
          />
            <View style={styles.playButtonContainer}>
              <TouchableOpacity style={styles.playButton}>
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
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 15,
    paddingVertical: 15,
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
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 15,
    marginBottom: 15,
    backgroundColor: "#f2f0f7",
    borderRadius: 10,
    padding: 10,
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

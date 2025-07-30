import React, { useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { Ionicons, MaterialIcons, FontAwesome } from "@expo/vector-icons";
import BackButton from "../components/BackButton";

const JobScreen = () => {
  const [skills, setSkills] = useState("");
  const [skillList, setSkillList] = useState<string[]>([]);

  const handleAddSkill = () => {
    if (skills.trim() !== "") {
      setSkillList([...skillList, skills.trim()]);
      setSkills("");
    }
  };
  return (
    <SafeAreaView style={styles.safeAreaStyles}>
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
      <BackButton title={"Find your part time job"} />
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.titleContainer}>
          <Text style={styles.titleText}>
            Enter your skills and discover personalized job recommendations that
            match your talents
          </Text>
        </View>
        <View style={styles.skillStyles}>
          <View style={styles.skillTitle}>
            <Ionicons name="people" size={20} color="#5FB21F" />
            <Text style={styles.skillTextStyle}> Your Skills:</Text>
          </View>
          <View style={styles.skillInputRow}>
            <TextInput
              style={styles.skillInput}
              placeholder="Designing, teaching, etc"
              value={skills}
              onChangeText={setSkills}
            />
            <TouchableOpacity style={styles.addButton} onPress={handleAddSkill}>
              <Text style={{ fontSize: 18, fontWeight: "bold" }}>+</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity style={styles.findJobsBtn}>
            <Text style={styles.findJobsText}>Find Jobs</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.infoBoxes}>
          <View style={styles.infoBox}>
            <MaterialIcons name="work" size={20} color="white" />
            <Text style={styles.infoText}>6</Text>
            <Text style={styles.infoLabel}>Available Jobs</Text>
          </View>
          <View style={[styles.infoBox, { backgroundColor: "#224831" }]}>
            <MaterialIcons name="people" size={20} color="white" />
            <Text style={styles.infoText}>{skillList.length}</Text>
            <Text style={styles.infoLabel}>Skills Added</Text>
          </View>
        </View>

        {/* Job Cards */}
        <View style={styles.jobCard}>
          <Text style={styles.jobTitle}>UI/UX Designer</Text>
          <Text style={styles.companyName}>Creative Studio Inc</Text>
          <View style={styles.jobTags}>
            <View style={styles.tagWithIcon}>
              <Ionicons name="location" size={14} color="black" />
              <Text style={styles.tagText}>Remote</Text>
            </View>
            <View style={styles.tagWithIcon}>
              <MaterialIcons name="schedule" size={14} color="black" />
              <Text style={styles.tagText}>Part-Time</Text>
            </View>
            <View style={styles.tagWithIcon}>
              <FontAwesome name="dollar" size={14} color="black" />
              <Text style={styles.tagText}>$25-35/hr</Text>
            </View>
          </View>
          <Text style={styles.jobDesc}>
            We're looking for a creative UI/UX designer to help create beautiful
            and intuitive user interfaces...
          </Text>
          <TouchableOpacity style={styles.applyButton}>
            <View style={styles.applyBtnFlex}>
              <Text style={styles.applyButtonText}>Apply Now</Text>
              <Ionicons name="arrow-forward-circle" size={20} color="white" />
            </View>
          </TouchableOpacity>
        </View>

        <View style={styles.jobCard}>
          <Text style={styles.jobTitle}>Fashion Design Assistant</Text>
          <Text style={styles.companyName}>Trendy Fashion House</Text>
          <View style={styles.jobTags}>
            <View style={styles.tagWithIcon}>
              <Ionicons name="location" size={14} color="black" />
              <Text style={styles.tagText}>Colombo</Text>
            </View>
            <View style={styles.tagWithIcon}>
              <MaterialIcons name="schedule" size={14} color="black" />
              <Text style={styles.tagText}>Part-Time</Text>
            </View>
            <View style={styles.tagWithIcon}>
              <FontAwesome name="dollar" size={14} color="black" />
              <Text style={styles.tagText}>$20–28/hr</Text>
            </View>
          </View>

          <Text style={styles.jobDesc}>
            Join our fashion team as a design assistant. Help create stunning
            fashion pieces and...
          </Text>
          <TouchableOpacity style={styles.applyButton}>
            <View style={styles.applyBtnFlex}>
              <Text style={styles.applyButtonText}>Apply Now</Text>
              <Ionicons name="arrow-forward-circle" size={20} color="white" />
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeAreaStyles: {
    flex: 1,
    backgroundColor: "white",
  },
  scrollContent: {
    paddingBottom: 120,
    paddingHorizontal: 15,
  },
  titleContainer: {
    alignItems: "center",
    marginVertical: 10,
  },
  titleHeader: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  titleText: {
    fontSize: 14,
    textAlign: "center",
    color: "gray",
  },
  skillStyles: {
    marginTop: 15,
    borderColor: "#D5D5D5",
    borderWidth: 1,
    padding: 20,
    borderRadius: 10,
    backgroundColor: "#F7F7F7",
  },
  skillTitle: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  skillTextStyle: {
    fontWeight: "bold",
    fontSize: 15,
    marginLeft: 5,
  },
  skillInputRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  skillInput: {
    flex: 1,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
  },
  addButton: {
    marginLeft: 10,
    backgroundColor: "white",
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 3,
  },
  findJobsBtn: {
    backgroundColor: "#5FB21F",
    padding: 12,
    marginTop: 15,
    borderRadius: 5,
    alignItems: "center",
  },
  findJobsText: {
    color: "white",
    fontWeight: "bold",
  },
  infoBoxes: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginVertical: 20,
  },
  infoBox: {
    backgroundColor: "#5FB21F",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    flex: 1,
    marginHorizontal: 5,
  },
  infoText: {
    fontSize: 20,
    color: "white",
    fontWeight: "bold",
    marginVertical: 5,
  },
  infoLabel: {
    color: "white",
    fontSize: 12,
  },
  jobCard: {
    backgroundColor: "#F5F5F5",
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    borderColor: "#D5D5D5",
    borderWidth: 1,
  },
  jobTitle: {
    fontWeight: "500",
    fontSize: 16,
  },
  companyName: {
    color: "#224831",
    fontWeight: "bold",
    marginBottom: 5,
  },
  jobTags: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: 10,
  },
  tag: {
    backgroundColor: "#D0D0D0",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    marginRight: 5,
    fontSize: 12,
  },
  jobDesc: {
    fontSize: 13,
    color: "#333",
    marginBottom: 10,
  },
  tagWithIcon: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
    marginRight: 5,
    marginBottom: 5,
  },

  tagText: {
    fontSize: 14,
    marginLeft: 4,
    fontWeight: 'bold',
  },

  applyButton: {
    backgroundColor: "#5FB21F",
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 5,
    alignSelf: "flex-end",
    marginTop: 10,
  },
  applyBtnFlex: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },
  applyButtonText: {
    color: "white",
    fontWeight: "bold",
  },
  bottomNav: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 70,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    borderTopWidth: 1,
    borderColor: "#ddd",
    backgroundColor: "white",
  },
  navItem: {
    alignItems: "center",
  },
});

export default JobScreen;

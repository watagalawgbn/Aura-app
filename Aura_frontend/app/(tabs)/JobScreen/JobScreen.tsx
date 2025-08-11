import React, { useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  StatusBar,
  ScrollView,
  TextInput,
  TouchableOpacity,
} from "react-native";
import styles from "./JobScreen.styles";
import { Ionicons, MaterialIcons, FontAwesome } from "@expo/vector-icons";
import BackButton from "../../components/BackButton";
import JobCard from "@/app/components/JobCard/JobCard";
import useFetch from "@/hook/useFetch";
import { router } from "expo-router";

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


export default JobScreen;

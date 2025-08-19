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
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import BackButton from "../../components/BackButton";
import axios from "axios";
import JobCard from "@/app/components/JobCard/JobCard";
import { BASE_URL } from "@/constants/Api";

const JobScreen = () => {
  const [skills, setSkills] = useState("");
  const [skillList, setSkillList] = useState<string[]>([]);
  const [jobs, setJobs] = useState<any[]>([]);

  const fetchJobs = async () => {
    try {
      const res = await axios.post(`${BASE_URL}/api/jobs/recommendations`, {
        skills: skillList,
        employmentType: "",
        city: "",
      });
      console.log("✅ jobs: ", res.data);
      setJobs(res.data.results);
    } catch (e) {
      console.error("Failed to fetch jobs:  ", e);
      throw new Error("Failed to fetch jobs!");
    }
  };

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

          <View>
            {skillList.map((skills, index) => (
              <View key={index} style={styles.skillChip}>
                <Text style={styles.skillChipText}>{skills}</Text>
                <TouchableOpacity onPress={() => {
                  setSkillList((prev) => prev.filter((_, i) => i !== index))
                }}>
                  <Ionicons name="close-circle" size={16} color="white"/>
                </TouchableOpacity>
              </View>
            ))}
          </View>

          <TouchableOpacity style={styles.findJobsBtn} onPress={fetchJobs}>
            <Text style={styles.findJobsText}>Find Jobs</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.infoBoxes}>
          <View style={styles.infoBox}>
            <MaterialIcons name="work" size={20} color="white" />
            <Text style={styles.infoText}>{jobs.length}</Text>
            <Text style={styles.infoLabel}>Available Jobs</Text>
          </View>
          <View style={[styles.infoBox, { backgroundColor: "#224831" }]}>
            <MaterialIcons name="people" size={20} color="white" />
            <Text style={styles.infoText}>{skillList.length}</Text>
            <Text style={styles.infoLabel}>Skills Added</Text>
          </View>
        </View>

        {/* Job Cards */}
        {jobs.map((job) => (
          <JobCard key={job.id} job={job}/>
        ))}

      </ScrollView>
    </SafeAreaView>
  );
};

export default JobScreen;

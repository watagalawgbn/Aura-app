import React, { useState, useEffect } from "react";
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
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ActivityIndicator } from "react-native-paper";

const JobScreen = () => {
  const [skills, setSkills] = useState("");
  const [skillList, setSkillList] = useState<string[]>([]);
  const [jobs, setJobs] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const fetchJobs = async () => {
    try {
      setLoading(true);
      const res = await axios.post(`${BASE_URL}/api/jobs/recommendations`, {
        skills: skillList,
        employmentType: "",
        city: "",
        page: currentPage,
      });
      console.log("✅ jobs: ", res.data);
      setJobs((prev) => {
        const newJobs = [...prev, ...res.data.results];
        const uniqueJobs = newJobs.filter(
          (job, index, self) => 
            index === self.findIndex((j) => j.id === job.id) // keep only first one
        );
        return uniqueJobs;
      });
      await AsyncStorage.setItem(
        "jobs",
        JSON.stringify([...jobs, ...res.data.results])
      );
    } catch (e) {
      console.error("Failed to fetch jobs:  ", e);
      throw new Error("Failed to fetch jobs!");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const loadJobs = async () => {
      await AsyncStorage.removeItem("jobs"); // clear old cache
      const saved = await AsyncStorage.getItem("jobs");
      console.log("✔️ Saved: ", saved);
      if (saved) {
        setJobs(JSON.parse(saved));
      }
    };
    loadJobs();
  }, []);

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

          <View style={styles.skillChipsContainer}>
            {skillList.map((skill, index) => (
              <View key={`${skill}-${index}`} style={styles.skillChip}>
                <Text style={styles.skillChipText}>{skill}</Text>
                <TouchableOpacity
                  onPress={() =>
                    setSkillList((prev) => prev.filter((_, i) => i !== index))
                  }
                  style={styles.chipCloseBtn}
                  hitSlop={{ top: 8, right: 8, bottom: 8, left: 8 }}
                  accessibilityRole="button"
                  accessibilityLabel={`Remove ${skill}`}
                >
                  <Ionicons name="close" size={16} color="#5FB21F" />
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
        {loading ? (
          <View style={{ marginTop: 20, alignItems: "center" }}>
            <ActivityIndicator size="large" color="#5FB21F" />
          </View>
        ) : jobs.length === 0 ? (
          <Text style={{ marginTop: 20, textAlign: "center", color: "#888" }}>
            No jobs Found. Try adding skills above.
          </Text>
        ) : (
          <>
            {jobs.map((job) => (
              <JobCard key={job.id} job={job} />
            ))}

            {/* Load More button only if jobs exist */}
            <TouchableOpacity
              style={styles.findJobsBtn}
              onPress={() => {
                setCurrentPage((prev) => prev + 1);
                fetchJobs();
              }}
            >
              <Text style={styles.findJobsText}>Load More</Text>
            </TouchableOpacity>
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default JobScreen;

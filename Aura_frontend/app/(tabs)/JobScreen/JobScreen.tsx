import React, { useState, useEffect, useCallback } from "react";
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
import { useFocusEffect } from "@react-navigation/native";
import type { Job } from "@/app/components/JobCard/JobCard";


const JobScreen = () => {
  const [skills, setSkills] = useState(""); // form input for a new skill
  const [skillList, setSkillList] = useState<string[]>([]); // list of all skills user has added
  const [jobs, setJobs] = useState<Job[]>([]); //job results coming back from the API
  const [loading, setLoading] = useState(false); 
  const [currentPage, setCurrentPage] = useState(1); //page number for pagination

  const fetchJobs = async () => { // fetch jobs from the backend API
    if (skillList.length === 0) {
      console.warn("⚠️ Cannot fetch jobs without skills");
      alert("⚠️ Cannot fetch jobs without skills");
      return;
    }
    try {
      setLoading(true);
      const res = await axios.post(`${BASE_URL}/api/jobs/recommendations`, {
        skills: skillList,
        employmentType: "",
        city: "",
        page: currentPage,
      });

      const results: Job[] = res.data.results || [];

      // remove duplicates if API returns the same job multiple times
      const uniqueResults = results.filter(
        (job: Job, index: number, self: Job[]) =>
          index === self.findIndex((j: Job) => j.id === job.id)
      );

      console.log("✅ jobs: ", res.data);

      setJobs((prev) => {
        // first page - replace old jobs completely
        if (currentPage === 1) {
          AsyncStorage.setItem(
            "jobData",
            JSON.stringify({ jobs: uniqueResults, skills: skillList })
          );
          return uniqueResults; // replace the old jobs if we are on first page
        }

        //later pages - append but keep only unique ids
        const newJobs = [...prev, ...uniqueResults];
        const uniqueJobs = newJobs.filter(
          (job: Job, index: number, self: Job[]) =>
            index === self.findIndex((j: Job) => j.id === job.id)
        );

        AsyncStorage.setItem(
          "jobData",
          JSON.stringify({ jobs: uniqueJobs, skills: skillList })
        );

        return uniqueJobs;
      });
    } catch (e) {
      console.error("Failed to fetch jobs:  ", e);
      throw new Error("Failed to fetch jobs!");
    } finally {
      setLoading(false);
    }
  };

  //load cached data on first mount
  useEffect(() => {
    const loadData = async () => {
      try {
        const saved = await AsyncStorage.getItem("jobData");
        if (saved) {
          const { jobs: savedJobs, skills: savedSkills } = JSON.parse(saved);
          setJobs(savedJobs || []);
          setSkillList(savedSkills || []);
        }
      } catch (err) {
        console.error("Error loading jobs from storage: ", err);
      }
    };
    loadData();
  }, []);

  //clear state when leaving the screen
  useFocusEffect(
    useCallback(() => {
      // screen focused → keep state
      return () => {
        // screen unfocused → clear jobs + skills
        setJobs([]);
        setSkillList([]);
        setSkills("");
        setCurrentPage(1);
      };
    }, [])
  );

  //add a new skill to the list
  const handleAddSkill = async () => {
    if (skills.trim() !== "") {
      const updatedSkills = [...skillList, skills.trim()];
      setSkillList(updatedSkills);
      setJobs([]); //clear jobs so we only fresh results
      setCurrentPage(1);
      setSkills("");

      await AsyncStorage.setItem(
        "jobData",
        JSON.stringify({ jobs, skills: updatedSkills })
      );
    }
  };

  //auto fetch when page changes(for pagination)
  useEffect(() => {
    if (currentPage > 1) {
      fetchJobs();
    }
  }, [currentPage]);

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
                  onPress={async () => {
                    setSkillList((prev) => {
                      const updated = prev.filter((_, i) => i !== index);
                      setJobs([]); // ✅ clear old jobs
                      setCurrentPage(1);
                      AsyncStorage.setItem(
                        "jobData",
                        JSON.stringify({ jobs: [], skills: updated })
                      );
                      return updated;
                    });
                  }}
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
        {loading && (
          <View style={{ marginTop: 20, alignItems: "center" }}>
            <ActivityIndicator size="large" color="#5FB21F" />
          </View>
        )}

        {!loading && jobs.length === 0 && (
          <Text style={{ marginTop: 20, textAlign: "center", color: "#888" }}>
            No jobs Found. Try adding skills above.
          </Text>
        )}

        {!loading && jobs.length > 0 && (
          <>
            {jobs.map((job, index) => (
              <JobCard key={job.id || `job-${index}`} job={job} />
            ))}

            <TouchableOpacity
              style={styles.findJobsBtn}
              onPress={() => setCurrentPage((prev) => prev + 1)}
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

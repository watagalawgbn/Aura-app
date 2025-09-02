import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import styles from "../../(tabs)/JobScreen/JobScreen.styles";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { Job } from "@/types/job";
import { saveJob } from "@/app/services/jobService";
import * as SecureStore from "expo-secure-store";

//props type for jobcard
type JobCardProps = {
  job: Job;
};

const JobCard = ({ job }: JobCardProps) => {
  const router = useRouter();
  const handleSave = async () => {
    try {
      // grab logged in userId from storage (or your auth context)
      const userId = await SecureStore.getItemAsync("userId");
      if (!userId) {
        console.warn("⚠️ No user logged in, cannot save job");
        return;
      }

      await saveJob(userId, job);
      console.log("✅ Job saved:", job.title);
    } catch (err: any) {
      console.error("❌ Error saving job:", err.message);
    }
  };

  return (
    <View style={styles.jobCard}>
      <View style={styles.jobHeader}>
        <Text style={styles.jobTitle} numberOfLines={1}>
          {job.title}
        </Text>
        <TouchableOpacity onPress={handleSave} style={styles.saveButton}>
          <Ionicons name="bookmark" size={25} color="#5FB21F"/>
        </TouchableOpacity>
      </View>

      <Text style={styles.companyName}>{job.company}</Text>
      <View style={styles.jobTags}>
        <View style={styles.tagWithIcon}>
          <Ionicons name="location" size={16} color="#224831" />
          <Text style={styles.tagText}>{job.location}</Text>
        </View>
        <View style={styles.tagWithIcon}>
          <MaterialIcons name="schedule" size={16} color="#224831" />
          <Text style={styles.tagText}>{job.type || "N/A"}</Text>
        </View>
        {job.remote && (
          <View style={styles.tagWithIcon}>
            <Ionicons name="wifi" size={16} color="#224831" />
            <Text style={styles.tagText}>Remote</Text>
          </View>
        )}
      </View>
      <Text numberOfLines={3} style={styles.jobDesc}>
        {job.description ||
          job.descriptionSnippet ||
          "No description available."}
        ...
      </Text>
      <TouchableOpacity
        style={styles.applyButton2}
        onPress={() =>
          router.push({
            pathname: "/(tabs)/JobScreen/[id]", //dynamic job details screen
            params: { id: job.id, job: JSON.stringify(job) }, //pass job id and full job as string
          })
        }
      >
        <View style={styles.applyBtnFlex2}>
          <Text style={styles.applyButtonText2}>View Details</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default JobCard;

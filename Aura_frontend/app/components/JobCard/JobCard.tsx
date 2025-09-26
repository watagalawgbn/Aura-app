import { View, Text, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import styles from "../../(tabs)/JobScreen/JobScreen.styles";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { Job } from "@/types/job";
import { saveJob, deleteSavedJob } from "@/app/services/jobService";
import * as SecureStore from "expo-secure-store";

type JobCardProps = {
  job: Job & { savedId?: string }; // include SavedJob._id for deletion
  initialSaved?: boolean;
  onRemove?: () => void;
};

const JobCard = ({ job, initialSaved = false, onRemove }: JobCardProps) => {
  const router = useRouter();
  const [saved, setSaved] = useState(initialSaved);
  const [savedId, setSavedId] = useState(job.savedId || null); //stores backend’s SavedJob._id for deletion.

  const toggleSave = async () => {
    try {
      const userId = await SecureStore.getItemAsync("userId");
      if (!userId) return;

      if (saved) {
        // remove from saved jobs
        if (savedId) {
          await deleteSavedJob(savedId);
          // notify parent to remove from list
          onRemove?.();
        }
        setSaved(false);
        setSavedId(null);
      } else {
        // save job
        const res = await saveJob(userId, job);
        setSaved(true);
        setSavedId(res._id); // backend returns SavedJob doc
      }
    } catch (err) {
      console.error("Failed to toggle save", err);
    }
  };

  return (
    <View style={styles.jobCard}>
      <View style={styles.jobHeader}>
        <Text style={styles.jobTitle} numberOfLines={1}>
          {job.title}
        </Text>
        <TouchableOpacity onPress={toggleSave} style={styles.saveButton}>
          <Ionicons
            name={saved ? "bookmark" : "bookmark-outline"}
            size={25}
            color="#5FB21F"
          />
        </TouchableOpacity>
      </View>

      <Text style={styles.companyName}>{job.company}</Text>
      <View style={styles.jobTags}>
        <View style={styles.tagWithIcon}>
          <Ionicons name="location" size={16} color="#224831" />
          <Text style={styles.tagText}>{job.location || "N/A"}</Text>
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
      </Text>

      <TouchableOpacity
        style={styles.applyButton2}
        onPress={() =>
          router.push({
            pathname: "/(tabs)/JobScreen/[id]",
            params: { id: job.id, job: JSON.stringify(job) },
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

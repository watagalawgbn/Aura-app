import { useLocalSearchParams } from "expo-router"; // to read params passed from JobCard
import {
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  Linking,
} from "react-native";
import React from "react";
import BackButton from "@/app/components/BackButton";
import styles from "./JobScreen.styles";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";

export default function JobDetails() {
  const { job } = useLocalSearchParams();  // get "job" param passed in router.push
  const jobData = JSON.parse(job as string);
  console.log("jobData in details screen: ", jobData);

  const formatDate = (dateTime: string) => {
    if(!dateTime) return "Not Available";
    const date = new Date(dateTime);
    return date.toLocaleDateString("en-US",{
        year: "numeric",
        month: "long",
        day: "numeric",
    });
  };


  return (
    <>
      <BackButton title={"Job Details"} />
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        style={{ padding: 10 }}
      >
        <View style={styles.jobCardwithId}>
          <Text style={styles.jobTitlewithId}>{jobData.title}</Text>
          <Text style={styles.companyNamewithId}>{jobData.company}</Text>
          <View style={styles.jobTags}>
            {jobData.remote && (
              <View style={styles.tagwithIconwithIt}>
                <Ionicons name="wifi" size={20} color="#5FB21F" />
                <Text style={styles.tagTextwithId}>Remote</Text>
              </View>
            )}
          </View>
          {/* Info Section: location */}
          <View style={styles.infoRow}>
            <Ionicons
              name="location"
              size={20}
              color="#5FB21F"
              style={styles.infoIcon}
            />
            <View>
              <Text style={styles.infoLabel2}>Location</Text>
              <Text>{jobData.location || "Not Available"}</Text>
            </View>
          </View>

          {/* Info Section: Posted Date */}
          <View style={styles.infoRow}>
            <Ionicons
              name="calendar"
              size={20}
              color="#5FB21F"
              style={styles.infoIcon}
            />
            <View>
              <Text style={styles.infoLabel2}>Posted Date</Text>
              <Text>{formatDate(jobData.postedAt) || "Not Available"}</Text>
            </View>
          </View>

          {/* Info Section: Job Type */}
          <View style={styles.infoRow}>
            <MaterialIcons
              name="schedule"
              size={20}
              color="#5FB21F"
              style={styles.infoIcon}
            />
            <View>
              <Text style={styles.infoLabel2}>Job Type</Text>
              <Text>{jobData.type || "Not Specified"}</Text>
            </View>
          </View>
        </View>

        <View style={styles.jobCardwithId}>
          <Text style={styles.jobDescriptionwithId}>Job Description</Text>
          <Text>{jobData.description || jobData.descriptionSnippet}</Text>
        </View>

        <TouchableOpacity
          style={styles.applyButton}
          onPress={() => Linking.openURL(jobData.applyLink)}
        >
          <View style={styles.applyBtnFlex}>
            <Text style={styles.applyButtonText}>Apply Now</Text>
            <Ionicons name="arrow-forward-circle" size={20} color="white" />
          </View>
        </TouchableOpacity>
      </ScrollView>
    </>
  );
}

import React, { useEffect, useState } from "react";
import { View, Text, FlatList, ActivityIndicator } from "react-native";
import * as SecureStore from "expo-secure-store";
import apiClient from "@/app/services/apiClient";
import JobCard from "@/app/components/JobCard/JobCard";
import BackButton from "@/app/components/BackButton";

export default function SavedJobsScreen() {
  const [jobs, setJobs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSaved = async () => {
      try {
        const userId = await SecureStore.getItemAsync("userId");
        if (!userId) return;

        const res = await apiClient.get(`/api/jobs/saved/${userId}`);
        // `res.data` is an array of SavedJob docs with populated `jobRef`
        const normalized = res.data.map((saved: any) => ({
          id: saved.jobRef.jobId,
          title: saved.jobRef.title,
          company: saved.jobRef.company,
          location: [
            saved.jobRef.city,
            saved.jobRef.state,
            saved.jobRef.country,
          ]
            .filter(Boolean)
            .join(", "),
          type: saved.jobRef.employmentType,
          description: saved.jobRef.description,
          applyLink: saved.jobRef.applyLink,
        }));
        setJobs(normalized);
      } catch (err) {
        console.error("Failed to load saved jobs", err);
      } finally {
        setLoading(false);
      }
    };

    fetchSaved();
  }, []);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#5FB21F" />
      </View>
    );
  }

  return (
    <View style={{ flex: 1, paddingHorizontal: 20 }}>
      <BackButton title="Saved Jobs" />
      {jobs.length === 0 ? (
        <Text style={{ textAlign: "center", marginTop: 20 }}>
          No saved jobs yet.
        </Text>
      ) : (
        <FlatList
          data={jobs}
          keyExtractor={(job) => job.id}
          renderItem={({ item }) => <JobCard job={item} initialSaved={true}/>}
          contentContainerStyle={{ paddingBottom: 150 }}
          showsVerticalScrollIndicator={false}
        />
      )}
    </View>
  );
}

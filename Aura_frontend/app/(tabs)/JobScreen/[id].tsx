import { useLocalSearchParams } from "expo-router"
import { ScrollView, Text, TouchableOpacity, Linking } from "react-native"
import React from "react";
import BackButton from "@/app/components/BackButton";

export default function JobDetails(){
    const { job } = useLocalSearchParams();
    const jobData = JSON.parse(job as string);

    return(
        <>
        <BackButton title={"Find your part time job"} /><ScrollView style={{ padding: 16 }}>
            <Text style={{ fontSize: 20, fontWeight: "bold" }}>{jobData.title}</Text>
            <Text style={{ fontSize: 16, color: "grey" }}>{jobData.company}</Text>
            <Text style={{ marginVertical: 10 }}>{jobData.location}</Text>
            <Text style={{ fontSize: 14 }}>{jobData.descriptionSnippet}</Text>
            <TouchableOpacity onPress={() => Linking.openURL(jobData.applyLink)}>
                <Text style={{ color: "white", textAlign: "center", fontWeight: "bold" }}>Apply Now</Text>
            </TouchableOpacity>
        </ScrollView>
        </>
    );
}
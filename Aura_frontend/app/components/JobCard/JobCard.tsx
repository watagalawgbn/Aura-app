import { View, Text, TouchableOpacity, Linking } from "react-native";
import React from "react";
import styles from "../../(tabs)/JobScreen/JobScreen.styles";
import { FontAwesome, Ionicons, MaterialIcons } from "@expo/vector-icons";

type Job = {
    id: string;
    title: string;
    company: string;
    location: string;
    type: string | null;
    postedAt: string;
    applyLink: string;
    description: string;
    remote: boolean;
};

type JobCardProps = {
    job: Job;
};

const JobCard = ({job}: JobCardProps) => {
    return(
        <View>
            <Text style={styles.jobTitle}>{job.title}</Text>
            <Text style={styles.companyName}>{job.company}</Text>
            <View style={styles.jobTags}>
                <View style={styles.tagWithIcon}>  
                    <Ionicons name="location" size={14} color="black"/>              
                    <Text style={styles.tagText}>{job.location}</Text>
                </View>
                <View style={styles.tagWithIcon}>  
                    <MaterialIcons name="schedule" size={14} color="black"/>              
                    <Text style={styles.tagText}>{job.type || "N/A"}</Text>
                </View>
                <View style={styles.tagWithIcon}>  
                    <FontAwesome name="dollar" size={14} color="black"/>              
                    <Text style={styles.tagText}>N/A</Text>
                </View>
            </View>
            <Text style={styles.jobDesc}>{job.description || "No description available."}</Text>
            <TouchableOpacity onPress={() => Linking.openURL(job.applyLink)}>
                <View style={styles.applyBtnFlex}>
                    <Text style={styles.applyButtonText}>Apply Now</Text>
                    <Ionicons name="arrow-forward-circle" size={20} color="white" />
                </View>
            </TouchableOpacity>
        </View>
    );
};

export default JobCard;
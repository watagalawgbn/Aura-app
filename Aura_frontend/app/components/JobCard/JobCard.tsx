import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import styles from "../../(tabs)/JobScreen/JobScreen.styles";
import { FontAwesome, Ionicons, MaterialIcons } from "@expo/vector-icons";


const JobCard = () => {
    return(
        <View>
            <Text style={styles.jobTitle}>{job.title}</Text>
            <Text style={styles.companyName}>{job.company}</Text>
            <View style={styles.jobTags}>
                <View style={styles.tagWithIcon}>  
                    <Ionicons name="location" size={14} color="black"/>              
                    <Text style={styles.tagText}>{}</Text>
                </View>
                <View style={styles.tagWithIcon}>  
                    <MaterialIcons name="schedule" size={14} color="black"/>              
                    <Text style={styles.tagText}>{job.employmentType}</Text>
                </View>
                <View style={styles.tagWithIcon}>  
                    <FontAwesome name="dollar" size={14} color="black"/>              
                    <Text style={styles.tagText}>{}</Text>
                </View>
            </View>
            <Text style={styles.jobDesc}>{JobCard.description}</Text>
            <TouchableOpacity>
                <View style={styles.applyBtnFlex}>
                    <Text style={styles.applyButtonText}>Apply Now</Text>
                    <Ionicons name="arrow-forward-circle" size={20} color="white" />
                </View>
            </TouchableOpacity>
        </View>
    );
};

export default JobCard;
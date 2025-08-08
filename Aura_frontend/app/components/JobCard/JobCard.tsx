import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import styles from './JobCard.styles';

// Define the shape of the job item
interface JobItem {
  job_id: string;
  employer_logo: string;
  employer_name: string;
  job_title: string;
  job_country: string;
}

// Define the component props
interface JobCardProps {
  item: JobItem;
  selectedJob: string;
  handleCardPress: (item: JobItem) => void;
}

const JobCard: React.FC<JobCardProps> = ({ item, selectedJob, handleCardPress }) => {
  return (
    <TouchableOpacity
      style={styles.container({ selectedJob, item })}
      onPress={() => handleCardPress(item)}
    >
      <TouchableOpacity style={styles.logoContainer({ selectedJob, item })}>
        <Image
          source={{ uri: item.employer_logo }}
          resizeMode="contain"
          style={styles.logoImage}
        />
      </TouchableOpacity>

      <Text style={styles.companyName} numberOfLines={1}>
        {item.employer_name}
      </Text>

      <View style={styles.infoContainer}>
        <Text style={styles.jobName({ selectedJob, item })} numberOfLines={1}>
          {item.job_title}
        </Text>
        <Text style={styles.location}>{item.job_country}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default JobCard;

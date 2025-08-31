import React, { useMemo, useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StatusBar,
  ScrollView,
  Image,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import styles from "./ProfileScreen.styles";
import { useAuth } from "../../../context/AuthContext";
import { getTasks } from "@/app/services/taskService";
import { fetchAverageSleep } from "@/app/services/sleepService";
import { getCurrentMood } from "@/app/services/moodService";
import { moodOptions } from "@/constants/moods";
import BackButton from "@/app/components/BackButton";

export default function Profile() {
  const router = useRouter();
  const { user, logout } = useAuth();

  const [name, setName] = useState(user?.name ?? "");
  const [email] = useState(user?.email ?? "");
  const [todaysTasks, setTodaysTasks] = useState<number>(0);
  const [avgSleep, setAvgSleep] = useState<number>(0);
  const [currentMood, setCurrentMood] = useState<string | null>(null);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        if (!user?.id) return;
        const tasks = await getTasks(user.id);
        setTodaysTasks(tasks.length);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };
    fetchTasks();
  }, [user?.id]);

  useEffect(() => {
    const load = async () => {
      try {
        const avg = await fetchAverageSleep();
        setAvgSleep(Number(avg.toFixed(1)));
      } catch (err) {
        console.error("Error fetching avg sleep:", err);
      }
    };
    load();
  }, []);

  useEffect(() => {
    const fetchMood = async () => {
      try {
        const mood = await getCurrentMood();
        setCurrentMood(mood);
      } catch (err) {
        console.error("Failed to load current mood:", err);
      }
    };

    fetchMood();
  }, []);

  const currentMoodData = moodOptions.find(
  m => m.label.toLowerCase() === currentMood?.toLowerCase()
);

  const firstName = (user?.name || "").split(" ")[0] || "User";

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff"/>
      <BackButton/>

      {/* HEADER */}
      <View style={styles.hero}>
        <View style={styles.welcomeRow}>
          <View style={styles.welcomeAvatar}>
            <Ionicons name="person" size={34} color="#5FB21F" />
          </View>
          <View style={{ flex: 1, paddingLeft: 10 }}>
            <Text style={styles.welcomeTitle}>Welcome back,</Text>
            <Text style={styles.welcomeTitle}>{firstName}</Text>
            <Text style={styles.welcomeSub}>
              Ready for your wellness journey today?
            </Text>
          </View>
        </View>

        {/* Wellness Cards */}
        <View style={styles.cardRow}>
          <View style={styles.card}>
            <View style={styles.cardHeader}>
              <Text style={styles.cardTitle}>Average Sleep</Text>
              <Ionicons name="moon-outline" size={18} color="#5FB21F" />
            </View>
            <Text style={styles.cardValue}>{avgSleep}</Text>
            <Text style={styles.cardSubtitle}>
              {avgSleep >= 7 ? "Optimal range" : "Below optimal"}
            </Text>
          </View>

          <View style={styles.card}>
            <View style={styles.cardHeader}>
              <Text style={styles.cardTitle}>Focus Sessions</Text>
              <Ionicons name="radio-outline" size={18} color="#5FB21F" />
            </View>
            <Text style={styles.cardValue}>{todaysTasks}</Text>
            <Text style={styles.cardSubtitle}>Today</Text>
          </View>
        </View>

        <View style={styles.moodRow}>
          <View style={styles.moodCard}>
            <View style={styles.cardHeader}>
              <Text style={styles.cardTitle}>Current Mood</Text>
              <Ionicons name="heart-outline" size={18} color="#5FB21F" />
            </View>

            {currentMoodData ? (
              <>
                <Image source={currentMoodData.image} style={{ width: 40, height: 40 }} />
                <Text style={styles.cardSubtitle}>{currentMoodData.label}</Text>
              </>
            ) : (
              <>
                <Text style={styles.cardEmoji}>🙂</Text>
                <Text style={styles.cardSubtitle}>No mood logged</Text>
              </>
            )}
          </View>
        </View>
      </View>

      <ScrollView
        contentContainerStyle={styles.body}
        showsVerticalScrollIndicator={false}
      >
        {/* Account */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Account</Text>
          </View>

          <View style={styles.inputRow}>
            <Ionicons
              name="person-outline"
              size={20}
              style={styles.inputIcon}
            />
            <TextInput
              style={styles.input}
              placeholder="Your name"
              placeholderTextColor="#8EA09D"
              value={name}
              onChangeText={setName}
              returnKeyType="done"
            />
          </View>

          <View style={{ height: 10 }} />

          <View style={[styles.inputRow, { opacity: 0.75 }]}>
            <Ionicons name="mail-outline" size={20} style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              editable={false}
              value={email}
              placeholder="Email"
              placeholderTextColor="#8EA09D"
            />
          </View>
        </View>

        <TouchableOpacity
          style={[styles.button, styles.logoutBtn]}
          onPress={async () => {
            logout();
            router.replace("/(auth)/SignIn/SignIn");
          }}
        >
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

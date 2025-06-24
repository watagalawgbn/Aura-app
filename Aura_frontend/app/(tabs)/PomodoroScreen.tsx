import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  ScrollView,
  Modal,
  TextInput,
  Pressable,
  TouchableOpacity,
} from "react-native";
import React, { useState, useEffect } from "react";
import BackButton from "../components/BackButton";
import { LinearGradient } from "expo-linear-gradient";
import { Feather } from "@expo/vector-icons";
import axios from "axios";
import { BASE_URL } from "@/constants/Api";
import { useAuth } from "@/context/AuthContext";
import { Audio } from "expo-av";

type Task = { _id?: string; name: string; note: string; userId?: string };

const playAlarm = async () => {
  try {
    const { sound } = await Audio.Sound.createAsync(
      require("../assets/audios/alarm.mp3")
    );
    await sound.playAsync();

    // Unload after 4 seconds
    setTimeout(() => {
      sound.unloadAsync();
    }, 4000);
  } catch (error) {
    console.warn("Failed to play sound:", error);
  }
};

const PomodoroScreen = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [currentTaskIndex, setCurrentTaskIndex] = useState<number | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [newTask, setNewTask] = useState<Task>({ name: "", note: "" });
  const [showGlobalOptions, setShowGlobalOptions] = useState(false);
  const [isBreak, setIsBreak] = useState(false);
  const [secondsLeft, setSecondsLeft] = useState(25 * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [taskMenuIndex, setTaskMenuIndex] = useState<number | null>(null);

  const { user } = useAuth();

  useEffect(() => {
    let timer: any;
    if (isRunning) {
      timer = setInterval(() => {
        setSecondsLeft((prev) => {
          if (prev <= 1) {
            setIsRunning(false);
            playAlarm();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isRunning]);

  const formatTime = (s: number) => {
    const m = Math.floor(s / 60);
    const sec = s % 60;
    return `${m.toString().padStart(2, "0")}:${sec
      .toString()
      .padStart(2, "0")}`;
  };

  const toggleTimer = () => {
    if (tasks.length === 0 || currentTaskIndex === null) {
      alert("Please add a task before starting the timer.");
      return;
    }
    setIsRunning((prev) => !prev);
  };

  const switchMode = (breakMode: boolean) => {
    setIsBreak(breakMode);
    setSecondsLeft(breakMode ? 5 * 60 : 25 * 60);
    setIsRunning(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
      <BackButton title="Study Smart" />

      <View style={styles.modeSelector}>
        <TouchableOpacity
          style={[styles.modeButton, !isBreak && styles.activeMode]}
          onPress={() => switchMode(false)}
        >
          <Text style={styles.modeText}>Pomodoro</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.modeButton, isBreak && styles.activeMode]}
          onPress={() => switchMode(true)}
        >
          <Text style={styles.modeText}>Short break</Text>
        </TouchableOpacity>
      </View>

      <LinearGradient
        colors={["#294C0D", "#5FB21F"]}
        style={styles.circleWrapper}
      >
        <View style={styles.circleInner}>
          <Text style={styles.timerText}>{formatTime(secondsLeft)}</Text>
          <TouchableOpacity style={styles.startButton} onPress={toggleTimer}>
            <Text style={styles.startText}>
              {isRunning ? "Pause" : "Start"}
            </Text>
          </TouchableOpacity>
        </View>
      </LinearGradient>

      <ScrollView contentContainerStyle={styles.scrollContent}>
      {currentTaskIndex !== null && tasks.length > 0 && (
        <View style={styles.currentTaskCard}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              flex: 1,
              flexWrap: "wrap",
            }}
          >
            <Feather
              name="bookmark"
              size={35}
              color="#294C0D"
              style={{ marginRight: 5 }}
            />
            <Text
              style={[styles.currentTaskName, { maxWidth: "75%" }]}
              numberOfLines={2}
              ellipsizeMode="tail"
            >
              {tasks[currentTaskIndex].name}
            </Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginTop: 5,
            }}
          >
            <Feather
              name="clock"
              size={15}
              color="#294C0D"
              style={{ marginRight: 8 }}
            />
            <Text style={styles.currentTaskMeta}>
              {currentTaskIndex + 1}/{tasks.length} · {isBreak ? "5" : "25"}{" "}
              Mins
            </Text>
          </View>
        </View>
      )}

      
        <View style={{ paddingHorizontal: 20, marginTop: 30 }}>
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <Text style={styles.sectionTitle}>Task</Text>
            <TouchableOpacity
              onPress={() => setShowGlobalOptions(!showGlobalOptions)}
            >
              <Feather name="more-vertical" size={24} color="#52AE77" />
            </TouchableOpacity>
          </View>

          {showGlobalOptions && (
            <View style={styles.menuContainer}>
              <TouchableOpacity
                onPress={() => {
                  setTasks((prev) =>
                    prev.filter((_, i) => i !== currentTaskIndex)
                  );
                  setCurrentTaskIndex(null);
                  setShowGlobalOptions(false);
                }}
              >
                <Text style={styles.menuItem}>Clear Finished Tasks</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={async () => {
                  for (const task of tasks) {
                    await axios.delete(`${BASE_URL}/api/tasks/${task._id}`);
                  }
                  setTasks([]);

                  setCurrentTaskIndex(null);
                  setShowGlobalOptions(false);
                }}
              >
                <Text style={styles.menuItem}>Clear All Tasks</Text>
              </TouchableOpacity>
            </View>
          )}

          {tasks.map((task, index) => (
            <View key={index} style={styles.taskItemContainer}>
              <View style={styles.taskItem}>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                  }}
                >
                  <TouchableOpacity
                    style={{ flex: 1 }}
                    onPress={() => setCurrentTaskIndex(index)}
                  >
                    <Text
                      style={{ fontSize: 16, fontWeight: "bold" }}
                      numberOfLines={2}
                      ellipsizeMode="tail"
                    >
                      {task.name}
                    </Text>
                    {task.note ? (
                      <Text style={{ fontSize: 12, color: "#555" }}>
                        {task.note}
                      </Text>
                    ) : null}
                  </TouchableOpacity>

                  <TouchableOpacity
                    onPress={() =>
                      setTaskMenuIndex(taskMenuIndex === index ? null : index)
                    }
                  >
                    <Feather name="more-vertical" size={20} color="#52AE77" />
                  </TouchableOpacity>
                </View>

                {taskMenuIndex === index && (
                  <View style={styles.taskMenu}>
                    {/* ... menu items ... */}
                  </View>
                )}
              </View>

              {taskMenuIndex === index && (
                <View style={styles.taskMenu}>
                  <TouchableOpacity
                    onPress={() => {
                      setEditIndex(index);
                      setNewTask(task);
                      setShowModal(true);
                      setTaskMenuIndex(null);
                    }}
                  >
                    <Text style={styles.menuItem}>Edit</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={async () => {
                      try {
                        const deleted = tasks[index];
                        await axios.delete(
                          `${BASE_URL}/api/tasks/${deleted._id}`
                        );
                        const updatedTasks = tasks.filter(
                          (_, i) => i !== index
                        );
                        setTasks(updatedTasks);
                        setCurrentTaskIndex((prev) =>
                          prev === index
                            ? null
                            : prev && prev > index
                            ? prev - 1
                            : prev
                        );
                        setTaskMenuIndex(null);
                      } catch (err) {
                        console.error("Failed to delete task", err);
                      }
                    }}
                  >
                    <Text style={styles.menuItem}>Delete</Text>
                  </TouchableOpacity>
                </View>
              )}
            </View>
          ))}

          <TouchableOpacity
            style={styles.addTaskButton}
            onPress={() => {
              setNewTask({ name: "", note: "" });
              setEditIndex(null);
              setShowModal(true);
            }}
          >
            <Text style={styles.addTaskText}>+ Add Task</Text>
          </TouchableOpacity>
        </View>

        {/* MODAL */}
        <Modal visible={showModal} animationType="slide" transparent>
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Add a new task</Text>
              <TextInput
                placeholder="What are you working on?"
                style={styles.input}
                value={newTask.name}
                onChangeText={(text) =>
                  setNewTask((t) => ({ ...t, name: text }))
                }
              />
              <TextInput
                placeholder="+ Add note"
                style={styles.input}
                value={newTask.note}
                onChangeText={(text) =>
                  setNewTask((t) => ({ ...t, note: text }))
                }
              />
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <Pressable
                  style={[styles.modalButton, { backgroundColor: "#5FB21F" }]}
                  onPress={async () => {
                    if (newTask.name.trim()) {
                      try {
                        if (editIndex !== null) {
                          // PUT (update existing)
                          const existing = tasks[editIndex];
                          const res = await axios.put(
                            `${BASE_URL}/api/tasks/${existing._id}`,
                            {
                              ...existing,
                              ...newTask,
                            }
                          );
                          const updated = [...tasks];
                          updated[editIndex] = res.data;
                          setTasks(updated);
                        } else {
                          // POST (create new)
                          const res = await axios.post(
                            `${BASE_URL}/api/tasks`,
                            {
                              ...newTask,
                              userId: user?.id,
                            }
                          );
                          setTasks((prev) => [...prev, res.data]);
                          if (tasks.length === 0) setCurrentTaskIndex(0);
                        }
                        setShowModal(false);
                        setNewTask({ name: "", note: "" });
                        setEditIndex(null);
                      } catch (err) {
                        console.error("Error saving task", err);
                      }
                    }
                  }}
                >
                  <Text style={styles.modalButtonText}>Save</Text>
                </Pressable>
                <Pressable
                  style={[styles.modalButton, { backgroundColor: "#ccc" }]}
                  onPress={() => {
                    setShowModal(false);
                    setEditIndex(null);
                  }}
                >
                  <Text style={{ fontWeight: "bold" }}>Cancel</Text>
                </Pressable>
              </View>
            </View>
          </View>
        </Modal>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#ffffff" },
  scrollContent: { flexGrow: 1, paddingBottom: 150 },
  taskTitle: { fontSize: 18, fontWeight: "bold", color: "#294C0D" },
  modeSelector: {
    flexDirection: "row",
    justifyContent: "center",
    marginVertical: 10,
  },
  modeButton: {
    borderRadius: 10,
    paddingVertical: 8,
    paddingHorizontal: 16,
    marginHorizontal: 5,
    backgroundColor: "#eee",
  },
  activeMode: { backgroundColor: "#5FB21F" },
  modeText: { color: "#294C0D", fontWeight: "bold" },
  circleWrapper: {
    alignSelf: "center",
    marginTop: 20,
    padding: 5,
    borderRadius: 160,
  },
  circleInner: {
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
  },
  timerText: { fontSize: 36, fontWeight: "bold", color: "#294C0D" },
  startButton: {
    backgroundColor: "#5FB21F",
    marginTop: 10,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },
  startText: { color: "#fff", fontWeight: "bold", fontSize: 16 },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    paddingRight: 300,
    color: "black",
    borderBottomWidth: 3,
    borderBottomColor: "black",
    paddingBottom: 5,
  },
  taskItem: {
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 10,
    marginBottom: 10,
    elevation: 2,
    flexDirection: "column",
  },
  addTaskButton: {
    borderStyle: "dashed",
    borderWidth: 1,
    borderColor: "#5FB21F",
    padding: 10,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 10,
  },
  addTaskText: { color: "#5FB21F", fontWeight: "bold" },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    width: "90%",
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20,
  },
  modalTitle: { fontSize: 18, fontWeight: "bold", marginBottom: 10 },
  input: {
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
    fontStyle: "italic",
  },
  modalButton: {
    flex: 1,
    padding: 10,
    marginHorizontal: 5,
    borderRadius: 8,
    alignItems: "center",
  },
  modalButtonText: { color: "#fff", fontWeight: "bold" },
  currentTaskCard: {
    backgroundColor: "#D1F2C8",
    alignItems: "center",
    marginHorizontal: 20,
    marginTop: 20,
    padding: 10,
    borderRadius: 10,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
  },
  currentTaskName: { fontSize: 16, fontWeight: "bold", color: "#294C0D" },
  currentTaskMeta: { fontSize: 12, color: "#294C0D" },
  menuContainer: {
    backgroundColor: "#fff",
    position: "absolute",
    right: 20,
    top: 30,
    padding: 10,
    borderRadius: 8,
    elevation: 5,
    zIndex: 10,
  },
  menuItem: { paddingVertical: 8, fontSize: 16, color: "#294C0D" },
  taskItemContainer: { position: "relative", marginBottom: 10 },
  taskMenu: {
    position: "absolute",
    top: 45,
    right: 20,
    backgroundColor: "#fff",
    borderRadius: 8,
    elevation: 5,
    paddingLeft: 20,
    paddingRight: 20,
    zIndex: 10,
  },
});

export default PomodoroScreen;

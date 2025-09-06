import {
  View,
  Text,
  SafeAreaView,
  StatusBar,
  ScrollView,
  Modal,
  TextInput,
  Pressable,
  TouchableOpacity,
  Alert,
} from "react-native";
import styles from "./PomodoroScreen.styles";
import React, { useState, useEffect } from "react";
import BackButton from "../../components/BackButton";
import { LinearGradient } from "expo-linear-gradient";
import { Feather } from "@expo/vector-icons";
import { useAuth } from "@/context/AuthContext";
import { Audio } from "expo-av";
import {
  addTask,
  deleteTask,
  updateTask,
  getTasks,
  toggleTaskCompletion,
} from "@/app/services/taskService";
import { Task } from "@/types/task";
import Toast from "react-native-toast-message";

const PomodoroScreen = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [currentTaskIndex, setCurrentTaskIndex] = useState<number | null>(null);
  const [showModal, setShowModal] = useState(false); //add task modal
  const [newTask, setNewTask] = useState<Task>({ name: "", note: "" }); //data for new/edited task
  const [showGlobalOptions, setShowGlobalOptions] = useState(false); //clear tasks menu
  const [isBreak, setIsBreak] = useState(false); // pomodoro/break mode
  const [secondsLeft, setSecondsLeft] = useState(1 * 60); //countdown time in seconds
  const [isRunning, setIsRunning] = useState(false); //timer state
  const [editIndex, setEditIndex] = useState<number | null>(null); //index of task being edited
  const [taskMenuIndex, setTaskMenuIndex] = useState<number | null>(null); //index of task menu being shown
  const [showBanner, setShowBanner] = useState(false); //show pomodoro/break banner
  const [bannerMessage, setBannerMessage] = useState(""); // message inside banner
  const { user } = useAuth(); //get current user

  // ---------------- TIMER ----------------
  useEffect(() => {
    let timer: any;
    if (isRunning) {
      timer = setInterval(() => {
        setSecondsLeft((prev: number) => {
          if (prev <= 1) {
            //stop timer
            setIsRunning(false);

            // Play alarm sound
            playAlarm();

            // Show bannermessage
            if (!isBreak) {
              setBannerMessage("Pomodoro finished 🎉 Time for a break!");
              switchMode(true); //switch to break
            } else {
              setBannerMessage("Break over ⏰ Back to work!");
              switchMode(false); //switch back to pomodoro
            }
            setShowBanner(true);

            // Auto-hide banner after 3 seconds
            setTimeout(() => setShowBanner(false), 3000);

            return 0;
          }
          return prev - 1; // decrement seconds
        });
      }, 1000); // run every second
    }
    return () => {
      if (timer) clearInterval(timer); //cleanup when stopping
    };
  }, [isRunning, isBreak]);

  //---------------- LOAD TASKS ----------------
  useEffect(() => {
    const loadTasks = async () => {
      if (user?.id) {
        const fetched = await getTasks(user.id);
        setTasks(fetched);

        // set first task as current
        if (fetched.length > 0) {
          setCurrentTaskIndex(0);
        }
      }
    };

    loadTasks();
  }, [user?.id]);

  // ---------------- HELPERS ----------------
  //format seconds into mm:ss
  const formatTime = (s: number) => {
    const m = Math.floor(s / 60);
    const sec = s % 60;
    return `${m.toString().padStart(2, "0")}:${sec
      .toString()
      .padStart(2, "0")}`;
  };

  //start/pause timer
  const toggleTimer = () => {
    if (tasks.length === 0 || currentTaskIndex === null) {
      Toast.show({
        type: "error",
        text1: "Error ⚠️",
        text2: "Please add a task before starting the timer!",
        visibilityTime: 4000,
        position: "bottom",
        autoHide: true,
      });
      return;
    }
    setIsRunning((prev) => !prev);
  };

  //play alarm sound
  async function playAlarm() {
    try {
      const { sound } = await Audio.Sound.createAsync(
        require("../../../assets/audios/clock.mp3")
      );
      await sound.playAsync();
    } catch (err) {
      console.error("Error playing sound:", err);
    }
  }

  //switch between pomodoro and break
  const switchMode = (breakMode: boolean) => {
    setIsBreak(breakMode);
    setSecondsLeft(breakMode ? 5 * 60 : 25 * 60);
    setIsRunning(false);
  };

  // ----------------SAVE TASK----------------
  const handleSaveTask = async () => {
    if (newTask.name.trim()) {
      try {
        if (editIndex != null) {
          // update existing
          const existing = tasks[editIndex];
          const updatedTask = await updateTask(existing._id!, newTask);

          if (updatedTask) {
            const updated = [...tasks];
            updated[editIndex] = updatedTask;
            setTasks(updated);
          }
        } else {
          // add new task
          const res = await addTask(newTask, user?.id!);

          if (res.status === 201 && res.task) {
            const task: Task = res.task;
            setTasks((prev) => [...prev, task]);
            if (tasks.length === 0) setCurrentTaskIndex(0);
          } else if (res.status === 403) {
            Toast.show({
              type: "limit",
              text1: "Workload Limit Reached",
              text2: `${res.data.message}\nYou’ve already focused for ${res.data.usedMinutes} mins today.`,
              props: {
                onAddAnyway: async () => {
                  const overrideRes = await addTask(newTask, user?.id!, true);
                  if (overrideRes.task) {
                    setTasks((prev) => [...prev, overrideRes.task as Task]);
                  }
                },
              },
            });
          } else if (res.status === 409) {
            // user didn't log sleep hours
            Toast.show({
              type: "error",
              text1: "Error ⚠️",
              text2: "Please log your sleep hours before adding tasks!",
              visibilityTime: 4000,
              position: "bottom",
              autoHide: true,
            });
          }
        }

        //reset modal state
        setShowModal(false);
        setNewTask({ name: "", note: "" });
        setEditIndex(null);
      } catch (err) {
        console.error("Error saving task", err);
      }
    }
  };

  // ----------------DELETE TASK----------------
  const handleDeleteTask = async (index: number) => {
    try {
      const deleted = tasks[index];
      await deleteTask(deleted._id!);
      const updatedTasks = tasks.filter((_, i) => i !== index);
      setTasks(updatedTasks);
      //update current task index
      setCurrentTaskIndex((prev) =>
        prev === index ? null : prev && prev > index ? prev - 1 : prev
      );
      setTaskMenuIndex(null);
    } catch (err) {
      console.error("Failed to delete task", err);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
      <BackButton title="Study Smart" />

      {/* MODE SELECTOR */}
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

      {/* TIMER */}
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

      {/* TASKS */}
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
          {/* HEADER */}
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

          {/* GLOBAL MENU */}
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
                    if (task._id) {
                      await deleteTask(task._id);
                    }
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

          {/* TASK LIST */}
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
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      flex: 1,
                    }}
                  >
                    <TouchableOpacity
                      onPress={async () => {
                        const updated = await toggleTaskCompletion(
                          task._id!,
                          !task.completed
                        );

                        setTasks((prev) => {
                          // update the task in place
                          const updatedList = prev.map((t) =>
                            t._id === updated._id ? updated : t
                          );

                          // move completed tasks to bottom
                          const reordered = [
                            ...updatedList.filter((t) => !t.completed),
                            ...updatedList.filter((t) => t.completed),
                          ];

                          // set current task to first uncompleted
                          const nextIndex = reordered.findIndex(
                            (t) => !t.completed
                          );

                          setCurrentTaskIndex(
                            nextIndex !== -1 ? nextIndex : null
                          );

                          return reordered;
                        });
                      }}
                      style={{
                        width: 24,
                        height: 24,
                        borderRadius: 12,
                        borderWidth: 2,
                        borderColor: "#52AE77",
                        marginRight: 10,
                        justifyContent: "center",
                        alignItems: "center",
                        backgroundColor: task.completed
                          ? "#52AE77"
                          : "transparent",
                      }}
                    >
                      {task.completed && (
                        <Feather name="check" size={16} color="#fff" />
                      )}
                    </TouchableOpacity>

                    <TouchableOpacity
                      style={{ flex: 1 }}
                      onPress={() => setCurrentTaskIndex(index)}
                    >
                      <Text
                        style={{
                          fontSize: 16,
                          fontWeight: "bold",
                          textDecorationLine: task.completed
                            ? "line-through"
                            : "none",
                          color: task.completed ? "#999" : "#000",
                        }}
                        numberOfLines={2}
                        ellipsizeMode="tail"
                      >
                        {task.name}
                      </Text>
                      {task.note ? (
                        <Text
                          style={{
                            fontSize: 12,
                            color: task.completed ? "#aaa" : "#555",
                            textDecorationLine: task.completed
                              ? "line-through"
                              : "none",
                          }}
                        >
                          {task.note}
                        </Text>
                      ) : null}
                    </TouchableOpacity>
                  </View>

                  <TouchableOpacity
                    onPress={() =>
                      setTaskMenuIndex(taskMenuIndex === index ? null : index)
                    }
                  >
                    <Feather name="more-vertical" size={20} color="#52AE77" />
                  </TouchableOpacity>
                </View>
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
                  <TouchableOpacity onPress={() => handleDeleteTask(index)}>
                    <Text style={styles.menuItem}>Delete</Text>
                  </TouchableOpacity>
                </View>
              )}
            </View>
          ))}

          {/* ADD TASK */}
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
                  onPress={handleSaveTask}
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
      {showBanner && (
        <View
          style={{
            position: "absolute",
            top: 60,
            left: 20,
            right: 20,
            padding: 15,
            backgroundColor: "#52AE77",
            borderRadius: 10,
            alignItems: "center",
            shadowColor: "#000",
            shadowOpacity: 0.2,
            shadowOffset: { width: 0, height: 2 },
            shadowRadius: 4,
            elevation: 5,
          }}
        >
          <Text style={{ color: "#fff", fontWeight: "bold" }}>
            {bannerMessage}
          </Text>
        </View>
      )}
    </SafeAreaView>
  );
};

export default PomodoroScreen;

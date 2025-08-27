import apiClient from "./apiClient";
import { taskData } from "@/types/task";

//-------------ADD TASK------------
export const addTask = async (newTask: taskData, userId: string, override = false): Promise<{task?: taskData, status: number; data: any}> => {
  try {
    const res = await apiClient.post(`/api/tasks`, {
      ...newTask, // spread task fields (name, note, etc.)
      userId,
      override,
    });
    return {task: res.data.task, status: res.status, data: res.data}; //return created task
  } catch (e: any) {
    if(e.response){
      return { status: e.response.status, data: e.response.data};    
    }
    throw new Error("Failed to add new task!");
  }
};

//------------ Toggle task completion -------------
export const toggleTaskCompletion = async (taskId: string, completed: boolean) => {
  try {
    const res = await apiClient.patch(`/api/tasks/${taskId}`, { completed }); //only update completed field
    return res.data; //return updated task
  } catch (err) {
    console.error("Error toggling task completion", err);
    throw err;
  }
};


//------------UPDATE TASK----------------
export const updateTask = async(taskId: string, updates: Partial<taskData>): Promise<taskData> => { //accept partal updates
    try{
        const req = await apiClient.put(`/api/tasks/${taskId}`, updates);
        console.log("Updated task: ", req.data);
        return req.data; //return updated task
    }
    catch(e){
        console.error("Failed to update task:", e);
        throw new Error("Failed to update task!");
    }
};

//--------------DELETE TASK----------------
export const deleteTask = async(taskId: string): Promise<void> => {
    try{
        const res = await apiClient.delete(`/api/tasks/${taskId}`);
        console.log("Deleted task:", res.data);
    }
    catch(e){
        console.error("Failed to delete task: ", e);
        throw new Error("Failed to delete the task!");
    }
};

//--------------GET TASKS----------------
export const getTasks = async (userId: string) => {
  try {
    const res = await apiClient.get(`/api/tasks?userId=${userId}`);
    return res.data.tasks; // backend should return { tasks: Task[] }
  } catch (err) {
    console.error("Error fetching tasks", err);
    return [];
  }
};

export default { addTask, updateTask, deleteTask };

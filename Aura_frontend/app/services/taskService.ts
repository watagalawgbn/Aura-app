import apiClient from "./apiClient";

type taskData = {
  _id?: string,
  name: string,
  note: string,
  userId?: string,
};

// add task
export const addTask = async (newTask: taskData, userId: string, override = false): Promise<{task?: taskData, status: number; data: any}> => {
  try {
    const req = await apiClient.post(`/api/tasks`, {
      ...newTask,
      userId,
      override,
    });
    console.log("task added:", req.data.task);
    console.log("Tdata:", req.data);
    return {task: req.data.task, status: req.status, data: req.data};
  } catch (e: any) {
    if(e.response){
      return { status: e.response.status, data: e.response.data};    
    }
    throw new Error("Failed to add new task!");
  }
};

//update task
export const updateTask = async(taskId: string, updates: Partial<taskData>): Promise<taskData> => {
    try{
        const req = await apiClient.put(`/api/tasks/${taskId}`, updates);
        console.log("Updated task: ", req.data);
        return req.data;
    }
    catch(e){
        console.error("Failed to update task:", e);
        throw new Error("Failed to update task!");
    }
};

// delete a task
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

export const getTasks = async (userId: string) => {
  try {
    const res = await apiClient.get(`/api/tasks?userId=${userId}`);
    return res.data.tasks; // make sure your backend returns { tasks: Task[] }
  } catch (err) {
    console.error("Error fetching tasks", err);
    return [];
  }
};

export default { addTask, updateTask, deleteTask };

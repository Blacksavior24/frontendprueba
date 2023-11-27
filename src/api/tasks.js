import axios from 'axios';

const BASE_URL = 'https://backend-10e2.onrender.com/api/v1/tasks';

export const fetchTasks = async () => {
  try {
    const response = await axios.get(BASE_URL);
    return response.data;
  } catch (error) {
    throw new Error(error);
  }
};

export const createTask = async (taskData) => {
  try {
    console.log("api", taskData);
    const response = await axios.post(BASE_URL, taskData);
    return response.data;
  } catch (error) {
    throw new Error(error);
  }
};

export const updateTask = async (taskId, updatedTaskData) => {
  try {
    console.log("api", taskId, updatedTaskData );
    const url = `${BASE_URL}/${taskId}`;
    const response = await axios.patch(url, updatedTaskData);
    return response.data;
  } catch (error) {
    throw new Error(error);
  }
};

export const deleteTask = async (taskId) => {
  try {
    const url = `${BASE_URL}/${taskId}`;
    const response = await axios.delete(url);
    return response.data;
  } catch (error) {
    throw new Error(error);
  }
};

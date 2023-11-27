import { fetchTasks, createTask as apiCreateTask, updateTask as apiUpdateTask, deleteTask as apiDeleteTask } from '../api/tasks';

export const setTasks = (tasks) => ({
  type: 'SET_TASKS',
  payload: tasks,
});

export const getTasks = () => async (dispatch) => {
  try {
    const tasks = await fetchTasks();
    dispatch(setTasks(tasks));
  } catch (error) {
    console.log('Error', error);
  }
};

export const addTask = (newTask) => ({
  type: 'ADD_TASK',
  payload: newTask,
});

export const createTask = (taskData) => async (dispatch) => {
  try {
    console.log("action create", taskData);
    const newTask = await apiCreateTask(taskData);
    dispatch(addTask(newTask)); 
  } catch (error) {
    console.log('Error creating task', error);
  }
};

export const updateTask = (taskId, updatedTaskData) => async (dispatch) => {
  try {
    console.log("action update", taskId, updatedTaskData);
    await apiUpdateTask(taskId, updatedTaskData);
    dispatch({
      type: 'UPDATE_TASK',
      payload: {
        taskId,
        updatedTaskData,
      },
    }); 
  } catch (error) {
    console.log('Error updating task', error);
  }
};

export const deleteTask = (taskId) => async (dispatch) => {
  try {
    await apiDeleteTask(taskId);
    dispatch({
      type: 'DELETE_TASK',
      payload: {
        taskId,
      },
    });
  } catch (error) {
    console.log('Error deleting task', error);
  }
};

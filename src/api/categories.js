import axios from 'axios';

const BASE_URL = 'https://backend-10e2.onrender.com/api/v1/categories';

export const fetchCategories = async () => {
  try {
    const response = await axios.get(BASE_URL);
    console.log("respuesta", response);
    return response.data;
  } catch (error) {
    throw new Error(error);
  }
};

export const createCategory = async (CategoryData) => {
  try {
    console.log("api", CategoryData);
    const response = await axios.post(BASE_URL, CategoryData);
    return response.data;
  } catch (error) {
    throw new Error(error);
  }
};

export const updateCategory = async (CategoryId, updatedCategoryData) => {
  try {
    console.log("api", CategoryId, updatedCategoryData );
    const url = `${BASE_URL}/${CategoryId}`;
    const response = await axios.patch(url, updatedCategoryData);
    return response.data;
  } catch (error) {
    throw new Error(error);
  }
};

export const deleteCategory = async (CategoryId) => {
  try {
    const url = `${BASE_URL}/${CategoryId}`;
    const response = await axios.delete(url);
    return response.data;
  } catch (error) {
    throw new Error(error);
  }
};

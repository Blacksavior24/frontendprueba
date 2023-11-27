import { fetchCategories, createCategory as apiCreateCategory, updateCategory as apiUpdateCategory, deleteCategory as apiDeleteCategory } from '../api/categories';


export const setCategories = (categories) => ({
    type: 'SET_CATEGORIES',
    payload: categories,
});
  

export const getCategories = () => async (dispatch) => {
    try {
      const categories = await fetchCategories();
      console.log("actions categories", categories);
      dispatch(setCategories(categories));
    } catch (error) {
      console.log('Error', error);
    }
};

export const addCategory = (newCategory) => ({
    type: 'ADD_CATEGORY',
    payload: newCategory,
});
  

export const createCategory = (categoryData) => async (dispatch) => {
    try {
      console.log("action create", categoryData);
      const newCategory = await apiCreateCategory(categoryData);
      dispatch(addCategory(newCategory)); 
    } catch (error) {
      console.log('Error creating category', error);
    }
};

export const updateCategory = (categoryId, updatedCategoryData) => async (dispatch) => {
    try {
      console.log("action update", categoryId, updatedCategoryData);
      await apiUpdateCategory(categoryId, updatedCategoryData);
      dispatch({
        type: 'UPDATE_CATEGORY',
        payload: {
          id: categoryId,
          updateCategoryData: updatedCategoryData,
        },
      }); 
    } catch (error) {
      console.log('Error updating category', error);
    }
};

export const deleteCategory = (categoryId) => async (dispatch) => {
    try {
      await apiDeleteCategory(categoryId);
      dispatch({
        type: 'DELETE_CATEGORY',
        payload: {
          categoryId,
        },
      });
    } catch (error) {
      console.log('Error deleting category', error);
    }
};

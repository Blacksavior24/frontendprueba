const initialState = {
    categories: [],
  };
  
  const categoriesReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'SET_CATEGORIES':
        return {
          ...state,
          categories: action.payload,
        };
      case 'ADD_CATEGORY':
        return {
          ...state,
          categories: [...state.categories, action.payload],
        };
      case 'UPDATE_CATEGORY':
        return {
          ...state,
          categories: state.categories.map((category) =>
            category.id === action.payload.id ? { ...category, ...action.payload.updateCategoryData } : category
          ),
        };
      case 'DELETE_CATEGORY':
        return {
          ...state,
          categories: state.categories.filter((category) => category.id !== action.payload.categoryId),
        };
      default:
        return state;
    }
  };
  
  export default categoriesReducer;
  
import {createSlice} from '@reduxjs/toolkit';
import {categories} from '../../constants/mocks';



const categorySlice = createSlice({
  name: 'categories',
  initialState: categories,
  reducers: {
    addCategory: (state, action) => {
      state.push({...action.payload, id: state.length});
    },

    editCategory: (state, action) => {
      const category = action.payload;
      const idx = state.findIndex(e => e.id === category.id);
      state[idx] = category;
    },

    deleteCategory: (state, action) => {
      const category = action.payload;
      const idx = state.findIndex(e => e.id === category.id);
      state.splice(idx, 1);
    },
  },
});


export const {
  actions: {addCategory, editCategory, deleteCategory},
  reducer: categoryReducers,
} = categorySlice;

export const selectCategory = state => state.categories;

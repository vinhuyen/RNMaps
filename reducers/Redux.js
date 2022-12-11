import {categoryReducers} from './slices/category';
const {configureStore} = require('@reduxjs/toolkit');

export const store = configureStore({
  reducer: {
    categories: categoryReducers,
  },
});

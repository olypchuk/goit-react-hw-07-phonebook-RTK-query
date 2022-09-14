import { configureStore } from '@reduxjs/toolkit'
import { filterSlice } from './filterSlice'
import { contactsApi } from './createApi';

export const store = configureStore({
  reducer: {
    [contactsApi.reducerPath]: contactsApi.reducer,
    [filterSlice.name]:filterSlice.reducer,
  },
   middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(contactsApi.middleware)

})




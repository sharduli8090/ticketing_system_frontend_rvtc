import { configureStore } from '@reduxjs/toolkit';
import reducer from './reducer';

const store = configureStore({
  reducer: {
    counter: reducer, // Combine reducers here if needed
  },
});

export default store;

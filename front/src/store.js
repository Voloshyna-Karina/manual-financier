import { configureStore } from "@reduxjs/toolkit";
import logger from "redux-logger";
import rootReduser from './reducers';

const store = configureStore({
  reducer: rootReduser,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});

export default store;

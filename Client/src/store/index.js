import { combineReducers } from "redux";
import { configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage/session";
import { persistReducer, persistStore } from "redux-persist";
import thunkMiddleware from "redux-thunk";
import authReducer from "./reducers/auth";
const persistConfig = {
  key: "root",
  storage,
};
const rootReducer = combineReducers({
  auth: authReducer,
});
const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: [thunkMiddleware],
});
export const persistor = persistStore(store);

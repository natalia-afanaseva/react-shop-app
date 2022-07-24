import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/auth";
import orderReducer from "./slices/order";

const store = configureStore({
  reducer: {
    auth: authReducer,
    order: orderReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {auth: AuthType, ..: ..Type}
export type AppDispatch = typeof store.dispatch;

export default store;

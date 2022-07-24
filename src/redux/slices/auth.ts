import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

// Define a type for the slice state
interface AuthState {
  isAuth: boolean;
  currentUserUid: string | null;
}

// Define the initial state using that type
const initialState: AuthState = {
  isAuth: false,
  currentUserUid: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setLogin: (state, action: PayloadAction<string>) => {
      state.isAuth = true;
      state.currentUserUid = action.payload;
    },
    setLogout: (state) => {
      state.isAuth = false;
      state.currentUserUid = null;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setLogin, setLogout } = authSlice.actions;

export const isAuth = (state: RootState) => state.auth.isAuth;

export default authSlice.reducer;

import { logout } from "@/services/AuthService";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type State = {
  user?: any;
};

const initialState: State = {
  user: { id: null, email: null },
};

export const user = createSlice({
  name: "user",
  initialState,
  reducers: {
    addUserDetails: (state: any, action: PayloadAction<any>) => {
      state.user = { ...state.user, ...action.payload };
    },

    logOutUser: (state: any, action: PayloadAction<any>) => {
      try {
        logout();
        action.payload.push("/login");
        state.user = initialState?.user;
      } catch (err) {
        console.log("err:", err);
      }
    },
  },
});

export const { addUserDetails, logOutUser } = user.actions;

export default user.reducer;

import { configureStore } from "@reduxjs/toolkit";

import authReducer from "./authSlice";
import userArraySlice from "./userArraySlice";

export const store = configureStore({
  reducer: {
    auth: authReducer, //slice which handles authentication
    userArray: userArraySlice, //slice which handles global array
  },
});

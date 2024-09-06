import { createSlice } from "@reduxjs/toolkit";

const initialState = {};

const userSlice = createSlice(
{
        name: "userSlice",
        initialState,
        reducers: {
            sessionSetter: (state, action) => {
            state = action.payload;
            }
        }
    });
export default userSlice.reducer;
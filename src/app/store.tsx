import { configureStore } from "@reduxjs/toolkit";
import calcReducer from "../features/calc/calcSlice";

const store = configureStore({
    reducer: calcReducer
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
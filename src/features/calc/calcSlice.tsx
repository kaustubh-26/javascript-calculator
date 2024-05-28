import { createSlice } from "@reduxjs/toolkit";
import data from "../../data/data.json";


const initialState = {
    keys: data,
    answer: "",
    value: "0",
    expression: ""
};

export const calcSlice = createSlice({
    name: "calc",
    initialState,
    reducers: {
        addition: (state, action) => {
            state.value += action.payload;
        },
        setAnswer: (state, action) => {
            state.answer = action.payload;
        },
        setExpression: (state, action) => {
            state.expression = action.payload;
        }, 
        clearAnswer: (state) => {
            state.answer = "";
        },
        clearExpression: (state) => {
            state.expression = "0";
        },
        clearValue: (state) => {
            state.value = "0";
        },

    }
})

export const { addition, clearAnswer, clearExpression, clearValue, setAnswer, setExpression } = calcSlice.actions;

export default calcSlice.reducer;

import { combineReducers } from "redux";
import { studentReducer } from "./student-state";
import { configureStore } from "@reduxjs/toolkit";

const reducers = combineReducers({ StudentState: studentReducer });
export const store = configureStore({ reducer: reducers });
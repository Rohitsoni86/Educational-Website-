import { configureStore } from "@reduxjs/toolkit";
import userDetailsReducer from "../Features/userDetails";
import userLogReducer from "../Features/userLog";
import courseDetailsReducer from "../Features/courseDetails";
import studentEnrollCourseDetailsReducer from "../Features/studentEnrolledCourses";

export const store = configureStore({
  reducer: {
    authentication: userLogReducer,
    userdetails: userDetailsReducer,
    couserDetails: courseDetailsReducer,
    studentEnrollCDetails: studentEnrollCourseDetailsReducer,
  },
});

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchCourseDetails = createAsyncThunk(
  "fetchCourseDetails",
  async () => {
    try {
      const { data } = await axios.get("/courseDetails.json", {
        headers: {
          "Content-Type": "application/json",
        },
      });

      console.log(data);

      return data;
    } catch (err) {
      console.log(err);
      return err;
    }
  }
);

//Define Initial State

const initialState = {
  isLoading: true,
  isError: false,
  courseDetails: [],
};

export const courseDetailsSlice = createSlice({
  name: "courseDetailsSlice",
  initialState,
  reducers: {
    setUserDetails: (state, action) => {
      state.courseDetails = [];
    },
    enrollStudent: (state, action) => {
      let studentID = action.payload.studnetIDF;
      let courseID = action.payload.courseIDF;

      console.log("courseDetails Function", studentID);
      console.log("courseDetails Function", courseID);

      const newCourseList = state.courseDetails.map((elem, index) => {
        if (elem.id == courseID) {
          let newObj = {
            id: `${studentID}`,
            completed: false,
          };

          elem.students.push(newObj);
        }
        return elem;
      });

      console.log(newCourseList);

      let updatedCourse = newCourseList.find((elem, index) => {
        return elem.id == courseID;
      });

      console.log(
        updatedCourse.students.find((elem, index) => {
          return elem.id == studentID;
        })
      );

      // state.courseDetails = [...newCourseList];
    },
  },
  extraReducers: (builder) => {
    // fetchCourseDetails
    builder.addCase(fetchCourseDetails.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(fetchCourseDetails.fulfilled, (state, action) => {
      state.isLoading = false;
      state.courseDetails = action.payload;
    });
    builder.addCase(fetchCourseDetails.rejected, (state, action) => {
      state.isError = true;
    });
  },
});

export default courseDetailsSlice.reducer;

export const { enrollStudent } = courseDetailsSlice.actions;

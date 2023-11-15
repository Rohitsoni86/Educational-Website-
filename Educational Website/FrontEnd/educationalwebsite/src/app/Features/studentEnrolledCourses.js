import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const studentsEnrolledCourses = (listC, stdID) => {
  let studentEnC = [];

  let enrolledC = listC.filter((course, index) => {
    console.log(course);
    course.students.map((student) => {
      if (student.id == stdID) {
        studentEnC.push(course);
        return course;
      }
    });
  });

  console.log(studentEnC);
  console.log(studentEnC.length);
  return studentEnC;
};

export const fetchStudentCourses = createAsyncThunk(
  "fetchStudentCourses",
  async (studentId) => {
    try {
      const { data } = await axios.get("/courseDetails.json", {
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log(data);
      console.log(data.length);
      let filterResult = studentsEnrolledCourses(data, studentId);

      return filterResult;
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
  studenEnCourses: [],
};

export const studentCoursesSlice = createSlice({
  name: "studentCoursesSlice",
  initialState,
  reducers: {
    markAsComplete: (state, action) => {
      let studentID = action.payload.studnetIDF;
      let courseID = action.payload.courseIDF;

      console.log("markAsComplete Function", studentID);
      console.log("markAsComplete Function", courseID);

      //let copyOfCourseList = [...state.studenEnCourses];

      state.studenEnCourses = state.studenEnCourses.filter((elemt, index) => {
        if (elemt.id == courseID) {
          return elemt.students.map((student) => {
            if (student.id == studentID) {
              console.log(student);
              student.completed = true;
            }
            console.log(student);
            return student;
          });
        }
        return elemt;
      });
    },
  },

  extraReducers: (builder) => {
    // fetchStudentCourses
    builder.addCase(fetchStudentCourses.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(fetchStudentCourses.fulfilled, (state, action) => {
      state.isLoading = false;
      state.studenEnCourses = action.payload;
    });
    builder.addCase(fetchStudentCourses.rejected, (state, action) => {
      state.isError = true;
    });
  },
});

export default studentCoursesSlice.reducer;

export const { markAsComplete } = studentCoursesSlice.actions;

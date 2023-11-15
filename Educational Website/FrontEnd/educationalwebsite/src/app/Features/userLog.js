import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// match details

const findUser = (fetchedDetails, submittedData) => {
  let matchedStudent = fetchedDetails.filter((elem, index) => {
    return (
      elem.email == submittedData.Email &&
      elem.password == submittedData.Password
    );
  });

  console.log(matchedStudent);

  if (matchedStudent.length) {
    return matchedStudent[0];
  } else {
    return false;
  }
};

// MAKING API CALLS

export const makeUserLogin = createAsyncThunk("Userlogin", async (dataObj) => {
  let dataF = dataObj;
  try {
    const { data } = await axios.get("/studentData.json", {
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log(data);
    console.log(dataF);

    console.log(findUser(data, dataF));

    let studentDetails = findUser(data, dataF);

    if (studentDetails) {
      // localStorage.setItem("Token", studentDetails.token);
      let stdObj = {
        status: true,
        token: studentDetails.token,
      };
      return stdObj;
    } else {
      let stdObj = {
        status: false,
        token: null,
      };
      return stdObj;
    }

    //  return data.Token;
  } catch (err) {
    console.log(err);
    return err;
  }
});

//Define Initial State

const initialState = {
  isLoading: true,
  isError: false,
  userToken: null,
  isUserLogedIn: false,
  userToken: null,
};

export const userLogSlice = createSlice({
  name: "userLogDetails",
  initialState,
  reducers: {
    toggleUserLog: (state, action) => {
      state.isUserLogedIn = false;
    },
    removeToken: (state, action) => {
      state.userToken = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(makeUserLogin.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(makeUserLogin.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isUserLogedIn = action.payload.status;
      state.userToken = action.payload.token;
    });
    builder.addCase(makeUserLogin.rejected, (state, action) => {
      state.isError = true;
    });
  },
});

export default userLogSlice.reducer;

export const { toggleUserLog, removeToken } = userLogSlice.actions;

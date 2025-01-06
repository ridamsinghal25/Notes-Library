import ApiError from "../services/ApiError";
import CourseService from "@/services/CourseService";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchCourse = createAsyncThunk("course/fetchCourse", async () => {
  const response = await CourseService.getCourse();

  if (!(response instanceof ApiError)) {
    return response?.data;
  } else {
    throw new Error(response?.errorResponse?.message || response?.errorMessage);
  }
});

const initialState = {
  courses: [],
  users: [],
  error: null,
  status: "idle",
};

const CourseSlice = createSlice({
  name: "courses",
  initialState,
  reducers: {
    addCourse: (state, action) => {
      state.courses.push(action.payload);
    },
    deleteCourse: (state, action) => {
      state.courses = state.courses.filter(
        (course) => course._id !== action.payload
      );
    },
    updateCourse: (state, action) => {
      const { courseId, newCourse } = action.payload;
      const courseIndex = state.courses.findIndex(
        (course) => course._id === courseId
      );
      if (courseIndex !== -1) {
        state.courses[courseIndex] = newCourse;
      }
    },
    setUsers: (state, action) => {
      state.users = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCourse.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchCourse.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.courses = action.payload;
      })
      .addCase(fetchCourse.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const { addCourse, deleteCourse, updateCourse, setUsers } =
  CourseSlice.actions;

export default CourseSlice.reducer;

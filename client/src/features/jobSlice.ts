import type { PayloadAction } from "@reduxjs/toolkit";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { CancelRequest, JobState } from "../types";
import { environmentVariable } from "../config";
import axios from "axios";
import { APICore } from "../api/apiCore";

const initialState: JobState = {
  value: {
    jobId: null,
    isProcessing: false,
    jobError: null,
  },
};

export const jobSlice = createSlice({
  name: "job",
  initialState,
  reducers: {
    startJobProcessing: (state) => {
      state.value.isProcessing = true;
    },
    stopJobProcessing: (state) => {
      state.value.isProcessing = false;
    },
    clearJobErrors: (state) => {
      state.value.jobError = null;
    },
  },
  extraReducers(builder) {
    builder.addCase(
      processStringAsync.fulfilled,
      (
        state,
        action: PayloadAction<{
          isProcessing: boolean;
          jobId: string | null;
          jobError: string | null;
        }>
      ) => {
        state.value.isProcessing = action.payload.isProcessing;
        state.value.jobId = action.payload.jobId;
        state.value.jobError = action.payload.jobError;
      }
    ),
      builder.addCase(
        cancelProcessingAsync.fulfilled,
        (
          state,
          action: PayloadAction<{
            isProcessing: boolean;
            jobId: string | null;
            jobError: string | null;
          }>
        ) => {
          state.value.isProcessing = action.payload.isProcessing;
          state.value.jobId = action.payload.jobId;
          state.value.jobError = action.payload.jobError;
        }
      );
  },
});

const api = new APICore();

export const cancelProcessingAsync = createAsyncThunk(
  "job/cancelProcessing",
  async (data: CancelRequest) => {
    try {
      await api.postAsync(
        `${environmentVariable.VITE_API_URL}/api/processor/cancel-job`,
        data
      );
      return {
        isProcessing: false,
        jobId: null,
        jobError: null,
      };
    } catch (error) {
      return {
        isProcessing: false,
        jobId: null,
        jobError: "An error occurred, please try again",
      };
    }
  }
);

export const processStringAsync = createAsyncThunk(
  "job/processString",
  async (payload: { data: any; idempotencyKey: any }) => {
    try {
      const { data, idempotencyKey } = payload;
      const response = await axios.post(
        `${environmentVariable.VITE_API_URL}/api/processor/process-string`,
        data,
        {
          headers: {
            "Content-Type": "application/json",
            "X-Idempotency-Key": idempotencyKey,
          },
        }
      );

      if (response.data.isSuccess) {
        const jobId: string = response.data.value;
        return {
          isProcessing: true,
          jobId: jobId,
          jobError: null,
        };
      } else {
        return {
          isProcessing: false,
          jobId: null,
          jobError:
            "Invalid request. Please check your input and ensure you're not sending more than one request at a time",
        };
      }
    } catch (error) {
      return {
        isProcessing: false,
        jobId: null,
        jobError: "An error occurred while processing the string",
      };
    }
  }
);

export const { startJobProcessing, stopJobProcessing, clearJobErrors } =
  jobSlice.actions;
export default jobSlice.reducer;

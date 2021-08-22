import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchJobs = createAsyncThunk(
    "profile/fetchJobs",
    async () => {
        const response = await fetch(`/api/jobs`);
        if (!response.ok) {
            const message = `An error has occured: ${response.status}`;
            throw new Error(message);
        }
        const data = await response.json();
        return data;
    }
);

export const applyToJob = createAsyncThunk(
    "profile/applyToJob",
    async ({user, jobId}) => {
        const settings = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                'username': user
            })
        };
        const response = await fetch(`/api/jobs/${jobId}`, settings);
        const data = await response.json();
        return data;
    }
)

export const getAppliedJobs = createAsyncThunk(
    "profile/getAppliedJobs",
    async (user) => {
        const response = await fetch(`/api/jobs/${user}`);
        if (!response.ok) {
            const message = `An error has occured: ${response.status}`;
            throw new Error(message);
        }
        const data = await response.json();
        return data;
    }
)

const jobsSlice = createSlice({
    name: 'jobs',
    initialState: {
        status: "loading",
        data: [],
        error: "",
        appliedStatus: "",
        applied: []
    },
    reducers: {
        resetJobs: (state) => {
            state.applied = [];
        }
    },
    extraReducers: {
        [fetchJobs.pending]: (state, action) => {
            state.status = "loading";
            state.appliedStatus = "";
        },
        [fetchJobs.fulfilled]: (state, { payload }) => {
            state.data = payload;
            state.status = "success";
            state.error = "";
        },
        [fetchJobs.rejected]: (state, action ) => {
            state.status = "failed";
            state.error = "Couldn't fetch data";
        },

        [applyToJob.pending]: (state, { payload }) => {
            state.appliedStatus = "loading";
        },
        [applyToJob.fulfilled]: (state, { payload }) => {
            const index = state.data.findIndex(jobsData => jobsData._id === payload._id);
            state.data[index] = payload;
            state.appliedStatus = "success";
            state.error = ""
        },
        [applyToJob.rejected]: (state, action ) => {
            state.appliedStatus = "failed";
        },

        [getAppliedJobs.fulfilled]: (state, { payload }) => {
            state.applied = payload;
            state.status = "success";
        }
    }
})

export const { resetJobs } = jobsSlice.actions;

export default jobsSlice.reducer;
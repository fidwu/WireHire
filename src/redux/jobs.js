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
        console.log(data);
        return data;
    }
);

export const postJob = createAsyncThunk(
    "profile/postJob",
    async ({user, jobId, payload}) => {
        const settings = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        };
        const response = await fetch(`/api/jobs/${user}/${jobId}`, settings);
        const data = await response.json();
        console.log("post data:", data);
        return data;
    }
)

const jobsSlice = createSlice({
    name: 'jobs',
    initialState: {
        status: "loading",
        data: [],
        error: ""
    },
    extraReducers: {
        [fetchJobs.pending]: (state, action) => {
            state.status = "loading";
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

        [postJob.fulfilled]: (state, { payload }) => {
            state.data = [payload];
            state.status = "success";
            state.error = ""
        }

    }
})

export const { filterJobs, sortJobsByDate } = jobsSlice.actions;

// export const jobsSelector = state => state.jobs;

export default jobsSlice.reducer;
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchProfile = createAsyncThunk(
    "profile/fetchProfile",
    async (user) => {
        const response = await fetch(`api/profile/${user}`);
        const data = await response.json();
        console.log(data);
        return data;
    }
);

export const postProfile = createAsyncThunk(
    "profile/postProfile",
    async ({user, category, payload}) => {
        const settings = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        };
        const response = await fetch(`api/profile/${user}/${category}`, settings);
        const data = await response.json();
        console.log("post data:", data);
        return data;
    }
)

export const editProfile = createAsyncThunk(
    "profile/editProfile",
    async ({user, category, itemId, payload}) => {
        const settings = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload)
        };
        const response = await fetch(`api/profile/${user}/${category}/${itemId}`, settings);
        const data = await response.json();
        return data;
    }
)

export const deleteProfileItem = createAsyncThunk(
    "profile/deleteProfileItem",
    async ({user, category, itemId}) => {
        const settings = {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            }
        };
        console.log("url: ", user, category, itemId);
        const response = await fetch(`api/profile/${user}/${category}/${itemId}`, settings);
        const data = await response.json();
        return data;
    }
)

const profileSlice = createSlice({
    name: 'profile',
    initialState: {
        status: "loading",
        data: [],
        error: ""
    },
    extraReducers: {
        [fetchProfile.pending]: (state, action) => {
            state.status = "loading";
        },
        [fetchProfile.fulfilled]: (state, { payload }) => {
            state.data = payload;
            state.status = "success";
            state.error = "";
        },
        [fetchProfile.rejected]: (state, action ) => {
            state.status = "failed";
            state.error = "Couldn't fetch data";
        },

        [postProfile.fulfilled]: (state, { payload }) => {
            state.data = [payload];
            state.status = "success";
            state.error = ""
        },

        [editProfile.fulfilled]: (state, { payload }) => {
            state.data = [payload];
            state.status = "success";
            state.error = ""
        },

        [deleteProfileItem.fulfilled]: (state, { payload }) => {
            state.data = [payload];
            state.status = "success";
            state.error = ""
        },
    }
})

export const { getProfile, getProfileSuccess, getProfileFailure } = profileSlice.actions;

export const profileSelector = state => state.profile;

export default profileSlice.reducer;
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchProfile = createAsyncThunk(
    "profile/fetchProfile",
    async (user) => {
        const response = await fetch(`/api/profile/${user}`);
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
        console.log(settings)
        const response = await fetch(`/api/profile/${user}/${category}`, settings);
        const data = await response.json();
        console.log("post data:", data);
        return data;
    }
)

export const editProfile = createAsyncThunk(
    "profile/editProfile",
    async ({user, category, payload, itemId}) => {
        console.log("edit payload: ", payload);
        const settings = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        };
        console.log(settings)
        let response = "";
        if (category === "skills") {
            response = await fetch(`/api/profile/${user}/${category}`, settings);
        }
        else if (!category && !itemId) {
            response = await fetch(`/api/profile/${user}`, settings);
        }
        else {
            response = await fetch(`/api/profile/${user}/${category}/${itemId}`, settings);
        }
        const data = await response.json();
        console.log(data)
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
        console.log("in delete profile item: ", category);
        let response = "";
        response = await fetch(`api/profile/${user}/${category}/${itemId}`, settings);
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
    reducers: {
        resetProfile: (state) => {
            state.status = "loading";
            state.data = [];
            state.error = "";
        }
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

export const { resetProfile } = profileSlice.actions;

export default profileSlice.reducer;
import {createAction, createAsyncThunk} from "@reduxjs/toolkit";
import {fetchUser, FetchUserResponse} from "../../api/user";

export const loadUser = createAsyncThunk<FetchUserResponse>(
    'userProfile/loadUser',
    async () => {
        const {profile, roles} = await fetchUser();
        return {profile, roles}
    }
)

export const toggleEditMode = createAction<boolean>('userProfile/toggleEditMode');

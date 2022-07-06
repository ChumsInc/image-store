import {AsyncThunk, createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {UserProfile, UserRole} from "chums-types/user";
import {FetchUserResponse, fetchUserAPI} from "../../api/user";
import {RootState} from "../../app/configureStore";

interface UserProfileState {
    profile: UserProfile|null,
    canEdit: boolean,
    canDelete: boolean,
    loading: 'idle' | 'pending' | 'succeeded' | 'failed',
}

export const initialState:UserProfileState = {
    profile: null,
    canEdit: false,
    canDelete: false,
    loading: 'idle',
}


const rolesAllowDelete = ['admin', 'web_admin', 'root'];
const rolesAllowEdit = [...rolesAllowDelete, 'production', 'web', 'cs'];

type FetchUserThunk = AsyncThunk<FetchUserResponse, void, any>;

export const fetchUserAction:FetchUserThunk = createAsyncThunk<FetchUserResponse>(
    'userProfile/fetchUser',
    async (data, {rejectWithValue}) => {
        try {
            const {profile, roles} = await fetchUserAPI();
            return {profile, roles}
        } catch(err:unknown) {
            if (err instanceof Error) {
                console.warn("fetchUserAction()", err.message);
                rejectWithValue({error: err, context: 'userProfile/fetchUser'});
            }
            return {profile: null, roles: []}
        }
    },
    {
        condition: (arg, {getState}) => {
            const state = getState() as RootState;
            return state.userProfile.loading !== 'pending';
        }
    }
)

function isFetchUserAction(action:any): action is ReturnType<FetchUserThunk> {
    return action?.type?.startsWith('userProfile/fetchUser') && !!action?.meta?.requestStatus;
}

export const userProfileSlice = createSlice({
    name: 'userProfile',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchUserAction.fulfilled, (state, action) => {
            state.profile = action.payload.profile || null;
            state.canEdit = action.payload.roles.filter(role => rolesAllowEdit.includes(role.role)).length > 0;
            state.canDelete = action.payload.roles.filter(role => rolesAllowDelete.includes(role.role)).length > 0;
        })
            .addMatcher(
                isFetchUserAction,
                (state, action) => {
                    state.loading = action.meta.requestStatus;
            })
    }
})

export const {name} = userProfileSlice;
console.log(userProfileSlice.actions);
export default userProfileSlice.reducer;

import {createReducer} from "@reduxjs/toolkit";
import {UserProfile, UserRole} from "chums-types";
import {loadUser, toggleEditMode} from "./actions";
import {RootState} from "../../app/configureStore";

interface UserProfileState {
    profile: UserProfile | null,
    roles: UserRole[],
    canEdit: boolean,
    canDelete: boolean,
    loading: boolean;
    loaded: boolean;
}

export const initialUserProfileState: UserProfileState = {
    profile: null,
    roles: [],
    canEdit: false,
    canDelete: false,
    loading: false,
    loaded: false,
}


const rolesAllowDelete = ['admin', 'web_admin', 'root'];
const rolesAllowEdit = [...rolesAllowDelete, 'production', 'web', 'cs'];

export const selectCanDelete = (state:RootState) => state.userProfile.canDelete || false;
export const selectCanEdit = (state:RootState) => state.userProfile.canEdit || false;
export const selectIsUser = (state:RootState) => !!state.userProfile.profile?.id;
export const selectUserIsLoading = (state:RootState) => state.userProfile.loading;
export const selectUserIsLoaded = (state:RootState) => state.userProfile.loaded;

const canEditReducer = (roles:UserRole[]):boolean => {
    return roles.map(role => role.role).filter(role => rolesAllowEdit.includes(role)).length > 0;
}

const canDeleteReducer = (roles:UserRole[]):boolean => {
    return roles.map(role => role.role).filter(role => rolesAllowDelete.includes(role)).length > 0;
}

const userProfileReducer = createReducer(initialUserProfileState, (builder) => {
    builder
        .addCase(loadUser.pending, (state, action) => {
            state.loading = true;
        })
        .addCase(loadUser.fulfilled, (state, action) => {
            state.loading = false;
            state.loaded = true;
            state.profile = action.payload.profile ?? null;
            state.roles = action.payload.roles;
            state.canEdit = canEditReducer(action.payload.roles);
            state.canDelete = canDeleteReducer(action.payload.roles);
        })
        .addCase(loadUser.rejected, (state, action) => {
            state.loading = false;
            state.canEdit = false;
            state.canDelete = false;
            state.profile = null;
        })
        .addCase(toggleEditMode, (state, action)=> {
            if (canEditReducer(state.roles)) {
                state.canEdit = action.payload ?? !state.canEdit;
            }
            if (canDeleteReducer(state.roles)) {
                state.canDelete = action.payload ?? !state.canDelete;
            }
        })
});

export default userProfileReducer;

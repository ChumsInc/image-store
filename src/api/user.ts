import {UserProfile, UserRole} from "chums-types";

interface ProfileResponse {
    user?: UserProfile,
    roles?: UserRole[];
}

export interface FetchUserResponse {
    profile: UserProfile | null, roles: UserRole[]
}

export async function fetchUser(): Promise<FetchUserResponse> {
    try {
        const url = '/api/user/profile';
        const res = await fetch(url, {credentials: 'same-origin'});
        if (!res.ok || res.status === 401) {
            return {profile: null, roles: []};
        }

        const json = await res.json() as ProfileResponse;
        return {profile: json?.user ?? null, roles: json?.roles ?? []}
    } catch (err: unknown) {
        if (err instanceof Error) {
            return Promise.reject(err);
        }
        return {profile: null, roles: []};
    }
}

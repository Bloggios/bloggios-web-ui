import {Dispatch} from "redux";
import {loggedInUserProfile} from "@/rest/UserAuthProviderApplication";
import {setProfile} from "@/state/profileSlice";
import {dispatchError} from "@/utils/DispatchFunctions";
import {PROFILE_NOT_FOUND_CODE} from "@/constants/ServiceConstants";

export const addUserProfile = (dispatch: Dispatch, router: any, authorities: any) => {
        loggedInUserProfile()
            .then(response => {
                dispatch(setProfile(response));
            }).catch((error: any) => {
            if (error?.response?.data?.code === PROFILE_NOT_FOUND_CODE && authorities?.includes('ROLE_DUMMY')) {
                router.push("/profile-addition-initial");
            } else {
                dispatchError(dispatch, error);
            }
        })
}
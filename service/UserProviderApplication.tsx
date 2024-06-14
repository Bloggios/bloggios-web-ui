import {Dispatch} from "redux";
import {loggedInUserProfile} from "@/rest/UserAuthProviderApplication";
import {setProfile} from "@/state/profileSlice";
import {dispatchError} from "@/utils/DispatchFunctions";
import {useSelector} from "react-redux";
import {RootState} from "@/state/store";
import {AxiosError} from "axios";
import {ACCOUNT_INACTIVE_ERROR_CODE, PROFILE_NOT_FOUND_CODE} from "@/constants/ServiceConstants";

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
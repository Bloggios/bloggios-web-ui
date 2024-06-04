import {Dispatch} from "redux";
import {loggedInUserProfile} from "@/rest/UserAuthProviderApplication";
import {setProfile} from "@/state/profileSlice";
import {dispatchError} from "@/utils/DispatchFunctions";

export const addUserProfile = (dispatch: Dispatch) => {
    loggedInUserProfile()
        .then(response => {
            dispatch(setProfile(response));
        }).catch(error => {
            dispatchError(dispatch, error);
    })
}
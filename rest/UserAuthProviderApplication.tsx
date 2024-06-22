import {authenticatedAxios, gatewayAxios} from "@/rest/BaseAxios";
import {ADD_PROFILE, GET_USER_PROFILE, LOGGED_IN_USER_PROFILE, PROFILE_TAGS} from "@/constants/ApiEndpointConstants";
import {ProfileInitialData} from "@/interfaces/ProfileInitialData";


export const profileTagList = () => {
    return authenticatedAxios.get(PROFILE_TAGS)
        .then(response => response.data);
}

export const addProfile = (profileData: ProfileInitialData, authAxios: any) => {
    return authAxios.post(ADD_PROFILE, profileData)
        .then((response: { data: any; }) => response.data);
}

export const loggedInUserProfile = () => {
    return authenticatedAxios.get(LOGGED_IN_USER_PROFILE)
        .then(response => response.data);
}

export const getUserProfile = (username: string) => {
    return gatewayAxios.get(GET_USER_PROFILE, {
        params: {
            username: username,
        }
    }).then((response)=> response);
}
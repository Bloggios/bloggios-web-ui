import {authenticatedAxios} from "@/rest/BaseAxios";
import {ADD_PROFILE, ADD_PROFILE_IMAGE, LOGGED_IN_USER_PROFILE, PROFILE_TAGS} from "@/constants/ApiEndpointConstants";
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

export const addProfileImage = (formData: any, authAxios: any) => {
    authAxios.post(ADD_PROFILE_IMAGE, formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    }).then((response: {data: any;}) => response.data);
}
import {authenticatedAxios} from "@/rest/BaseAxios";
import {ADD_PROFILE, PROFILE_TAGS} from "@/constants/ApiEndpointConstants";
import {ProfileInitialData} from "@/interfaces/ProfileInitialData";


export const profileTagList = () => {
    return authenticatedAxios.get(PROFILE_TAGS)
        .then(response => response.data);
}

export const addProfile = (profileData: ProfileInitialData, authAxios: any) => {
    return authAxios.post(ADD_PROFILE, profileData)
        .then((response: { data: any; }) => response.data);
}
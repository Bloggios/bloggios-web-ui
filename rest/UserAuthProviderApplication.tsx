import {authenticatedAxios, gatewayAxios} from "@/rest/BaseAxios";
import {ADD_PROFILE, PROFILE_TAGS} from "@/constants/ApiEndpointConstants";
import {ProfileInitialData} from "@/interfaces/ProfileInitialData";
import AuthenticatedAxiosInterceptor from "@/utils/AuthenticatedAxiosInterceptor";
import {AxiosInstance} from "axios";



export const profileTagList = () => {
    return gatewayAxios.get(PROFILE_TAGS)
        .then(response => response.data);
}

export const addProfile = (profileData: ProfileInitialData, authAxios: any) => {
    return authAxios.post(ADD_PROFILE, profileData)
        .then((response: { data: any; }) => response.data);
}
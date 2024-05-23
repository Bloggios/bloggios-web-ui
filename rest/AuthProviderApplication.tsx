import {SignupData} from "@/interfaces/SignupData";
import {gatewayAxios} from "@/rest/BaseAxios";
import {SIGNUP_USER} from "@/constants/ApiEndpointConstants";
import {v4 as uuidv4} from 'uuid';

export const signupUser = (signupData: SignupData) => {
    return gatewayAxios.post(SIGNUP_USER, signupData, {
        headers: {
            "breadcrumbId": uuidv4()
        }
    }).then(response => response.data);
}
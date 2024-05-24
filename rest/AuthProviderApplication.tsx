import {SignupData} from "@/interfaces/SignupData";
import {gatewayAxios} from "@/rest/BaseAxios";
import {RESEND_OTP, SIGNUP_USER, VERIFY_OTP} from "@/constants/ApiEndpointConstants";

export const signupUser = (signupData: SignupData) => {
    return gatewayAxios.post(SIGNUP_USER, signupData)
        .then(response => response.data);
}

export const verifyOtp = (otp: string, userId: string) => {
    return gatewayAxios.get(VERIFY_OTP, {
        headers: {
            'otp': otp
        },
        params: {
            'userId': userId
        }
    }).then((response)=> response.data);
}

export const resendOtp = (userId: string) => {
    return gatewayAxios.get(RESEND_OTP, {
        params: {
            'userId': userId
        }
    }).then((response)=> response.data);
}
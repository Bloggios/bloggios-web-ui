import {SignupData} from "@/interfaces/SignupData";
import {gatewayAxios} from "@/rest/BaseAxios";
import {
    LOGIN_USER,
    LOGOUT_USER,
    OTP_AUTH_USER_ID_REDIRECT,
    REFRESH_TOKEN, REFRESH_TOKEN_SOCIAL,
    RESEND_OTP,
    SIGNUP_USER,
    VERIFY_OTP
} from "@/constants/ApiEndpointConstants";
import {LoginData} from "@/interfaces/LoginData";

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

export const loginUser = (loginData: LoginData) => {
    return gatewayAxios.post(LOGIN_USER, loginData)
        .then(response => response.data);
}

export const otpAuthUserIdRedirect = (authData: LoginData) => {
    return gatewayAxios.post(OTP_AUTH_USER_ID_REDIRECT, authData)
        .then((response)=> response.data);
}

export const refreshToken = () => {
    return gatewayAxios.get(REFRESH_TOKEN, {
        withCredentials: true
    }).then((response)=> response);
}

export const logoutUser = () => {
    return gatewayAxios.get(LOGOUT_USER, {
        withCredentials: true
    }).then(response=> response.data);
}

export const refreshTokenSocial = (token: string) => {
    return gatewayAxios.get(REFRESH_TOKEN_SOCIAL, {
        params: {
            token: token
        }
    }).then((response)=> response.data);
}
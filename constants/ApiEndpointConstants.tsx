// Auth Provider Application
export const SIGNUP_USER = "/auth-provider/auth/register";
export const VERIFY_OTP = "/auth-provider/auth/verify-otp";
export const RESEND_OTP = "/auth-provider/auth/resend-otp";
export const LOGIN_USER = "/auth-provider/auth/token";
export const OTP_AUTH_USER_ID_REDIRECT = "/auth-provider/auth/otp-userId";
export const REFRESH_TOKEN = "/auth-provider/auth/refresh-token";
export const LOGOUT_USER = "/auth-provider/auth/logout";
export const REFRESH_TOKEN_SOCIAL = "/auth-provider/auth/refresh-token-social";
export const GOOGLE_LOGIN = "/auth-provider/auth/login-google";

// User Provider Application
export const PROFILE_TAGS = "/user-provider/profile-auth/profile-tags";
export const ADD_PROFILE = "/user-provider/profile";
export const LOGGED_IN_USER_PROFILE = "/user-provider/profile-auth";
export const ADD_PROFILE_IMAGE = "/user-provider/profile/profile-image";

// Blog Provider Application
export const FETCH_BLOG_TOPICS = "/blog-provider/topics";
export const FETCH_USER_CHAPTERS = "/blog-provider/chapter";
export const ADD_NEW_CHAPTER = "/blog-provider/chapter";
export const ADD_BLOG = "/blog-provider/blogs";
export const BLOGS_LIST = "/blog-provider/unauth/blog/list";
export const BLOG_DETAILS = "/blog-provider/unauth/blog";
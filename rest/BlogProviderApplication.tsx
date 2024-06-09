import {gatewayAxios} from "@/rest/BaseAxios";
import {ADD_BLOG, FETCH_BLOG_TOPICS, FETCH_USER_CHAPTERS} from "@/constants/ApiEndpointConstants";
import {AxiosInstance} from "axios";

export const fetchBlogTopics = () => {
    return gatewayAxios.get(FETCH_BLOG_TOPICS)
        .then(response => response.data);
}

export const fetchUserChapters = (authAxios: AxiosInstance) => {
    return authAxios.get(FETCH_USER_CHAPTERS)
        .then(response => response.data);
}

export const addBlog = (authAxios: AxiosInstance, formData: FormData) => {
    return authAxios.post(ADD_BLOG, formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        }
    }).then((response) => response.data);
}
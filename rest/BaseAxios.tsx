import axios from "axios";
import {v4 as uuid} from "uuid";

const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL;

if (!baseURL) {
    throw new Error("Missing baseURL");
}

export const gatewayAxios = axios.create(
    {
        baseURL: baseURL,
        withCredentials: true,
        headers: {
            "breadcrumbId": uuid()
        }
    }
)
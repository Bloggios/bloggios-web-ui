import {UUID_REGEX} from "@/constants/ServiceConstants";

export const uuidValidator = (uuid: string): boolean => {
    return UUID_REGEX.test(uuid);
}
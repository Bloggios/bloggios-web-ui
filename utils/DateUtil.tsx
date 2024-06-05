import {TimeValue} from "@react-types/datepicker";

export const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString('en-US', options);
};

export const getHoursAndMinutes = (date: Date) => {
    return {
        hours: date.getHours(),
        minutes: date.getMinutes()
    };
};

export const formatDate = (dateString: string): string => {
    console.log(dateString)
    const date = new Date(dateString);
    console.log(date)
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString('en-US', options);
};

export const getPostedAgoString = (date: string | Date) => {
    const originalDate: any = new Date(date);
    const currentDate: any = new Date();
    const timeDiffInSeconds = Math.floor((currentDate - originalDate) / 1000);
    if (timeDiffInSeconds < 60) {
        return `Just now`;
    } else if (timeDiffInSeconds < 3600) {
        return `${Math.floor(timeDiffInSeconds / 60)}m ago`;
    } else if (timeDiffInSeconds < 86400) {
        return `${Math.floor(timeDiffInSeconds / 3600)}h ago`;
    } else if (timeDiffInSeconds < 604800) {
        return `${Math.floor(timeDiffInSeconds / 86400)}d ago`;
    } else if (timeDiffInSeconds < 2592000) {
        return `${Math.floor(timeDiffInSeconds / 604800)}w ago`;
    } else if (timeDiffInSeconds < 31536000) {
        return `${Math.floor(timeDiffInSeconds / 2592000)}mo ago`;
    } else {
        return `${Math.floor(timeDiffInSeconds / 31536000)}yr ago`;
    }
}

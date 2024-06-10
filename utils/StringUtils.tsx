export const countWords = (data: string) => {
    return data.split(/\s+/).length
}

export const countLines = (data: string) => {
    return (data.match(/\n/g) || []).length
}

export const getSeoDescriptionText = (text: string) => {
    return text.replace(/\r\n/g, ' ').substring(0, 50);
}
export const countWords = (data: string) => {
    return data.split(/\s+/).length
}

export const countLines = (data: string) => {
    return (data.match(/\n/g) || []).length
}
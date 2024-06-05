interface BlogData {
    title: string;
    htmlData: string,
    detailsText: string,
    delta: object | null,
    chapterId: string,
    topics: string[],
    seoTitle: string,
    scheduledData: number | bigint | null,
    canonicalUrl: string,
    images: any
}

export type {BlogData};
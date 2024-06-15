import {Divider} from "@nextui-org/react";
import {cache} from "react";
import {blogDetails} from "@/rest/BlogProviderApplication";
import BlogDetails from "@/components/custom/details/BlogDetails";
import {getSeoDescriptionText} from "@/utils/StringUtils";
import {Metadata} from "next";

const getBlogDetails = cache(async (blogId: string) => {
    return await blogDetails(blogId);
});

export async function generateMetadata({ params }: { params: { blogId: string } }): Promise<Metadata>  {
    const response = await getBlogDetails(params.blogId);
    const topics = response.topics && response.topics.length > 0 ? response.topics.map((topic: any) => topic.topic) : [];
    return {
        title: `${response.title} | by ${response.name.split(' ')[0]} | Bloggios`,
        description: `${getSeoDescriptionText(response.detailsText).trim()} | Bloggios Community`,
        keywords: [`${topics.length > 0 ? topics : ''}`, `${response.title.split(" ")}`, "Bloggios", 'Bloggios Community', 'Bloggios - by Rohit Parihar'],
        alternates: {
            canonical: response.canonicalUrl ? response.canonicalUrl : `https://bloggios.com`,

        }
    }
}

export default async function DynamicBlog({ params }: { params: { blogId: string } }) {

    const {blogId} = params;
    const response = await getBlogDetails(blogId);

    return (
        <main className={"max-w-screen-xl min-w-[280px] container flex h-auto flex-row gap-2 w-full mt-4 md:mt-10 pb-10"}>
            <main className={"w-full md:w-[70%]"}>
                <BlogDetails data={response} />
            </main>
            <Divider orientation={"vertical"} className={"hidden md:flex h-auto"} />
            <aside className={"hidden md:flex md:w-[30%]"}>
                Aside Section
            </aside>
        </main>
    )
}
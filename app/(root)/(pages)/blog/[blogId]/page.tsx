import {Divider} from "@nextui-org/react";

export default function DynamicBlog() {

    const htmlData = '<p>2<sup>2</sup></p><p><br></p><p>2<sub>2</sub></p>';

    return (
        <main className={"max-w-screen-xl container w-full"}>
            <h1>Dangerously Set Inner HTML</h1>
            <Divider/>

            <div className={"w-full"} dangerouslySetInnerHTML={{__html: htmlData}} />
        </main>
    )
}
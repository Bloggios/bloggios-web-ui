import {Separator} from "@/components/ui/separator";

export default function TextDivider({
    text
}: Readonly<{text: string}>) {
    return (
        <div className={"flex max-w-full my-7 items-center gap-4 text-muted-foreground"}>
            <Separator className={"flex-1"}/>
            {text}
            <Separator className={"flex-1"}/>
        </div>
    )
}
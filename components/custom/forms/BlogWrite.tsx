import React, {useEffect, useMemo, useRef, useState} from 'react';
import {Card, CardBody, CardHeader} from "@nextui-org/card";
import {Chip} from "@nextui-org/chip";
import {Button, Divider, ScrollShadow} from "@nextui-org/react";
import {CloseIcon} from "@nextui-org/shared-icons";
import "react-quill/dist/quill.snow.css";
import '@/app/quill.css';
import ReactQuill, {Quill, UnprivilegedEditor} from "react-quill";
// @ts-ignore
import ImageResize from 'quill-image-resize-module-react';
import {blogToolbar} from "@/utils/QuillConfigurations";
import {DeltaStatic, Sources} from "quill";
import {QuillData} from "@/interfaces/QuillData";
import {getHtmlContent, validateHtmlContent} from "@/utils/QuillFunctions";
import {useDispatch} from "react-redux";
import {Dispatch} from "redux";

const chips = [
    {
        id: 1,
        tag: "Java"
    },
    {
        id: 2,
        tag: "Python"
    },
    {
        id: 3,
        tag: "Spring Boot"
    },
    {
        id: 4,
        tag: "React Js"
    },
    {
        id: 5,
        tag: "JavaScript"
    },
    {
        id: 6,
        tag: "Flutter"
    },
    {
        id: 7,
        tag: "Typescript"
    }
]

// @ts-ignore
window.Quill = Quill;
Quill.register('modules/imageResize', ImageResize)

const BlogWrite = () => {
    const [selectedTags, setSelectedTags] = useState<string[]>([]);
    const [error, setError] = useState({
        tag: ''
    });
    const [tagInputValue, setTagInputValue] = useState("");
    const [isSuggestion, setIsSuggestion] = useState(false);
    const chipColors = ['bg-purple-700', 'bg-red-700', 'bg-amber-700', 'bg-blue-700'];
    const suggestionWrapperRef = useRef(null);
    const [titleFocus, setTitleFocus] = useState(false);
    const dispatch: Dispatch = useDispatch();
    const [editorContent, setEditorContent] = useState<QuillData>({
        delta: undefined,
        html: "",
        text: ""
    });
    const [addQuestionData, setAddQuestionData] = useState<any>(null);

    const handleClickOutside = (event: any) => {
        // @ts-ignore
        if (suggestionWrapperRef.current && !suggestionWrapperRef.current.contains(event.target)) {
            setIsSuggestion(false);
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);


    const handleChipClick = (chip: string) => {
        if (selectedTags.length > 4) {
            return;
        }
        // @ts-ignore
        if (selectedTags.includes(chip)) {
            setError(prevState => ({
                ...prevState,
                tag: `You have already selected ${chip} Tag`
            }));
        } else {
            // @ts-ignore
            setSelectedTags([...selectedTags, chip]);
        }
        setTagInputValue('');
    };

    const handleInputKeyDown = (event: any) => {
        if (event.key === 'Enter' && tagInputValue.trim() !== '') {
            handleChipClick(tagInputValue.trim());
        }
    };

    const handleChipRemove = (removedChip: string) => {
        const updatedChips = selectedTags.filter(chip => chip !== removedChip);
        setSelectedTags(updatedChips);
    };

    const handleSuggestionClose = () => {
        if (isSuggestion) {
            setIsSuggestion(false);
            setTagInputValue('');
        }
    }

    const filteredTags = chips.filter(chip =>
        chip.tag.toLowerCase().includes(tagInputValue.toLowerCase())
    );

    const quillBasicModules = useMemo(() => ({
        toolbar: blogToolbar,
        imageResize: {
            modules: ['Resize', 'DisplaySize']
        }
    }), []);

    const handleEditorChange = (value: string, delta: DeltaStatic, source: Sources, editor: UnprivilegedEditor) => {
        setEditorContent({
            html: editor.getHTML(),
            delta: editor.getContents(),
            text: editor.getText()
        });
    }

    const handleValidate = () => {
        // Validate Title
        if (false) {
            return;
        } else {
            const htmlContent = getHtmlContent(editorContent, dispatch);
            let isValid = true
            if (htmlContent) {
                isValid = validateHtmlContent(htmlContent, dispatch, "Blog");
            }
            if (isValid) {
                setAddQuestionData({
                    // title: titleData,
                    // tags: selectedChips,
                    images: htmlContent?.blobs,
                    detailsHtml: htmlContent?.finalHtml,
                    detailsText: htmlContent?.text
                });
            }
        }
    }

    return (
        <div className={"flex-1 "}>
            <main className={"max-w-screen-xl container flex h-auto flex-row gap-2 w-full mt-4 md:mt-10 "}>

                <main className={"w-full md:w-[70%]"}>
                    <Card className={"w-full flex flex-col md:px-7 md:py-4"}>
                        <CardHeader className={"flex flex-col items-start justify-start gap-2"}>
                            <input
                                className={"bg-transparent w-full text-4xl md:text-5xl lg:text-6xl border-none focus:border-none focus:outline-none resize-none"}
                                placeholder={"Enter Title"}
                                maxLength={150}
                                onFocus={() => setTitleFocus(true)}
                                onBlur={() => setTitleFocus(false)}
                            />

                            <div className={"flex flex-col w-full"}>
                                <div className={"flex flex-row gap-2 items-center text-medium tracking-wide h-auto"}>
                                    {selectedTags.map((tag, index) => {
                                        // Determine the color based on the index
                                        const colorIndex = index % 4;
                                        const color = chipColors[colorIndex];

                                        return (
                                            <Chip
                                                key={index}
                                                variant="flat"
                                                onClose={() => handleChipRemove(tag)}
                                                style={{backgroundColor: color}} // Apply the color to the chip
                                                classNames={{
                                                    base: `${color}`,
                                                    content: "drop-shadow text-white"
                                                }}
                                            >
                                                {tag}
                                            </Chip>
                                        );
                                    })}
                                    <input
                                        className={"font-light w-[172px] bg-transparent outline-none border-none"}
                                        maxLength={16}
                                        type="text"
                                        disabled={selectedTags.length > 4}
                                        onKeyDown={handleInputKeyDown}
                                        placeholder={selectedTags.length === 0 ? "Add upto 4 Tags" : selectedTags.length > 4 ? '' : 'Add Tags'}
                                        readOnly={selectedTags.length > 4}
                                        value={tagInputValue}
                                        onFocus={() => setIsSuggestion(true)}
                                        onChange={(event) => setTagInputValue(event.target.value)}
                                    />
                                </div>

                                {isSuggestion && (
                                    <Card ref={suggestionWrapperRef}
                                          className={"w-full h-auto bg-transparent shadow-none border border-border my-2 animate-slidein opacity-0"}>
                                        <CardHeader className={"pb-0 flex items-center justify-between"}>
                                            <div className={"text-lg font-medium tracking-wide"}>
                                                Suggested Tags
                                            </div>

                                            <Button
                                                isIconOnly={true}
                                                size={"sm"}
                                                className={"text-lg"}
                                                variant={"bordered"}
                                                onClick={handleSuggestionClose}
                                            >
                                                <CloseIcon/>
                                            </Button>
                                        </CardHeader>

                                        <CardBody className={"flex flex-col gap-2 pt-1"}>
                                            <ScrollShadow
                                                hideScrollBar
                                                className={'w-full max-h-[250px]'}
                                                offset={5}
                                            >
                                                <div className={"w-full flex flex-col"}>
                                                    {filteredTags.map((data) => (
                                                        <Button
                                                            disableRipple
                                                            key={data.id}
                                                            isDisabled={selectedTags.includes(data.tag)}
                                                            variant={"light"}
                                                            className={"flex justify-start"}
                                                            onClick={() => handleChipClick(data.tag)}
                                                        >
                                                            {data.tag}
                                                        </Button>
                                                    ))}
                                                </div>
                                            </ScrollShadow>
                                        </CardBody>
                                    </Card>
                                )}
                            </div>
                        </CardHeader>

                        <Divider className={"w-[70%] self-center bg-muted"}/>

                        <CardBody className={"h-auto"}>

                            <ReactQuill
                                modules={quillBasicModules}
                                placeholder={'Please add some details for your question'}
                                onChange={handleEditorChange}
                            />
                        </CardBody>
                    </Card>
                </main>
                <aside className={"hidden md:flex md:w-[30%] relative"}>
                    {titleFocus && (
                        <div className={"relative top-16 animate-slidein opacity-0 [--slidein-duration:500ms] md:px2"}>
                            <h4 className={"text-2xl tracking-wide"}>
                                Great Title
                            </h4>

                            <ul className={"list-disc ml-6 [&>li]:mt-2 text-sm text-muted-foreground"}>
                                <li>
                                    A clear and specific title helps readers quickly understand that the blog post is
                                    relevant to their interests or needs, encouraging them to engage with the content.
                                </li>

                                <li>
                                    The title sets the first impression of your blog post, establishing a tone that can
                                    draw readers in and make them more likely to trust and read your content.
                                </li>
                            </ul>
                        </div>
                    )}

                    {isSuggestion && (
                        <div className={"relative top-24 animate-slidein opacity-0 [--slidein-duration:500ms] md:px2"}>
                            <h4 className={"text-2xl tracking-wide"}>
                                Adding Tags
                            </h4>

                            <ul className={"list-disc ml-6 [&>li]:mt-2 text-sm text-muted-foreground"}>
                                <li>
                                    Tags help categorize and organize your blog posts, making it easier for readers to
                                    find related content on your website and navigate through different topics.
                                </li>

                                <li>
                                    Relevant tags make your blog post more discoverable to users searching for specific
                                    topics or keywords, enhancing its visibility in search engine results.
                                </li>
                            </ul>
                        </div>
                    )}
                </aside>
            </main>
        </div>
    )
};

export default BlogWrite;
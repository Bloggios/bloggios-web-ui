import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {Card, CardBody, CardHeader} from "@nextui-org/card";
import {Chip} from "@nextui-org/chip";
import {Button, DatePicker, Divider, Input, ScrollShadow} from "@nextui-org/react";
import {CloseIcon} from "@nextui-org/shared-icons";
import '@/app/quill.css';
import ReactQuill, {Quill, UnprivilegedEditor} from "react-quill";
import {blogToolbar, toolbarOptions} from "@/utils/QuillConfigurations";
import {DeltaStatic, Sources} from "quill";
import {QuillData} from "@/interfaces/QuillData";
import {getHtmlContent, validateBlogData} from "@/utils/QuillFunctions";
import {useDispatch, useSelector} from "react-redux";
import {Dispatch} from "redux";
import {Modal, ModalBody, ModalContent, ModalFooter, ModalHeader} from "@nextui-org/modal";
import Cropper from "react-easy-crop";
import {fileToBlob, getCroppedImg} from "@/utils/ImageCropperUtil";
import {IoMdClose} from "react-icons/io";
import {MdEdit} from "react-icons/md";
import {Button as ShadButton} from "@/components/ui/button";
// @ts-ignore
import ImageResize from 'quill-image-resize-module-react';
import {getLocalTimeZone, now, ZonedDateTime} from "@internationalized/date";
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover";
import {CaretSortIcon, CheckIcon} from "@radix-ui/react-icons";
import {Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList} from "@/components/ui/command";
import {cn} from "@/lib/utils";
import {RootState} from "@/state/store";
import {BlogAdvancedProps} from "@/interfaces/BlogAdvancedProps";
import {BlogData} from "@/interfaces/BlogData";

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
];

const chapters = [
    {
        value: "java",
        label: "Java",
    },
    {
        value: "spring_boot",
        label: "Spring Boot",
    },
    {
        value: "react",
        label: "React.js",
    },
    {
        value: "next",
        label: "Next.js",
    },
    {
        value: "kafka",
        label: "Kafka",
    },
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
    const dispatch: Dispatch = useDispatch();
    const [editorContent, setEditorContent] = useState<QuillData>({
        delta: undefined,
        html: "",
        text: ""
    });
    const [addBlogData, setAddBlogData] = useState<BlogData>({
        canonicalUrl: "",
        scheduledDate: 0,
        seoTitle: "",
        title: "",
    });
    const [croppedCoverImage, setCroppedCoverImage] = useState<any>(null);
    const [croppedCoverImageFile, setCroppedCoverImageFile] = useState<any>(null);
    const [coverImage, setCoverImage] = useState<any>(null);
    const [isCropperModalOpen, setIsCropperModalOpen] = useState(false);
    const [crop, setCrop] = useState({x: 0, y: 0});
    const [zoom, setZoom] = useState(1);
    const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
    const [fileType, setFileType] = useState("image/png");
    const [isAdvancedModalOpen, setIsAdvancedModalOpen] = useState(false);
    const [advancedProps, setAdvancedProps] = useState<BlogAdvancedProps>({
        seoTitle: '',
        scheduledDate: '',
        canonicalUrl: ''
    });
    const [advancedPropsError, setAdvancedPropsError] = useState<BlogAdvancedProps>({
        seoTitle: '',
        scheduledDate: '',
        canonicalUrl: ''
    });
    const [isChapterBox, setIsChapterBox] = useState(false);
    const [chapterValue, setChapterValue] = React.useState("");
    const {name} = useSelector((state: RootState) => state.profile);
    const [buttonLoader, setButtonLoader] = useState(false);

    useEffect(() => {
        if (coverImage) {
            setIsCropperModalOpen(true);
        } else {
            setIsCropperModalOpen(false);
        }
    }, [coverImage]);

    const onAdvancedModalClose = () => {
        setIsAdvancedModalOpen(false);
    }

    const onFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files.length > 0) {
            const reader = new FileReader();
            reader.readAsDataURL(event.target.files[0]);
            reader.onload = () => {
                const imageSrc: string = reader.result as string;
                const type: string | undefined = imageSrc.split(';')[0].split(':')[1];
                setFileType(type);
                setCoverImage(imageSrc);
            };
        }
    };

    const onCropComplete = useCallback((croppedArea: any, croppedAreaPixels: any) => {
        setCroppedAreaPixels(croppedAreaPixels);
    }, []);

    const cropperModalOnClose = () => {
        setIsCropperModalOpen(false);
    }

    const showCroppedImage = useCallback(async () => {
        try {
            const croppedImage = await getCroppedImg(coverImage, croppedAreaPixels, fileType);
            const image = await fileToBlob(croppedImage);
            setCroppedCoverImageFile(croppedImage);
            setCroppedCoverImage(image);
            cropperModalOnClose();
        } catch (e) {
            console.error(e);
        }
    }, [croppedAreaPixels, coverImage]);

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
            parchment: Quill.import('parchment'),
            modules: ['Resize', 'DisplaySize']
        },
    }), []);

    const handleEditorChange = (value: string, delta: DeltaStatic, source: Sources, editor: UnprivilegedEditor) => {
        setEditorContent({
            html: editor.getHTML(),
            delta: editor.getContents(),
            text: editor.getText()
        });
    }

    const handleAdvancedPropsInputChange = (event: React.ChangeEvent<HTMLInputElement>, property: keyof BlogAdvancedProps) => {
        setAdvancedPropsError(prevState => ({
            ...prevState,
            [property]: ''
        }));
        setAdvancedProps(prevState => ({
            ...prevState,
            [property]: event.target.value
        }))
    }

    const getCoverImage = useMemo(() => {
        if (croppedCoverImage) {
            return (
                <div className={"relative w-full rounded-xl overflow-hidden mb-4 animate-slidein opacity-0"}>
                    <img src={croppedCoverImage} alt={"Cover Image"} width={"100%"}/>
                    <div className={"absolute flex gap-2 top-2 right-2"}>
                        <Button isIconOnly className={"p-0"} size={"sm"} variant={"ghost"}>
                            <label htmlFor={"image-input"}>
                                <MdEdit className={"text-lg"}/>
                                <input
                                    type="file"
                                    accept="image/*"
                                    id="image-input"
                                    style={{display: 'none'}}
                                    onChange={onFileChange}
                                />
                            </label>
                        </Button>
                        <Button isIconOnly onPress={() => setCroppedCoverImage(null)} size={"sm"} variant={"ghost"}>
                            <IoMdClose className={"text-lg"}/>
                        </Button>
                    </div>
                </div>
            )
        } else {
            return (
                <Button variant={"ghost"} size={"lg"} className={"p-0 mb-4"}>
                    <label htmlFor={"image-input"} className={"py-2 px-10"}>
                        Cover Image
                        <input
                            type="file"
                            accept="image/*"
                            id="image-input"
                            style={{display: 'none'}}
                            onChange={onFileChange}
                        />
                    </label>
                </Button>
            )
        }
    }, [croppedCoverImage]);

    const handleScheduledDate = (dateTime: ZonedDateTime) => {
        setAdvancedPropsError(prevState => ({
            ...prevState,
            scheduledDate: ''
        }));
        const difference = dateTime.toDate().getTime() - new Date().getTime();
        setAdvancedProps(prevState => ({
            ...prevState,
            scheduledDate: difference
        }));
    };

    const seoTitleValidator = () => {
        const seoTitle = advancedProps.seoTitle;
        if (seoTitle.length > 0) {
            if (seoTitle.length <= 4 || seoTitle.length >= 100) {
                setAdvancedPropsError(prevState => ({
                    ...prevState,
                    seoTitle: 'SEO Title should be greater than 4 Characters and less Than 100 Characters'
                }));
                return false;
            } else if (seoTitle.includes("https://") || seoTitle.includes("http://")) {
                setAdvancedPropsError(prevState => ({
                    ...prevState,
                    seoTitle: 'SEO Title must not contains any type of Link'
                }));
                return false;
            }
        }
        return true;
    };

    const scheduledDateValidator = () => {
        const dateDifference = advancedProps.scheduledDate;
        if (dateDifference > 86400000) {
            setAdvancedPropsError(prevState => ({
                ...prevState,
                scheduledDate: "You cannot Schedule Blog after 24 Hours or before current Time"
            }));
            return false;
        }
        return true;
    };

    const canonicalLinkValidator = () => {
        const canonicalUrl = advancedProps.canonicalUrl;
        if (canonicalUrl.length > 0) {
            if (canonicalUrl.length <= 4 || canonicalUrl.length >= 1000) {
                setAdvancedPropsError(prevState => ({
                    ...prevState,
                    canonicalUrl: 'Canonical Link should be greater than 4 Characters and less Than 1000 Characters'
                }));
                return false;
            } else if (canonicalUrl.includes("http://")) {
                setAdvancedPropsError(prevState => ({
                    ...prevState,
                    canonicalUrl: 'Bloggios does not accept unsecured protocol Links'
                }));
                return false;
            }
        }
        return true;
    };

    const handleAdvancedPropsSave = () => {
        const validateSeo = seoTitleValidator();
        const validateScheduler = scheduledDateValidator();
        const validateCanonicalLink = canonicalLinkValidator();
        if (!validateSeo || !validateScheduler || !validateCanonicalLink) {
            return;
        } else {
            setAddBlogData(prevData => ({
                ...prevData,
                seoTitle: advancedProps.seoTitle,
                scheduledDate: advancedProps.scheduledDate,
                canonicalUrl: advancedProps.canonicalUrl
            }));
            onAdvancedModalClose();
        }
    };

    const handleBlogDataChange = (event: React.ChangeEvent<HTMLInputElement>, property: keyof BlogData) => {
        setAddBlogData(prevState => ({
            ...prevState,
            [property]: event.target.value
        }))
    }

    const handleValidate = () => {
        setButtonLoader(true);
        const htmlContent = getHtmlContent(editorContent, dispatch);
        if (htmlContent) {
            const finalBlogData = {
                ...addBlogData,
                detailsText: htmlContent.text,
                htmlData: htmlContent.finalHtml,
                topics: selectedTags,
                images: htmlContent.blobs,
                title: addBlogData.title,
                chapterId: chapterValue,
                coverImage: croppedCoverImageFile
            }
            const isValid = validateBlogData(finalBlogData, dispatch, chips);
            if (!isValid) return;
            console.log(finalBlogData.htmlData);
        }
        setButtonLoader(false);
    }

    return (
        <>
            <div className={"flex-1 w-full"}>
                <main className={"max-w-screen-xl container flex h-auto flex-col gap-2 w-full mt-4 md:mt-10 "}>

                    <div className={"flex justify-end mb-2"}>
                        <Button
                            variant={"light"}
                            size={"sm"}
                            className={"text-sm md:text-medium"}
                            onPress={() => setIsAdvancedModalOpen(true)}
                        >
                            Advanced
                        </Button>
                    </div>

                    <Card className={"w-full flex flex-col md:px-7 md:py-4 h-fit"}>
                        <CardHeader className={"flex flex-col items-start justify-start gap-2"}>

                            {getCoverImage}

                            <input
                                className={"bg-transparent w-full text-3xl md:text-5xl lg:text-6xl border-none focus:border-none focus:outline-none resize-none"}
                                placeholder={"Enter Title"}
                                maxLength={150}
                                value={addBlogData.title}
                                onChange={(event) => handleBlogDataChange(event, "title")}
                            />

                            <div className={"flex flex-col w-full mt-1"}>
                                <div
                                    className={"flex flex-row gap-2 items-center text-medium tracking-wide h-auto"}>
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
                                                {filteredTags.length > 0 ? (
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
                                                ) : (
                                                    <div className={"flex items-center justify-center"}>
                                                        <h2 className={"text-medium font-light text-muted-foreground"}>No
                                                            Tags found with <strong>{`'${tagInputValue}'`}</strong>
                                                        </h2>
                                                    </div>
                                                )}
                                            </ScrollShadow>
                                        </CardBody>
                                    </Card>
                                )}
                            </div>
                        </CardHeader>

                        <Divider className={"w-[70%] self-center bg-muted"}/>

                        <CardBody className={"w-full"}>
                            <ReactQuill
                                theme={"snow"}
                                modules={quillBasicModules}
                                onChange={handleEditorChange}
                                placeholder={"Add your Blog Content here...."}
                            />
                        </CardBody>
                    </Card>

                    <div className={"flex gap-2 mt-2 items-center justify-between flex-col md:flex-row"}>
                        <div className={"flex flex-col gap-1"}>
                            <label htmlFor="chapter" className={"ml-2"}>Chapter</label>
                            <small className={"text-xs ml-2 font-light text-muted-foreground tracking-wide"}>Will
                                this
                                Blog be part of a Chapter or Series? Select the name of Chapter. (Chapter can have
                                10
                                Blogs)</small>
                        </div>

                        <Popover open={isChapterBox} onOpenChange={setIsChapterBox}>
                            <PopoverTrigger asChild>
                                <ShadButton
                                    variant="outline"
                                    role="combobox"
                                    aria-expanded={isChapterBox}
                                    className="w-full md:w-[200px] min-w-[200px] justify-between overflow-hidden"
                                >
                                        <span className={"overflow-hidden overflow-ellipsis self-start max-w-[80%]"}>
                                            {chapterValue
                                                ? chapters.find((framework) => framework.value === chapterValue)?.label
                                                : "Select Chapter..."}
                                        </span>
                                    <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50"/>
                                </ShadButton>
                            </PopoverTrigger>
                            <PopoverContent
                                className="w-screen-minus [--screen-minus-value:29px] md:w-[200px] p-0 overflow-hidden overflow-ellipsis">
                                <Command>
                                    <CommandInput placeholder="Search Chapter..." className="h-9"/>
                                    <CommandList>
                                        <CommandEmpty>No framework found.</CommandEmpty>
                                        <CommandGroup>
                                            {chapters.map((framework) => (
                                                <CommandItem
                                                    key={framework.value}
                                                    value={framework.value}
                                                    onSelect={(currentValue) => {
                                                        setChapterValue(currentValue === chapterValue ? "" : currentValue)
                                                        setIsChapterBox(false)
                                                    }}
                                                >
                                                    {framework.label}
                                                    <CheckIcon
                                                        className={cn(
                                                            "ml-auto h-4 w-4",
                                                            chapterValue === framework.value ? "opacity-100" : "opacity-0"
                                                        )}
                                                    />
                                                </CommandItem>
                                            ))}
                                        </CommandGroup>
                                    </CommandList>
                                </Command>
                            </PopoverContent>
                        </Popover>
                    </div>

                    <Button color={"primary"} className={"w-full md:w-fit self-end mt-4 px-7"} onPress={handleValidate}>
                        Publish
                    </Button>
                </main>
            </div>

            {/* Cover Image Cropper Modal*/}
            <Modal
                isOpen={isCropperModalOpen}
                onClose={cropperModalOnClose}
                placement={"center"}
                backdrop={"blur"}
                scrollBehavior={"inside"}
                classNames={{
                    body: "p-1 md:p-4 py-4",
                    closeButton: "hidden"
                }}
                motionProps={{
                    variants: {
                        enter: {
                            y: 0,
                            opacity: 1,
                            transition: {
                                duration: 0.3,
                                ease: "easeOut",
                            },
                        },
                        exit: {
                            y: -20,
                            opacity: 0,
                            transition: {
                                duration: 0.2,
                                ease: "easeIn",
                            },
                        },
                    }
                }}
            >
                <ModalContent>
                    <ModalBody>
                        <div className={"relative w-full h-[400px]"}>
                            <Cropper
                                image={coverImage}
                                crop={crop}
                                zoom={zoom}
                                aspect={16 / 6}
                                onCropChange={setCrop}
                                onZoomChange={setZoom}
                                onCropComplete={onCropComplete}
                            />
                        </div>
                    </ModalBody>

                    <ModalFooter>
                        <Button onPress={showCroppedImage}>
                            Add Image
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>

            {/* AdvancedProps Modal*/}
            <Modal
                isOpen={isAdvancedModalOpen}
                onClose={onAdvancedModalClose}
                placement={"center"}
                backdrop={"blur"}
                scrollBehavior={"inside"}
                size={"lg"}
                classNames={{
                    body: 'p-2 md:p-4',
                    header: 'p-2 md:p-4'
                }}
            >
                <ModalContent>
                    <ModalHeader>
                        <h2 className={"text-2xl tracking-wide font-bold"}>Advanced Options</h2>
                    </ModalHeader>

                    <ModalBody className={"flex flex-col gap-4"}>

                        <div className={"flex flex-col gap-1"}>
                            <label htmlFor="seo-title">
                                SEO Title
                            </label>
                            <div className={"flex flex-col gap-4"}>
                                <p className={"leading-none text-xs font-extralight text-muted-foreground tracking-wide"}>
                                    An SEO Title is a web page&apos;s title shown in search engine results. It should be
                                    concise, ideally 40-50 characters, and include commonly searched keywords to improve
                                    click-through rates. Titles over 60 characters may be truncated, reducing their
                                    effectiveness.
                                </p>
                                <Input
                                    type={"text"}
                                    placeholder={`${addBlogData.title.length > 0 ? addBlogData.title : 'Blog title'} | by ${name} | Bloggios`}
                                    value={advancedProps.seoTitle}
                                    onChange={(event) => handleAdvancedPropsInputChange(event, "seoTitle")}
                                    maxLength={150}
                                    isInvalid={advancedPropsError.seoTitle.length > 0}
                                    errorMessage={advancedPropsError.seoTitle}
                                />
                            </div>
                        </div>

                        <Divider className={"w-[80%] self-center"}/>
                        <div className={"flex flex-col gap-2"}>
                            <label htmlFor="schedule-blog" className={"ml-2"}>Schedule Blog</label>
                            <div className={"flex gap-2"}>
                                <DatePicker
                                    aria-label={"Schedule Date"}
                                    hideTimeZone
                                    showMonthAndYearPickers
                                    defaultValue={now(getLocalTimeZone())}
                                    onChange={handleScheduledDate}
                                    isInvalid={advancedPropsError.scheduledDate.length > 0}
                                    errorMessage={advancedPropsError.scheduledDate}
                                />
                            </div>
                        </div>

                        <Divider/>

                        <div className={"flex flex-col gap-1"}>
                            <label htmlFor="seo-title">
                                Canonical Link
                            </label>
                            <div className={"flex flex-col gap-4"}>
                                <p className={"leading-none text-xs font-extralight text-muted-foreground tracking-wide"}>
                                    When an article appears on multiple web applications, search engines rely on
                                    canonical links to identify and prioritize the original source. If your article or
                                    Blog first appeared on another platform and you prefer search engines to index that
                                    version instead of this one on Bloggios, you can set the canonical link here.
                                </p>
                                <Input
                                    placeholder={'Add the Canonical Link'}
                                    value={advancedProps.canonicalUrl}
                                    onChange={(event) => handleAdvancedPropsInputChange(event, "canonicalUrl")}
                                    isInvalid={advancedPropsError.canonicalUrl.length > 0}
                                    errorMessage={advancedPropsError.canonicalUrl}
                                />
                            </div>
                        </div>
                    </ModalBody>

                    <ModalFooter className={"flex flex-row items-center justify-end"}>
                        <Button size={"sm"} variant={"light"} color={"danger"} onPress={onAdvancedModalClose}>
                            Cancel
                        </Button>

                        <Button size={"sm"} color={"primary"} onPress={handleAdvancedPropsSave}>
                            Save
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
};

export default BlogWrite;
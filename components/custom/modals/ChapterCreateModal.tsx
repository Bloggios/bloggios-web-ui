import {Modal, ModalBody, ModalContent, ModalFooter, ModalHeader} from "@nextui-org/modal";

import React, {useCallback, useEffect, useRef, useState} from 'react';
import Cropper from "react-easy-crop";
import {Button, CircularProgress, Input, ScrollShadow, Spinner} from "@nextui-org/react";
import AuthenticatedAxiosInterceptor from "@/utils/AuthenticatedAxiosInterceptor";
import {useDispatch, useSelector} from "react-redux";
import {getCroppedImg} from "@/utils/ImageCropperUtil";
import {RootState} from "@/state/store";
import {Chip} from "@nextui-org/chip";
import {Card, CardBody, CardHeader} from "@nextui-org/card";
import {CloseIcon} from "@nextui-org/shared-icons";
import {useMutation, useQuery} from "@tanstack/react-query";
import {fetchBlogTopics} from "@/rest/BlogProviderApplication";
import {MdDeleteOutline, MdOutlineErrorOutline} from "react-icons/md";
import {BiRefresh} from "react-icons/bi";
import {countWords} from "@/utils/StringUtils";
import {dispatchError, dispatchErrorMessage, dispatchSuccessMessage} from "@/utils/DispatchFunctions";
import {ADD_NEW_CHAPTER} from "@/constants/ApiEndpointConstants";

interface ChapterCreateModalProps {
    isOpen: boolean;
    onClose: () => void;
    refetch: any;
}

const ChapterCreateModal: React.FC<ChapterCreateModalProps> = ({
                                                                   isOpen,
                                                                   onClose,
                                                                   refetch
                                                               }) => {

    const [chapterCoverImageSrc, setChapterCoverImageSrc] = useState<any>(null);
    const [fileType, setFileType] = useState("image/png");
    const [crop, setCrop] = useState({x: 0, y: 0});
    const [zoom, setZoom] = useState(1);
    const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
    const authAxios = AuthenticatedAxiosInterceptor();
    const dispatch = useDispatch();
    const {name} = useSelector((state: RootState) => state.profile);
    const [chapterName, setChapterName] = useState<string>("");
    const [chapterNameError, setChapterNameError] = useState<string>("");
    const [selectedTags, setSelectedTags] = useState<string[]>([]);
    const [chips, setChips] = useState([]);
    const [tagInputValue, setTagInputValue] = useState("");
    const [isSuggestion, setIsSuggestion] = useState(false);
    const chipColors = ['bg-purple-700', 'bg-red-700', 'bg-amber-700', 'bg-blue-700'];
    const suggestionWrapperRef = useRef(null);
    const [chapterCroppedCoverImageFile, setChapterCroppedCoverImageFile] = useState<any>(null);

    const {
        isLoading: isTopicsLoading,
        error: isTopicsError,
        data: topicsData,
        isSuccess: isTopicsSuccess,
        isError: topicsError,
        refetch: topicsRefetch
    } = useQuery({
        queryKey: ['blog-topics'],
        queryFn: fetchBlogTopics,
        staleTime: 520000
    });

    const addChapter = async (formData: FormData) => {
        const response = await authAxios.post(ADD_NEW_CHAPTER, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        return response.data;
    }

    const addNewChapterMutation = useMutation({
        mutationFn: (formData: FormData) => addChapter(formData),
        onSuccess: () => {
            dispatchSuccessMessage(dispatch, "Hurray! Chapter Created Successfully");
            refetch();
            handleClose();
        },
        onError: (error: any) => {
            dispatchError(dispatch, error);
        }
    })

    const handleClose = () => {
        setSelectedTags([]);
        setChapterName('');
        setChapterCroppedCoverImageFile(null);
        onClose();
    }

    const handleCreate = () => {
        const missingElements = selectedTags
            .filter((topic: any) =>
                !chips.some((item: any) => item.tag === topic)
            );
        if (!chapterName || chapterName.length === 0) {
            setChapterNameError('Please enter a chapter name');
        } else if (chapterName.length > 50) {
            setChapterNameError('Chapter name should be less than 50 characters');
        } else if (countWords(chapterName) > 7) {
            setChapterNameError('Chapter name should be less than 7 Words');
        } else if (chapterCroppedCoverImageFile && chapterCroppedCoverImageFile.size > 1000 * 1024) {
            dispatchErrorMessage(dispatch, 'Image size should be less than 1MB');
        } else if (selectedTags.length > 0 && missingElements.length > 0) {
            dispatchErrorMessage(dispatch, `${missingElements.join(', ')} is not a valid Topic`);
        } else if (selectedTags.length > 5) {
            dispatchErrorMessage(dispatch, 'Topics should be less than 5');

        } else {
            const formData: any = new FormData();
            formData.append('chapterName', chapterName);
            if (selectedTags?.length > 0) {
                formData.append('topics', selectedTags);
            }
            if (chapterCroppedCoverImageFile) {
                formData.append('coverImage', chapterCroppedCoverImageFile)
            }
            formData && addNewChapterMutation.mutate(formData);
        }
    }

    useEffect(() => {
        if (isTopicsSuccess && topicsData) {
            setChips(topicsData?.object);
        }
    }, [topicsData, isTopicsSuccess]);

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

    useEffect(() => {
        if (selectedTags?.length >= 5 && isSuggestion) {
            setIsSuggestion(false);
        }
    }, [selectedTags])

    const handleChipClick = (chip: string) => {
        if (selectedTags.length > 4) {
            return;
        }
        if (selectedTags.includes(chip)) {
            return;
        } else {
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

    const filteredTags = chips.filter((chip: any) =>
        chip.tag.toLowerCase().includes(tagInputValue.toLowerCase())
    );

    const onChapterCoverImageFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files.length > 0) {
            const reader = new FileReader();
            reader.readAsDataURL(event.target.files[0]);
            reader.onload = () => {
                const imageSrc: string = reader.result as string;
                const type: string | undefined = imageSrc.split(';')[0].split(':')[1];
                setFileType(type);
                setChapterCoverImageSrc(imageSrc);
            };
        }
    };

    const onCropComplete = useCallback((croppedArea: any, croppedAreaPixels: any) => {
        setCroppedAreaPixels(croppedAreaPixels);
    }, []);

    const showCroppedImage = useCallback(async () => {
        try {
            const croppedImage = await getCroppedImg(chapterCoverImageSrc, croppedAreaPixels, fileType);
            setChapterCroppedCoverImageFile(croppedImage);
            setChapterCoverImageSrc(null);
        } catch (e) {
            console.error(e);
        }
    }, [croppedAreaPixels, chapterCoverImageSrc]);

    const getTopicsSuggestionData = () => {
        if (isTopicsSuccess && !isTopicsError) {
            return (
                <ScrollShadow
                    hideScrollBar
                    className={'w-full max-h-[150px]'}
                    offset={2}
                >
                    {filteredTags.length > 0 ? (
                        <div className={"w-full flex flex-col"}>
                            {filteredTags.map((data: any) => (
                                <Button
                                    disableRipple
                                    key={data.tag}
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
            )
        } else if (isTopicsLoading && !topicsData) {
            return (
                <div className={"w-full flex h-[160px] items-center justify-center"}>
                    <Spinner/>
                </div>
            )
        } else if (isTopicsError) {
            return (
                <div className={"w-full flex h-auto items-center justify-center flex-col text-red-500 text-center"}>
                    <MdOutlineErrorOutline className={"text-5xl"}/>
                    <h4 className={"scroll-m-20 text-xl font-semibold tracking-tight"}>Unable to Fetch Topics.</h4>
                    <p className={"font-extralight"}>Please try again after sometime</p>
                    <Button isIconOnly={true} variant={"ghost"} size={"sm"} className={"mt-2"}
                            onPress={() => topicsRefetch()}>
                        <BiRefresh className={"text-xl"}/>
                    </Button>
                </div>
            )
        }
    }

    const topicsContent = () => {
        return (
            !chapterCoverImageSrc && <div className={"flex flex-col w-full mt-1 animate-slidein"}>
                <div
                    className={`flex flex-row gap-2 items-center text-medium tracking-wide h-auto flex-wrap border-2 p-2 rounded-xl ${selectedTags.length === 0 ? 'border-gray-300 dark:border-gray-700' : 'border-transparent'}`}>
                    {selectedTags.map((tag, index) => {
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
                        className={`font-light w-[172px] bg-transparent outline-none border-none ${selectedTags.length >= 5 ? 'hidden' : ''}`}
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
                            {getTopicsSuggestionData()}
                        </CardBody>
                    </Card>
                )}
            </div>
        )
    };

    const getCoverImage = () => {
        if (!chapterCoverImageSrc && !chapterCroppedCoverImageFile) {
            return (
                <Button variant={"ghost"} size={"lg"} className={"p-0 mb-4 animate-slidein"}>
                    <label htmlFor={"cover-image-input"} className={"py-2 px-10"}>
                        Cover Image
                        <input
                            type="file"
                            accept="image/*"
                            id="cover-image-input"
                            style={{display: 'none'}}
                            onChange={onChapterCoverImageFileChange}
                        />
                    </label>
                </Button>
            )
        } else if (chapterCoverImageSrc && !chapterCroppedCoverImageFile) {
            return (
                <>
                    <div className={"relative w-full h-[400px] animate-slidein"}>
                        <Cropper
                            image={chapterCoverImageSrc}
                            crop={crop}
                            zoom={zoom}
                            aspect={16 / 6}
                            onCropChange={setCrop}
                            onZoomChange={setZoom}
                            onCropComplete={onCropComplete}
                        />
                    </div>
                    <div className={"flex gap-2 items-center justify-end"}>
                        <Button variant={"ghost"} size={"sm"} color={"danger"}
                                onPress={() => setChapterCoverImageSrc(null)}>
                            Cancel
                        </Button>

                        <Button color={"primary"} size={"sm"} onPress={() => showCroppedImage()}>
                            Crop
                        </Button>
                    </div>
                </>
            )
        } else if (chapterCroppedCoverImageFile && !chapterCoverImageSrc) {
            return (
                <div className={"flex flex-row items-center justify-between p-2"}>
                    <span className={"text-muted-foreground"}>
                        Image Selected ✅
                    </span>

                    <div className={"flex gap-2"}>
                        <Button variant={"ghost"} color={"danger"} size={"sm"} isIconOnly={true}
                                onClick={() => setChapterCroppedCoverImageFile(null)}>
                            <MdDeleteOutline className={"text-lg"}/>
                        </Button>
                    </div>
                </div>
            )
        }
    }

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            placement={"center"}
            backdrop={"blur"}
            scrollBehavior={"inside"}
            classNames={{
                body: "p-1 md:p-4 py-4 max-h-[400px]",
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
                <ModalHeader className={"flex flex-col gap-2"}>
                    <h2 className={"text-2xl tracking-wider"}>Hi {name?.split(' ')[0]} 👋</h2>
                    <p className={"text-sm font-extralight text-justify"}>
                        Say hello to <strong>Chapters</strong>, where every post is a step in a thrilling blog series.
                        Each chapter boasts its own unique name and cover image within your profile, setting the stage
                        for the story ahead.
                    </p>
                </ModalHeader>

                <ModalBody>
                    {!chapterCoverImageSrc && (
                        <Input
                            type="text"
                            className={"animate-slidein"}
                            variant={"bordered"}
                            label="Chapter Name"
                            maxLength={40}
                            required
                            value={chapterName}
                            isInvalid={chapterNameError.length > 0}
                            errorMessage={chapterNameError}
                            onChange={(event) => setChapterName(event.target.value)}
                        />
                    )}

                    {topicsContent()}

                    {getCoverImage()}
                </ModalBody>

                <ModalFooter>
                    <div className={"flex gap-2"}>
                        <Button
                            variant={"ghost"}
                            size={"sm"}
                            color={"danger"}
                            onPress={() => handleClose()}
                        >
                            Cancel
                        </Button>

                        <Button
                            color={"primary"}
                            size={"sm"}
                            onPress={() => handleCreate()}
                        >
                            {addNewChapterMutation.isPending ? (
                                <CircularProgress
                                    classNames={{
                                        svg: "w-6 h-6",
                                        indicator: "stroke-white dark:stroke-black"
                                    }}
                                />
                            ) : "Create"}
                        </Button>
                    </div>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
};

export default ChapterCreateModal;
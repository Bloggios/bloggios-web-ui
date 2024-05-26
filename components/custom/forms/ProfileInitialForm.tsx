"use client";

import React, {
    ChangeEvent,
    ChangeEventHandler,
    useCallback,
    useEffect,
    useLayoutEffect,
    useMemo,
    useState
} from "react";
import {FaCheck} from "react-icons/fa";
import {id} from "postcss-selector-parser";
import {Button, CircularProgress, Input, Select, SelectItem, Textarea} from "@nextui-org/react";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "@/state/store";
import {ProfileInitialData} from "@/interfaces/ProfileInitialData";
import {countWords} from "@/utils/StringUtils";
import {addProfile, profileTagList} from "@/rest/UserAuthProviderApplication";
import {dispatchError} from "@/utils/DispatchFunctions";
import {useMutation} from "@tanstack/react-query";
import {redirect, useRouter} from "next/navigation";
import {AxiosError} from "axios";
import AuthenticatedAxiosInterceptor from "@/utils/AuthenticatedAxiosInterceptor";

export default function ProfileInitialForm() {

    const [currentStep, setCurrentStep] = useState(1);
    const {email} = useSelector((state: RootState) => state.auth);
    const [profileData, setProfileData] = useState<ProfileInitialData>({
        name: '',
        bio: '',
        link: '',
        profileTag: undefined
    });
    const [error, setError] = useState<ProfileInitialData>({
        name: '',
        bio: '',
        link: '',
        profileTag: undefined
    });
    const {isAuthenticated, authorities} = useSelector((state: RootState) => state.auth);
    const [options, setOptions] = useState<string[]>([]);
    const dispatch = useDispatch();
    const router = useRouter();
    const authAxios = AuthenticatedAxiosInterceptor();

    const addProfileMutation = useMutation({
        mutationFn: (data: any)=> addProfile(data, authAxios),
        onSuccess: ()=> {
            window.location.reload();
        },
        onError: (error: any) => {
            dispatchError(dispatch, error);
        }
    });

    useLayoutEffect(()=> {
        if (isAuthenticated && !authorities?.includes('ROLE_DUMMY')) {
            redirect("/dashboard");
        } else if (!isAuthenticated) {
            redirect("/login");
        }
    }, [authorities, isAuthenticated])

    useEffect(() => {
        profileTagList()
            .then((response) => {
                setOptions(response?.tags);
            }).catch((error) => {
            dispatchError(dispatch, error);
        })
    }, [])

    const handleInputChange = (event: any, property: keyof ProfileInitialData) => {
        setError(prevState => ({
            ...prevState,
            [property]: ''
        }))
        setProfileData(prevData => ({
            ...prevData, [property]: event.target.value
        }))
    }

    const updateSteps = (e: any) => {
        const targetId = e.target.id;
        console.log(targetId)
        if ((currentStep === 1 && profileData.name === '')) {
            setError(prevState => ({
                ...prevState,
                name: 'Hold on there! Before you move next, a name in this field we need to know.'
            }));
            return;
        } else if (currentStep === 2 && profileData.bio?.length > 0) {
            if (profileData.bio.length > 150) {
                setError(prevState => ({
                    ...prevState,
                    bio: 'Bio should be less than 150 characters'
                }))
            }
            const newlineCount = (profileData.bio.match(/\n/g) || []).length;
            if (newlineCount > 3) {
                setError(prevState => ({
                    ...prevState,
                    bio: 'Bio should not contain more than three lines'
                }))
                return;
            }
            const words = countWords(profileData.bio);
            if (words > 25) {
                setError(prevState => ({
                    ...prevState,
                    bio: 'Bio should be less than 25 words'
                }))
                return;
            }
        } else if (currentStep === 3 && profileData.link.length > 0) {
            if (profileData.link.length > 0 && !profileData.link.includes(".") && profileData.link.length < 4) {
                setError(prevState => ({
                    ...prevState,
                    link: 'Link is not valid. Please add a valid link'
                }));
                return;
            } else if (profileData.link.startsWith("https:")) {
                setError(prevState => ({
                    ...prevState,
                    link: 'Secure protocol will automatically be added to the link'
                }));
                return;
            } else if (profileData.link.startsWith("http:")) {
                setError(prevState => ({
                    ...prevState,
                    link: 'Bloggios only accepts secured link only which starts with https'
                }));
                return;
            } else if (profileData.link.length > 0 && !profileData.link.includes(".") && profileData.link.length <= 4) {
                setError(prevState => ({
                    ...prevState,
                    link: 'Link is not valid. Please enter valid link'
                }));
                return;
            }
        }
        setCurrentStep((prevStep) => {
            if (targetId === 'next' && prevStep < 4) {
                return prevStep + 1;
            } else if (targetId === 'prev' && prevStep > 1) {
                return prevStep - 1;
            }
            return prevStep;
        });
    };

    const handleInputClear = (property: keyof ProfileInitialData) => {
        setError(prevState => ({
            ...prevState,
            [property]: ''
        }));
        setProfileData(prevState => ({
            ...prevState,
            [property]: ''
        }))
    }

    const handleBioChange = (event: any) => {
        setError(prevState => ({
            ...prevState,
            bio: ''
        }))
        const lines = event.target.value.split('\n');
        if (lines.length <= 3) {
            setProfileData(prevData => ({
                ...prevData, bio: event.target.value
            }));
        } else {
            return;
        }
    }

    const handleLinkChange = (event: any) => {
        setError(prevState => ({
            ...prevState,
            link: ''
        }));

        setProfileData(prevData => ({
            ...prevData, link: event.target.value
        }));
    }

    const handleSubmit = () => {
        const finalData = {
            name: profileData.name,
            bio: profileData.bio.length > 0 ? profileData.bio : null,
            link: profileData.link.length > 0 ? `https://${profileData.link}` : null,
            profileTag: profileData.profileTag
        }
        addProfileMutation.mutate(finalData);
    }

    const getIcon = useCallback((step: number) => {
        if (currentStep > step) {
            return <FaCheck color={"#e5e5e5"}/>
        } else if (currentStep === step) {
            return <CircularProgress
                classNames={{
                    svg: "w-5 h-5",
                    indicator: "stroke-white"
                }}
            />
        } else {
            return <></>;
        }
    }, [currentStep]);

    const getInputFieldContents = useCallback(() => {
        if (currentStep === 1) {
            return (
                <>
                    <small className={"text-sm leading-5 font-normal dark:font-light"}>
                        Hey there, <strong className={"tracking-wide font-bold"}>{email}</strong> That&apos;s quite the
                        address, but wouldn&apos;t you prefer a friendly nickname instead? What should I call you?
                    </small>

                    <Input
                        isClearable={true}
                        type="text"
                        variant={"bordered"}
                        onClear={() => handleInputClear("name")}
                        label="Name*"
                        maxLength={40}
                        required
                        value={profileData.name}
                        isInvalid={error.name.length > 0}
                        errorMessage={error.name}
                        onChange={(event) => handleInputChange(event, "name")}
                    />
                </>
            )
        } else if (currentStep === 2) {
            return (
                <>
                    <small className={"text-sm leading-5 font-normal dark:font-light"}>
                        First impressions matter, <strong
                        className={"tracking-wide font-bold"}>{profileData.name.split(' ')[0]}</strong> Your
                        bio is your headline, a captivating first sentence that grabs attention. What will hook them and
                        make them want to know more about the amazing you?
                    </small>

                    <div className={"flex flex-col gap-1"}>
                        <Textarea
                            maxRows={3}
                            rows={3}
                            spellCheck={false}
                            maxLength={150}
                            value={profileData.bio}
                            onChange={handleBioChange}
                            autoFocus={true}
                            label="Bio"
                            variant={"bordered"}
                            isInvalid={error.bio.length > 0}
                            errorMessage={error.bio}
                            placeholder={'Future biographer needed! \nBriefly introduce yourself'}
                        />

                        <small className={"self-end pr-2 text-muted-foreground"}>
                            {profileData.bio?.length}/{150}
                        </small>
                    </div>
                </>
            )
        } else if (currentStep === 3) {
            return (
                <>
                    <small className={"text-sm leading-5 font-normal dark:font-light"}>
                        Links are like portals to other adventures, <strong
                        className={"tracking-wide font-bold"}>{profileData.name.split(' ')[0]}</strong> .
                        Got a website,
                        blog, portfolio, or something cool you created online? Share the link and let people
                        explore the world you&apos;ve built!
                    </small>

                    <Input
                        type="url"
                        label="Link"
                        placeholder="bloggios.com"
                        labelPlacement="outside"
                        value={profileData.link}
                        onChange={handleLinkChange}
                        isInvalid={error.link.length > 0}
                        errorMessage={error.link}
                        startContent={
                            <div className="pointer-events-none flex items-center">
                                <span className="text-default-400 text-small">https://</span>
                            </div>
                        }
                    />
                </>
            )
        } else if (currentStep === 4) {
            return (
                <>
                    <small className={"text-sm leading-5 font-normal dark:font-light"}>
                        What describes your awesomeness best, <strong className={"tracking-wide font-bold"}>{profileData.name.split(' ')[0]}</strong>? Are you
                        a
                        beat-dropping Musician, a code-wielding Software Engineer, or something else entirely? Pick your
                        tag and show the world your true colors!
                    </small>

                    <Select
                        label="Profile Tag"
                        className="w-full"
                        variant={"bordered"}
                        selectedKeys={[profileData.profileTag]}
                        value={profileData.profileTag}
                        onChange={(event)=> handleInputChange(event, "profileTag")}
                    >
                        {options.map((option) => (
                            <SelectItem key={option} value={option}>
                                {option}
                            </SelectItem>
                        ))}
                    </Select>
                </>
            )
        }
    }, [currentStep, profileData, error])

    return (
        <div className={"flex flex-col gap-10 mt-4 w-full transition-all duration-250"}>
            <div className={"flex w-full items-center justify-between relative z-[1]"}>
                {[1, 2, 3, 4].map((step, index) => (
                    <div key={index}
                         className={"flex items-center justify-center h-[28px] aspect-square rounded-full bg-[#4258ff] transition-all duration-200 ease-in-out"}>
                        {getIcon(step)}
                    </div>
                ))}
                <div className={"absolute h-[2px] w-full overflow-hidden bg-[#e5e5e5] dark:bg-muted"}
                     style={{zIndex: -1}}>
                    <div className="absolute h-full bg-[#465cff] transition-all duration-300 ease-in-out"
                         style={{width: `${((currentStep - 1) / 3) * 100}%`}}/>
                </div>
            </div>

            <div className={"flex flex-col gap-4 transition-all duration-250"}>
                {getInputFieldContents()}
            </div>

            <div className={"flex gap-2 w-full transition-all duration-250"}>
                {currentStep !== 1 && (
                    <Button id="prev" isDisabled={addProfileMutation.isPending} variant={"bordered"} color={"primary"} disabled={currentStep === 1}
                            onClick={updateSteps}>
                        Prev
                    </Button>
                )}
                {currentStep !== 4 && (
                    <Button id="next" className={"w-full"} color={"primary"} disabled={currentStep === 4}
                            onClick={updateSteps}>
                        Next
                    </Button>
                )}
                {currentStep === 4 && (
                    <Button color={"primary"} className={"w-full"} onClick={handleSubmit}>
                        {addProfileMutation.isPending ? (
                            <CircularProgress
                                color="secondary"
                                classNames={{
                                    svg: "w-7 h-7"
                                }}
                            />
                        ) : "Submit"}
                    </Button>
                )}
            </div>
        </div>
    )
}
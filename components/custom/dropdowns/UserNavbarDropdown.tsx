"use client";

import {
    Avatar,
    CircularProgress,
    Dropdown,
    DropdownItem,
    DropdownMenu,
    DropdownSection,
    DropdownTrigger
} from "@nextui-org/react";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "@/state/store";
import {useMutation} from "@tanstack/react-query";
import {logoutUser} from "@/rest/AuthProviderApplication";
import {AxiosError} from "axios";
import {dispatchError} from "@/utils/DispatchFunctions";
import {useRouter} from "next/navigation";
import {LOGIN_PAGE} from "@/constants/UiPathConstants";

export default function UserNavbarDropdown() {

    const {isAuthenticated, email} = useSelector((state: RootState) => state.auth);
    const {profileImage} = useSelector((state: RootState) => state.profile);
    const dispatch = useDispatch();
    const router = useRouter();

    const logoutUserMutation = useMutation({
        mutationFn: ()=> logoutUser(),
        onSuccess: () => {
            router.push(LOGIN_PAGE)
        },
        onError: (error: AxiosError) => {
            dispatchError(dispatch, error);
        }
    });

    return (
        <Dropdown
            showArrow
            radius="sm"
            backdrop={"blur"}
            classNames={{
                base: "before:bg-default-200", // change arrow background
                content: "p-0 border-small border-divider bg-background",
            }}
        >
            <DropdownTrigger>
                <Avatar
                    isBordered
                    src={profileImage ? profileImage : ""}
                    showFallback
                    size={"sm"}
                />
            </DropdownTrigger>

            <DropdownMenu
                aria-label={"user-actions"}
                variant={"flat"}
                className={"max-w-[260px] h-auto"}
                itemClasses={{
                    base: [
                        "rounded-md",
                        "text-default-500",
                        "transition-opacity",
                        "data-[hover=true]:text-foreground",
                        "data-[hover=true]:bg-default-100",
                        "dark:data-[hover=true]:bg-default-50",
                        "data-[selectable=true]:focus:bg-default-50",
                        "data-[pressed=true]:opacity-70",
                        "data-[focus-visible=true]:ring-default-500",
                    ],
                }}
            >
                <DropdownSection showDivider>
                    {isAuthenticated ? (
                        <DropdownItem
                            key="userData"
                            className="flex flex-col gap-2 items-start"
                            isReadOnly
                        >
                            <p className="text-default-600">Logged in as</p>
                            <p className="text-xs text-default-500 overflow-ellipsis overflow-hidden">{email}</p>
                        </DropdownItem>
                    ) : <></>}
                </DropdownSection>

                <DropdownSection showDivider>
                    <DropdownItem onClick={()=> router.push(`/${email}`)} key={"profile"}>
                        Profile
                    </DropdownItem>

                    <DropdownItem>
                        Settings
                    </DropdownItem>
                </DropdownSection>

                <DropdownSection>
                    <DropdownItem key="support">
                        Support & Feedback
                    </DropdownItem>
                    <DropdownItem key="logout" className={"flex w-full"} onClick={()=> logoutUserMutation.mutate()}>
                        {logoutUserMutation.isPending ? (
                            <CircularProgress
                                className={"mx-auto"}
                                classNames={{
                                    svg: "w-5 h-5",
                                    indicator: "stroke-white" 
                                }}
                            />
                        ) : "Logout"}
                    </DropdownItem>
                </DropdownSection>
            </DropdownMenu>
        </Dropdown>
    )
}
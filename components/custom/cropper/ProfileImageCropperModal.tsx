import React, {useCallback, useState} from 'react';
import {Modal, ModalBody, ModalContent, ModalFooter} from "@nextui-org/modal";
import Cropper from "react-easy-crop";
import AuthenticatedAxiosInterceptor from "@/utils/AuthenticatedAxiosInterceptor";
import {dispatchError, dispatchSuccessMessage} from "@/utils/DispatchFunctions";
import {useDispatch} from "react-redux";
import {Button, CircularProgress} from "@nextui-org/react";
import {getCroppedImg} from "@/utils/ImageCropperUtil";
import {ADD_PROFILE_IMAGE} from "@/constants/ApiEndpointConstants";
import {useMutation} from "@tanstack/react-query";

interface ImageCropperModalProps {
    imageSrc: any;
    isOpen: boolean;
    onClose: ()=> void;
    fileType: string
}

const ProfileImageCropperModal: React.FC<ImageCropperModalProps> = ({
    imageSrc,
    isOpen,
    onClose,
    fileType
                           }) => {

    const [crop, setCrop] = useState({ x: 0, y: 0 });
    const [zoom, setZoom] = useState(1);
    const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
    const authAxios = AuthenticatedAxiosInterceptor();
    const dispatch = useDispatch();

    const onCropComplete = useCallback((croppedArea: any, croppedAreaPixels: any) => {
        setCroppedAreaPixels(croppedAreaPixels);
    }, []);

    const uploadImage = async (finalImage: any) => {
        const formData = new FormData();
        formData.append('image', finalImage, 'croppedImage.png');
        addProfileMutation.mutate(formData);
    };

    const showCroppedImage = useCallback(async () => {
        try {
            const croppedImage = await getCroppedImg(imageSrc, croppedAreaPixels, fileType);
            await uploadImage(croppedImage);
        } catch (e) {
            console.error(e);
        }
    }, [croppedAreaPixels, imageSrc]);

    const uploadImageApi = async (formData: FormData) => {
        const response = await authAxios.post(ADD_PROFILE_IMAGE, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        return response.data;
    }

    const addProfileMutation = useMutation({
        mutationFn: (formData: FormData) => uploadImageApi(formData),
        onSuccess: () => {
            dispatchSuccessMessage(dispatch, "Profile Image Uploaded Successfully");
            onClose();
        },
        onError: (error: any) => {
            dispatchError(dispatch, error);
            onClose();
        }
    })

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
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
                    <div style={{position: 'relative', width: '100%', height: 400}}>
                        <Cropper
                            image={imageSrc}
                            crop={crop}
                            zoom={zoom}
                            aspect={1}
                            onCropChange={setCrop}
                            onZoomChange={setZoom}
                            onCropComplete={onCropComplete}
                            cropShape={"round"}
                        />
                    </div>
                </ModalBody>

                <ModalFooter>
                    <Button size={"sm"} color={"danger"} variant={"light"} onPress={onClose}>
                        Cancel
                    </Button>
                    <Button size={"sm"} color={"primary"} onPress={showCroppedImage}>
                        {addProfileMutation.isPending ? (
                            <CircularProgress
                                classNames={{
                                    svg: "w-5 h-5",
                                    indicator: "stroke-black dark:stroke:white"
                                }}
                            />
                        ) : "Submit"}
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
};

export default ProfileImageCropperModal;
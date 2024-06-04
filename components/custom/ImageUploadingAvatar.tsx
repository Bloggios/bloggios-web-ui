"use client";

import {Avatar} from "@nextui-org/react";
import React, {useEffect, useState} from "react";
import ProfileImageCropperModal from "@/components/custom/cropper/ProfileImageCropperModal";
import {FileType} from "next/dist/lib/file-exists";

interface ImageUploadingAvatarProps {
    className: string;
    image: string;
}

const ImageUploadingAvatar: React.FC<ImageUploadingAvatarProps> = ({ className, image }) => {

    const [imageSrc, setImageSrc] = useState<any>(null);
    const [isOpen, setIsOpen] = useState(false);
    const [fileType, setFileType] = useState<string>('image/png');

    const onFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files.length > 0) {
            const reader = new FileReader();
            reader.readAsDataURL(event.target.files[0]);
            reader.onload = () => {
                const imageSrc: string = reader.result as string;
                const type: string | undefined = imageSrc.split(';')[0].split(':')[1];
                setFileType(fileType);
                setImageSrc(imageSrc);
            };
        }
    };

    useEffect(()=> {
        if (imageSrc) {
            setIsOpen(true);
        } else {
            setIsOpen(false);
        }
    }, [imageSrc]);

    const handleClose = () => {
        setImageSrc(null);
    }

    return (
        <>
            <label htmlFor={"image-input"}>
                <Avatar
                    src={image}
                    showFallback
                    className={className}
                    isBordered
                />
                <input
                    type="file"
                    accept="image/*"
                    id="image-input"
                    style={{display: 'none'}}
                    onChange={onFileChange}
                />
            </label>

            <ProfileImageCropperModal
                imageSrc={imageSrc}
                isOpen={isOpen}
                onClose={handleClose}
                fileType={fileType}
            />
        </>
    );
};

export default ImageUploadingAvatar;

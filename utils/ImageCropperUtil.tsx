const createImage = (url: any) =>
    new Promise((resolve, reject) => {
        const image = new Image();
        image.addEventListener('load', () => resolve(image));
        image.addEventListener('error', (error) => reject(error));
        image.setAttribute('crossOrigin', 'anonymous'); // needed to avoid cross-origin issues on CodeSandbox
        image.src = url;
    });

export const getCroppedImg = async (imageSrc: string | Blob | null, pixelCrop: any, fileType: any) => {
    const image = await createImage(imageSrc);
    const canvas = document.createElement('canvas');
    const ctx: any = canvas.getContext('2d');

    canvas.width = pixelCrop.width;
    canvas.height = pixelCrop.height;

    ctx.drawImage(
        image,
        pixelCrop.x,
        pixelCrop.y,
        pixelCrop.width,
        pixelCrop.height,
        0,
        0,
        pixelCrop.width,
        pixelCrop.height
    );

    return new Promise((resolve, reject) => {
        canvas.toBlob((blob) => {
            if (!blob) {
                console.error('Canvas is empty');
                return reject(new Error('Canvas is empty'));
            }
            resolve(new File([blob], 'croppedImage.png', {type: fileType}));
        }, 'image/png');
    });
};

export function fileToBlob(file: any) {
    return new Promise((resolve, reject) => {
        const reader: any = new FileReader();
        reader.onload = () => {
            const blob = new Blob([reader.result], { type: file.type });
            resolve(URL.createObjectURL(blob));
        };
        reader.onerror = reject;
        reader.readAsArrayBuffer(file);
    });
}
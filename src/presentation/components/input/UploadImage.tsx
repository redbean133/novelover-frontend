import { Input } from "@/presentation/shadcn-ui/components/ui/input";
import React, { useState, useCallback, useEffect } from "react";
import Cropper from "react-easy-crop";
import { ButtonWithLoading } from "../button/ButtonWithLoading";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/presentation/shadcn-ui/components/ui/dialog";

type CroppedArea = {
  x: number;
  y: number;
  width: number;
  height: number;
};

type UploadImageProps = {
  initialImageUrl?: string;
  popupTitle?: string;
  popupSubTitle?: string;
  aspectRatio?: number;
  cropShape?: "rect" | "round";
  onUploaded: (payload: {
    blob: Blob;
    fileName: string;
  }) => Promise<string | undefined>;
};

export function UploadImage({
  initialImageUrl,
  popupTitle,
  popupSubTitle,
  aspectRatio = 1,
  cropShape = "rect",
  onUploaded,
}: UploadImageProps) {
  const [file, setFile] = useState<File | null>(null);
  const [isOpenPopup, setOpenPopup] = useState<boolean>(false);
  const [imageSource, setImageSource] = useState<string | null>(null);
  const [cropPosition, setCropPosition] = useState({ x: 0, y: 0 });
  const [zoomLevel, setZoomLevel] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] =
    useState<CroppedArea | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (initialImageUrl) {
      setImageSource(initialImageUrl);
    }
  }, [initialImageUrl]);

  // Reading file data to base64 to display preview
  const onFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setImageSource(null);
      setOpenPopup(true);
      setCropPosition({ x: 0, y: 0 });
      setZoomLevel(1);
      setCroppedAreaPixels(null);

      const reader = new FileReader();
      reader.readAsDataURL(e.target.files[0]);
      reader.onload = () => {
        setImageSource(reader.result as string);
        setFile(e.target.files![0]);
      };
    }

    e.target.value = "";
  };

  const onCropComplete = useCallback(
    (_: CroppedArea, croppedAreaPixels: CroppedArea) => {
      setCroppedAreaPixels(croppedAreaPixels);
    },
    []
  );

  // Convert crop image to blob
  const getCroppedImage = async (): Promise<Blob | null> => {
    if (!imageSource || !croppedAreaPixels) return null;

    const image = new Image();
    image.crossOrigin = "anonymous";
    image.src = imageSource;
    await new Promise((r) => (image.onload = r));

    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");
    if (!context) return null;

    canvas.width = croppedAreaPixels.width;
    canvas.height = croppedAreaPixels.height;

    context.drawImage(
      image,
      croppedAreaPixels.x,
      croppedAreaPixels.y,
      croppedAreaPixels.width,
      croppedAreaPixels.height,
      0,
      0,
      croppedAreaPixels.width,
      croppedAreaPixels.height
    );

    return new Promise<Blob | null>((resolve) => {
      canvas.toBlob((blob) => resolve(blob), "image/jpeg");
    });
  };

  const handleUpload = async () => {
    const croppedBlob = await getCroppedImage();
    if (!croppedBlob) return;

    setLoading(true);
    const url = await onUploaded({
      blob: croppedBlob,
      fileName: file?.name || "avatar.jpg",
    });
    if (url) {
      setImageSource(url);
      setCropPosition({ x: 0, y: 0 });
      setZoomLevel(1);
      setCroppedAreaPixels(null);
    }
    setLoading(false);
    setOpenPopup(false);
  };

  return (
    <div className="flex flex-col gap-4">
      <Input
        type="file"
        accept="image/*"
        className="w-2/3"
        onChange={onFileChange}
      />

      {imageSource && (
        <Dialog open={isOpenPopup} onOpenChange={setOpenPopup}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle className="text-left">{popupTitle}</DialogTitle>
              {popupSubTitle && (
                <DialogDescription className="text-left">
                  {popupSubTitle}
                </DialogDescription>
              )}
            </DialogHeader>
            <div className="relative w-full h-64 bg-black">
              <Cropper
                image={imageSource}
                crop={cropPosition}
                zoom={zoomLevel}
                aspect={aspectRatio}
                cropShape={cropShape}
                onCropChange={setCropPosition}
                onZoomChange={setZoomLevel}
                onCropComplete={onCropComplete}
              />
            </div>
            <ButtonWithLoading onClick={handleUpload} isLoading={loading}>
              {loading ? "Đang cập nhật..." : "Lưu ảnh"}
            </ButtonWithLoading>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}

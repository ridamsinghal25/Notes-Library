import React, { useEffect, useRef, useState } from "react";
import ImageCropModal from "../presentation/ImageCropModal";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedImageFile, toggleModal } from "@/store/ModalSlice";
import axios from "axios";
import {
  centerCrop,
  convertToPixelCrop,
  makeAspectCrop,
} from "react-image-crop";
import { getCroppedImage } from "@/utils/canvas";

const ASPECT_RATIO = 1;

function ImageCropModalContainer({ editFile }) {
  const [imageUrl, setImageUrl] = useState("");
  const [imageCrop, setImageCrop] = useState();
  const [croppedImageUrl, setCroppedImageUrl] = useState("");

  const imageRef = useRef(null);
  const previewCanvasRef = useRef(null);

  const showImageCropModal = useSelector(
    (state) => state.modal.modals.imageCropModal
  );
  const selectedImageFile = useSelector(
    (state) => state.modal.selectedImageFile
  );

  const dispatch = useDispatch();

  useEffect(() => {
    if (showImageCropModal && selectedImageFile?.url) {
      getImageAsDataUrl();
    }
  }, [showImageCropModal]);

  useEffect(() => {
    if (
      imageCrop?.width &&
      imageCrop?.height &&
      imageRef.current &&
      previewCanvasRef.current
    ) {
      const pixelCrop = convertToPixelCrop(
        imageCrop,
        imageRef.current.width,
        imageRef.current.height
      );

      const croppedImageUrl = getCroppedImage(
        imageRef.current,
        previewCanvasRef.current,
        pixelCrop
      );

      setCroppedImageUrl(croppedImageUrl);
    }
  }, [imageCrop]);

  const toggleImageCropModal = () => {
    dispatch(toggleModal({ modalType: "imageCropModal" }));
    dispatch(setSelectedImageFile(null));
    setCroppedImageUrl("");
  };

  const getImageAsDataUrl = async () => {
    const image = await axios.get(selectedImageFile.url, {
      withCredentials: false,
      responseType: "blob",
    });

    const reader = new FileReader();

    reader.readAsDataURL(image.data);

    reader.onload = () => {
      setImageUrl(reader.result || "");

      const crop = makeAspectCrop(
        {
          unit: "%",
          width: 25,
        },
        ASPECT_RATIO,
        30,
        40
      );

      const centeredCrop = centerCrop(crop, 30, 20);
      setImageCrop(centeredCrop);
    };
  };

  const applyCrop = () => {
    const publicId = selectedImageFile.public_id;
    if (!croppedImageUrl) return;

    editFile(publicId, croppedImageUrl);

    toggleImageCropModal();
  };

  return (
    <div>
      <div>
        {showImageCropModal && (
          <ImageCropModal
            toggleImageCropModal={toggleImageCropModal}
            imageUrl={imageUrl}
            imageCrop={imageCrop}
            setImageCrop={setImageCrop}
            imageRef={imageRef}
            previewCanvasRef={previewCanvasRef}
            croppedImageUrl={croppedImageUrl}
            applyCrop={applyCrop}
          />
        )}
      </div>
    </div>
  );
}

export default ImageCropModalContainer;

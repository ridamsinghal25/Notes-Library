import { useState } from "react";
import AuthService from "@/services/AuthService";
import { toast } from "react-toastify";
import ApiError from "@/services/ApiError";
import AvatarUploadModal from "../presentation/AvatarUploadModal";
import { useDispatch, useSelector } from "react-redux";
import { toggleModal } from "@/store/ModalSlice";
import { updateUserDetails } from "@/store/AuthSlice";

function AvatarUploadModalContainer({ avatarUrl }) {
  const [dialogAvatarUrl, setDialogAvatarUrl] = useState(avatarUrl);
  const [isHovered, setIsHovered] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const showAvatarUploadModal = useSelector(
    (state) => state.modal.modals.avatarUploadModal
  );
  const dispatch = useDispatch();

  const handleFileChange = (event) => {
    const file = event.target.files?.[0];

    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setDialogAvatarUrl(e.target?.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const toggleAvatarUploadModal = () => {
    dispatch(
      toggleModal({
        modalType: "avatarUploadModal",
      })
    );
  };

  const onAvatarUpload = async (data) => {
    setIsUploading(true);

    const response = await AuthService.updateUserAvatar(data.avatar);

    setIsUploading(false);

    if (!(response instanceof ApiError)) {
      toggleAvatarUploadModal();
      toast.success(response?.message || "avatar updated successfully");

      dispatch(updateUserDetails(response?.data));
    } else {
      toast.error(response?.errorResponse?.message || response?.errorMessage);
    }
  };

  return (
    <AvatarUploadModal
      dialogAvatarUrl={dialogAvatarUrl}
      showDialog={showAvatarUploadModal}
      setShowDialog={toggleAvatarUploadModal}
      isHovered={isHovered}
      setIsHovered={setIsHovered}
      isUploading={isUploading}
      handleFileChange={handleFileChange}
      onAvatarUpload={onAvatarUpload}
    />
  );
}

export default AvatarUploadModalContainer;

import { useState } from "react";
import AuthService from "@/services/AuthService";
import { toast } from "react-toastify";
import ApiError from "@/services/ApiError";
import AvatarUploadModal from "../presentation/AvatarUploadModal";

function AvatarUploadModalContainer({ avatarUrl, showDialog, setShowDialog }) {
  const [isHovered, setIsHovered] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

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

  const onAvatarUpload = async (data) => {
    setIsUploading(true);

    const response = await AuthService.updateUserAvatar(data.avatar);

    setIsUploading(false);

    if (!(response instanceof ApiError)) {
      setShowDialog();
      toast.success(response?.message || "avatar updated successfully");

      setTimeout(() => {
        window.location.reload();
      }, 1500);
    } else {
      toast.error(response?.errorResponse?.message || response?.errorMessage);
    }
  };

  return (
    <AvatarUploadModal
      dialogAvatarUrl={avatarUrl}
      showDialog={showDialog}
      setShowDialog={setShowDialog}
      isHovered={isHovered}
      setIsHovered={setIsHovered}
      isUploading={isUploading}
      handleFileChange={handleFileChange}
      onAvatarUpload={onAvatarUpload}
    />
  );
}

export default AvatarUploadModalContainer;

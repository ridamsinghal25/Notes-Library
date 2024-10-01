import { useState } from "react";
import { Camera, Loader2, Plus } from "lucide-react";
import { Dialog, DialogContent, DialogClose } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { DialogTitle } from "@radix-ui/react-dialog";
import { UPLOAD_AVATAR_TEXT, UPLOAD_AVATAR_TITLE } from "@/constants/constants";
import { FormProvider, useForm } from "react-hook-form";
import FormFieldInput from "../basic/FormFieldInput";
import { zodResolver } from "@hookform/resolvers/zod";
import { avatarUploadValidation } from "@/validation/zodValidation";
import AuthService from "@/services/AuthService";
import { toast } from "react-toastify";
import ApiError from "@/services/ApiError";

function AvatarUpload({ avatarUrl, showDialog, setShowDialog }) {
  const [dialogAvatarUrl, setDialogAvatarUrl] = useState(avatarUrl);
  const [isHovered, setIsHovered] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  const avatarForm = useForm({
    resolver: zodResolver(avatarUploadValidation),
    defaultValues: {
      avatar: null,
    },
  });

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
      setShowDialog(false);
      toast.success(response?.message || "avatar updated successfully");

      setTimeout(() => {
        window.location.reload();
      }, 1500);
    } else {
      toast.error(response?.errorResponse?.message || response?.errorMessage);
    }
  };

  return (
    <Dialog open={showDialog} onOpenChange={setShowDialog}>
      <DialogContent
        className="sm:max-w-md [background:radial-gradient(125%_125%_at_50%_10%,#fff_40%,#63e_100%)] dark:[background:radial-gradient(125%_125%_at_50%_10%,#000_40%,#63e_100%)] dark:border-gray-400"
        hideClose
      >
        <div className="flex flex-col items-center justify-center p-6 space-y-6">
          <DialogTitle className="text-2xl font-bold text-center">
            {UPLOAD_AVATAR_TITLE}
          </DialogTitle>
          <FormProvider {...avatarForm}>
            <form
              onSubmit={avatarForm.handleSubmit(onAvatarUpload)}
              className="space-y-6 w-full"
            >
              <div
                className="relative w-40 h-40 mx-auto rounded-full bg-gradient-to-br from-violet-500 to-purple-600 p-1 shadow-lg"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
              >
                <div className="w-full h-full rounded-full overflow-hidden bg-gray-200">
                  {dialogAvatarUrl ? (
                    <img
                      src={dialogAvatarUrl}
                      alt="User Avatar"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-400">
                      <Plus size={48} />
                    </div>
                  )}
                </div>
                <div
                  className={`absolute inset-0 rounded-full transition-opacity duration-300 ${
                    isHovered ? "opacity-80" : "opacity-0"
                  } bg-black flex items-center justify-center`}
                >
                  <label
                    htmlFor="avatar-upload"
                    className="cursor-pointer text-white flex flex-col items-center"
                  >
                    <Camera size={32} />
                    <span className="text-sm mt-2">Change Photo</span>
                  </label>
                </div>
              </div>

              <FormFieldInput
                form={avatarForm}
                name="avatar"
                id="avatar-upload"
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
              />

              <div className="flex justify-center">
                <Button
                  type="submit"
                  disabled={isUploading}
                  className="w-full max-w-xs"
                >
                  {isUploading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Uploading...
                    </>
                  ) : (
                    UPLOAD_AVATAR_TEXT
                  )}
                </Button>
              </div>
            </form>
          </FormProvider>
        </div>
        <DialogClose asChild>
          <Button className="w-full bg-amber-100 text-violet-800 hover:bg-amber-200">
            Cancel
          </Button>
        </DialogClose>
      </DialogContent>
    </Dialog>
  );
}

export default AvatarUpload;

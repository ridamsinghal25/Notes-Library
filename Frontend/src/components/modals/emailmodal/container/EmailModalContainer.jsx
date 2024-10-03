import { useState } from "react";
import { EmailModal } from "../presentation/EmailModal";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "@/constants/route";
import ApiError from "@/services/ApiError";
import { useDispatch, useSelector } from "react-redux";
import { toggleModal } from "@/store/ModalSlice";

function EmailModalContainer({ isPasswordUpdateMode }) {
  const [isSendingEmail, setIsSendingEmail] = useState(false);
  const showDialog = useSelector((state) => state.modal.modals.emailModal);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onForgotPassword = async (data) => {
    setIsSendingEmail(true);

    const response = await AuthService.forgotPassword(data);

    setIsSendingEmail(false);

    if (!(response instanceof ApiError)) {
      toast.success(
        response?.message || "Forgot password code send successfully"
      );

      setShowEmailModal();
      navigate(`${ROUTES.RESET_PASSWORD}`);
    } else {
      toast.error(response?.errorResponse?.message || response?.errorMessage);
    }
  };

  const onResendVerificationEmail = async (data) => {
    setIsSendingEmail(true);

    const response = await AuthService.resendVerificationEmail(data);

    setIsSendingEmail(false);

    if (!(response instanceof ApiError)) {
      toast.success(
        response?.message || "verification email send successfully"
      );
      setShowEmailModal();
    } else {
      toast.error(response?.errorResponse?.message || response?.errorMessage);
    }
  };

  const setShowEmailModal = () => {
    dispatch(toggleModal({ modalType: "emailModal" }));
  };

  return (
    <>
      {isPasswordUpdateMode ? (
        <EmailModal
          showDialog={showDialog}
          setShowDialog={setShowEmailModal}
          onSubmit={onForgotPassword}
          isSendingEmail={isSendingEmail}
        />
      ) : (
        <EmailModal
          showDialog={showDialog}
          setShowDialog={setShowEmailModal}
          onSubmit={onResendVerificationEmail}
          isSendingEmail={isSendingEmail}
        />
      )}
    </>
  );
}

export default EmailModalContainer;

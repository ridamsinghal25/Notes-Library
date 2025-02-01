import { useState } from "react";
import { EmailModal } from "../presentation/EmailModal";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "@/constants/route";
import ApiError from "@/services/ApiError";
import { useDispatch, useSelector } from "react-redux";
import { toggleModal } from "@/store/ModalSlice";
import AuthService from "@/services/AuthService";
import { toast } from "react-toastify";

function EmailModalContainer({ isPasswordUpdateMode }) {
  const [isSendingEmail, setIsSendingEmail] = useState(false);
  const showEmailModal = useSelector((state) => state.modal.modals.emailModal);

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

      toggleEmailModal();
      navigate(`${ROUTES.RESET_PASSWORD}`);
    } else {
      toast.error(
        response?.formError ||
          response?.errorResponse?.message ||
          response?.errorMessage
      );
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
      toggleEmailModal();
    } else {
      toast.error(
        response?.formError ||
          response?.errorResponse?.message ||
          response?.errorMessage
      );
    }
  };

  const toggleEmailModal = () => {
    dispatch(toggleModal({ modalType: "emailModal" }));
  };

  return (
    <>
      {isPasswordUpdateMode ? (
        <EmailModal
          showDialog={showEmailModal}
          setShowDialog={toggleEmailModal}
          onSubmit={onForgotPassword}
          isSendingEmail={isSendingEmail}
        />
      ) : (
        <EmailModal
          showDialog={showEmailModal}
          setShowDialog={toggleEmailModal}
          onSubmit={onResendVerificationEmail}
          isSendingEmail={isSendingEmail}
        />
      )}
    </>
  );
}

export default EmailModalContainer;

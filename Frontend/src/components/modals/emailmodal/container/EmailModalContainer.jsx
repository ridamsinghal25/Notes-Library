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
  const showForgotPasswordEmailModal = useSelector(
    (state) => state.modal.modals.forgotPasswordEmailModal
  );
  const showVerificationEmailModal = useSelector(
    (state) => state.modal.modals.verificationEmailModal
  );
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

      setShowForgotPasswordEmailModal();
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
      setShowVerificationEmailModal();
    } else {
      toast.error(response?.errorResponse?.message || response?.errorMessage);
    }
  };

  const setShowForgotPasswordEmailModal = () => {
    dispatch(toggleModal({ modalType: "forgotPasswordEmailModal" }));
  };

  const setShowVerificationEmailModal = () => {
    dispatch(toggleModal({ modalType: "verificationEmailModal" }));
  };

  return (
    <>
      {isPasswordUpdateMode ? (
        <EmailModal
          showDialog={showForgotPasswordEmailModal}
          setShowDialog={setShowForgotPasswordEmailModal}
          onSubmit={onForgotPassword}
          isSendingEmail={isSendingEmail}
        />
      ) : (
        <EmailModal
          showDialog={showVerificationEmailModal}
          setShowDialog={setShowVerificationEmailModal}
          onSubmit={onResendVerificationEmail}
          isSendingEmail={isSendingEmail}
        />
      )}
    </>
  );
}

export default EmailModalContainer;

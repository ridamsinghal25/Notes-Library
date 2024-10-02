import React, { useState } from "react";
import { ROUTES } from "@/constants/route";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import AuthService from "@/services/AuthService";
import ApiError from "@/services/ApiError";
import InputOTPPage from "../presentation/InputOTPPage";

function InputOTPPageContainer() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showEmailModal, setShowEmailModal] = useState(false);
  const [isSendingEmail, setIsSendingEmail] = useState(false);
  const navigate = useNavigate();

  const onVerifyCodeSubmit = async (data) => {
    setIsSubmitting(true);

    const response = await AuthService.verifyUser(data);

    setIsSubmitting(false);

    if (!(response instanceof ApiError)) {
      toast.success(response?.message || "user verified successfully");

      navigate(`${ROUTES.SIGNIN}`);
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
    } else {
      toast.error(response?.errorResponse?.message || response?.errorMessage);
    }

    setShowEmailModal(false);
  };

  const toggleEmailModal = () => {
    setShowEmailModal(!showEmailModal);
  };

  return (
    <InputOTPPage
      isSubmitting={isSubmitting}
      isSendingEmail={isSendingEmail}
      onVerifyCodeSubmit={onVerifyCodeSubmit}
      onResendVerificationEmail={onResendVerificationEmail}
      showEmailModal={showEmailModal}
      toggleEmailModal={toggleEmailModal}
      setShowEmailModal={setShowEmailModal}
    />
  );
}

export default InputOTPPageContainer;

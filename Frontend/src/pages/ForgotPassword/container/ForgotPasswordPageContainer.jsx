import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "@/constants/route";
import AuthService from "@/services/AuthService";
import ApiError from "@/services/ApiError";
import { toast } from "react-toastify";
import ForgotPasswordPage from "../presentation/ForgotPasswordPage";

function ForgotPasswordPageContainer() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const onResetPassword = async (data) => {
    setIsSubmitting(true);

    const response = await AuthService.resetForgottenPassword(
      data.resetCode,
      data.newPassword
    );

    setIsSubmitting(false);

    if (!(response instanceof ApiError)) {
      toast.success(response?.message || "Password reset successfully");

      navigate(`${ROUTES.SIGNIN}`);
    } else {
      toast.error(response?.errorResponse?.message || response?.errorMessage);
    }
  };

  return (
    <ForgotPasswordPage
      isSubmitting={isSubmitting}
      onResetPassword={onResetPassword}
    />
  );
}

export default ForgotPasswordPageContainer;

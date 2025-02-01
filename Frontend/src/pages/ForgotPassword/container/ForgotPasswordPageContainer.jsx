import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "@/constants/route";
import AuthService from "@/services/AuthService";
import ApiError from "@/services/ApiError";
import { toast } from "react-toastify";
import ForgotPasswordPage from "../presentation/ForgotPasswordPage";
import { useDispatch, useSelector } from "react-redux";
import { toggleShowPassword } from "@/store/PasswordSlice";

function ForgotPasswordPageContainer() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const showPassword = useSelector((state) => state.password.showPassword);

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
      toast.error(
        response?.formError ||
          response?.errorResponse?.message ||
          response?.errorMessage
      );
    }
  };

  const togglePassword = () => {
    dispatch(toggleShowPassword());
  };

  return (
    <ForgotPasswordPage
      isSubmitting={isSubmitting}
      onResetPassword={onResetPassword}
      showPassword={showPassword}
      togglePassword={togglePassword}
    />
  );
}

export default ForgotPasswordPageContainer;

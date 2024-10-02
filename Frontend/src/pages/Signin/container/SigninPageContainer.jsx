import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "@/constants/route";
import AuthService from "@/services/AuthService";
import ApiError from "@/services/ApiError";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { login } from "@/store/AuthSlice";
import SigninPage from "../presentation/SigninPage";

function SigninPageContainer() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showEmailModal, setShowEmailModal] = useState(false);
  const [isSendingEmail, setIsSendingEmail] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onSignIn = async (data) => {
    setIsSubmitting(true);

    const response = await AuthService.loginService(data.email, data.password);

    setIsSubmitting(false);

    if (!(response instanceof ApiError)) {
      dispatch(login(response?.data?.user));

      localStorage.setItem("accessToken", response?.data?.accessToken);

      navigate(`${ROUTES.HOME}`);
    } else {
      toast.error(
        // current user service toast error
        response?.errorResponse?.message || response?.errorMessage
      );
    }
  };

  const onForgotPassword = async (data) => {
    setIsSendingEmail(true);

    const response = await AuthService.forgotPassword(data);

    setIsSendingEmail(false);

    if (!(response instanceof ApiError)) {
      toast.success(
        response?.message || "Forgot password code send successfully"
      );

      setShowEmailModal(false);
      navigate(`${ROUTES.RESET_PASSWORD}`);
    } else {
      toast.error(response?.errorResponse?.message || response?.errorMessage);
    }
  };

  const toggleEmailModal = () => {
    setShowEmailModal(!showEmailModal);
  };

  return (
    <SigninPage
      isSubmitting={isSubmitting}
      showEmailModal={showEmailModal}
      toggleEmailModal={toggleEmailModal}
      onSignIn={onSignIn}
      onForgotPassword={onForgotPassword}
      isSendingEmail={isSendingEmail}
    />
  );
}

export default SigninPageContainer;

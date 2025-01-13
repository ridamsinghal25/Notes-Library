import React, { useState } from "react";
import { ROUTES } from "@/constants/route";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import AuthService from "@/services/AuthService";
import ApiError from "@/services/ApiError";
import InputOTPPage from "../presentation/InputOTPPage";
import { useDispatch } from "react-redux";
import { toggleModal } from "@/store/ModalSlice";

function InputOTPPageContainer() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

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

  const toggleEmailModal = () => {
    dispatch(toggleModal({ modalType: "emailModal" }));
  };

  return (
    <InputOTPPage
      isSubmitting={isSubmitting}
      onVerifyCodeSubmit={onVerifyCodeSubmit}
      toggleEmailModal={toggleEmailModal}
    />
  );
}

export default InputOTPPageContainer;

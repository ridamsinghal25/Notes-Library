import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import AuthService from "@/services/AuthService";
import { ROUTES } from "@/constants/route";
import ApiError from "@/services/ApiError";
import { logout } from "@/store/AuthSlice";
import PasswordTab from "../presentation/PasswordTab";

function PasswordTabContainer() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onPasswordUpdate = async (data) => {
    setIsSubmitting(true);

    const response = await AuthService.changePassword(data);

    setIsSubmitting(false);

    if (!(response instanceof ApiError)) {
      toast.success(response?.message);

      const LogoutResponse = await AuthService.logoutService();

      if (!(LogoutResponse instanceof ApiError)) {
        dispatch(logout());
        navigate(`${ROUTES.SIGNIN}`);
      } else {
        toast.error(
          LogoutResponse?.formError ||
            LogoutResponse?.errorResponse?.message ||
            LogoutResponse?.errorMessage
        );
      }
    } else {
      toast.error(
        response?.formError ||
          response?.errorResponse?.message ||
          response?.errorMessage
      );
    }
  };

  return (
    <PasswordTab
      onPasswordUpdate={onPasswordUpdate}
      isSubmitting={isSubmitting}
    />
  );
}

export default PasswordTabContainer;

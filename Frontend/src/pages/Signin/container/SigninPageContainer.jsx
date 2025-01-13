import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "@/constants/route";
import AuthService from "@/services/AuthService";
import ApiError from "@/services/ApiError";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { login } from "@/store/AuthSlice";
import SigninPage from "../presentation/SigninPage";
import { toggleModal } from "@/store/ModalSlice";
import { toggleShowPassword } from "@/store/PasswordSlice";

function SigninPageContainer() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const showPassword = useSelector((state) => state.password.showPassword);

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

  const toggleEmailModal = () => {
    dispatch(toggleModal({ modalType: "emailModal" }));
  };

  const togglePassword = () => {
    dispatch(toggleShowPassword());
  };

  return (
    <SigninPage
      isSubmitting={isSubmitting}
      toggleEmailModal={toggleEmailModal}
      onSignIn={onSignIn}
      showPassword={showPassword}
      togglePassword={togglePassword}
    />
  );
}

export default SigninPageContainer;

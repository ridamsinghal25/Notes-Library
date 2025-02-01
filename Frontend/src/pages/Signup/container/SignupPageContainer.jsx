import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "@/constants/route";
import { useDebounceValue } from "usehooks-ts";
import { toast } from "react-toastify";
import AuthService from "@/services/AuthService";
import ApiError from "@/services/ApiError";
import SignupPage from "../presentation/SignupPage";
import { useDispatch, useSelector } from "react-redux";
import { toggleShowPassword } from "@/store/PasswordSlice";

function SignupPageContainer() {
  const [rollNumber, setRollNumber] = useState("");
  const [rollNumberMessage, setRollNumberMessage] = useState("");
  const [isCheckingRollNumber, setIsCheckingRollNumber] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [debouncedValue] = useDebounceValue(rollNumber, 500);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const showPassword = useSelector((state) => state.password.showPassword);

  useEffect(() => {
    const checkRollNumberExists = async () => {
      if (debouncedValue) {
        setRollNumberMessage("");
        setIsCheckingRollNumber(true);
        const response = await AuthService.verifyRollNumber(debouncedValue);

        setIsCheckingRollNumber(false);

        if (!(response instanceof ApiError)) {
          setRollNumberMessage(response?.message);
        } else {
          setRollNumberMessage(
            response?.errorResponse?.errors[0]?.rollNumber ||
              response?.errorResponse?.message ||
              response?.errorMessage
          );
        }
      }
    };

    checkRollNumberExists();
  }, [debouncedValue]);

  const onSignUP = async (data) => {
    setIsSubmitting(true);

    const response = await AuthService.signupService(data);

    setIsSubmitting(false);

    if (!(response instanceof ApiError)) {
      toast.success(response?.message || "User registered successfully");
      navigate(`${ROUTES.VERIFYCODE}`);
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
    <SignupPage
      setRollNumber={setRollNumber}
      rollNumberMessage={rollNumberMessage}
      isCheckingRollNumber={isCheckingRollNumber}
      isSubmitting={isSubmitting}
      onSignUP={onSignUP}
      togglePassword={togglePassword}
      showPassword={showPassword}
    />
  );
}

export default SignupPageContainer;

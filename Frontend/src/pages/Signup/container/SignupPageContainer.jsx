import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "@/constants/route";
import { useDebounceValue } from "usehooks-ts";
import { toast } from "react-toastify";
import AuthService from "@/services/AuthService";
import ApiError from "@/services/ApiError";
import SignupPage from "../presentation/SignupPage";

function SignupPageContainer() {
  const [rollNumber, setRollNumber] = useState("");
  const [rollNumberMessage, setRollNumberMessage] = useState("");
  const [isCheckingRollNumber, setIsCheckingRollNumber] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [debouncedValue] = useDebounceValue(rollNumber, 500);
  const navigate = useNavigate();

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
      toast.error(response?.errorResponse?.message || response?.errorMessage);
    }
  };

  return (
    <SignupPage
      setRollNumber={setRollNumber}
      rollNumberMessage={rollNumberMessage}
      isCheckingRollNumber={isCheckingRollNumber}
      isSubmitting={isSubmitting}
      onSignUP={onSignUP}
    />
  );
}

export default SignupPageContainer;

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import FormFieldInput from "@/components/FormFieldInput";
import {
  FORGOT_PASSWORD_BUTTON_TEXT,
  FORGOT_PASSWORD_DESCRIPTION,
  FORGOT_PASSWORD_TITLE,
} from "@/constants/constants";
import { ROUTES } from "@/constants/route";
import { resetPasswordFormValidation } from "@/validation/zodValidation";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import AuthService from "@/services/AuthService";
import ApiError from "@/services/ApiError";
import { toast } from "react-toastify";

function ForgotPassword() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const resetPasswordForm = useForm({
    resolver: zodResolver(resetPasswordFormValidation),
    defaultValues: {
      resetCode: "",
      newPassword: "",
    },
  });

  const onResetPassword = (data) => {
    setIsSubmitting(true);

    const response = AuthService.resetForgottenPassword(
      data.resetCode,
      data.newPassword
    );

    setIsSubmitting(false);

    if (!(response instanceof ApiError)) {
      toast.success(response?.message || "Password reset successfully");
      resetPasswordForm.reset();

      navigate(`${ROUTES.SIGNIN}`);
    } else {
      toast.error(response?.errorResponse?.message || response?.errorMessage);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-800">
      <div className="w-full max-w-md p-6 sm:p-8 lg:p-10 space-y-6 sm:space-y-8 bg-white rounded-lg shadow-md my-6 sm:my-10">
        <div className="text-center">
          <h1 className="text-2xl sm:text-2xl lg:text-4xl font-extrabold tracking-tight mb-4 sm:mb-6">
            {FORGOT_PASSWORD_TITLE}
          </h1>
          <p className="mb-4">{FORGOT_PASSWORD_DESCRIPTION}</p>
        </div>
        <Form {...resetPasswordForm}>
          <form
            onSubmit={resetPasswordForm.handleSubmit(onResetPassword)}
            className="space-y-6"
          >
            <FormFieldInput
              form={resetPasswordForm}
              label="Reset Code"
              name="resetCode"
              placeholder="Enter your reset code"
            />
            <FormFieldInput
              form={resetPasswordForm}
              label="Password"
              type="password"
              name="newPassword"
              placeholder="Enter your password"
            />
            <div className="w-full flex justify-end">
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please
                    Wait
                  </>
                ) : (
                  FORGOT_PASSWORD_BUTTON_TEXT
                )}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}

export default ForgotPassword;

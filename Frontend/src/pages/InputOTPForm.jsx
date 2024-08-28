import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import {
  INPUT_OTP_FORM_DESCRITION,
  INPUT_OTP_FORM_TITLE,
  RESEND_EMAIL_BUTTON_TEXT,
  RESEND_EMAIL_DESCRIPTION,
  SUBMIT_BUTTON,
} from "@/constants/auth";
import { inputOTPValidation } from "@/validation/zodValidation";
import { zodResolver } from "@hookform/resolvers/zod";
import { ROUTES } from "@/constants/route";
import { toast } from "react-toastify";
import { useLocation, useNavigate } from "react-router-dom";
import { Loader2 } from "lucide-react";
import AuthService from "@/services/AuthService";
import ApiError from "@/services/ApiError";

function InputOTPForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isEmailSend, setIsEmailSend] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const email = location.state?.email;

  const inputOTPForm = useForm({
    resolver: zodResolver(inputOTPValidation),
    defaultValues: {
      verifyCode: "",
    },
  });

  const onSubmit = async (data) => {
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

  const onClickResendEmail = async () => {
    setIsEmailSend(true);

    const response = await AuthService.resendVerificationEmail(email);

    setIsEmailSend(false);

    if (!(response instanceof ApiError)) {
      toast.success(
        response?.message || "verification email send successfully"
      );
    } else {
      toast.error(response?.errorResponse?.message || response?.errorMessage);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-800">
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-md">
        <Form {...inputOTPForm}>
          <form
            onSubmit={inputOTPForm.handleSubmit(onSubmit)}
            className="w-2/3 space-y-6"
          >
            <FormField
              control={inputOTPForm.control}
              name="verifyCode"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{INPUT_OTP_FORM_TITLE}</FormLabel>
                  <FormControl>
                    <InputOTP maxLength={6} {...field}>
                      <InputOTPGroup>
                        <InputOTPSlot index={0} />
                        <InputOTPSlot index={1} />
                        <InputOTPSlot index={2} />
                        <InputOTPSlot index={3} />
                        <InputOTPSlot index={4} />
                        <InputOTPSlot index={5} />
                      </InputOTPGroup>
                    </InputOTP>
                  </FormControl>
                  <FormDescription>{INPUT_OTP_FORM_DESCRITION}</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please Wait
                </>
              ) : (
                SUBMIT_BUTTON
              )}
            </Button>
          </form>
        </Form>
        <div className="text-center mt-4">
          <p className="mb-2">{RESEND_EMAIL_DESCRIPTION}</p>
          <Button
            onClick={onClickResendEmail}
            variant="outline"
            disabled={isEmailSend}
            className="inline-flex items-center"
          >
            {isEmailSend ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Sending...
              </>
            ) : (
              RESEND_EMAIL_BUTTON_TEXT
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}

export default InputOTPForm;

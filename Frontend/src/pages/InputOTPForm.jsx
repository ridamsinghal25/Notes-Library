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
} from "@/constants/constants";
import { inputOTPValidation } from "@/validation/zodValidation";
import { zodResolver } from "@hookform/resolvers/zod";
import { ROUTES } from "@/constants/route";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { Loader2 } from "lucide-react";
import AuthService from "@/services/AuthService";
import ApiError from "@/services/ApiError";
import { EmailModal } from "@/components/modals/EmailModal";
import Container from "@/components/basic/Container";

function InputOTPForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showEmailModal, setShowEmailModal] = useState(false);
  const [isSendingEmail, setIsSendingEmail] = useState(false);
  const navigate = useNavigate();

  const inputOTPForm = useForm({
    resolver: zodResolver(inputOTPValidation),
    defaultValues: {
      verifyCode: "",
    },
  });

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

  const onResendVerificationEmail = async (data) => {
    setIsSendingEmail(true);

    const response = await AuthService.resendVerificationEmail(data);

    setIsSendingEmail(false);

    if (!(response instanceof ApiError)) {
      toast.success(
        response?.message || "verification email send successfully"
      );
    } else {
      toast.error(response?.errorResponse?.message || response?.errorMessage);
    }

    setShowEmailModal(false);
  };

  const toggleEmailModal = () => {
    setShowEmailModal(!showEmailModal);
  };

  return (
    <Container>
      <div className="flex justify-center items-center min-h-screen">
        <div className="w-full max-w-md p-6 sm:p-8 lg:p-10 space-y-6 sm:space-y-8 rounded-lg shadow-md my-6 sm:my-10 dark:border-gray-500 dark:border-2">
          <Form {...inputOTPForm}>
            <form
              onSubmit={inputOTPForm.handleSubmit(onVerifyCodeSubmit)}
              className="space-y-6"
            >
              <FormField
                control={inputOTPForm.control}
                name="verifyCode"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{INPUT_OTP_FORM_TITLE}</FormLabel>
                    <FormControl>
                      <InputOTP maxLength={6} {...field}>
                        <InputOTPGroup className="border rounded-md dark:border-gray-600">
                          <InputOTPSlot index={0} />
                          <InputOTPSlot index={1} />
                          <InputOTPSlot index={2} />
                          <InputOTPSlot index={3} />
                          <InputOTPSlot index={4} />
                          <InputOTPSlot index={5} />
                        </InputOTPGroup>
                      </InputOTP>
                    </FormControl>
                    <FormDescription>
                      {INPUT_OTP_FORM_DESCRITION}
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="w-full flex justify-center">
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please
                      Wait
                    </>
                  ) : (
                    SUBMIT_BUTTON
                  )}
                </Button>
              </div>
            </form>
          </Form>
          <div className="text-center mt-4">
            <p className="mb-2">{RESEND_EMAIL_DESCRIPTION}</p>
            <Button
              onClick={toggleEmailModal}
              variant="outline"
              className="inline-flex items-center dark:text-gray-400 dark:hover:text-gray-50"
            >
              {RESEND_EMAIL_BUTTON_TEXT}
            </Button>
            {showEmailModal && (
              <EmailModal
                showDialog={showEmailModal}
                setShowDialog={setShowEmailModal}
                onSubmit={onResendVerificationEmail}
                isSendingEmail={isSendingEmail}
              />
            )}
          </div>
        </div>
      </div>
    </Container>
  );
}

export default InputOTPForm;

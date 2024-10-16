import React from "react";
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
  RESEND_EMAIL_DESCRIPTION,
} from "@/constants/constants";
import { inputOTPValidation } from "@/validation/zodValidation";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import Container from "@/components/basic/Container";
import EmailModalContainer from "@/components/modals/emailmodal/container/EmailModalContainer";

function InputOTPPage({ isSubmitting, toggleEmailModal, onVerifyCodeSubmit }) {
  const inputOTPForm = useForm({
    resolver: zodResolver(inputOTPValidation),
    defaultValues: {
      verifyCode: "",
    },
  });

  return (
    <Container>
      <div className="flex justify-center items-center min-h-screen">
        <div className="w-full max-w-md p-6 sm:p-8 lg:p-10 space-y-6 sm:space-y-8 rounded-lg shadow-md my-6 sm:my-10 dark:border-gray-500 dark:border-2">
          <Form {...inputOTPForm}>
            <form
              onSubmit={inputOTPForm.handleSubmit((data) =>
                onVerifyCodeSubmit(data).then(() => inputOTPForm.reset())
              )}
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
                    "Submit"
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
              Send Verification Email
            </Button>

            <EmailModalContainer isPasswordUpdateMode={false} />
          </div>
        </div>
      </div>
    </Container>
  );
}

export default InputOTPPage;

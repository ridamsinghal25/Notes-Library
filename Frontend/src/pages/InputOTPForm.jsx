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
  SUBMIT_BUTTON,
} from "@/constants/auth";
import { inputOTPValidation } from "@/validation/zodValidation";
import { zodResolver } from "@hookform/resolvers/zod";

function InputOTPForm() {
  const inputOTPForm = useForm({
    resolver: zodResolver(inputOTPValidation),
    defaultValues: {
      verifyCode: "",
    },
  });

  function onSubmit(data) {
    console.log(data);
  }
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
              name="code"
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
            <Button type="submit">{SUBMIT_BUTTON}</Button>
          </form>
        </Form>
      </div>
    </div>
  );
}

export default InputOTPForm;

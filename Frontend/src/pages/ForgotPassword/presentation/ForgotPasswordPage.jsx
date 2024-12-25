import React from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import FormFieldInput from "@/components/basic/FormFieldInput";
import {
  FORGOT_PASSWORD_DESCRIPTION,
  FORGOT_PASSWORD_TITLE,
} from "@/constants/constants";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import Container from "@/components/basic/Container";
import { resetPasswordFormValidation } from "@/validation/zodValidation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Helmet, HelmetProvider } from "react-helmet-async";

function ForgotPasswordPage({
  isSubmitting,
  onResetPassword,
  showPassword,
  togglePassword,
}) {
  const resetPasswordForm = useForm({
    resolver: zodResolver(resetPasswordFormValidation),
    defaultValues: {
      resetCode: "",
      newPassword: "",
    },
  });

  return (
    <Container>
      <HelmetProvider>
        <Helmet>
          <title>Forgot Password</title>
          <meta charset="UTF-8" />
          <meta name="description" content="This is a forgot password page" />
        </Helmet>
      </HelmetProvider>
      <div className="flex justify-center items-center min-h-screen mx-4">
        <div className="w-full max-w-md p-6 sm:p-8 lg:p-10 space-y-6 sm:space-y-8 rounded-lg shadow-md my-6 sm:my-10 dark:border-gray-500 dark:border-2">
          <div className="text-center dark:text-gray-200">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight mb-4 sm:mb-6">
              {FORGOT_PASSWORD_TITLE}
            </h1>
            <p className="mb-4">{FORGOT_PASSWORD_DESCRIPTION}</p>
          </div>
          <Form {...resetPasswordForm}>
            <form
              onSubmit={resetPasswordForm.handleSubmit((data) =>
                onResetPassword(data).then(() => resetPasswordForm.reset())
              )}
              className="space-y-6"
            >
              <FormFieldInput
                form={resetPasswordForm}
                label="Reset Code"
                name="resetCode"
                placeholder="Enter your reset code"
              />
              <FormField
                control={resetPasswordForm.control}
                name="newPassword"
                render={({ field, fieldState }) => (
                  <FormItem>
                    <FormLabel
                      className={fieldState.error && "dark:text-red-500"}
                    >
                      Password
                    </FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input
                          type={showPassword ? "text" : "password"}
                          placeholder="Enter your password"
                          {...field}
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                          onClick={togglePassword}
                          aria-label={
                            showPassword ? "Hide password" : "Show password"
                          }
                        >
                          {showPassword ? (
                            <Eye size={16} />
                          ) : (
                            <EyeOff size={16} />
                          )}
                        </Button>
                      </div>
                    </FormControl>
                    <FormMessage
                      className={fieldState.error && "dark:text-red-500"}
                    />
                  </FormItem>
                )}
              />
              <div className="w-full flex justify-end">
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please
                      Wait
                    </>
                  ) : (
                    "Reset Password"
                  )}
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </Container>
  );
}

export default ForgotPasswordPage;

import React from "react";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import FormFieldInput from "@/components/basic/FormFieldInput";
import {
  TITLE,
  SIGNUP_PROMPT_TEXT,
  SIGNIN_DESCRIPTION,
} from "@/constants/constants";
import { ROUTES } from "@/constants/route";
import { signinFormValidation } from "@/validation/zodValidation";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import Container from "@/components/basic/Container";
import EmailModalContainer from "@/components/modals/emailmodal/container/EmailModalContainer";

function SigninPage({
  isSubmitting,
  toggleEmailModal,
  onSignIn,
  showPassword,
  togglePassword,
}) {
  const signinForm = useForm({
    resolver: zodResolver(signinFormValidation),
    defaultValues: {
      email: "",
      password: "",
      username: "",
    },
  });

  return (
    <Container>
      <div className="flex justify-center items-center min-h-screen mx-4">
        <div className="w-full max-w-md p-6 sm:p-8 lg:p-10 space-y-6 sm:space-y-8 rounded-lg shadow-md my-6 sm:my-10 dark:border-gray-500 dark:border-2">
          <div className="text-center dark:text-gray-200">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight mb-4 sm:mb-6">
              {TITLE}
            </h1>
            <p className="mb-4">{SIGNIN_DESCRIPTION}</p>
          </div>
          <Form {...signinForm}>
            <form
              onSubmit={signinForm.handleSubmit(onSignIn)}
              className="space-y-6"
            >
              <FormFieldInput
                form={signinForm}
                label="Email"
                name="email"
                placeholder="Enter your email"
              />
              <FormField
                control={signinForm.control}
                name="password"
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
                    <FormDescription className="text-right">
                      <span
                        className="text-red-600 hover:text-red-800 hover:underline cursor-pointer"
                        onClick={toggleEmailModal}
                      >
                        Forgot your password?
                      </span>
                    </FormDescription>
                    <FormMessage
                      className={fieldState.error && "dark:text-red-500"}
                    />
                  </FormItem>
                )}
              />

              {/* Email Modal */}
              <EmailModalContainer isPasswordUpdateMode={true} />
              <div className="w-full flex justify-end">
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please
                      Wait
                    </>
                  ) : (
                    "Sign In"
                  )}
                </Button>
              </div>
            </form>
          </Form>
          <div className="text-center mt-4">
            <p className="text-sm text-gray-600 dark:text-gray-200">
              {SIGNUP_PROMPT_TEXT}{" "}
              <Link
                to={ROUTES.SIGNUP}
                className="text-blue-600 hover:underline hover:text-blue-500 text-base"
              >
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </Container>
  );
}

export default SigninPage;

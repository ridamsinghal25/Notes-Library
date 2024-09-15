import React, { useEffect, useState } from "react";
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
import { Link, useNavigate } from "react-router-dom";
import FormFieldInput from "@/components/FormFieldInput";
import {
  TITLE,
  SIGNUP_BUTTON_TEXT,
  SIGNUP_PROMPT_TEXT,
  SIGNIN_BUTTON_TEXT,
  SIGNIN_DESCRIPTION,
} from "@/constants/constants";
import { ROUTES } from "@/constants/route";
import { signinFormValidation } from "@/validation/zodValidation";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import AuthService from "@/services/AuthService";
import ApiError from "@/services/ApiError";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { login } from "@/store/AuthSlice";
import { Input } from "@/components/ui/input";
import { EmailModal } from "@/components/modals/EmailModal";
import Container from "@/components/Container";

function SigninPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showEmailModal, setShowEmailModal] = useState(false);
  const [isSendingEmail, setIsSendingEmail] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const signinForm = useForm({
    resolver: zodResolver(signinFormValidation),
    defaultValues: {
      email: "",
      password: "",
      username: "",
    },
  });

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

  const onForgotPassword = async (data) => {
    setIsSendingEmail(true);

    const response = await AuthService.forgotPassword(data);

    setIsSendingEmail(false);

    if (!(response instanceof ApiError)) {
      toast.success(
        response?.message || "Forgot password code send successfully"
      );

      navigate(`${ROUTES.RESET_PASSWORD}`);
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
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="Enter your password"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription className="text-right">
                      <span
                        className="text-red-600 hover:text-red-800 hover:underline cursor-pointer"
                        onClick={toggleEmailModal}
                      >
                        Forgot your password?
                      </span>
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {showEmailModal && (
                <EmailModal
                  showDialog={showEmailModal}
                  setShowDialog={setShowEmailModal}
                  onSubmit={onForgotPassword}
                  isSendingEmail={isSendingEmail}
                />
              )}
              <div className="w-full flex justify-end">
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please
                      Wait
                    </>
                  ) : (
                    SIGNIN_BUTTON_TEXT
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
                {SIGNUP_BUTTON_TEXT}
              </Link>
            </p>
          </div>
        </div>
      </div>
    </Container>
  );
}

export default SigninPage;

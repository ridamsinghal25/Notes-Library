import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import FormFieldInput from "@/components/FormFieldInput";
import {
  TITLE,
  SIGNUP_BUTTON_TEXT,
  SIGNUP_PROMPT_TEXT,
  SIGNIN_BUTTON_TEXT,
  SIGNIN_DESCRIPTION,
} from "@/constants/auth";
import { ROUTES } from "@/constants/route";
import { signinFormValidation } from "@/validation/zodValidation";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import AuthService from "@/services/AuthService";
import ApiError from "@/services/ApiError";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { login } from "@/store/AuthSlice";

function SigninPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const signinForm = useForm({
    resolver: zodResolver(signinFormValidation),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data) => {
    setIsSubmitting(true);

    const response = await AuthService.loginService(data.email, data.password);

    setIsSubmitting(false);

    if (!(response instanceof ApiError)) {
      toast.success(response?.message || "User login successfully");

      const userDetails = response.data?.user;

      dispatch(login({ userDetails }));

      navigate(`${ROUTES.HOME}`);
    } else {
      toast.error(response?.errorResponse?.message || response?.errorMessage);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-800">
      <div className="w-full max-w-md p-6 sm:p-8 lg:p-10 space-y-6 sm:space-y-8 bg-white rounded-lg shadow-md my-6 sm:my-10">
        <div className="text-center">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight mb-4 sm:mb-6">
            {TITLE}
          </h1>
          <p className="mb-4">{SIGNIN_DESCRIPTION}</p>
        </div>
        <Form {...signinForm}>
          <form
            onSubmit={signinForm.handleSubmit(onSubmit)}
            className="space-y-6"
          >
            <FormFieldInput
              form={signinForm}
              label="Email"
              name="email"
              placeholder="Enter your email"
            />
            <FormFieldInput
              form={signinForm}
              label="Password"
              name="password"
              type="password"
              placeholder="Enter your password"
            />
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please Wait
                </>
              ) : (
                SIGNIN_BUTTON_TEXT
              )}
            </Button>
          </form>
        </Form>
        <div className="text-center mt-4">
          <p>
            {SIGNUP_PROMPT_TEXT}{" "}
            <Link
              to={ROUTES.SIGNUP}
              className="text-blue-600 hover:text-blue-800"
            >
              {SIGNUP_BUTTON_TEXT}
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default SigninPage;

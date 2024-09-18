import React, { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import FormFieldInput from "@/components/FormFieldInput";
import FormFieldSelect from "@/components/FormFieldSelect";
import {
  TITLE,
  SIGNUP_DESCRIPTION,
  SEMESTER_OPTIONS,
  SIGNUP_BUTTON_TEXT,
  SIGNIN_BUTTON_TEXT,
  SIGNIN_PROMPT_TEXT,
  COURSE_OPTIONS,
} from "@/constants/constants";
import { ROUTES } from "@/constants/route";
import { signupFormValidation } from "@/validation/zodValidation";
import { useDebounceValue } from "usehooks-ts";
import { toast } from "react-toastify";
import { CircleCheck, CircleX, Loader2 } from "lucide-react";
import AuthService from "@/services/AuthService";
import ApiError from "@/services/ApiError";
import Container from "@/components/Container";

function SignupPage() {
  const [rollNumber, setRollNumber] = useState("");
  const [rollNumberMessage, setRollNumberMessage] = useState("");
  const [isCheckingRollNumber, setIsCheckingRollNumber] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [debouncedValue] = useDebounceValue(rollNumber, 500);
  const navigate = useNavigate();

  const signupForm = useForm({
    resolver: zodResolver(signupFormValidation),
    defaultValues: {
      fullName: "",
      email: "",
      rollNumber: "",
      password: "",
      courseName: "",
      semester: "",
    },
  });

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

  const onSubmit = async (data) => {
    setIsSubmitting(true);

    const response = await AuthService.signupService(data);

    setIsSubmitting(false);

    if (!(response instanceof ApiError)) {
      toast.success(response?.message || "User registered successfully");
      navigate(`${ROUTES.VERIFYCODE}`, { state: { email: data.email } });
    } else {
      toast.error(response?.errorResponse?.message || response?.errorMessage);
    }
  };

  return (
    <Container>
      <div className="flex justify-center items-center min-h-screen mx-4">
        <div className="w-full max-w-md p-6 sm:p-8 lg:p-10 space-y-6 sm:space-y-8 rounded-lg shadow-md my-6 sm:my-10 dark:border-gray-500 dark:border-2">
          <div className="text-center dark:text-gray-200">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight mb-4 sm:mb-6">
              {TITLE}
            </h1>
            <p className="mb-4">{SIGNUP_DESCRIPTION}</p>
          </div>
          <Form {...signupForm}>
            <form
              onSubmit={signupForm.handleSubmit(onSubmit)}
              className="space-y-6"
            >
              <FormFieldInput
                form={signupForm}
                label="Full Name"
                name="fullName"
                placeholder="Enter your full name"
              />
              <FormFieldInput
                form={signupForm}
                label="Email"
                name="email"
                placeholder="Enter your email"
              />
              <FormField
                name="rollNumber"
                control={signupForm.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Roll Number</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter your roll number"
                        {...field}
                        onChange={(e) => {
                          field.onChange(e);
                          setRollNumber(e.target.value);
                        }}
                      />
                    </FormControl>
                    {isCheckingRollNumber && (
                      <Loader2 className="animate-spin text-blue-500" />
                    )}
                    {!isCheckingRollNumber && rollNumberMessage && (
                      <div
                        className={`text-sm ${
                          rollNumberMessage === "Roll number is unique"
                            ? "text-green-500"
                            : "text-red-500"
                        }`}
                      >
                        <p className="flex gap-2 items-center">
                          {rollNumberMessage === "Roll number is unique" ? (
                            <CircleCheck className="text-green-500" />
                          ) : (
                            <CircleX className="text-red-500" />
                          )}
                          <span>{rollNumberMessage}</span>
                        </p>
                      </div>
                    )}
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormFieldInput
                form={signupForm}
                label="Password"
                name="password"
                type="password"
                placeholder="Enter your password"
              />
              <FormFieldSelect
                form={signupForm}
                label="Course Name"
                name="courseName"
                values={COURSE_OPTIONS}
                placeholder="Select your course"
              />
              <FormFieldSelect
                form={signupForm}
                label="Semester"
                name="semester"
                values={SEMESTER_OPTIONS}
                placeholder="Select your semester"
              />
              <div className="w-full flex justify-end">
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please
                      Wait
                    </>
                  ) : (
                    SIGNUP_BUTTON_TEXT
                  )}
                </Button>
              </div>
            </form>
          </Form>
          <div className="text-center mt-4">
            <p className="text-sm text-gray-600 dark:text-gray-200">
              {SIGNIN_PROMPT_TEXT}{" "}
              <Link
                to={ROUTES.SIGNIN}
                className="text-blue-600 hover:underline hover:text-blue-500 text-base"
              >
                {SIGNIN_BUTTON_TEXT}
              </Link>
            </p>
          </div>
        </div>
      </div>
    </Container>
  );
}

export default SignupPage;

import React from "react";
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
import { Link } from "react-router-dom";
import FormFieldInput from "@/components/basic/FormFieldInput";
import FormFieldSelect from "@/components/basic/FormFieldSelect";
import {
  TITLE,
  SIGNUP_DESCRIPTION,
  SEMESTER_OPTIONS,
  SIGNIN_PROMPT_TEXT,
  COURSE_OPTIONS,
} from "@/constants/constants";
import { ROUTES } from "@/constants/route";
import { signupFormValidation } from "@/validation/zodValidation";
import { CircleCheck, CircleX, Eye, EyeOff, Loader2 } from "lucide-react";
import Container from "@/components/basic/Container";
import { Helmet, HelmetProvider } from "react-helmet-async";

function SignupPage({
  setRollNumber,
  rollNumberMessage,
  isCheckingRollNumber,
  isSubmitting,
  onSignUP,
  showPassword,
  togglePassword,
}) {
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

  return (
    <Container>
      <HelmetProvider>
        <Helmet>
          <title>Sign Up</title>
          <meta charset="UTF-8" />
          <meta name="description" content="This is a signup page" />
        </Helmet>
      </HelmetProvider>
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
              onSubmit={signupForm.handleSubmit(onSignUP)}
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
                render={({ field, fieldState }) => (
                  <FormItem>
                    <FormLabel
                      className={fieldState.error && "dark:text-red-500"}
                    >
                      Roll Number
                    </FormLabel>
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
                    <FormMessage
                      className={fieldState.error && "dark:text-red-500"}
                    />
                  </FormItem>
                )}
              />
              <div className="relative">
                <FormFieldInput
                  form={signupForm}
                  label="Password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                />
                <Button
                  type="button"
                  variant="ghost"
                  className="absolute right-0 top-4 h-full px-3 py-2 hover:bg-transparent"
                  onClick={togglePassword}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <Eye size={16} /> : <EyeOff size={16} />}
                </Button>
              </div>
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
                    "Sign Up"
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
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </Container>
  );
}

export default SignupPage;

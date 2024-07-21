import React from "react";
import { useForm } from "react-hook-form";
import { Form } from "../components/ui/form";
import { Button } from "../components/ui/button";
import { Link } from "react-router-dom";
import FormFieldInput from "../components/FormFieldInput";
import FormFieldSelect from "../components/FormFieldSelect";
import {
  SIGNUP_TITLE,
  SIGNUP_DESCRIPTION,
  SEMESTER_OPTIONS,
  SIGNUP_BUTTON_TEXT,
  SIGNIN_BUTTON_TEXT,
  SIGNIN_PROMPT_TEXT,
} from "../constants/auth";
import { ROUTES } from "../constants/route";

function SignupPage() {
  const signupForm = useForm({
    defaultValues: {
      fullName: "",
      email: "",
      rollNumber: "",
      password: "",
      semester: "",
    },
  });

  function onSubmit(data) {
    console.log(data);
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-800">
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-md">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold tracking-tight mb-6">
            {SIGNUP_TITLE}
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
              placeholder="Enter your fullname"
            />
            <FormFieldInput
              form={signupForm}
              label="Email"
              name="email"
              placeholder="Enter your email"
            />
            <FormFieldInput
              form={signupForm}
              label="Roll No."
              name="rollNumber"
              placeholder="Enter your roll number"
            />
            <FormFieldInput
              form={signupForm}
              label="Password"
              name="password"
              placeholder="Enter your password"
            />
            <FormFieldSelect
              form={signupForm}
              label="Semester"
              name="semester"
              values={SEMESTER_OPTIONS}
              placeholder="Select your semester"
            />
            <Button type="submit">{SIGNUP_BUTTON_TEXT}</Button>
          </form>
        </Form>
        <div className="text-center mt-4">
          <p>
            {SIGNIN_PROMPT_TEXT}{" "}
            <Link
              to={ROUTES.SIGNIN}
              className="text-blue-600 hover:text-blue-800"
            >
              {SIGNIN_BUTTON_TEXT}
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default SignupPage;

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
  FORM_FIELD_LABELS,
  FORM_FIELD_PLACEHOLDERS,
  FORM_FIELD_NAMES,
  SEMESTER_OPTIONS,
  SIGNUP_BUTTON_TEXT,
  SIGNIN_LINK_TEXT,
  SIGNIN_PROMPT_TEXT,
} from "../constants/signup.constants";
import { ROUTES } from "../constants/route.constants";

function SignupPage() {
  const signupForm = useForm({
    defaultValues: {
      [FORM_FIELD_NAMES.fullName]: "",
      [FORM_FIELD_NAMES.email]: "",
      [FORM_FIELD_NAMES.rollNumber]: "",
      [FORM_FIELD_NAMES.password]: "",
      [FORM_FIELD_NAMES.semester]: "",
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
              label={FORM_FIELD_LABELS.fullName}
              name={FORM_FIELD_NAMES.fullName}
              placeholder={FORM_FIELD_PLACEHOLDERS.fullName}
            />
            <FormFieldInput
              form={signupForm}
              label={FORM_FIELD_LABELS.email}
              name={FORM_FIELD_NAMES.email}
              placeholder={FORM_FIELD_PLACEHOLDERS.email}
            />
            <FormFieldInput
              form={signupForm}
              label={FORM_FIELD_LABELS.rollNumber}
              name={FORM_FIELD_NAMES.rollNumber}
              placeholder={FORM_FIELD_PLACEHOLDERS.rollNumber}
            />
            <FormFieldInput
              form={signupForm}
              label={FORM_FIELD_LABELS.password}
              name={FORM_FIELD_NAMES.password}
              placeholder={FORM_FIELD_PLACEHOLDERS.password}
            />
            <FormFieldSelect
              form={signupForm}
              label={FORM_FIELD_LABELS.semester}
              name={FORM_FIELD_NAMES.semester}
              values={SEMESTER_OPTIONS}
              placeholder={FORM_FIELD_PLACEHOLDERS.semester}
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
              {SIGNIN_LINK_TEXT}
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default SignupPage;

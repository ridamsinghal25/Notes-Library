import React from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { Form } from "@/components/ui/form";
import FormFieldInput from "@/components/basic/FormFieldInput";
import { ACCOUNT_TEXT_CONTENT, BUTTONS } from "@/constants/constants";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { newPasswordFormValidation } from "@/validation/zodValidation";

function PasswordTab({ onPasswordUpdate, isSubmitting }) {
  const newPasswordForm = useForm({
    resolver: zodResolver(newPasswordFormValidation),
    defaultValues: {
      oldPassword: "",
      newPassword: "",
    },
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle className="md:text-xl dark:text-gray-200">
          {ACCOUNT_TEXT_CONTENT.PASSWORD_TAB}
        </CardTitle>
        <CardDescription className="md:text-sm  dark:text-gray-200">
          {ACCOUNT_TEXT_CONTENT.PASSWORD_DESCRIPTION}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-2 dark:text-gray-300">
        <Form {...newPasswordForm}>
          <form
            onSubmit={newPasswordForm.handleSubmit(onPasswordUpdate)}
            className="space-y-6"
          >
            <FormFieldInput
              form={newPasswordForm}
              label="Old Password"
              name="oldPassword"
              placeholder="Enter your current password"
              type="password"
            />
            <FormFieldInput
              form={newPasswordForm}
              label="New Password"
              name="newPassword"
              placeholder="Enter your new password"
              type="password"
            />
            <div className="w-full flex justify-end">
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  </>
                ) : (
                  BUTTONS.SAVE_PASSWORD
                )}
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}

export default PasswordTab;

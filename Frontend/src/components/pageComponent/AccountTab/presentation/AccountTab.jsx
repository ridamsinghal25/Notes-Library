import React from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import Container from "@/components/basic/Container";
import { Button } from "@/components/ui/button";
import { Upload } from "lucide-react";
import { Form } from "@/components/ui/form";
import FormFieldInput from "@/components/basic/FormFieldInput";
import { UpdateSemester } from "@/components/modals/UpdateSemester";
import { ACCOUNT_TEXT_CONTENT, BUTTONS } from "@/constants/constants";

function AccountTab({ handleClick, showDialog, setShowDialog, accountForm }) {
  return (
    <Card>
      <Container>
        <CardHeader>
          <CardTitle className="md:text-xl  dark:text-gray-200">
            {ACCOUNT_TEXT_CONTENT.ACCOUNT_TITLE}
          </CardTitle>
          <CardDescription className="md:text-sm dark:text-gray-200">
            {ACCOUNT_TEXT_CONTENT.ACCOUNT_DESCRIPTION}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-2 dark:text-gray-200">
          <Form {...accountForm}>
            <form
              onSubmit={accountForm.handleSubmit(() => {})}
              className="space-y-6"
            >
              <FormFieldInput
                form={accountForm}
                label="Full Name"
                name="fullName"
                placeholder="Full name"
                disabled
              />
              <FormFieldInput
                form={accountForm}
                label="Email"
                name="email"
                placeholder="Email"
                disabled
              />
              <FormFieldInput
                form={accountForm}
                label="Roll Number"
                name="rollNumber"
                placeholder="Roll number"
                disabled
              />
              <FormFieldInput
                form={accountForm}
                label="Course"
                name="courseName"
                placeholder="Course"
                disabled
              />
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <FormFieldInput
                    form={accountForm}
                    label="Semester"
                    name="semester"
                    placeholder="Semester"
                    className="w-full"
                    disabled
                  />
                </div>
                <Button onClick={handleClick} className="ml-4 mt-8">
                  <Upload />
                </Button>
                <UpdateSemester
                  showDialog={showDialog}
                  setShowDialog={setShowDialog}
                />
              </div>
              <div className="w-full flex justify-end">
                <Button className="mt-7" disabled>
                  {BUTTONS.SAVE_CHANGES}
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Container>
    </Card>
  );
}

export default AccountTab;

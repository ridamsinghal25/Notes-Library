import { Button } from "../components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { useForm } from "react-hook-form";
import { Form } from "../components/ui/form";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../components/ui/tabs";
import { BUTTONS, TABS, TEXT_CONTENT, TITLE } from "../constants/account";
import FormFieldInput from "../components/FormFieldInput";
import { Upload } from "lucide-react";
import { UpdateSemester } from "@/components/UpdateSemester";
import { useState } from "react";

export function AccountPage() {
  const [showDialog, setShowDialog] = useState(false);

  function handleClick() {
    setShowDialog(true);
  }

  const accountForm = useForm({
    defaultValues: {
      semester: "",
    },
  });

  const newPasswordForm = useForm({
    defaultValues: {
      currentPassword: "",
      newPassword: "",
    },
  });

  return (
    <div>
      <h1 className="flex items-start mx-20 my-10 text-3xl font-bold text-gray-800 underline">
        {TITLE}
      </h1>
      <Tabs
        defaultValue={TABS.DEFAULT_VALUE}
        className="mx-20 flex items-center flex-col mt-10"
      >
        <TabsList className="grid w-full justify-center grid-cols-2">
          <TabsTrigger value={TABS.ACCOUNT}>
            {TEXT_CONTENT.ACCOUNT_TAB}
          </TabsTrigger>
          <TabsTrigger value={TABS.PASSWORD}>
            {TEXT_CONTENT.PASSWORD_TAB}
          </TabsTrigger>
        </TabsList>
        <TabsContent value={TABS.ACCOUNT} className="w-full my-5 mb-20">
          <Card>
            <CardHeader>
              <CardTitle className="md:text-xl">
                {TEXT_CONTENT.ACCOUNT_TITLE}
              </CardTitle>
              <CardDescription className="md:text-sm">
                {TEXT_CONTENT.ACCOUNT_DESCRIPTION}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
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
                    name="course"
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
                  <Button>{BUTTONS.SAVE_CHANGES}</Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value={TABS.PASSWORD} className="w-full">
          <Card>
            <CardHeader>
              <CardTitle className="md:text-xl">
                {TEXT_CONTENT.PASSWORD_TAB}
              </CardTitle>
              <CardDescription className="md:text-sm">
                {TEXT_CONTENT.PASSWORD_DESCRIPTION}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <Form {...newPasswordForm}>
                <form
                  onSubmit={accountForm.handleSubmit(() => {})}
                  className="space-y-6"
                >
                  <FormFieldInput
                    form={newPasswordForm}
                    label="Current Password"
                    name="currentPassword"
                    placeholder="Enter your current password"
                  />
                  <FormFieldInput
                    form={newPasswordForm}
                    label="New Password"
                    name="newPassword"
                    placeholder="Enter your new password"
                  />
                  <Button>{BUTTONS.SAVE_PASSWORD}</Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

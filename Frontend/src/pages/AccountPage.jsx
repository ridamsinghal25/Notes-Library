import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BUTTONS, TABS, TEXT_CONTENT, TITLE } from "@/constants/account";
import FormFieldInput from "@/components/FormFieldInput";
import { Loader2, Upload } from "lucide-react";
import { UpdateSemester } from "@/components/modals/UpdateSemester";
import { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { newPasswordFormValidation } from "@/validation/zodValidation";
import AuthService from "@/services/AuthService";
import ApiError from "@/services/ApiError";
import { toast } from "react-toastify";
import { ROUTES } from "@/constants/route";
import { logout } from "@/store/AuthSlice";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

export function AccountPage() {
  const [showDialog, setShowDialog] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    toast.info(
      "You will be logout when you update anything in your account settings"
    );
  }, []);

  function handleClick() {
    setShowDialog(true);
  }

  const newPasswordForm = useForm({
    resolver: zodResolver(newPasswordFormValidation),
    defaultValues: {
      oldPassword: "",
      newPassword: "",
    },
  });

  const accountForm = useForm({
    defaultValues: {
      fullName: "",
      email: "",
      rollNumber: "",
      course: "",
    },
  });

  const onPasswordUpdate = async (data) => {
    setIsSubmitting(true);

    const response = await AuthService.changePassword(data);
    console.log(response instanceof ApiError);
    setIsSubmitting(false);

    if (!(response instanceof ApiError)) {
      toast.success(response?.message);

      const LogoutResponse = await AuthService.logoutService();

      if (!(LogoutResponse instanceof ApiError)) {
        dispatch(logout());
        navigate(`${ROUTES.SIGNIN}`);
      } else {
        toast.error(
          LogoutResponse?.errorResponse?.message || LogoutResponse?.errorMessage
        );
      }
    } else {
      toast.error(response?.errorResponse?.message || response?.errorMessage);
    }
  };

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
                  <Button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      </>
                    ) : (
                      BUTTONS.SAVE_PASSWORD
                    )}
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

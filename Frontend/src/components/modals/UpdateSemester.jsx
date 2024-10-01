import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";
import FormFieldSelect from "@/components/basic/FormFieldSelect";
import {
  BUTTONS,
  UPDATE_SEMESTER_TEXT_CONTENT,
  SEMESTER_OPTIONS,
} from "@/constants/constants";
import { updateSemesterFormValidation } from "@/validation/zodValidation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { Loader2 } from "lucide-react";
import { toast } from "react-toastify";
import AuthService from "@/services/AuthService";
import ApiError from "@/services/ApiError";
import { useDispatch } from "react-redux";
import { logout } from "@/store/AuthSlice";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "@/constants/route";

export function UpdateSemester({ showDialog, setShowDialog }) {
  const [isUpdating, setIsUpdating] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const updateSemesterForm = useForm({
    resolver: zodResolver(updateSemesterFormValidation),
    defaultValues: {
      semester: "",
    },
  });

  const onSubmit = async (data) => {
    setIsUpdating(true);

    const response = await AuthService.updateCourseByUser(data);

    setIsUpdating(false);

    if (!(response instanceof ApiError)) {
      toast.success(response?.message);
      updateSemesterForm.reset();

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

      updateSemesterForm.reset();
    }
  };

  return (
    <Dialog open={showDialog} onOpenChange={setShowDialog}>
      <DialogContent className="max-w-96 sm:max-w-[425px] rounded-lg [background:radial-gradient(125%_125%_at_50%_10%,#fff_40%,#63e_100%)] dark:[background:radial-gradient(125%_125%_at_50%_10%,#000_40%,#63e_100%)] dark:border-gray-400">
        <DialogHeader className="text-start">
          <DialogTitle>{UPDATE_SEMESTER_TEXT_CONTENT.TITLE}</DialogTitle>
          <DialogDescription>
            {UPDATE_SEMESTER_TEXT_CONTENT.DESCRIPTION}
          </DialogDescription>
        </DialogHeader>
        <Form {...updateSemesterForm}>
          <form
            onSubmit={updateSemesterForm.handleSubmit(onSubmit)}
            className="space-y-8"
          >
            <FormFieldSelect
              form={updateSemesterForm}
              label="Semester"
              name="semester"
              values={SEMESTER_OPTIONS}
              placeholder="Select your semester"
            />
            <div className="w-full flex justify-end">
              <Button type="submit" disabled={isUpdating}>
                {isUpdating ? (
                  <>
                    <Loader2 className="mr-4 h-4 w-4 animate-spin" />
                    Updating...
                  </>
                ) : (
                  BUTTONS.UPDATE_SEMESTER
                )}
              </Button>
            </div>
          </form>
        </Form>
        <DialogFooter></DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

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
import {
  EMAIL_MODAL_DESCRIPTION,
  EMAIL_MODAL_TITLE,
  RESEND_EMAIL_BUTTON_TEXT,
} from "@/constants/constants";
import { emailModalValidation } from "@/validation/zodValidation";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import FormFieldInput from "../FormFieldInput";

export function EmailModal({
  showDialog,
  setShowDialog,
  onSubmit,
  isSendingEmail,
}) {
  const sendVerificationEmailForm = useForm({
    resolver: zodResolver(emailModalValidation),
    defaultValues: {
      email: "",
    },
  });

  return (
    <Dialog open={showDialog} onOpenChange={setShowDialog}>
      <DialogContent className="max-w-96 sm:max-w-[425px] rounded-lg">
        <DialogHeader className="text-start">
          <DialogTitle>{EMAIL_MODAL_TITLE}</DialogTitle>
          <DialogDescription>{EMAIL_MODAL_DESCRIPTION}</DialogDescription>
        </DialogHeader>
        <Form {...sendVerificationEmailForm}>
          <form
            onSubmit={sendVerificationEmailForm.handleSubmit(onSubmit)}
            className="space-y-8"
          >
            <FormFieldInput
              form={sendVerificationEmailForm}
              label="Email"
              name="email"
              placeholder="Enter your email"
            />
            <div className="w-full flex justify-end">
              <Button type="submit" disabled={isSendingEmail}>
                {isSendingEmail ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Sending...
                  </>
                ) : (
                  RESEND_EMAIL_BUTTON_TEXT
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

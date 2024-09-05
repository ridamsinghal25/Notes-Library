import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  DELETE_MODAL_CANCEL_BUTTON,
  DELETE_MODAL_CONTINUE_BUTTON,
  DELETE_MODAL_DESCRIPTION,
  DELETE_MODAL_HEADING,
} from "@/constants/constants";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { Button } from "../ui/button";
import NotesService from "@/services/NotesService";
import ApiError from "@/services/ApiError";
import { toast } from "react-toastify";

function DeleteNotes({ showDialog, setShowDialog, notesId }) {
  const [isDeleting, setIsDeleting] = useState(false);

  const onDeleteNotesHandler = async () => {
    setIsDeleting(true);

    const response = await NotesService.deleteNotes(notesId);

    setIsDeleting(false);

    if (!(response instanceof ApiError)) {
      toast.success(response?.message || "Notes deleted successfully", {
        autoClose: 2000,
      });
      setShowDialog(false);

      setTimeout(() => {
        window.location.reload();
      }, 2000);
    } else {
      toast.error(response?.errorResponse?.message || response?.errorMessage);
      setShowDialog(false);
    }
  };

  return (
    <AlertDialog open={showDialog} onOpenChange={setShowDialog}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{DELETE_MODAL_HEADING}</AlertDialogTitle>
          <AlertDialogDescription>
            {DELETE_MODAL_DESCRIPTION}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>{DELETE_MODAL_CANCEL_BUTTON}</AlertDialogCancel>
          <Button
            className="bg-red-400 hover:bg-red-600"
            disabled={isDeleting}
            onClick={onDeleteNotesHandler}
          >
            {isDeleting ? (
              <>
                <Loader2 className="mr-4 h-4 w-4 animate-spin" />
                Deleting...
              </>
            ) : (
              DELETE_MODAL_CONTINUE_BUTTON
            )}
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default DeleteNotes;

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
      toast.success(response?.message || "Notes deleted successfully");

      setShowDialog();

      setTimeout(() => {
        window.location.reload();
      }, 2000);
    } else {
      toast.error(response?.errorResponse?.message || response?.errorMessage);
    }
  };

  return (
    <AlertDialog open={showDialog} onOpenChange={setShowDialog}>
      <AlertDialogContent className="[background:radial-gradient(125%_125%_at_50%_10%,#fff_40%,#63e_100%)] dark:[background:radial-gradient(125%_125%_at_50%_10%,#000_40%,#63e_100%)] dark:border-gray-400">
        <AlertDialogHeader>
          <AlertDialogTitle>{DELETE_MODAL_HEADING}</AlertDialogTitle>
          <AlertDialogDescription>
            {DELETE_MODAL_DESCRIPTION}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="bg-amber-100 text-violet-800 hover:bg-amber-200 hover:text-black">
            Cancel
          </AlertDialogCancel>
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
              "Continue"
            )}
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default DeleteNotes;

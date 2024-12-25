import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Form } from "@/components/ui/form";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Edit, Send, Trash, X } from "lucide-react";
import FormFieldTextarea from "@/components/basic/FormFieldTextarea";
import CommentModalSkeleton from "@/components/basic/CommentModalSkeleton";
import { useForm } from "react-hook-form";
import { AVATAR_URL } from "@/constants/constants";
import { zodResolver } from "@hookform/resolvers/zod";
import { commentFormValidation } from "@/validation/zodValidation";

function CommentModal({
  showCommentModal,
  setShowCommentModal,
  isSubmitting,
  comments,
  status,
  createComment,
  editComment,
  editingCommentId,
  handleCommentDelete,
  handleCommentEdit,
  handleCancelCommentEdit,
  commentEditForm,
  userId,
}) {
  const commentForm = useForm({
    resolver: zodResolver(commentFormValidation),
    defaultValues: {
      comment: "",
    },
  });

  return (
    <Dialog open={showCommentModal} onOpenChange={setShowCommentModal}>
      <DialogContent
        className="max-w-xs sm:max-w-[425px] rounded-lg [background:radial-gradient(125%_125%_at_50%_10%,#fff_40%,#63e_100%)] dark:[background:radial-gradient(125%_125%_at_50%_10%,#000_40%,#63e_100%)] dark:border-gray-400"
        hideClose
      >
        <DialogHeader className="flex flex-row justify-between items-center space-y-0 mb-7">
          <DialogTitle className="text-2xl font-bold">Comments</DialogTitle>
          <DialogClose asChild>
            <Button className="h-7 w-7 p-0 mr-2" variant="ghost">
              <X size={25} />
            </Button>
          </DialogClose>
        </DialogHeader>
        {status === "loading" ? (
          <CommentModalSkeleton />
        ) : (
          <div>
            <ScrollArea className="h-[400px] pr-4">
              {comments?.length > 0 ? (
                comments.map((comment) => (
                  <div
                    key={comment._id}
                    className="mb-6 transition-all duration-300 ease-in-out"
                  >
                    <div className="flex items-start space-x-4">
                      <Avatar className="w-10 h-10">
                        <AvatarImage
                          src={comment.owner.avatar.url || AVATAR_URL}
                        />
                        <AvatarFallback>
                          {comment.owner.fullName}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1 bg-muted p-4 rounded-lg">
                        <div className="flex justify-between items-center w-full">
                          <div className="font-semibold text-foreground">
                            {comment.owner.fullName}
                          </div>

                          {comment.owner._id === userId && (
                            <div className="flex space-x-2">
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() =>
                                  handleCommentEdit(
                                    comment._id,
                                    comment.content
                                  )
                                }
                                className="text-muted-foreground hover:text-primary transition-colors duration-200"
                              >
                                <Edit className="w-4 h-4" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleCommentDelete(comment._id)}
                                className="text-muted-foreground hover:text-red-500 transition-colors duration-200"
                              >
                                <Trash className="w-4 h-4" />
                              </Button>
                            </div>
                          )}
                        </div>
                        {/* comment edit form */}
                        {editingCommentId === comment._id ? (
                          <Form {...commentEditForm}>
                            <form
                              onSubmit={commentEditForm.handleSubmit((data) =>
                                editComment(comment._id, data)
                              )}
                              className="flex items-start gap-2"
                            >
                              <FormFieldTextarea
                                form={commentEditForm}
                                name="newEditedComment"
                                className="flex-grow border-[1px] border-purple-500"
                              />
                              <div className="flex flex-col space-y-2 mt-2">
                                <Button
                                  type="submit"
                                  size="sm"
                                  disabled={isSubmitting}
                                >
                                  Edit
                                </Button>
                                <Button
                                  type="button"
                                  size="sm"
                                  variant="outline"
                                  onClick={handleCancelCommentEdit}
                                >
                                  Cancel
                                </Button>
                              </div>
                            </form>
                          </Form>
                        ) : (
                          <p className="text-muted-foreground mt-1">
                            {comment.content}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="flex justify-center items-center h-full">
                  <p className="text-foreground">No comments yet</p>
                </div>
              )}
            </ScrollArea>
            {/* Comment Form for adding comment */}
            <Form {...commentForm}>
              <form
                onSubmit={commentForm.handleSubmit((data) =>
                  createComment(data).then(() => commentForm.reset())
                )}
                className="mt-4"
              >
                <div className="flex items-center justify-center gap-2">
                  <div className="w-11/12">
                    <FormFieldTextarea
                      form={commentForm}
                      name="comment"
                      placeholder="Add a comment..."
                      className="border-[1px] border-black"
                    />
                  </div>
                  <Button
                    type="submit"
                    size="icon"
                    className="shrink-0"
                    disabled={isSubmitting}
                  >
                    <Send className="w-4 h-4" />
                  </Button>
                </div>
              </form>
            </Form>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}

export default CommentModal;

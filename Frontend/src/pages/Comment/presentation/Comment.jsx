import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Form } from "@/components/ui/form";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Edit, Send, Trash, ArrowLeft } from "lucide-react";
import FormFieldTextarea from "@/components/basic/FormFieldTextarea";
import CommentSkeleton from "@/components/basic/CommentSkeleton";
import { AVATAR_URL } from "@/constants/constants";
import { commentFormValidation } from "@/validation/zodValidation";

function Comment({
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
  navigate,
}) {
  const commentForm = useForm({
    resolver: zodResolver(commentFormValidation),
    defaultValues: {
      comment: "",
    },
  });

  return (
    <div className="min-h-screen p-6 md:p-8 mt-7">
      <div className="max-w-4xl mx-auto border border-gray-400 dark:border-gray-200 rounded-lg shadow-xl backdrop-blur-sm p-6">
        <div className="flex items-center justify-between mb-8 pb-4 border-b dark:border-gray-700">
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"
              aria-label="Go back"
              onClick={() => navigate(-1)}
            >
              <ArrowLeft className="h-6 w-6" />
            </Button>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              Comments
            </h1>
          </div>
        </div>

        {status === "loading" ? (
          <CommentSkeleton />
        ) : (
          <div>
            <ScrollArea className="h-[400px] pr-4 mb-6">
              {comments?.length > 0 ? (
                comments.map((comment) => (
                  <div
                    key={comment._id}
                    className="mb-6 transition-all duration-300 ease-in-out"
                  >
                    <div className="flex items-start space-x-4">
                      <Avatar className="w-10 h-10">
                        <AvatarImage
                          src={comment.commentedBy.avatar.url || AVATAR_URL}
                        />
                        <AvatarFallback>
                          {comment.commentedBy.fullName}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1 bg-muted p-4 rounded-lg">
                        <div className="flex justify-between items-center w-full">
                          <div className="font-semibold text-foreground">
                            {comment.commentedBy.fullName}
                          </div>

                          {comment.commentedBy._id === userId && (
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
                        {editingCommentId === comment._id ? (
                          <Form {...commentEditForm}>
                            <form
                              onSubmit={commentEditForm.handleSubmit((data) =>
                                editComment(comment._id, data.newEditedComment)
                              )}
                              className="flex flex-col sm:flex-row items-start gap-2 w-full mt-2"
                            >
                              <div className="w-full flex-grow">
                                <FormFieldTextarea
                                  form={commentEditForm}
                                  name="newEditedComment"
                                  className="w-full border-[1px] border-purple-500"
                                  onKeyDown={(event) => {
                                    if (event.key === "Enter") {
                                      event.preventDefault();
                                      editComment(
                                        comment._id,
                                        event.target.value
                                      ).then(() => {
                                        handleCancelCommentEdit();
                                      });
                                    }
                                  }}
                                />
                              </div>
                              <div className="flex sm:flex-col justify-end space-y-0 space-x-2 sm:space-x-0 sm:space-y-2 mt-2 w-full sm:w-auto">
                                <Button
                                  type="submit"
                                  size="sm"
                                  disabled={isSubmitting}
                                  className="flex-grow sm:flex-grow-0"
                                >
                                  Edit
                                </Button>
                                <Button
                                  type="button"
                                  size="sm"
                                  variant="outline"
                                  onClick={handleCancelCommentEdit}
                                  className="flex-grow sm:flex-grow-0"
                                >
                                  Cancel
                                </Button>
                              </div>
                            </form>
                          </Form>
                        ) : (
                          <p className="text-muted-foreground mt-1 break-all">
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
            <Form {...commentForm}>
              <form
                onSubmit={commentForm.handleSubmit((data) =>
                  createComment(data.comment).then(() => commentForm.reset())
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
                      onKeyDown={(event) => {
                        if (event.key === "Enter") {
                          event.preventDefault();
                          createComment(event.target.value).then(() =>
                            commentForm.reset()
                          );
                        }
                      }}
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
      </div>
    </div>
  );
}

export default Comment;

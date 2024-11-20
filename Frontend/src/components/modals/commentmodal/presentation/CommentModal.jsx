"use client";

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
import { Heart, MoreVertical, Pencil, Send, Trash, X } from "lucide-react";
import FormFieldTextarea from "@/components/basic/FormFieldTextarea";
import { useForm } from "react-hook-form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import CommentModalSkeleton from "@/components/basic/CommentModalSkeleton";

function CommentModal({
  showCommentModal,
  setShowCommentModal,
  comments,
  onSubmit,
  handleLike,
  onCommentDelete,
  onCommentEdit,
}) {
  const commentForm = useForm({
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
        {1 ? (
          <CommentModalSkeleton />
        ) : (
          <div>
            <ScrollArea className="h-[400px] pr-4">
              {comments.map((comment) => (
                <div
                  key={comment.id}
                  className="mb-6 transition-all duration-300 ease-in-out"
                >
                  <div className="flex items-start space-x-4">
                    <Avatar className="w-10 h-10">
                      <AvatarImage
                        src={`https://api.dicebear.com/6.x/initials/svg?seed=${comment.author}`}
                      />
                      <AvatarFallback>{comment.author[0]}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 bg-muted p-4 rounded-lg">
                      <div className="flex justify-between items-center w-full">
                        <div className="font-semibold text-foreground">
                          {comment.author}
                        </div>
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-8 w-8 p-0"
                            >
                              <MoreVertical className="h-4 w-4" />
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-40">
                            <div className="flex flex-col space-y-1">
                              <Button
                                variant="ghost"
                                size="sm"
                                className="justify-start"
                                onClick={() => onCommentEdit(comment.id)}
                              >
                                <Pencil className="mr-2 h-4 w-4" />
                                Edit
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                className="justify-start"
                                onClick={() => onCommentDelete(comment.id)}
                              >
                                <Trash className="mr-2 h-4 w-4" />
                                Delete
                              </Button>
                            </div>
                          </PopoverContent>
                        </Popover>
                      </div>
                      <p className="text-muted-foreground mt-1">
                        {comment.content}
                      </p>
                      <div className="flex items-center mt-2 space-x-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleLike(comment.id)}
                          className="text-muted-foreground hover:text-primary transition-colors duration-200"
                        >
                          <Heart
                            className="w-4 h-4 mr-1"
                            fill={comment.likes > 0 ? "currentColor" : "none"}
                          />
                          {comment.likes}
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </ScrollArea>
            <Form {...commentForm}>
              <form
                onSubmit={commentForm.handleSubmit((data) =>
                  onSubmit(data).then(() => commentForm.reset())
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
                  <Button type="submit" size="icon" className="shrink-0">
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

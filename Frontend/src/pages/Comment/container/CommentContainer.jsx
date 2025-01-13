import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Comment from "../presentation/Comment";
import { useForm } from "react-hook-form";
import CommentService from "@/services/CommentService";
import ApiError from "@/services/ApiError";
import { toast } from "react-toastify";
import { fetchComments, updateComment } from "@/store/CommentSlice";
import { addComment, deleteComment } from "@/store/CommentSlice";
import { zodResolver } from "@hookform/resolvers/zod";
import { editCommentFormValidation } from "@/validation/zodValidation";
import { useNavigate, useParams } from "react-router-dom";

function CommentContainer() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [editingCommentId, setEditingCommentId] = useState(null);
  const userId = useSelector((state) => state.auth.userDetails?._id);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { notesId } = useParams();

  const comments = useSelector((state) => state.comment.comments);
  const status = useSelector((state) => state.comment.status);

  useEffect(() => {
    if (!notesId) {
      return;
    }
    dispatch(fetchComments(notesId));
  }, [dispatch, notesId]);

  const commentEditForm = useForm({
    resolver: zodResolver(editCommentFormValidation),
    defaultValues: {
      newEditedComment: "",
    },
  });

  const createComment = async (data) => {
    setIsSubmitting(true);

    const response = await CommentService.createComment(data.comment, notesId);

    setIsSubmitting(false);

    if (!(response instanceof ApiError)) {
      toast.success(response?.message);
      dispatch(addComment(response?.data));
    } else {
      toast.error(response?.errorResponse?.message || response?.errorMessage);
    }
  };

  const deleteAComment = async (commentId) => {
    const response = await CommentService.deleteComment(commentId);
    if (!(response instanceof ApiError)) {
      toast.success(response?.message);
      dispatch(deleteComment(commentId));
    } else {
      toast.error(response?.errorResponse?.message || response?.errorMessage);
    }
  };

  const editComment = async (commentId, data) => {
    setIsSubmitting(true);

    const response = await CommentService.editComment(
      commentId,
      data.newEditedComment
    );

    setIsSubmitting(false);

    if (!(response instanceof ApiError)) {
      toast.success(response?.message);
      dispatch(updateComment({ commentId, newComment: response?.data }));
      setEditingCommentId(null);
    } else {
      toast.error(response?.errorResponse?.message || response?.errorMessage);
    }
  };

  const handleCommentEdit = (commentId, content) => {
    setEditingCommentId(commentId);
    commentEditForm.setValue("newEditedComment", content);
  };

  const handleCancelCommentEdit = () => {
    setEditingCommentId(null);
    commentEditForm.setValue("newEditedComment", "");
  };

  const handleCommentDelete = (commentId) => {
    if (window.confirm("Are you sure you want to delete this comment?")) {
      deleteAComment(commentId);
    }
  };

  return (
    <Comment
      isSubmitting={isSubmitting}
      comments={comments}
      status={status}
      createComment={createComment}
      editComment={editComment}
      editingCommentId={editingCommentId}
      handleCommentEdit={handleCommentEdit}
      handleCommentDelete={handleCommentDelete}
      handleCancelCommentEdit={handleCancelCommentEdit}
      commentEditForm={commentEditForm}
      userId={userId}
      navigate={navigate}
    />
  );
}

export default CommentContainer;

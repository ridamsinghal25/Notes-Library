import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleModal } from "@/store/ModalSlice";
import CommentModal from "../presentation/CommentModal";
import { useForm } from "react-hook-form";
import CommentService from "@/services/CommentService";
import ApiError from "@/services/ApiError";
import { toast } from "react-toastify";
import { fetchComments, setNotesId, updateComment } from "@/store/CommentSlice";
import { addComment, deleteComment } from "@/store/CommentSlice";
import { zodResolver } from "@hookform/resolvers/zod";
import { editCommentFormValidation } from "@/validation/zodValidation";

function CommentModalContainer() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [editingCommentId, setEditingCommentId] = useState(null);
  const userId = useSelector((state) => state.auth.userDetails?._id);
  const dispatch = useDispatch();

  const showCommentDialog = useSelector(
    (state) => state.modal.modals.commentModal
  );
  const selectedNoteId = useSelector((state) => state.comment.notesId);

  const comments = useSelector((state) => state.comment.comments);
  const status = useSelector((state) => state.comment.status);

  useEffect(() => {
    if (!selectedNoteId) {
      return;
    }
    dispatch(fetchComments(selectedNoteId));
  }, [dispatch, selectedNoteId]);

  const commentEditForm = useForm({
    resolver: zodResolver(editCommentFormValidation),
    defaultValues: {
      newEditedComment: "",
    },
  });

  const createComment = async (data) => {
    setIsSubmitting(true);

    const response = await CommentService.createComment(
      data.comment,
      selectedNoteId
    );

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

  const setShowCommentModal = () => {
    dispatch(toggleModal({ modalType: "commentModal" }));
    dispatch(setNotesId(null));
  };

  return (
    <CommentModal
      showCommentModal={showCommentDialog}
      setShowCommentModal={setShowCommentModal}
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
    />
  );
}

export default CommentModalContainer;

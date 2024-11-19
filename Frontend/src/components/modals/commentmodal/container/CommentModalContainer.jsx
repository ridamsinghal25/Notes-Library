"use client";

import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleModal } from "@/store/ModalSlice";
import CommentModal from "../presentation/CommentModal";

function CommentModalContainer() {
  const showCommentDialog = useSelector(
    (state) => state.modal.modals.commentModal
  );
  const dispatch = useDispatch();

  const [comments, setComments] = useState([
    {
      id: 1,
      author: "Alice",
      content: "Great post! I really enjoyed reading this.",
      likes: 3,
      replies: [],
    },
    {
      id: 2,
      author: "Bob",
      content: "I agree with Alice. The insights shared here are valuable.",
      likes: 1,
      replies: [],
    },
    {
      id: 3,
      author: "Alice",
      content: "Great post! I really enjoyed reading this.",
      likes: 3,
      replies: [],
    },
    {
      id: 4,
      author: "Bob",
      content: "I agree with Alice. The insights shared here are valuable.",
      likes: 1,
      replies: [],
    },
    {
      id: 5,
      author: "Alice",
      content: "Great post! I really enjoyed reading this.",
      likes: 3,
      replies: [],
    },
    {
      id: 25,
      author: "Bob",
      content: "I agree with Alice. The insights shared here are valuable.",
      likes: 1,
      replies: [],
    },
    {
      id: 15,
      author: "Alice",
      content: "Great post! I really enjoyed reading this.",
      likes: 3,
      replies: [],
    },
    {
      id: 24,
      author: "Bob",
      content: "I agree with Alice. The insights shared here are valuable.",
      likes: 1,
      replies: [],
    },
  ]);

  const onSubmit = async (data) => {
    const newComment = {
      id: Date.now(),
      author: "You",
      content: data.comment,
      likes: 0,
      replies: [],
    };
    setComments([newComment, ...comments]);
  };

  const handleLike = (id) => {
    setComments(
      comments.map((comment) =>
        comment.id === id ? { ...comment, likes: comment.likes + 1 } : comment
      )
    );
  };

  const setShowCommentModal = () => {
    dispatch(toggleModal({ modalType: "commentModal" }));
  };

  return (
    <CommentModal
      showCommentModal={showCommentDialog}
      setShowCommentModal={setShowCommentModal}
      comments={comments}
      onSubmit={onSubmit}
      handleLike={handleLike}
    />
  );
}

export default CommentModalContainer;

import { NOTES_BUTTON } from "@/constants/constants";
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";

function NotesCard({ subject }) {
  return (
    <Link
      to={`/notes/${subject}`}
      className="border border-gray-400 rounded-lg p-4 shadow-md transition-transform transform hover:scale-105 hover:shadow-lg block"
    >
      <h4 className="font-semibold text-lg text-gray-800 mb-2 dark:text-gray-200">
        {subject}
      </h4>
      <p className="text-sm text-gray-600 dark:text-gray-200 mb-4">
        Comprehensive {subject.toLowerCase()} notes for effective learning.
      </p>
      <Button>{NOTES_BUTTON}</Button>
    </Link>
  );
}

export default NotesCard;

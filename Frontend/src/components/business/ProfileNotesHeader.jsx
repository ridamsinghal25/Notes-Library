import { UserRolesEnum } from "@/constants/constants";
import React from "react";

function ProfileNotesHeader({ userRole, notesLength }) {
  return (
    <div>
      {userRole === UserRolesEnum.ADMIN ? (
        <h2 className="text-3xl font-extrabold mb-6 text-center bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent dark:from-primary-foreground dark:to-secondary-foreground">
          {notesLength > 0 ? (
            <>
              Your Uploaded Notes
              <span className="block text-lg font-medium mt-2 text-foreground dark:text-gray-300">
                You have {notesLength} notes available
              </span>
            </>
          ) : (
            <>
              No Notes Uploaded Yet
              <span className="block text-lg font-medium mt-2 text-foreground dark:text-gray-300">
                Start by adding your first note
              </span>
            </>
          )}
        </h2>
      ) : (
        <h2 className="text-3xl font-extrabold mb-6 text-center bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent dark:from-primary-foreground dark:to-secondary-foreground">
          Welcome to Your Notes Dashboard
          <span className="block text-lg font-medium mt-2 text-foreground dark:text-gray-300">
            No notes available at the moment
          </span>
          <span className="block text-sm font-normal mt-2 text-muted-foreground dark:text-gray-300">
            Note: Only administrators can upload new notes
          </span>
        </h2>
      )}
    </div>
  );
}

export default ProfileNotesHeader;

import path from "path";

export const MAIN_DB = "notes-library";
export const AUTH_DB = "auth-db";

export const UserRolesEnum = {
  ADMIN: "ADMIN",
  USER: "USER",
  MODERATOR: "MODERATOR",
};

export const AvailableUserRoles = Object.values(UserRolesEnum);

export const USER_TEMPORARY_TOKEN_EXPIRY = 20 * 60 * 1000; // 20 minutes

export const USER_COOKIE_EXPIRY = 3 * 24 * 60 * 60 * 1000; // 3 days

export const MAX_DAILY_NOTES = 10;

export const TMP_EXTRACTED_TEXT_PATH = path.join("/tmp", "extractedText.txt");

export const PUBLIC_EXTRACTED_TEXT_PATH = path.join(
  process.cwd(),
  "public",
  "temp",
  "extractedText.txt"
);

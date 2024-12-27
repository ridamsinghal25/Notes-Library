import dotenv from "dotenv";
import {
  closeConnection,
  makeAuthDBConnection,
  makeNotesLibraryDBConnection,
} from "./db/db.js";
import { app } from "./app.js";
import { getComment } from "./models/comment.model.js";
import { getUser } from "./models/user.model.js";
import { getCourse } from "./models/course.model.js";
import { getNotes } from "./models/notes.model.js";
import { getLike } from "./models/like.model.js";

dotenv.config({
  path: "./.env",
});

const startServer = async () => {
  try {
    // Ensure database connections are ready before starting the server

    await makeAuthDBConnection();
    await makeNotesLibraryDBConnection();

    // Initialize models
    getUser();
    getCourse();
    getComment();
    getNotes();
    getLike();

    app.on("error", (error) => {
      console.log("Error in app:", error);
      throw error;
    });

    const port = process.env.PORT || 4000;
    app.listen(port, () => {
      console.log(`Server is running at port: ${port}`);
    });
  } catch (error) {
    console.error(
      "Failed to initialize the server or connect to the database:",
      error
    );
    process.exit(1);
  }
};

startServer();

process.on("SIGINT", async () => {
  console.log("SIGINT signal received: closing MongoDB connections");

  try {
    await closeConnection();
    process.exit(0);
  } catch (error) {
    console.error("Error closing connections:", error);
    process.exit(1);
  }
});

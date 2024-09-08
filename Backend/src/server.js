import dotenv from "dotenv";
import mongoDBManager from "./db/db.js";
import { app } from "./app.js";

dotenv.config({
  path: "./.env",
});

const startServer = async () => {
  try {
    // Ensure database connections are ready before starting the server
    await mongoDBManager.getAuthConnection();
    await mongoDBManager.getNotesLibraryConnection();

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
    await mongoDBManager.closeConnection();
    process.exit(0);
  } catch (error) {
    console.error("Error closing connections:", error);
    process.exit(1);
  }
});

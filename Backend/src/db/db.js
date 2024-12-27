import mongoose from "mongoose";
import { AUTH_DB, MAIN_DB } from "../constants.js";

// // Singleton pattern to ensure connections are made only once
let notesLibraryConnection = null;
let authConnection = null;

const makeNewConnection = async (uri) => {
  try {
    const db = await mongoose.createConnection(uri);

    // Event handlers for the connection
    db.on("error", (error) => {
      console.log(`MongoDB :: connection ${db.name} error: ${error}`);
      db.close().catch(() =>
        console.log(`MongoDB :: failed to close connection ${db.name}`)
      );
    });

    db.on("connected", () => {
      console.log(`MongoDB :: connected ${db.name}`);
    });

    db.on("disconnected", () => {
      console.log(`MongoDB :: disconnected ${db.name}`);
    });

    return db;
  } catch (error) {
    console.error(`Failed to connect to MongoDB at ${uri}:`, error);
    process.exit(1);
  }
};

export const makeNotesLibraryDBConnection = async () => {
  if (!notesLibraryConnection) {
    notesLibraryConnection = await makeNewConnection(
      `${process.env.MONGO_URI}/${MAIN_DB}`
    );
  }
  return notesLibraryConnection;
};

export const makeAuthDBConnection = async () => {
  if (!authConnection) {
    authConnection = await makeNewConnection(
      `${process.env.MONGO_URI}/${AUTH_DB}`
    );
  }
  return authConnection;
};

export const getAuthConnection = () => {
  if (!authConnection) {
    throw new Error("Auth connection not established");
  }
  return authConnection;
};

export const getNotesLibraryConnection = () => {
  if (!notesLibraryConnection) {
    throw new Error("Notes library connection not established");
  }
  return notesLibraryConnection;
};

export const closeConnection = async () => {
  try {
    if (authConnection) {
      await authConnection.close();
      authConnection = null;
      console.log("Auth connection closed");
    }

    if (notesLibraryConnection) {
      await notesLibraryConnection.close();
      notesLibraryConnection = null;
      console.log("Notes library connection closed");
    }
  } catch (error) {
    console.log("Error closing connections:", error);
  }
};

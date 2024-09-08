import mongoose from "mongoose";
import { AUTH_DB, MAIN_DB } from "../constants.js";

// // Singleton pattern to ensure connections are made only once
// let notesLibraryConnection = null;
// let authConnection = null;

// const makeNewConnection = async (uri) => {
//   try {
//     const db = await mongoose.createConnection(uri);

//     // Event handlers for the connection
//     db.on("error", (error) => {
//       console.log(`MongoDB :: connection ${db.name} error: ${error}`);
//       db.close().catch(() =>
//         console.log(`MongoDB :: failed to close connection ${db.name}`)
//       );
//     });

//     db.on("connected", () => {
//       console.log(`MongoDB :: connected ${db.name}`);
//     });

//     db.on("disconnected", () => {
//       console.log(`MongoDB :: disconnected ${db.name}`);
//     });

//     return db;
//   } catch (error) {
//     console.error(`Failed to connect to MongoDB at ${uri}:`, error);
//     process.exit(1);
//   }
// };

// export const getNotesLibraryConnection = async () => {
//   if (!notesLibraryConnection) {
//     notesLibraryConnection = await makeNewConnection(
//       `${process.env.MONGO_URI}/${MAIN_DB}`
//     );
//   }
//   return notesLibraryConnection;
// };

// export const getAuthConnection = async () => {
//   if (!authConnection) {
//     authConnection = await makeNewConnection(
//       `${process.env.MONGO_URI}/${AUTH_DB}`
//     );
//   }
//   return authConnection;
// };

class MongoDBManager {
  constructor() {
    this.notesLibraryConnection = null;
    this.authConnection = null;
  }

  async makeNewConnection(uri) {
    try {
      const db = await mongoose.createConnection(uri);

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
  }

  async getNotesLibraryConnection() {
    if (!this.notesLibraryConnection) {
      this.notesLibraryConnection = this.makeNewConnection(
        `${process.env.MONGO_URI}/${MAIN_DB}`
      );
    }

    return this.notesLibraryConnection;
  }

  async getAuthConnection() {
    if (!this.authConnection) {
      this.authConnection = this.makeNewConnection(
        `${process.env.MONGO_URI}/${AUTH_DB}`
      );
    }
    return this.authConnection;
  }

  async closeConnection() {
    try {
      if (this.authConnection) {
        (await this.authConnection).close();
        this.authConnection = null;
        console.log("Auth connection closed");
      }

      if (this.notesLibraryConnection) {
        (await this.notesLibraryConnection).close();
        this.notesLibraryConnection = null;
        console.log("Notes library connection closed");
      }
    } catch (error) {
      console.log("Error closing connections:", error);
    }
  }
}

const mongoDBManager = new MongoDBManager();
export default mongoDBManager;

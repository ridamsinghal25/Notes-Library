import mongoose from "mongoose";
import { DB_Name } from "../constants.js";

const connectToDB = async () => {
  try {
    const connectionInstance = await mongoose.connect(
      `${process.env.MONGO_URI}/${DB_Name}`
    );

    console.log(
      `\nMongoDB connected !! DB HOST: ${connectionInstance.connection.host}`
    );
  } catch (error) {
    console.log("Mongodb connection failed: ", error);
    process.exit(1);
  }
};

export default connectToDB;

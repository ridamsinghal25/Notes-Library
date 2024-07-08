import dotenv from "dotenv";
import connectToDB from "./db/db.js";
import { app } from "./app.js";

dotenv.config({
  path: "./.env",
});

connectToDB()
  .then(() => {
    app.on("error", (error) => {
      console.log("Error in app: ", error);
      throw error;
    });

    app.listen(process.env.PORT || 4000, () => {
      console.log(`Server is running at port : ${process.env.PORT}`);
    });
  })
  .catch((error) => {
    console.log("Mongodb connection failed: ", error);
    process.exit(1);
  });

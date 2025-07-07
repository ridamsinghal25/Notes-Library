import { inngest } from "../client.js";
import { Notes } from "../../models/notes.model.js";
import { NonRetriableError } from "inngest";
import { documentAnalyzer } from "../../ai-agents/documentAnalyzer.js";
import summaryGenerator from "../../ai-agents/summaryGenerator.js";
import { uploadOnCloudinary } from "../../utils/cloudinary.js";
import logger from "../../logger/winston.logger.js";

export const onNotesUpload = inngest.createFunction(
  { id: "on-notes-upload", retries: 3 },
  { event: "notes/generateNoteSummaryAndTextFiles" },
  async ({ event, step }) => {
    try {
      const { notesId } = event.data;

      const notes = await step.run("fetch-notes", async () => {
        try {
          const notesObject = await Notes.findById(notesId);

          if (!notesObject) {
            throw new NonRetriableError("Notes not found");
          }

          return notesObject;
        } catch (err) {
          logger.error(`❌ Error in fetch-notes: ${err.message}`);
          throw err;
        }
      });

      const fileText = await step.run("extract-text", async () => {
        try {
          const response = await documentAnalyzer(notes.pdf.url);

          if (!response.text) {
            throw new Error("Failed to extract text from PDF");
          }

          return response;
        } catch (err) {
          logger.error(`❌ Error in extract-text: ${err.message}`);
          throw err;
        }
      });

      let summary = "Summary not generated yet";
      try {
        summary = await summaryGenerator(fileText.text);
      } catch (err) {
        logger.error(`❌ Error in summarise-text: ${err.message}`);
        throw err;
      }

      const uploadToCloudinary = await step.run(
        "upload-to-cloudinary",
        async () => {
          try {
            const file = await uploadOnCloudinary(
              fileText.extractedFilePath,
              "raw"
            );

            if (!file) {
              throw new Error("Failed to upload file");
            }

            return file;
          } catch (err) {
            logger.error(`❌ Error in upload-to-cloudinary: ${err.message}`);
            throw err;
          }
        }
      );

      await step.run("save-to-database", async () => {
        try {
          const updatedNotes = await Notes.findByIdAndUpdate(
            notesId,
            {
              $set: {
                summary: String(summary),
                textFile: {
                  url: uploadToCloudinary.secure_url,
                  public_id: uploadToCloudinary.public_id,
                },
              },
            },
            { new: true }
          );

          return updatedNotes;
        } catch (err) {
          logger.error(`❌ Error in save-to-database: ${err.message}`);
          throw err;
        }
      });

      return {
        success: true,
      };
    } catch (error) {
      logger.error(`❌ Error running the step ${error.message}`);

      return {
        success: false,
        message: "Failed to run the notes upload function",
      };
    }
  }
);

import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { rateLimit } from "express-rate-limit";
import requestIp from "request-ip";
import { ApiError } from "./utils/ApiError.js";
import morganMiddleware from "./logger/morgan.logger.js";
import path from "path";
import { fileURLToPath } from "url";

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(requestIp.mw());

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 200,
  standardHeaders: true,
  legacyHeaders: false,
  keyGenerator: (req, res) => {
    return req.clientIp;
  },
  handler: (_, __, ___, options) => {
    throw new ApiError(
      options.statusCode || 500,
      `There are too many requests. You are only allowed ${
        options.limit
      } requests per ${options.windowMs / 60000} minutes`
    );
  },
});

app.use(limiter);

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));
app.use(cookieParser());

app.use(morganMiddleware);

app.use(express.static(path.join(__dirname, "build")));

app.get("/*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "build", "index.html"));
});

import { errorHandler } from "./middlewares/error.middleware.js";
// import routes
import healthcheckRouter from "./routes/healthcheck.routes.js";
import userRouter from "./routes/user.routes.js";
import courseRouter from "./routes/course.route.js";
import notesRouter from "./routes/notes.route.js";
import likeRouter from "./routes/like.route.js";

app.use("/api/v1/healthcheck", healthcheckRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/courses", courseRouter);
app.use("/api/v1/notes", notesRouter);
app.use("/api/v1/likes", likeRouter);

app.use(errorHandler);

export { app };

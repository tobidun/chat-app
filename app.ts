import cookieParser from "cookie-parser";
import express, {
  json,
  NextFunction,
  Request,
  Response,
  urlencoded,
} from "express";
import createError from "http-errors";
import logger from "morgan";
import { join } from "path";

import { config } from "dotenv";
import { connect } from "mongoose";
import { ChatRouter } from "./routes/chats/chats.controller";
import { UserRouter } from "./routes/users/users.controller";
config();
var app = express();

const MONGODB_URI = "mongodb://localhost:27017/chat-app";
console.log(MONGODB_URI);

connect(MONGODB_URI);

app.set("views", join(__dirname, "views"));
app.set("view engine", "jade");

app.use(logger("dev"));
app.use(json());
app.use(urlencoded({ extended: false }));
app.use(cookieParser());

app.use("/chats", ChatRouter);
app.use("/users", UserRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  res
    .status(err.statusCode || 500)
    .send({ message: err.message, success: false });
});
const port = process.env.TOKEN_KEY || 3000;

app.listen(port, () => console.log(`Chat-app listening on port ${port}!`));

export default app;

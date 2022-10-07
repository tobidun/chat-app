import DBG from "debug";
import { config } from "dotenv";
import express, {
  json,
  NextFunction,
  Request,
  Response,
  urlencoded,
} from "express";
import { useDataBase } from "../libs/db";
import { ChatRouter } from "./routes/chats/chats.controller";
import { ReactionRouter } from "./routes/reactions/reactions.controller";
import { UserRouter } from "./routes/users/users.controller";
config();

const debug = DBG("chat-app:server");
export const app = express();

process.env.NODE_ENV !== "test" &&
  useDataBase()
    .then(() => {
      debug("Database connect successfully");
    })
    .catch((err) => {
      debug(err);
      debug("Error in connecting to database");
    });

app.use(json());
app.use(urlencoded({ extended: false }));

app.use("/chats", ChatRouter);
app.use("/users", UserRouter);
app.use("/reactions", ReactionRouter);

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  res
    .status(err.statusCode || err.status || 500)
    .send({ message: err.message, success: false });
});

import cookieParser from "cookie-parser";
import cors from "cors";
import express, { Application, Request, Response } from "express";

import router from "./app/routes";
import globalErrorHandler from "./app/middlewares/globalErrorhandler";
import notFound from "./app/middlewares/notFound";

const app: Application = express();

//parsers
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: ["http://localhost:5173"],
    credentials: true,
  })
);

// application routes
app.use("/api/v1", router);

// Root route
app.get("/", (req: Request, res: Response) => {
  res.send("Elan server is running");
});

// gloabal error handler
app.use(globalErrorHandler);

// Not Found
app.use(notFound);

export default app;

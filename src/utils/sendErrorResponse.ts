import { Response } from "express";

export const sendErrorResponse = (res: Response, statusCode: number, message: string, error: any) => {
  const formattedError = {
    message,
    success: false,
    error: error?.name || "UnknownError",
    details: error?.errors || error?.message || "An error occurred",
    stack: process.env.NODE_ENV === "development" ? error?.stack : undefined, // Show stack only in development mode
  };
  res.status(statusCode).json(formattedError);
};

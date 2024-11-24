import express, { Application, NextFunction, Request, Response } from 'express';
import cors from 'cors';
import productsRoute from './routes/productsRoutes';
import { sendErrorResponse } from './utils/sendErrorResponse';
import orderRoute from './routes/ordersRoutes';

const app: Application = express();

app.use(express.json()); // Parse JSON request bodies
app.use(cors()); // Enable CORS

app.use("/api/products", productsRoute);
app.use("/api/orders", orderRoute);

// Root route
app.get('/', (req: Request, res: Response) => {
  res.send('Book shop server is running');
});


// Catch-all 404 route handler for undefined routes
app.use((req: Request, res: Response) => {
  res.status(404).json({
    message: "Route not found",
    success: false,
    error: {
      type: "NotFoundError",
      details: `Cannot ${req.method} ${req.originalUrl}`,
    },
  });
});


// Error-handling middleware for JSON parsing errors
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof SyntaxError && 'body' in err) {
    return  sendErrorResponse(res, 400, "Server error", err);
    ;
  }
  next(err);
});

export default app;
